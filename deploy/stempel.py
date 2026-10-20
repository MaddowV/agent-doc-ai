#!/usr/bin/env python3
"""Hängt an CSS- und JS-Verweise einen Fingerabdruck des Dateiinhalts.

Warum: Die Dateinamen sind stabil (`app.js`), also hält ein Browser eine
einmal geholte Fassung so lange fest, wie sein Cache-Eintrag gilt — selbst
wenn der Server längst etwas anderes ausliefert. Das ist uns genau einmal
passiert: Das Formular zeigte eine Erfolgsmeldung, obwohl die alte Fassung
lief und gar nichts verschickte.

Ändert sich der Inhalt, ändert sich der Fingerabdruck und damit die Adresse.
Der Browser muss neu laden, ohne dass jemand eine Versionsnummer pflegen muss.
Bleibt eine Datei gleich, bleibt die Adresse gleich und der Cache greift weiter.

Aufruf vor jedem Commit:  python3 deploy/stempel.py
"""

import hashlib
import pathlib
import re
import sys

WURZEL = pathlib.Path(__file__).resolve().parent.parent
SEITEN = ["index.html", "impressum.html", "datenschutz.html", "doi.html"]
MITTEL = ["base.css", "page.css", "app.js"]


def fingerabdruck(datei: pathlib.Path) -> str:
    return hashlib.sha256(datei.read_bytes()).hexdigest()[:8]


def main() -> int:
    abdruecke = {}
    for name in MITTEL:
        pfad = WURZEL / name
        if not pfad.exists():
            print(f"  übersprungen (fehlt): {name}")
            continue
        abdruecke[name] = fingerabdruck(pfad)

    geaendert = 0
    for seite in SEITEN:
        pfad = WURZEL / seite
        if not pfad.exists():
            continue
        text = alt = pfad.read_text(encoding="utf-8")
        for name, abdruck in abdruecke.items():
            # Verweis mit oder ohne vorhandenen Stempel ersetzen
            text = re.sub(
                rf'(["\'])({re.escape(name)})(\?v=[0-9a-f]+)?\1',
                rf'\g<1>{name}?v={abdruck}\g<1>',
                text,
            )
        if text != alt:
            pfad.write_text(text, encoding="utf-8")
            geaendert += 1
            print(f"  gestempelt: {seite}")

    for name, abdruck in abdruecke.items():
        print(f"  {name:<10} -> ?v={abdruck}")
    print(f"  {geaendert} Seite(n) geändert")
    return 0


if __name__ == "__main__":
    sys.exit(main())
