# Agent Doc AI — Website

Statischer One-Pager plus Impressum und Datenschutzerklärung.
Keine Abhängigkeiten, kein Build-Schritt, keine externen Ressourcen.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit beiden Rechnern |
| `impressum.html`, `datenschutz.html` | Rechtsseiten |
| `base.css` | Gemeinsame Grundlage: Schriften, Gestaltungswerte, Kopf- und Fußzeile |
| `page.css`, `app.js` | Nur für die Startseite |
| `fonts/` | Inter und Newsreader, selbst ausgeliefert (SIL OFL 1.1) |
| `deploy/` | nginx-Konfiguration und Compose-Projekt für den VPS |

## Grundsätze

- **Null externe Verbindungen.** Keine Google Fonts, kein CDN, kein Tracking.
  Dadurch kein Einwilligungsbanner nötig und kein Abmahnrisiko aus der
  Google-Fonts-Rechtsprechung. Vor jeder Änderung im Netzwerk-Tab gegenprüfen.
- **Keine IP-Adressen im Protokoll.** nginx protokolliert datenarm, Traefik
  führt gar kein Zugriffsprotokoll.
- **WCAG 2.2 AA** als Maßstab, obwohl das BFSG hier nicht greift.

## Ausrollen

Über die Hostinger-API, kein SSH nötig — siehe `deploy/docker-compose.yml`.
