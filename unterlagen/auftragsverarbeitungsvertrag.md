# Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO

> **Vorlage — vor dem ersten Einsatz anwaltlich prüfen lassen.**
> Dieses Dokument ist sorgfältig erstellt, aber keine Rechtsberatung. Es ist auf den
> Regelfall zugeschnitten; Ihr Einzelfall kann Abweichungen erfordern. Alle mit
> `[[…]]` markierten Stellen sind vor der Unterzeichnung auszufüllen.

---

## Zwischen

**Verantwortlicher** (nachfolgend „Auftraggeber")

| | |
|---|---|
| Name / Firma | `[[Name des Coaches bzw. der Firma]]` |
| Rechtsform | `[[Rechtsform]]` |
| Anschrift | `[[Straße, Hausnummer]]`, `[[PLZ, Ort]]`, `[[Land]]` |
| Vertretungsberechtigt | `[[Name]]` |
| E-Mail für Datenschutzfragen | `[[E-Mail]]` |
| Datenschutzbeauftragte(r) | `[[Name und Kontakt — oder: nicht bestellt, da die Schwelle des § 38 BDSG nicht erreicht wird]]` |

**Auftragsverarbeiter** (nachfolgend „Auftragnehmer")

| | |
|---|---|
| Name | Marvin Voigt |
| Geschäftsbezeichnung | Agent Doc AI |
| Rechtsform | Einzelunternehmen |
| Anschrift | Wilhelmstraße 80a, 68623 Lampertheim, Deutschland |
| E-Mail für Datenschutzfragen | hallo@agentdocai.com |
| USt-IdNr. | DE327723046 |
| Datenschutzbeauftragte(r) | nicht bestellt; die Schwelle des § 38 Abs. 1 BDSG wird nicht erreicht |

---

## 1. Gegenstand, Dauer und Rangfolge

**1.1** Der Auftragnehmer erstellt für den Auftraggeber personalisierte Reports für dessen
Endkundinnen und Endkunden und liefert diese automatisiert aus („Report-Engine"). Dabei
verarbeitet er personenbezogene Daten im Auftrag des Auftraggebers.

**1.2** Dieser Vertrag konkretisiert die datenschutzrechtlichen Pflichten aus dem zugrunde
liegenden Dienstleistungsvertrag vom `[[Datum]]` (nachfolgend „Hauptvertrag"). Bei
Widersprüchen zwischen Hauptvertrag und diesem Vertrag geht dieser Vertrag vor, soweit
es um die Verarbeitung personenbezogener Daten geht.

**1.3** Die Laufzeit entspricht der Laufzeit des Hauptvertrags. Der Vertrag endet
automatisch mit dessen Beendigung. Unabhängig davon kann der Auftraggeber diesen Vertrag
jederzeit kündigen, wenn der Auftragnehmer gegen datenschutzrechtliche Pflichten verstößt.

**1.4** Der Auftraggeber ist für die Rechtmäßigkeit der Verarbeitung allein verantwortlich.
Er stellt insbesondere sicher, dass für die Erhebung der Daten bei seinen Endkundinnen und
Endkunden eine Rechtsgrundlage besteht, dass diese nach Art. 13 DSGVO informiert werden und
dass die Weitergabe an den Auftragnehmer in seiner Datenschutzerklärung benannt ist.

---

## 2. Art und Zweck der Verarbeitung

**2.1 Zweck.** Erstellung und Auslieferung personalisierter Reports im Namen und im
Erscheinungsbild des Auftraggebers.

**2.2 Art der Verarbeitung.** Erheben über eine vom Auftraggeber ausgelöste Schnittstelle,
Speichern, Strukturieren, Pseudonymisieren, Auswerten durch ein KI-Sprachmodell, Erzeugen
eines PDF-Dokuments, Übermitteln an die Endkundin bzw. den Endkunden, Löschen.

**2.3 Ablauf im Einzelnen.**

1. Der Shop oder das Formular des Auftraggebers übermittelt die Angaben der Endkundin
   bzw. des Endkunden an eine Schnittstelle des Auftragnehmers.
2. Vor der Übergabe an das Sprachmodell werden unmittelbar identifizierende Angaben durch
   Platzhalter ersetzt (**Pseudonymisierung**, siehe Ziffer 6.2). Das Sprachmodell erhält
   keinen Klarnamen und keine Kontaktdaten.
3. Das Sprachmodell erzeugt den Reporttext mit Platzhaltern.
4. Eine automatisierte Prüfung stellt sicher, dass nur bekannte Platzhalter enthalten sind.
5. Die Platzhalter werden durch die echten Angaben ersetzt, anschließend wird das PDF erzeugt.
6. Die Auslieferung erfolgt über einen zeitlich befristeten, signierten Abrufweg.
7. Die Zuordnungstabelle der Pseudonymisierung wird unmittelbar nach dem Erzeugen des
   PDF gelöscht.

**2.4 Keine automatisierte Entscheidungsfindung.** Der Report hat keine rechtliche Wirkung
gegenüber der betroffenen Person und entfaltet keine vergleichbar erhebliche
Beeinträchtigung. Eine automatisierte Entscheidung im Sinne des Art. 22 DSGVO findet nicht
statt.

---

## 3. Kategorien betroffener Personen und Daten

**3.1 Betroffene Personen**

- Endkundinnen und Endkunden des Auftraggebers, die einen Report bestellen oder anfordern
- `[[weitere Kategorien, falls zutreffend — z. B. Teilnehmende eines Programms]]`

**3.2 Kategorien personenbezogener Daten**

| Kategorie | Beispiele | Pflicht? |
|---|---|---|
| Identifikationsdaten | Vorname, Nachname | `[[ja/nein]]` |
| Kontaktdaten | E-Mail-Adresse | ja |
| Inhaltsangaben | Antworten auf Fragen des Auftraggebers, Freitexte zur eigenen Situation | ja |
| Bestelldaten | bestelltes Produkt, Zeitpunkt, Bestellnummer | ja |
| Erzeugte Daten | der personalisierte Report als PDF | ja |
| `[[Geburtsdatum, Geburtszeit, Geburtsort]]` | `[[nur ausfüllen, wenn die Methode des Auftraggebers diese Angaben benötigt]]` | `[[ja/nein]]` |

**3.3 Besondere Kategorien nach Art. 9 DSGVO.**

> ⚠️ **Hier ist eine bewusste Entscheidung des Auftraggebers nötig.**
>
> Freitextfelder können unbeabsichtigt Angaben zu Gesundheit, Weltanschauung oder
> Sexualleben enthalten — etwa wenn eine Endkundin ihre berufliche Situation mit einer
> Erschöpfungserkrankung begründet. Zutreffendes wählen:
>
> - ☐ **Besondere Kategorien sind nicht Gegenstand der Verarbeitung.** Der Auftraggeber
>   weist seine Endkundinnen und Endkunden am Eingabefeld darauf hin, keine Angaben zu
>   Gesundheit, Weltanschauung, politischer Meinung, Gewerkschaftszugehörigkeit, ethnischer
>   Herkunft oder Sexualleben zu machen.
> - ☐ **Besondere Kategorien können Gegenstand der Verarbeitung sein.** Der Auftraggeber
>   verfügt über eine Rechtsgrundlage nach Art. 9 Abs. 2 DSGVO, in der Regel eine
>   ausdrückliche Einwilligung nach Art. 9 Abs. 2 lit. a DSGVO, und weist diese auf
>   Verlangen nach. Betroffen sind: `[[Kategorien benennen]]`.

**3.4 Angaben über Dritte.** Nennt eine Endkundin im Freitext weitere Personen (etwa
Vorgesetzte oder Angehörige), entstehen Daten von Personen, die davon nichts wissen.
Der Auftraggeber weist am Eingabefeld darauf hin, keine Namen Dritter einzutragen.

---

## 4. Weisungsrecht

**4.1** Der Auftragnehmer verarbeitet die Daten ausschließlich auf dokumentierte Weisung
des Auftraggebers. Dieser Vertrag und der Hauptvertrag sind die ursprüngliche Weisung.

**4.2** Einzelweisungen erfolgen in Textform an hallo@agentdocai.com. Mündliche Weisungen
bestätigt der Auftraggeber unverzüglich in Textform.

**4.3** Hält der Auftragnehmer eine Weisung für rechtswidrig, teilt er dies dem
Auftraggeber unverzüglich mit und darf die Ausführung bis zur Klärung aussetzen
(Art. 28 Abs. 3 Satz 3 DSGVO).

**4.4** Eine Übermittlung in ein Drittland erfolgt nur auf Weisung des Auftraggebers,
auf Grundlage dieses Vertrags oder wenn der Auftragnehmer hierzu rechtlich verpflichtet
ist; im letzten Fall informiert er den Auftraggeber vorab, soweit das Recht dies zulässt.

---

## 5. Vertraulichkeit

**5.1** Der Auftragnehmer verarbeitet die Daten streng vertraulich.

**5.2** Da der Auftragnehmer ein Einzelunternehmen ohne Beschäftigte ist, erfolgt die
Verarbeitung ausschließlich durch ihn selbst. Er ist auf das Datengeheimnis verpflichtet;
diese Verpflichtung besteht auch nach Beendigung des Vertrags fort.

**5.3** Setzt der Auftragnehmer künftig Beschäftigte oder freie Mitarbeitende ein,
verpflichtet er diese vor Aufnahme der Tätigkeit schriftlich zur Vertraulichkeit und
unterweist sie über die einschlägigen Datenschutzvorschriften.

---

## 6. Technische und organisatorische Maßnahmen (Art. 32 DSGVO)

**6.1 Verschlüsselung.** Sämtliche Übertragungen erfolgen ausschließlich über TLS.
Die Website erzwingt HTTPS und setzt HSTS. Zugangsdaten werden in einem Schlüsseltresor
abgelegt, aus dem sie nicht im Klartext zurückgelesen werden können.

**6.2 Pseudonymisierung vor dem Sprachmodell.** Unmittelbar identifizierende Angaben werden
vor der Übergabe an das Sprachmodell durch Platzhalter ersetzt. Die Zuordnungstabelle wird
getrennt gehalten und unmittelbar nach dem Erzeugen des PDF gelöscht.

> **Reichweite ehrlich benannt:** Die Pseudonymisierung schützt gegenüber dem Anbieter des
> Sprachmodells. Sie macht die Daten **nicht anonym**: Der Freitext bleibt eine Aussage über
> eine bestimmbare Person, und solange die Zuordnungstabelle besteht, ist die Zuordnung
> möglich. Dieser Vertrag behandelt die Daten deshalb durchgehend als personenbezogen.

**6.3 Zugangs- und Zugriffskontrolle.** Der Zugang zu den eingesetzten Systemen erfolgt über
persönliche Konten mit Zwei-Faktor-Authentisierung, soweit der jeweilige Anbieter sie
anbietet. Die Firewall des eingesetzten Servers gibt ausschließlich die Ports für
Fernwartung, HTTP und HTTPS frei.

**6.4 Datenminimierung im Protokoll.** Der Webserver protokolliert weder IP-Adressen noch
Browserkennungen oder Herkunftsseiten. Der vorgeschaltete Reverse-Proxy führt kein
Zugriffsprotokoll.

**6.5 Trennung.** Die Daten verschiedener Auftraggeber werden logisch getrennt gehalten.
Jeder Auftraggeber erhält einen eigenen Mandantenbereich, einen eigenen Ablagebereich für
erzeugte Dokumente und ein eigenes Zugangsgeheimnis für die Schnittstelle. Jede Prüfung
eines Zugangsgeheimnisses ist so ausgelegt, dass sie bei fehlendem oder ungültigem Geheimnis
den Vorgang abbricht.

**6.6 Verfügbarkeit und Wiederherstellbarkeit.** `[[Sicherungsrhythmus, Aufbewahrungsdauer
der Sicherungen und Ort der Sicherungen eintragen — noch festzulegen]]`

**6.7 Belastbarkeit und Überprüfung.** Der Betrieb wird fortlaufend überwacht. Die
Wirksamkeit der Maßnahmen wird mindestens jährlich überprüft und das Ergebnis dokumentiert.

**6.8 Löschung.** Die Löschung richtet sich nach dem beigefügten Löschkonzept
(`loeschkonzept.md`), das Bestandteil dieses Vertrags ist.

**6.9 Anpassung.** Der Auftragnehmer darf die Maßnahmen weiterentwickeln, solange das
Schutzniveau nicht unterschritten wird. Wesentliche Änderungen dokumentiert er und teilt
sie dem Auftraggeber mit.

---

## 7. Unterauftragsverarbeiter

**7.1 Allgemeine Genehmigung.** Der Auftraggeber erteilt die allgemeine Genehmigung zum
Einsatz der in Ziffer 7.3 genannten Unterauftragsverarbeiter.

**7.2 Pflichten.** Der Auftragnehmer verpflichtet jeden Unterauftragsverarbeiter
vertraglich auf ein Schutzniveau, das diesem Vertrag im Wesentlichen entspricht. Er bleibt
dem Auftraggeber gegenüber für deren Verhalten verantwortlich.

**7.3 Eingesetzte Unterauftragsverarbeiter**

| Anbieter | Sitz | Leistung | Ort der Verarbeitung | Grundlage der Übermittlung |
|---|---|---|---|---|
| Hostinger International Ltd., 61 Lordou Vironos str., 6023 Larnaca, Zypern | Zypern (EU) | Server und Infrastruktur | Rechenzentrum Frankfurt am Main, Deutschland | keine Drittlandübermittlung |
| Supabase Pte. Ltd., Singapur | Singapur | Schnittstelle zur Datenannahme, Datenbank | Region Irland (durch Weisung festgelegt); Zugriff aus den USA für Support möglich | EU-Standardvertragsklauseln, Durchführungsbeschluss (EU) 2021/914, Modul 2 |
| `[[HighLevel — exakte Firmierung und Anschrift aus dem eigenen Vertrag übernehmen]]` | USA | Kundenverwaltung und E-Mail-Versand | USA | Angemessenheitsbeschluss EU-US Data Privacy Framework, Durchführungsbeschluss (EU) 2023/1795 — **Zertifizierung vor Vertragsschluss auf dataprivacyframework.gov prüfen (Status „Active", Kategorie Non-HR)** |
| `[[Anbieter des KI-Sprachmodells — Firmierung, Anschrift, Ort der Verarbeitung und Übermittlungsgrundlage eintragen]]` | `[[…]]` | Erzeugung des Reporttextes | `[[…]]` | `[[…]]` |

**Nicht als Unterauftragsverarbeiter eingesetzt:** Die Erzeugung der PDF-Dokumente erfolgt
auf eigener Infrastruktur des Auftragnehmers (siehe Zeile Hostinger). Ein gesonderter
Anbieter ist hierfür nicht beteiligt.

> **Noch zu beschaffen:** Die Zeilen mit `[[…]]` sind vor der ersten Unterzeichnung zu
> füllen. Für den Anbieter des Sprachmodells ist zusätzlich zu klären, ob eine Vereinbarung
> über die Nichtspeicherung der übermittelten Inhalte („Zero Retention") besteht; falls ja,
> ist sie hier zu erwähnen.

**7.4 Änderungen.** Der Auftragnehmer informiert den Auftraggeber mindestens **vier Wochen**
vorab in Textform über den beabsichtigten Wechsel oder die Hinzunahme eines
Unterauftragsverarbeiters. Der Auftraggeber kann innerhalb von **zwei Wochen** ab Zugang aus
wichtigem datenschutzrechtlichem Grund widersprechen. Widerspricht er, kann jede Partei den
Hauptvertrag mit Wirkung zum geplanten Wechseltermin kündigen.

**7.5 Keine Unterauftragsverarbeitung** sind Nebenleistungen, die der Auftragnehmer als
Fremdleistung in Anspruch nimmt, ohne dass ein Zugriff auf die Daten des Auftraggebers
vorgesehen ist, etwa Telekommunikationsdienste oder Reinigungsdienste.

---

## 8. Unterstützung des Auftraggebers

**8.1 Betroffenenrechte.** Wendet sich eine betroffene Person unmittelbar an den
Auftragnehmer, leitet er die Anfrage unverzüglich an den Auftraggeber weiter und beantwortet
sie nicht selbst. Er unterstützt den Auftraggeber bei Auskunft, Berichtigung, Löschung,
Einschränkung, Datenübertragbarkeit und Widerspruch mit geeigneten technischen und
organisatorischen Maßnahmen, soweit ihm das möglich ist.

**8.2 Reaktionszeit.** Der Auftragnehmer antwortet auf Anfragen des Auftraggebers nach
Ziffer 8.1 innerhalb von **fünf Werktagen**, damit der Auftraggeber die Monatsfrist des
Art. 12 Abs. 3 DSGVO einhalten kann.

**8.3 Meldung von Verletzungen.** Wird dem Auftragnehmer eine Verletzung des Schutzes
personenbezogener Daten bekannt, meldet er dies dem Auftraggeber **unverzüglich, spätestens
innerhalb von 24 Stunden** nach Kenntnis, in Textform an die in der Kopfzeile genannte
Adresse. Die Meldung enthält, soweit bekannt: Art der Verletzung, betroffene Kategorien und
ungefähre Zahl der betroffenen Personen und Datensätze, wahrscheinliche Folgen sowie
ergriffene und vorgeschlagene Maßnahmen.

**8.4 Weitere Unterstützung.** Der Auftragnehmer unterstützt den Auftraggeber bei
Datenschutz-Folgenabschätzungen nach Art. 35 DSGVO und vorherigen Konsultationen nach
Art. 36 DSGVO, soweit die dafür nötigen Angaben nur ihm vorliegen.

---

## 9. Nachweise und Prüfungen

**9.1** Der Auftragnehmer weist die Einhaltung dieses Vertrags auf Anfrage in geeigneter
Weise nach, insbesondere durch Vorlage dieses Vertrags, des Löschkonzepts, des Verzeichnisses
von Verarbeitungstätigkeiten und der Dokumentation der technischen und organisatorischen
Maßnahmen.

**9.2** Der Auftraggeber ist berechtigt, sich von der Einhaltung zu überzeugen. Prüfungen
sind mit angemessener Vorankündigung von mindestens **zwei Wochen**, während der üblichen
Geschäftszeiten und ohne Störung des Betriebsablaufs durchzuführen, höchstens einmal
jährlich und zusätzlich bei konkretem Anlass.

**9.3** Der Auftragnehmer kann den Nachweis auch durch ein aktuelles Testat einer
unabhängigen Stelle führen, soweit es den Prüfgegenstand abdeckt.

---

## 10. Löschung und Rückgabe

**10.1** Nach Beendigung des Hauptvertrags löscht der Auftragnehmer sämtliche Daten des
Auftraggebers oder gibt sie zurück — **nach Wahl des Auftraggebers**. Die Wahl ist spätestens
bei Vertragsende in Textform mitzuteilen; trifft der Auftraggeber keine Wahl, wird gelöscht.

**10.2** Die Löschung oder Rückgabe erfolgt innerhalb von **30 Tagen** nach Vertragsende.
Der Auftragnehmer bestätigt den Vollzug in Textform.

**10.3** Ausgenommen sind Daten, deren Aufbewahrung gesetzlich vorgeschrieben ist. Diese
werden für die Dauer der Aufbewahrungspflicht gesperrt und danach gelöscht.

**10.4** Sicherungskopien werden im Rahmen des üblichen Sicherungsrhythmus überschrieben;
eine gezielte Einzellöschung aus Sicherungen erfolgt nicht. Spätestens nach
`[[Aufbewahrungsdauer der Sicherungen eintragen]]` sind die Daten auch dort entfernt.

---

## 11. Haftung

Es gilt Art. 82 DSGVO. Im Übrigen gelten die Haftungsregelungen des Hauptvertrags, soweit
sie nicht gegen zwingendes Recht verstoßen.

---

## 12. Schlussbestimmungen

**12.1** Änderungen und Ergänzungen bedürfen der Textform. Das gilt auch für die Aufhebung
dieses Formerfordernisses.

**12.2** Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen
Bestimmungen unberührt.

**12.3** Es gilt deutsches Recht. Gerichtsstand ist, soweit zulässig, `[[Ort]]`.

**12.4** Bestandteil dieses Vertrags sind:
- `loeschkonzept.md` — Löschkonzept
- `verarbeitungsverzeichnis-auftragnehmer.md` — Verzeichnis des Auftragnehmers nach Art. 30 Abs. 2 DSGVO

---

## Unterschriften

| Auftraggeber | Auftragnehmer |
|---|---|
| | |
| Ort, Datum: `[[…]]` | Ort, Datum: `[[…]]` |
| | |
| ................................... | ................................... |
| `[[Name]]` | Marvin Voigt |
| `[[Firma]]` | Agent Doc AI |

---

*Fassung `[[Versionsnummer]]`, Stand `[[Datum]]`.*
