# Löschkonzept

> **Vorlage — vor dem ersten Einsatz anwaltlich prüfen lassen.**
> Sorgfältig erstellt, aber keine Rechtsberatung.

**Stand:** `[[Datum]]` · **Fassung:** `[[Versionsnummer]]`

Dieses Konzept ist Bestandteil des Auftragsverarbeitungsvertrags zwischen
`[[Name des Coaches]]` und Marvin Voigt (Agent Doc AI).

---

## Warum es dieses Dokument gibt

Art. 5 Abs. 1 lit. e DSGVO verlangt, personenbezogene Daten nur so lange zu speichern,
wie es für den Zweck erforderlich ist. Art. 17 DSGVO gibt betroffenen Personen einen
Anspruch auf Löschung. Beides lässt sich nur einhalten, wenn vorher feststeht, **welche
Daten wo liegen, wie lange sie bleiben und wer sie entfernt**.

**Der häufigste Fehler ist nicht eine zu lange Frist, sondern eine zugesagte Frist ohne
Mechanismus.** Eine Zusage, an die sich jemand erinnern muss, wird gebrochen. Deshalb nennt
die Tabelle unten für jede Frist ausdrücklich, *womit* gelöscht wird — und markiert, wo
dieser Mechanismus noch fehlt.

---

## 1. Fristen im Überblick

### 1.1 Report-Engine — Daten der Endkundinnen und Endkunden

| Datenart | Wo | Frist | Beginn der Frist | Wie gelöscht wird |
|---|---|---|---|---|
| Zuordnungstabelle der Pseudonymisierung | Arbeitsspeicher der Verarbeitungsfunktion | **sofort** | Erzeugen des PDF | automatisch im Programmablauf |
| Rohdaten der Anfrage (Formular- oder Quiz-Antworten, Freitexte) | Datenbank des Auftragnehmers | `[[90 Tage empfohlen — Frist festlegen]]` | Auslieferung des Reports | `[[Mechanismus festlegen — automatisierter Lauf oder Datenbankregel]]` |
| Erzeugter Report (PDF) | Ablagebereich des Auftraggebers | `[[Frist festlegen]]` | Auslieferung | `[[Mechanismus festlegen]]` |
| Abrufadresse des Reports | Kundenverwaltung | mit Ablauf der Signatur | Erzeugen der Adresse | automatisch, die Adresse verfällt |
| Geburtsdaten für die Chart-Berechnung | Datenbank des Auftragnehmers | `[[Frist festlegen — Empfehlung: mit den Rohdaten]]` | Auslieferung | `[[Mechanismus festlegen]]` |
| Protokolle des Sprachmodell-Aufrufs | beim Anbieter des Sprachmodells | `[[Frist des Anbieters erfragen]]` | Aufruf | Anbieter; eine Vereinbarung über Nichtspeicherung ist anzustreben |
| Bestell- und Rechnungsdaten | `[[Shop bzw. Buchhaltung des Auftraggebers]]` | sechs bzw. zehn Jahre | Ende des Kalenderjahres | gesetzliche Aufbewahrung, § 257 HGB, § 147 AO |

> ⚠️ **Offen:** Die Zeilen mit `[[…]]` sind zu entscheiden, **bevor** der erste echte Report
> ausgeliefert wird. Ohne festgelegten Mechanismus ist jede Frist nur eine Absichtserklärung.

### 1.2 Website und Vertrieb — eigene Verantwortlichkeit von Agent Doc AI

| Datenart | Wo | Frist | Wie gelöscht wird |
|---|---|---|---|
| Serverprotokoll der Website | Webserver | `[[Rotationsfrist festlegen — derzeit ist keine Begrenzung gesetzt]]` | `[[Protokollrotation einrichten]]` |
| IP-Adresse zur Missbrauchsabwehr | Arbeitsspeicher der Verarbeitungsfunktion | 10 Minuten | automatisch im Programmablauf |
| Protokoll des Funktionsaufrufs | beim Anbieter der Verarbeitungsfunktion | `[[Frist des Anbieters erfragen]]` | Anbieter |
| Anfragedaten aus dem Kontaktformular | Kundenverwaltung | spätestens **12 Monate** nach dem letzten Kontakt | `[[in der Kundenverwaltung einrichten]]` |
| Arbeitskopien für den Demo-Report | Gerät des Auftragnehmers | mit dem Versand des Reports | manuell, unmittelbar nach Versand |
| Kontaktdaten mit Werbeeinwilligung | Kundenverwaltung | bis zum Widerruf | auf Widerruf, unverzüglich |
| Nachweis der Einwilligung | Kundenverwaltung | **3 Jahre** nach Ablauf des Jahres der letzten Nutzung | `[[in der Kundenverwaltung einrichten]]` |
| Sperrliste widerrufener Adressen | Kundenverwaltung | dauerhaft, solange die Sperre gilt | — (die Sperre *ist* der Zweck) |
| Vertrags- und Rechnungsdaten | Buchhaltung | sechs bzw. zehn Jahre | gesetzliche Aufbewahrung |

---

## 2. Wer löscht was

| Vorgang | Zuständig |
|---|---|
| Automatische Löschung nach Frist | Auftragnehmer (technisch eingerichtet) |
| Löschung auf Verlangen einer betroffenen Person | Auftraggeber entscheidet, Auftragnehmer führt aus |
| Löschung nach Widerruf einer Einwilligung | jeweils die Stelle, die die Einwilligung eingeholt hat |
| Löschung bei Vertragsende | Auftragnehmer, nach Wahl des Auftraggebers Löschung oder Rückgabe |

**Wichtig bei Löschverlangen:** Wendet sich eine betroffene Person an den Auftragnehmer,
löscht dieser **nicht eigenmächtig**. Er leitet das Verlangen an den Auftraggeber weiter;
dieser entscheidet, ob ein Löschanspruch besteht oder ob Aufbewahrungspflichten entgegenstehen.

---

## 3. Ausnahmen von der Löschung

Nicht gelöscht wird, solange

- eine gesetzliche Aufbewahrungspflicht besteht (§ 257 HGB, § 147 AO),
- die Daten zur Geltendmachung oder Abwehr von Rechtsansprüchen gebraucht werden
  (Art. 17 Abs. 3 lit. e DSGVO),
- oder der Nachweis einer Einwilligung zu führen ist (Art. 7 Abs. 1 DSGVO).

In diesen Fällen werden die Daten **gesperrt statt gelöscht**: Sie werden für den
ursprünglichen Zweck nicht mehr verwendet und nur noch für den Aufbewahrungsgrund
vorgehalten. Nach Wegfall des Grundes werden sie gelöscht.

**Der praktisch wichtigste Fall** ist der Nachweis einer Werbeeinwilligung: Er dauert
**über den Widerruf hinaus** fort. Sonst stünde der Widerrufende besser da als jemand,
der nie eingewilligt hat — denn mit dem Widerruf verschwände auch der Beleg dafür, dass
die vorherige Verarbeitung rechtmäßig war. Auf diese Fortdauer wird bereits bei der
Erhebung hingewiesen.

---

## 4. Sicherungskopien

Daten in Sicherungskopien werden **nicht gezielt einzeln gelöscht**. Das ist technisch
regelmäßig nicht möglich und nach allgemeiner Auffassung auch nicht gefordert. Stattdessen:

- Die Sicherungen werden nach `[[Aufbewahrungsdauer eintragen]]` überschrieben.
- Wird ein Datensatz aus einer Sicherung wiederhergestellt, wird die zuvor erfolgte
  Löschung **unverzüglich erneut vollzogen**.
- Gelöschte Datensätze werden bis zum Überschreiben der letzten Sicherung für die
  Wiederherstellung gesperrt.

---

## 5. Nachweis des Vollzugs

| Was | Wie dokumentiert |
|---|---|
| Automatische Löschläufe | `[[Protokollierung einrichten — Zeitpunkt, Anzahl, Datenart]]` |
| Löschung auf Verlangen | Vermerk am Vorgang: Datum, Umfang, ausführende Person |
| Löschung bei Vertragsende | schriftliche Bestätigung an den Auftraggeber innerhalb von 30 Tagen |
| Jährliche Überprüfung | `[[Termin festlegen]]` — wird geprüft, ob die Fristen eingehalten werden |

Die Nachweise selbst enthalten **keine** Inhaltsdaten, sondern nur Zeitpunkt, Umfang und
Datenart. Sie werden drei Jahre aufbewahrt.

---

## 6. Was vor dem ersten echten Report zu tun ist

Eine ehrliche Liste des Fehlenden:

1. **Fristen festlegen** für Rohdaten, erzeugte Reports und Geburtsdaten — die
   `[[…]]`-Felder in Abschnitt 1.1
2. **Mechanismen einrichten**, die diese Fristen durchsetzen. Ohne sie ist das Konzept
   eine Absichtserklärung.
3. **Protokollrotation** auf dem Webserver einrichten — derzeit wächst das Protokoll
   unbegrenzt
4. **Fristen der Dienstleister erfragen**: Wie lange protokolliert der Anbieter der
   Verarbeitungsfunktion? Wie lange der Anbieter des Sprachmodells?
5. **Vereinbarung über Nichtspeicherung** beim Anbieter des Sprachmodells anstreben
6. **Löschläufe in der Kundenverwaltung einrichten** für die Zwölf-Monats- und die
   Drei-Jahres-Frist
