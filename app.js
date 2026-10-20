(function () {
  "use strict";

  var SETUP = 2000;
  var bereit = false;

  function ansager(el) {
    var timer;
    return function (text) {
      clearTimeout(timer);
      if (!bereit) return;                       // beim Seitenaufbau nichts sagen
      timer = setTimeout(function () {
        if (el.textContent !== text) el.textContent = text;
      }, 600);
    };
  }
  var nf = new Intl.NumberFormat("de-DE");

  var liste   = document.getElementById("liste");
  var quote   = document.getElementById("quote");
  var preise  = document.querySelectorAll('input[name="preis"]');

  var listeOut  = document.getElementById("liste-out");
  var quoteOut  = document.getElementById("quote-out");
  var stueckEl  = document.getElementById("stueck");
  var bruttoEl  = document.getElementById("brutto");
  var gebuehrEl = document.getElementById("gebuehr");
  var nettoEl   = document.getElementById("netto");
  var staffelEl = document.getElementById("staffel");
  var setupBox  = document.getElementById("setupbox");

  function euro(n) { return nf.format(Math.round(n)) + " €"; }

  function satzFuer(stueck) {
    if (stueck < 50)  return 19;
    if (stueck < 200) return 14;
    return 10;
  }

  function preis() {
    for (var i = 0; i < preise.length; i++) {
      if (preise[i].checked) return parseInt(preise[i].value, 10);
    }
    return 49;
  }

  function rechne() {
    var l = parseInt(liste.value, 10);
    var q = parseInt(quote.value, 10) / 1000;   // Regler 5–50  =>  0,5–5,0 %
    var p = preis();

    var stueck  = Math.round(l * q);
    var brutto  = stueck * p;
    var satz    = satzFuer(stueck);
    var gebuehr = stueck * satz;
    var netto   = brutto - gebuehr;

    listeOut.textContent = nf.format(l);
    quoteOut.textContent = (q * 100).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";

    stueckEl.textContent  = nf.format(stueck);
    bruttoEl.textContent  = euro(brutto);
    gebuehrEl.textContent = "− " + euro(gebuehr);
    nettoEl.textContent   = euro(netto);
    staffelEl.textContent = "(" + satz + " € / Report)";

    liste.setAttribute("aria-valuetext", nf.format(l) + " Abonnenten");
    quote.setAttribute("aria-valuetext", quoteOut.textContent);

    var rest = SETUP - netto;
    if (rest <= 0) {
      setupBox.innerHTML =
        "Dieser eine Launch bezahlt dein Setup — und lässt dir <strong>" + euro(-rest) +
        "</strong> übrig. Jeder Report danach ist reiner Gewinn, auch in zwei Jahren noch, " +
        "ohne dass du etwas tust.";
      setupBox.removeAttribute("data-short");
    } else {
      setupBox.innerHTML =
        "Dieser Launch allein deckt dein Setup noch nicht — es fehlen <strong>" + euro(rest) +
        "</strong>. Ein Report verdient sich im Dauerbetrieb, nicht am Launch-Tag.";
      setupBox.setAttribute("data-short", "true");
    }

    sagLaunch("Das bleibt bei dir: " + euro(netto) + ". " + setupBox.textContent);
  }

  /* ---------- Dauerbetrieb ---------- */

  var proMonat = document.getElementById("promonat");
  var folge    = document.getElementById("folge");
  var paket    = document.getElementById("paket");

  var pmOut    = document.getElementById("promonat-out");
  var folgeOut = document.getElementById("folge-out");
  var paketOut = document.getElementById("paket-out");
  var preisEcho = document.getElementById("preis-echo");

  var jahrEl   = document.getElementById("jahr");
  var jRepEl   = document.getElementById("j-reports");
  var jBuchEl  = document.getElementById("j-buchungen");
  var jCoachEl = document.getElementById("j-coaching");
  var jahrBox  = document.getElementById("jahrbox");
  var barsEl   = document.getElementById("stack-bars");
  var peakEl   = document.getElementById("chart-peak");
  var svgEl    = document.getElementById("stack");
  var sagLaunch = ansager(document.getElementById("live-launch"));
  var sagJahr   = ansager(document.getElementById("live-jahr"));

  var BASE = 100, TOP = 8, COLS = 12, GAP = 3;
  var BARW = (360 - (COLS - 1) * GAP) / COLS;

  function barPath(x, w, h) {
    var r = Math.min(4, w / 2, h);
    var y = BASE - h;
    return "M" + x + "," + BASE +
           "L" + x + "," + (y + r) +
           "Q" + x + "," + y + " " + (x + r) + "," + y +
           "L" + (x + w - r) + "," + y +
           "Q" + (x + w) + "," + y + " " + (x + w) + "," + (y + r) +
           "L" + (x + w) + "," + BASE + "Z";
  }

  function zeichne(gesamtMonat) {
    var maxH = BASE - TOP, out = "";
    for (var m = 1; m <= COLS; m++) {
      var h = maxH * (m / COLS);
      var x = (m - 1) * (BARW + GAP);
      out += '<path class="chart__bar" d="' + barPath(x, BARW, h) + '">' +
             "<title>Monat " + m + ": " + euro(gesamtMonat * m) + " aufsummiert</title></path>";
    }
    barsEl.innerHTML = out;
    peakEl.textContent = euro(gesamtMonat * COLS);
    svgEl.setAttribute("aria-label",
      "Balkendiagramm: Der aufsummierte Ertrag wächst gleichmäßig von " + euro(gesamtMonat) +
      " nach dem ersten Monat auf " + euro(gesamtMonat * COLS) + " nach zwölf Monaten.");
  }

  function dauer() {
    var p  = preis();
    var rm = parseInt(proMonat.value, 10);
    var fq = parseInt(folge.value, 10);
    var pk = parseInt(paket.value, 10);

    var satz        = satzFuer(rm);
    var repGewinnM  = rm * (p - satz);
    var buchungenM  = rm * (fq / 100);
    var coachingM   = buchungenM * pk;
    var gesamtM     = repGewinnM + coachingM;

    pmOut.textContent    = nf.format(rm);
    folgeOut.textContent = nf.format(fq);
    paketOut.textContent = euro(pk);
    preisEcho.textContent = p + " €";

    jahrEl.textContent   = euro(gesamtM * 12);
    jRepEl.textContent   = euro(repGewinnM * 12);
    jBuchEl.textContent  = nf.format(Math.round(buchungenM * 12));
    jCoachEl.textContent = euro(coachingM * 12);

    var monate = Math.ceil(SETUP / repGewinnM);
    jahrBox.innerHTML = repGewinnM > 0
      ? "Allein aus den Reports — das Folgegeschäft noch gar nicht mitgerechnet — ist dein " +
        "Setup nach <strong>" + monate + (monate === 1 ? " Monat" : " Monaten") + "</strong> bezahlt."
      : "Bei diesem Report-Preis bleibt nach unserer Gebühr nichts übrig.";

    proMonat.setAttribute("aria-valuetext", nf.format(rm) + " Reports pro Monat");
    folge.setAttribute("aria-valuetext", fq + " von 100 Käufern");
    paket.setAttribute("aria-valuetext", euro(pk));

    zeichne(gesamtM);
    sagJahr("Das bleibt bei dir in zwölf Monaten: " + euro(gesamtM * 12) + ". " + jahrBox.textContent);
  }

  function alles() { rechne(); dauer(); }

  liste.addEventListener("input", rechne);
  quote.addEventListener("input", rechne);
  proMonat.addEventListener("input", dauer);
  folge.addEventListener("input", dauer);
  paket.addEventListener("input", dauer);
  for (var i = 0; i < preise.length; i++) preise[i].addEventListener("change", alles);
  alles();
  bereit = true;

  var form    = document.getElementById("demo-form");
  var fehler  = document.getElementById("form-err");
  var knopf   = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    fehler.textContent = "";
    knopf.disabled = true;
    knopf.textContent = "Wird gesendet …";

    fetch("/api/anfrage", { method: "POST", body: new URLSearchParams(new FormData(form)) })
      .then(function (antwort) {
        if (!antwort.ok && antwort.status !== 204) throw new Error("Status " + antwort.status);
        document.body.setAttribute("data-sent", "true");
        document.getElementById("anfordern").scrollIntoView({ block: "start" });
        document.getElementById("sent").focus({ preventScroll: true });
      })
      .catch(function () {
        // Niemals „Angekommen" zeigen, wenn nichts angekommen ist.
        fehler.textContent = "Das hat gerade nicht geklappt. Schreib uns bitte direkt an " +
                             "hallo@agentdocai.com — wir melden uns genauso zuverlässig.";
        knopf.disabled = false;
        knopf.textContent = "Demo-Report anfordern";
      });
  });
})();
