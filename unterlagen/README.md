# Datenschutz-Unterlagen für Kunden

Der Satz Dokumente, den jeder Coach bei Vertragsschluss bekommt.

> **Alles hier sind Vorlagen, keine Rechtsberatung.** Vor dem ersten Einsatz anwaltlich
> prüfen lassen. Danach genügt es, sie pro Kunde auszufüllen.

**Warum das ein Verkaufsargument ist:** Kein Coach hat diese Dokumente. Die meisten wissen,
dass ihnen etwas fehlt, und schieben es vor sich her. Wer sie mitliefert, nimmt genau die
Arbeit ab, vor der sich der Kunde drückt — und begründet damit einen Teil des Preises,
ohne über Technik reden zu müssen.

---

## Die vier Dokumente

| Datei | Wofür | Wer unterschreibt |
|---|---|---|
| `auftragsverarbeitungsvertrag.md` | Pflichtvertrag nach Art. 28 DSGVO zwischen Coach und Agent Doc AI | beide |
| `verarbeitungsverzeichnis-auftragnehmer.md` | Marvins eigenes Verzeichnis — eigene Verantwortlichkeit *und* Auftragsverarbeitung | niemand, wird geführt |
| `verarbeitungsverzeichnis-coach-vorlage.md` | vorausgefüllte Vorlage für den Coach | niemand, führt der Coach |
| `loeschkonzept.md` | Fristen, Zuständigkeiten, Nachweis — Anlage zum Vertrag | niemand, ist Anlage |

---

## Reihenfolge

1. **Vor dem Verkaufsgespräch:** Das eigene Verzeichnis
   (`verarbeitungsverzeichnis-auftragnehmer.md`) ausfüllen. Es gilt für alle Kunden und
   ist nur einmal zu erstellen. Die offenen Punkte am Ende dieser Datei vorher klären.
2. **Bei Vertragsschluss:** Auftragsverarbeitungsvertrag ausfüllen, mit dem Kunden
   durchgehen, beidseitig unterschreiben. Das Löschkonzept ist Anlage und geht mit.
3. **Direkt danach:** Dem Kunden die Verzeichnis-Vorlage übergeben und ihm zeigen, welche
   Felder er ergänzen muss. Zehn Minuten im Gespräch ersparen später eine Rückfrage.
4. **Fortlaufend:** Bei jedem neuen Kunden die Auftraggeber-Tabelle in Teil B des eigenen
   Verzeichnisses ergänzen.

---

## Markierte Stellen

Alles, was auszufüllen ist, steht einheitlich als `[[Beschreibung]]` im Text. So findet
man sie:

```bash
grep -rn '\[\[' unterlagen/
```

Vor dem Versand an einen Kunden sollte dieser Aufruf **keine Treffer mehr** in den beiden
Dokumenten liefern, die er bekommt.

---

## Was Marvin ausfüllt

- Telefonnummer
- Exakte Firmierung und Anschrift von HighLevel — aus dem eigenen Vertrag, nicht aus dem Web
- Anbieter des KI-Sprachmodells: Firmierung, Anschrift, Ort der Verarbeitung,
  Übermittlungsgrundlage, und ob eine Vereinbarung über Nichtspeicherung besteht
- Sicherungsrhythmus, Aufbewahrungsdauer und Ort der Sicherungen
- Ob die Festplatte des Servers verschlüsselt ist
- Rotationsfrist des Serverprotokolls
- Protokollfristen bei Supabase und beim Anbieter des Sprachmodells
- Alle Löschfristen und die zugehörigen Mechanismen aus Abschnitt 1.1 des Löschkonzepts
- Datum der Prüfung des Data-Privacy-Framework-Eintrags, mit Ergebnis

## Was der Coach ausfüllt

- Eigene Stammdaten und zuständige Aufsichtsbehörde
- Ob besondere Datenkategorien nach Art. 9 DSGVO verarbeitet werden — **das ist die
  wichtigste Frage im ganzen Vertrag**, siehe unten
- Welche Datenkategorien er tatsächlich erhebt
- Eigener Shop- oder Zahlungsanbieter
- Eigene technische und organisatorische Maßnahmen
- Die Löschfristen, die von seinem Produkt abhängen
- Seine übrigen Verarbeitungstätigkeiten

---

## Die eine Frage, die man nicht überspringen darf

**Verarbeitet der Coach besondere Kategorien nach Art. 9 DSGVO?**

Sie steht in Ziffer 3.3 des Auftragsverarbeitungsvertrags und muss **bewusst** beantwortet
werden, nicht beiläufig abgehakt. Der Grund: Freitextfelder sammeln ein, was Menschen
hineinschreiben. Wer nach der beruflichen Situation fragt, bekommt Antworten über
Erschöpfung, Krankheit oder Lebenskrisen — das sind Gesundheitsdaten, und die brauchen eine
**ausdrückliche** Einwilligung nach Art. 9 Abs. 2 lit. a DSGVO, nicht nur eine gewöhnliche.

Zwei Wege, beide vertretbar:

- **Vermeiden:** Hinweis direkt am Eingabefeld, keine Gesundheitsangaben und keine Namen
  Dritter einzutragen. Senkt das Volumen erheblich und ist der einfachere Weg.
- **Abdecken:** Ausdrückliche Einwilligung einholen und das im Vertrag so festhalten.

Falsch ist nur, die Frage offen zu lassen und zu hoffen.

---

## Was ein Anwalt ansehen sollte

Nicht alles — das wäre teuer und unnötig. Diese Punkte lohnen eine Stunde:

1. **Der Drittland-Block.** Zwei Auftragsverarbeiter in Reihe, Singapur und USA, dazu der
   Anbieter des Sprachmodells. Das ist der einzige Teil mit echtem materiellem Risiko.
2. **Die Formulierung zu besonderen Kategorien** in Ziffer 3.3 — ob die Abgrenzung so
   trägt, insbesondere die Verteilung der Verantwortung zwischen Coach und Agent Doc AI.
3. **Ziffer 10.4 zu Sicherungskopien** — ob die beschriebene Handhabung dem Löschanspruch
   aus Art. 17 DSGVO genügt.
4. **Das Haftungskapitel** im Zusammenspiel mit dem Hauptvertrag.

Was keine anwaltliche Prüfung braucht: die Verzeichnisse. Sie sind
Dokumentation, kein Vertrag, und lassen sich jederzeit korrigieren.

---

## Nicht öffentlich

Dieser Ordner wird vom Webserver bewusst nicht ausgeliefert (`deploy/nginx.conf`). Es sind
Vertragsvorlagen mit internen Vermerken, keine Website-Inhalte.
