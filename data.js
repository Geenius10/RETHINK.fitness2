export const exercises=[
{id:'reverse-knee',name:'Reverse Lunge + Knee Drive',cat:'Glutes · Full Body',level:3,cue:'Großer Schritt zurück, vorderer Fuß voll belasten. Hochdrücken und hinteres Knie kontrolliert nach vorn führen.'},
{id:'bulgarian',name:'Bulgarian Split Squat',cat:'Glutes · Legs',level:4,cue:'Vorderen Fuß stabil, Oberkörper leicht vor, kontrolliert tief und über die ganze Fußsohle hochdrücken.'},
{id:'body-row',name:'Inverted Row',cat:'Pull',level:3,cue:'Körper als Linie halten, Brust zur Stange/Ringen ziehen und Schulterblätter aktiv zusammenführen.'},
{id:'stepup',name:'Step-up',cat:'Glutes · Legs',level:3,cue:'Arbeitsfuß vollständig aufsetzen. Ohne Absprung des hinteren Beins über die Ferse hochdrücken.'},
{id:'pushup',name:'Push-up',cat:'Push',level:3,cue:'Körper gespannt halten, Brust kontrolliert absenken und Boden aktiv wegdrücken.'},
{id:'single-glute',name:'Single Leg Glute Bridge',cat:'Glutes',level:3,cue:'Becken über die arbeitende Ferse anheben, Rippen unten halten und oben Gesäß fest anspannen.'},
{id:'dead-bug',name:'Dead Bug',cat:'Core Stability',level:2,cue:'Lendenwirbelsäule stabil halten. Gegengleichen Arm und Bein langsam strecken, ohne dass der Rücken abhebt.'},
{id:'sl-rdl-knee',name:'Single Leg RDL + Knee Drive',cat:'Glutes · Full Body',level:4,cue:'Hüfte nach hinten schieben, Standbein stabil halten. Aus der Hüfte aufrichten und freies Knie nach vorn führen.'},
{id:'hip-thrust',name:'Hip Thrust',cat:'Glutes',level:4,cue:'Über die Fersen drücken, Becken vollständig strecken und oben kurz maximal im Gesäß anspannen.'},
{id:'band-pullup',name:'Assisted Pull-up',cat:'Pull',level:4,cue:'Aus aktivem Hang Brust zur Stange ziehen. Unterstützung nur so stark wählen, dass jede Wiederholung sauber bleibt.'},
{id:'reverse-lunge',name:'Reverse Lunge',cat:'Glutes · Legs',level:3,cue:'Kontrolliert zurücksteigen, vorderes Bein belastet lassen und über die vordere Ferse zurückdrücken.'},
{id:'pike-pushup',name:'Pike Push-up',cat:'Push',level:4,cue:'Hüfte hoch, Kopf kontrolliert zwischen den Händen absenken und kräftig wegdrücken.'},
{id:'frog-pump',name:'Frog Pump',cat:'Glutes',level:2,cue:'Fußsohlen zusammen, Knie außen. Becken zügig anheben und jede Wiederholung oben im Gesäß beenden.'},
{id:'side-plank',name:'Side Plank',cat:'Core Stability',level:3,cue:'Schulter, Becken und Füße in einer Linie. Becken aktiv hochhalten und nicht nach vorn drehen.'},
{id:'step-knee',name:'Step-up + Knee Drive',cat:'Glutes · Full Body',level:3,cue:'Über das Standbein aufsteigen und das freie Knie kontrolliert nach oben führen. Nicht vom Boden abspringen.'},
{id:'single-hip-thrust',name:'Single Leg Hip Thrust',cat:'Glutes',level:4,cue:'Ein Bein frei, Becken über die belastete Ferse strecken. Becken bleibt gerade.'},
{id:'bridge-walkout',name:'Glute Bridge Walkout',cat:'Glutes · Hamstrings',level:4,cue:'Becken oben halten und die Fersen schrittweise vom Körper weg und wieder zurück bewegen.'},
{id:'bear-shoulder-tap',name:'Bear Plank Shoulder Tap',cat:'Core Stability',level:3,cue:'Knie knapp über dem Boden. Abwechselnd Schulter berühren, ohne Becken oder Rumpf zu verdrehen.'}
];
const A=(starter='3×10/Seite')=>({name:'Squat + Stability',items:[['reverse-knee',starter],['bulgarian','3×8–12/Seite'],['body-row','3×8–12'],['stepup','3×10–12/Seite'],['pushup','3×8–15'],['single-glute','3×12–15/Seite'],['dead-bug','3×10/Seite']]});
const B=(starter='3×8–10/Seite')=>({name:'Hinge + Stability',items:[['sl-rdl-knee',starter],['hip-thrust','3×10–15'],['band-pullup','3×6–10'],['reverse-lunge','3×10–12/Seite'],['pike-pushup','3×6–12'],['frog-pump','3×15–25'],['side-plank','3×30–45 s/Seite']]});
const C=(starter='3×10/Seite')=>({name:'Mixed Glute',items:[['step-knee',starter],['single-hip-thrust','3×8–12/Seite'],['body-row','3×8–12'],['bulgarian','3×8–12/Seite'],['pushup','3×8–15'],['bridge-walkout','3×8–12'],['bear-shoulder-tap','3×10/Seite']]});
export const program={name:'Glutes & Core',subtitle:'13 Wochen · 3× pro Woche · ca. 30–45 Min.',weeks:[
{week:1,title:'Einstieg',focus:'Technik, Bewegungsqualität und passendes Ausgangsniveau · ca. 30–35 Min.',days:[A('2×10/Seite'),B('2×8/Seite'),C('2×10/Seite')]},
{week:2,title:'Einstieg +',focus:'Volumen kontrolliert erhöhen und saubere Wiederholungen festigen · ca. 30–35 Min.',days:[A(),B(),C()]},
{week:3,title:'Aufbau I',focus:'Wiederholungen innerhalb der Bereiche steigern · ca. 35–40 Min.',days:[A(),B(),C()]},
{week:4,title:'Aufbau I',focus:'Obere Wiederholungsgrenzen anpeilen, ohne Technikverlust · ca. 35–40 Min.',days:[A(),B(),C()]},
{week:5,title:'Aufbau I+',focus:'Glute-Hauptübungen priorisieren und Leistung stabilisieren · ca. 35–40 Min.',days:[A(),B(),C()]},
{week:6,title:'Aufbau II',focus:'Schwierigere Ausführung oder Zusatzlast, wenn die Bewertung es erlaubt · ca. 35–45 Min.',days:[A(),B(),C()]},
{week:7,title:'Aufbau II',focus:'Mehr Qualitätsarbeit für die Glutes, ohne notwendige Pausen zu kürzen · ca. 35–45 Min.',days:[{...A(),items:A().items.map((x,i)=>i===1?[x[0],'4×8–12/Seite']:x)},{...B(),items:B().items.map((x,i)=>i===1?[x[0],'4×10–15']:x)},{...C(),items:C().items.map((x,i)=>i===1?[x[0],'4×8–12/Seite']:x)}]},
{week:8,title:'Aufbau II+',focus:'Erreichtes Niveau festigen und Wiederholungsqualität halten · ca. 35–45 Min.',days:[A(),B(),C()]},
{week:9,title:'Intensivierung',focus:'Glute-Hauptübungen mit höherem Arbeitsumfang, Oberkörper kompakt halten · ca. 40–45 Min.',days:[{...A(),items:A().items.map((x,i)=>i===1||i===5?[x[0],i===1?'4×8–12/Seite':'4×12–15/Seite']:x)},{...B(),items:B().items.map((x,i)=>i===1||i===5?[x[0],i===1?'4×10–15':'4×15–25']:x)},{...C(),items:C().items.map((x,i)=>i===1||i===5?[x[0],i===1?'4×8–12/Seite':'4×8–12']:x)}]},
{week:10,title:'Intensivierung',focus:'Hohe Glute-Arbeitsqualität bei stabiler Core- und Ganzkörperarbeit · ca. 40–45 Min.',days:[{...A(),items:A().items.map((x,i)=>i===1||i===3?[x[0],i===1?'4×8–12/Seite':'4×10–12/Seite']:x)},{...B(),items:B().items.map((x,i)=>i===1||i===3?[x[0],i===1?'4×10–15':'4×10–12/Seite']:x)},{...C(),items:C().items.map((x,i)=>i===1||i===3?[x[0],'4×8–12/Seite']:x)}]},
{week:11,title:'Intensivierung +',focus:'Leistungsniveau bestätigen; Progression nur bei sauberer Bewertung · ca. 40–45 Min.',days:[{...A(),items:A().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===1?'4×8–12/Seite':i===3?'4×10–12/Seite':'4×12–15/Seite']:x)},{...B(),items:B().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===1?'4×10–15':i===3?'4×10–12/Seite':'4×15–25']:x)},{...C(),items:C().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===5?'4×8–12':'4×8–12/Seite']:x)}]},
{week:12,title:'Peak',focus:'Höchste saubere Belastung des Programms innerhalb von 45 Minuten.',days:[{...A(),items:A().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===1?'4×8–12/Seite':i===3?'4×10–12/Seite':'4×12–15/Seite']:x)},{...B(),items:B().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===1?'4×10–15':i===3?'4×10–12/Seite':'4×15–25']:x)},{...C(),items:C().items.map((x,i)=>[1,3,5].includes(i)?[x[0],i===5?'4×8–12':'4×8–12/Seite']:x)}]},
{week:13,title:'Abschluss',focus:'Kernübungen wiederholen, Fortschritt bestätigen und das Programm sauber abschließen · ca. 35–40 Min.',days:[A(),B(),C()]}
]};
