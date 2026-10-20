# E-Mail-Vorlagen

Drei HTML-Mails für die Demo-Report-Strecke, zum Einfügen in GoHighLevel.
Sie sind reines HTML ohne Bilder, ohne Webfonts und ohne externe Abhängigkeiten.

| Datei | Wann sie rausgeht | Werbung? |
|---|---|---|
| `doi-bestaetigung.html` | Feld **DOI angestoßen** wurde gesetzt | nein — Einwilligungsanfrage |
| `eingangsbestaetigung.html` | Feld **Demo angefragt** wurde gesetzt | nein — Antwort auf die Anfrage |
| `demo-report-versand.html` | von Hand, wenn der Report fertig ist | ja — mit Abmeldelink |

## Platzhalter

Vor dem ersten Versand ersetzen. **Die genaue Schreibweise der Merge-Tags bitte in
deinem GoHighLevel gegenprüfen** — am einfachsten, indem du das Feld über den
Feld-Wähler im Editor einfügst und die eingefügte Schreibweise mit der hier
vergleichst. Die Tags unten sind die übliche Form, aber sie unterscheidet sich
zwischen GHL-Versionen.

| Platzhalter | Vorkommen | Bedeutung |
|---|---|---|
| `{{contact.first_name}}` | alle drei | Vorname in der Anrede |
| `{{trigger_link.doi_bestaetigung}}` | DOI-Mail, **zweimal** | der Trigger-Link, Ziel `https://agentdocai.com/doi` |
| `{{custom_values.demo_report_link}}` | Report-Mail | Link zum fertigen Report |
| `{{unsubscribe_link}}` | Report-Mail | Abmeldelink von GoHighLevel |

### Der Trigger-Link steht zweimal drin

Einmal auf der Schaltfläche, einmal als Klartext-Adresse darunter — für alle, bei
denen die Schaltfläche nicht reagiert. **Beide ersetzen**, sonst führt einer ins Leere.

### Die Anrede verträgt einen leeren Namen

Im Formular ist der Name freiwillig, nur die E-Mail-Adresse ist Pflicht. Deshalb
steht in der Anrede **kein Komma**: „Hallo Anna" und „Hallo" lesen sich beide
richtig, „Hallo ," wäre sichtbar kaputt. Der nächste Satz beginnt deshalb groß.
Wenn du das Komma zurückhaben willst, hinterleg in GoHighLevel vorher einen
Standardwert für den Vornamen.

## In GoHighLevel einfügen

1. **Marketing → Emails → Templates → New → Blank**
2. Im Editor einen **Custom Code**-Block auf die leere Fläche ziehen
3. Den kompletten Inhalt der HTML-Datei hineinkopieren — von `<!doctype html>` bis `</html>`
4. Platzhalter ersetzen (siehe oben)
5. **Testmail an dich selbst**, und zwar an mindestens zwei Postfächer: eins bei
   Gmail, eins bei Outlook. Outlook rendert mit der Word-Engine und bricht
   erfahrungsgemäß als Erstes.

Der Editor von GoHighLevel baut das HTML beim Speichern teilweise um. Wenn danach
etwas verrutscht: nicht im Editor nachbessern, sondern hier in der Datei ändern und
neu einfügen. Sonst habt ihr zwei Fassungen, die auseinanderlaufen.

## Was beim Bauen beachtet wurde

- **Tabellen-Layout, Stile inline.** `<style>` im Kopf überlebt Gmail und Outlook nicht
  zuverlässig. Es gibt deshalb auch keine Media Queries: Die Breite steht auf
  `width:100%; max-width:600px`, das ist ohne Abfrage mobilfreundlich.
- **Keine Webfonts.** Die Website nutzt Newsreader und Inter; in Mails gibt es die
  nicht. Überschriften laufen auf Georgia, Fließtext auf Arial.
- **Keine Bilder.** Jede Aussage steht im Text. Mit blockierten Bildern — der
  Normalfall in Outlook — fehlt nichts.
- **Schaltflächen als Tabellenzelle** mit `bgcolor`, nicht als gestyltes `<a>`.
  Outlook ignoriert sonst den Hintergrund.
- **Geisttabelle für Outlook** (`<!--[if mso]>`), weil Word `max-width` nicht kennt.
- **Vorschautext** als verstecktes erstes Element, damit in der Postfach-Vorschau
  nicht „Agent Doc AI Bitte bestätigen" steht.
- **Dunkelmodus:** Hintergrundfarben stehen sowohl als `bgcolor`-Attribut als auch
  im Stil. Manche Clients invertieren trotzdem — die Farben sind so gewählt, dass
  der Text auch dann lesbar bleibt.

## Rechtliches

- **Die DOI-Mail hat bewusst keinen Abmeldelink.** Es besteht noch keine
  Einwilligung, von der man sich abmelden könnte. Stattdessen steht dort, dass man
  die Mail ignorieren kann — dann passiert nichts.
- **Die Eingangsbestätigung ist Transaktionspost.** Sie darf keine Werbung
  enthalten, sonst wird sie zur Werbemail und bräuchte eine vorherige Einwilligung
  (§ 7 Abs. 2 Nr. 2 UWG). Bitte nichts hinzufügen, was für etwas wirbt.
- **Die Report-Mail hat den Abmeldelink** und den Hinweis, dass eine Abmeldung nur
  die Hinweise betrifft, nicht die Antwort auf Anfragen.
- Absender und Links auf Impressum und Datenschutzerklärung stehen in allen dreien.
