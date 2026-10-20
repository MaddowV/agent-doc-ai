// Agent Doc AI — Annahmestelle für das Anfrageformular.
//
// Nimmt die Formulardaten entgegen, prüft sie und legt den Kontakt in
// GoHighLevel an. Speichert selbst nichts: die Anfrage liegt danach an genau
// einer Stelle, nämlich im CRM.
//
// Vorher wird immer geprüft, ob der Kontakt schon existiert. Das ist kein
// Komfort, sondern Pflicht: Wer seine Werbe-Einwilligung bereits bestätigt hat,
// darf sie durch eine zweite Anfrage weder verlieren noch erneut bestätigen
// müssen — und niemand soll eine Double-Opt-In-Mail bekommen, die er schon
// beantwortet hat.
//
// Secrets (über `supabase secrets set`, nicht zurücklesbar):
//   GHL_API_KEY       Private-Integration-Token der Agent-Doc-AI-Location
//   GHL_LOCATION_ID   Location-ID

const API_KEY = Deno.env.get("GHL_API_KEY");
const LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

const GHL = "https://services.leadconnectorhq.com";
const FELD_BESTAETIGT_AM = "FAHODIkWrbpD3ZJbTGd8";
const FELD_NACHWEIS = "LGacuD1fGRAE83zE6Cbr";

const TAG_ANFRAGE = "Demo angefragt";
const TAG_DOI_OFFEN = "DOI ausstehend";
const TAG_WERBUNG_OK = "Werbung erlaubt";

const ERLAUBTE_HERKUNFT = [
  "https://agentdocai.com",
  "https://www.agentdocai.com",
  "https://probe.agentdocai.com",
];

const FENSTER_MS = 10 * 60 * 1000;
const MAX_PRO_FENSTER = 5;
const zaehler = new Map<string, { start: number; anzahl: number }>();

function gedrosselt(kennung: string): boolean {
  const jetzt = Date.now();
  const e = zaehler.get(kennung);
  if (!e || jetzt - e.start > FENSTER_MS) {
    zaehler.set(kennung, { start: jetzt, anzahl: 1 });
    return false;
  }
  e.anzahl += 1;
  return e.anzahl > MAX_PRO_FENSTER;
}

function kopfzeilen(herkunft: string | null) {
  const erlaubt = herkunft && ERLAUBTE_HERKUNFT.includes(herkunft) ? herkunft : ERLAUBTE_HERKUNFT[0];
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": erlaubt,
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "Origin",
  };
}

function istEmail(w: unknown): w is string {
  return typeof w === "string" && w.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(w);
}

async function ghl(pfad: string, init: RequestInit = {}) {
  const antwort = await fetch(GHL + pfad, {
    ...init,
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Version": "2021-07-28",
      "Accept": "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(10_000),
  });
  const text = await antwort.text();
  let daten: Record<string, unknown> = {};
  try { daten = text ? JSON.parse(text) : {}; } catch { /* leere oder nicht-JSON-Antwort */ }
  return { ok: antwort.ok, status: antwort.status, daten };
}

/**
 * Sucht einen Kontakt über die E-Mail-Adresse. null, wenn es ihn nicht gibt.
 *
 * Gemessen, nicht geraten: `GET /contacts/?query=` findet frisch angelegte
 * Kontakte nicht, auch nach 15 Sekunden nicht. `POST /contacts/search` mit
 * exaktem Filter findet sie. Der Index braucht trotzdem rund 15 Sekunden —
 * zwei Anfragen im Sekundenabstand erkennt also auch dieser Weg nicht als
 * denselben Kontakt. Für den Zweck hier (wiederkehrende Interessenten) reicht
 * das; die Dublettenfreiheit stellt ohnehin `upsert` sicher.
 *
 * Anschließend wird der Kontakt einzeln geholt, weil die Trefferliste die
 * Custom Fields nicht mitliefert.
 */
async function kontaktSuchen(email: string) {
  const r = await ghl("/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      locationId: LOCATION_ID,
      page: 1,
      pageLimit: 5,
      filters: [{ field: "email", operator: "eq", value: email }],
    }),
  });
  if (!r.ok) return null;
  const treffer = (r.daten.contacts as Array<Record<string, unknown>>) ?? [];
  const kurz = treffer.find((k) => String(k.email ?? "").toLowerCase() === email);
  if (!kurz?.id) return null;

  const voll = await ghl(`/contacts/${kurz.id}`);
  if (!voll.ok) return kurz;
  return (voll.daten.contact ?? kurz) as Record<string, unknown>;
}

function hatEinwilligung(kontakt: Record<string, unknown>): boolean {
  const tags = (kontakt.tags as string[] ?? []).map((t) => t.toLowerCase());
  if (tags.includes(TAG_WERBUNG_OK.toLowerCase())) return true;
  const felder = (kontakt.customFields as Array<Record<string, unknown>> ?? []);
  return felder.some((f) => f.id === FELD_BESTAETIGT_AM && String(f.value ?? "").trim() !== "");
}

Deno.serve(async (req) => {
  const herkunft = req.headers.get("origin");
  const kopf = kopfzeilen(herkunft);
  const raus = (code: number, inhalt: unknown) =>
    new Response(code === 204 ? null : JSON.stringify(inhalt), { status: code, headers: kopf });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: kopf });
  if (req.method !== "POST") return raus(405, { fehler: "nur POST" });
  if (!API_KEY || !LOCATION_ID) {
    console.error("GHL_API_KEY oder GHL_LOCATION_ID fehlt");
    return raus(500, { fehler: "nicht eingerichtet" });
  }

  const absender = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unbekannt";
  if (gedrosselt(absender)) return raus(429, { fehler: "zu viele Anfragen" });

  let daten: Record<string, string> = {};
  try {
    const typ = req.headers.get("content-type") ?? "";
    if (typ.includes("application/json")) {
      daten = await req.json();
    } else {
      daten = Object.fromEntries(new URLSearchParams(await req.text()));
    }
  } catch {
    return raus(400, { fehler: "unlesbar" });
  }

  // Spam-Falle: ein für Menschen unsichtbares Feld. Freundlich antworten,
  // damit der Bot nicht lernt, woran es lag.
  if (daten.firma) return raus(204, null);

  const email = (daten.email ?? "").trim().toLowerCase();
  if (!istEmail(email)) return raus(400, { fehler: "E-Mail-Adresse fehlt oder ist ungültig" });

  const kuerzen = (w?: string) => (w ?? "").trim().slice(0, 2000) || undefined;
  const willWerbung = daten.werbung === "ja";

  try {
    const vorhanden = await kontaktSuchen(email);
    const schonEingewilligt = vorhanden ? hatEinwilligung(vorhanden) : false;

    // Das Double-Opt-In nur anstoßen, wenn jemand Werbung will und noch nicht
    // zugestimmt hat. Wer schon bestätigt hat, bekommt keine zweite Mail.
    const tags = [TAG_ANFRAGE];
    if (willWerbung && !schonEingewilligt) tags.push(TAG_DOI_OFFEN);

    // ACHTUNG, gemessen: `upsert` ERSETZT die Tagliste, es ergänzt sie nicht.
    // Würde man die Tags hier mitschicken, verlöre ein bestehender Kontakt bei
    // jeder Folgeanfrage seine Einwilligung — also genau den Nachweis, den wir
    // aufbewahren müssen. Deshalb gehen Tags nur über den eigenen Endpunkt,
    // und nur bei einem wirklich neuen Kontakt direkt mit.
    const rumpf: Record<string, unknown> = {
      locationId: LOCATION_ID,
      email,
      source: "agentdocai.com — Demo-Report angefragt",
    };
    if (!vorhanden) rumpf.tags = tags;
    const name = kuerzen(daten.name);
    if (name) {
      const teile = name.split(/\s+/);
      rumpf.firstName = teile[0];
      if (teile.length > 1) rumpf.lastName = teile.slice(1).join(" ");
    }
    if (kuerzen(daten.website)) rumpf.website = kuerzen(daten.website);

    // Freitextangaben als Notiz mitgeben statt eigene Felder anzulegen —
    // weniger Struktur, die später gepflegt werden muss.
    const notiz = [
      daten.thema ? `Thema: ${kuerzen(daten.thema)}` : null,
      daten.liste ? `Listengröße: ${kuerzen(daten.liste)}` : null,
      daten.verkauft === "ja" ? "Verkauft bereits digitale Produkte." : null,
      `Werbe-Einwilligung angefragt: ${willWerbung ? "ja" : "nein"}`,
    ].filter(Boolean).join("\n");

    const r = await ghl("/contacts/upsert", { method: "POST", body: JSON.stringify(rumpf) });
    if (!r.ok) throw new Error(`upsert fehlgeschlagen: ${r.status}`);

    const kontakt = (r.daten.contact ?? r.daten) as Record<string, unknown>;
    const id = String(kontakt.id ?? "");

    // Bei einem bestehenden Kontakt die Tags einzeln ergänzen, damit nichts
    // Vorhandenes überschrieben wird.
    if (id && vorhanden) {
      const schonDa = ((vorhanden.tags as string[]) ?? []).map((t) => t.toLowerCase());
      const fehlende = tags.filter((t) => !schonDa.includes(t.toLowerCase()));
      if (fehlende.length) {
        await ghl(`/contacts/${id}/tags`, {
          method: "POST",
          body: JSON.stringify({ tags: fehlende }),
        });
      }
    }

    if (id && notiz) {
      await ghl(`/contacts/${id}/notes`, {
        method: "POST",
        body: JSON.stringify({ body: notiz }),
      });
    }

    console.log(
      `Anfrage verarbeitet · ${vorhanden ? "bestehender" : "neuer"} Kontakt · ` +
      `Werbung angefragt: ${willWerbung} · schon eingewilligt: ${schonEingewilligt}`,
    );
    return raus(204, null);
  } catch (fehler) {
    // Nach außen keine Details, im Log alles — eine stillschweigend verschluckte
    // Anfrage wäre schlimmer als ein sichtbarer Fehler.
    console.error("Verarbeitung fehlgeschlagen:", (fehler as Error).message);
    return raus(502, { fehler: "Wir konnten deine Anfrage gerade nicht annehmen." });
  }
});
