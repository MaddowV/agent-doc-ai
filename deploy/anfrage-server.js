// Agent Doc AI — Annahmestelle für das Anfrageformular.
//
// Nimmt die Formulardaten entgegen, prüft sie und reicht sie an den
// GoHighLevel-Webhook weiter. Bewusst ohne Abhängigkeiten und ohne eigene
// Datenhaltung: die Anfrage liegt danach an genau einer Stelle, nämlich im CRM.
//
// Auf dem Server liegt nur GHL_WEBHOOK_URL — kein API-Schlüssel. Wer die
// Adresse ausliest, kann höchstens Kontakte anlegen, nichts lesen oder ändern.
//
// Umgebungsvariablen:
//   GHL_WEBHOOK_URL   Inbound-Webhook des GoHighLevel-Workflows (Pflicht)
//   PORT              Standard 8090

import { createServer } from "node:http";

const WEBHOOK = process.env.GHL_WEBHOOK_URL;
const PORT = Number(process.env.PORT || 8090);

if (!WEBHOOK) {
  console.error("GHL_WEBHOOK_URL fehlt — der Dienst startet nicht.");
  process.exit(1);
}

const MAX_BODY = 16 * 1024;           // 16 KB reichen für das Formular
const FENSTER_MS = 10 * 60 * 1000;    // Zeitfenster für die Drosselung
const MAX_PRO_FENSTER = 5;            // Anfragen je Absender und Fenster
const FELDER = ["name", "email", "website", "liste", "thema", "verkauft", "werbung"];

const zaehler = new Map();

function gedrosselt(kennung) {
  const jetzt = Date.now();
  const eintrag = zaehler.get(kennung);
  if (!eintrag || jetzt - eintrag.start > FENSTER_MS) {
    zaehler.set(kennung, { start: jetzt, anzahl: 1 });
    return false;
  }
  eintrag.anzahl += 1;
  return eintrag.anzahl > MAX_PRO_FENSTER;
}

// Alte Einträge regelmäßig wegräumen, damit die Map nicht wächst.
setInterval(() => {
  const jetzt = Date.now();
  for (const [k, v] of zaehler) if (jetzt - v.start > FENSTER_MS) zaehler.delete(k);
}, FENSTER_MS).unref();

function istEmail(wert) {
  return typeof wert === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert) && wert.length <= 254;
}

function koerperLesen(req) {
  return new Promise((loesen, ablehnen) => {
    let roh = "", zuviel = false;
    req.on("data", (stueck) => {
      if (zuviel) return;
      roh += stueck;
      if (roh.length > MAX_BODY) { zuviel = true; ablehnen(new Error("zu groß")); req.destroy(); }
    });
    req.on("end", () => { if (!zuviel) loesen(roh); });
    req.on("error", ablehnen);
  });
}

function auswerten(roh, typ) {
  if (typ.includes("application/json")) return JSON.parse(roh);
  const params = new URLSearchParams(roh);
  return Object.fromEntries(params.entries());
}

const server = createServer(async (req, res) => {
  const antwort = (code, text) => {
    res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(text));
  };

  if (req.method === "GET" && req.url === "/api/health") return antwort(200, { ok: true });
  if (req.method !== "POST" || !req.url.startsWith("/api/anfrage")) {
    return antwort(404, { fehler: "nicht gefunden" });
  }

  // Traefik setzt X-Forwarded-For; nur zur Drosselung, nirgends gespeichert.
  const absender = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unbekannt";
  if (gedrosselt(absender)) return antwort(429, { fehler: "zu viele Anfragen" });

  let daten;
  try {
    daten = auswerten(await koerperLesen(req), req.headers["content-type"] || "");
  } catch {
    return antwort(400, { fehler: "unlesbar" });
  }

  // Spam-Falle: ein für Menschen unsichtbares Feld. Ist es gefüllt, war es ein Bot.
  // Wir antworten trotzdem freundlich, damit der Bot nichts dazulernt.
  if (daten.firma) return antwort(204, {});

  if (!istEmail(daten.email)) return antwort(400, { fehler: "E-Mail-Adresse fehlt oder ist ungültig" });

  const nutzlast = { quelle: "agentdocai.com", eingegangen_am: new Date().toISOString() };
  for (const feld of FELDER) {
    const wert = daten[feld];
    if (typeof wert === "string" && wert.trim()) nutzlast[feld] = wert.trim().slice(0, 2000);
  }
  nutzlast.werbung = daten.werbung === "ja" ? "ja" : "nein";

  try {
    const hin = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(nutzlast),
      signal: AbortSignal.timeout(10_000),
    });
    if (!hin.ok) throw new Error("Webhook antwortete mit " + hin.status);
  } catch (fehler) {
    // Keine Details nach außen, aber im Log sichtbar — eine stillschweigend
    // verschluckte Anfrage wäre schlimmer als ein sichtbarer Fehler.
    console.error("Weiterleitung fehlgeschlagen:", fehler.message);
    return antwort(502, { fehler: "Wir konnten deine Anfrage gerade nicht annehmen." });
  }

  console.log("Anfrage weitergereicht · Werbung:", nutzlast.werbung);
  return antwort(204, {});
});

server.listen(PORT, () => console.log("Annahmestelle lauscht auf Port " + PORT));
