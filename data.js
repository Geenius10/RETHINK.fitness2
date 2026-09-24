export const exercises=[
{id:'split-squat-drive',name:'Split Squat + Knee Drive',cat:'Glutes · Full Body',cue:'Aus dem Ausfallschritt über den vorderen Fuß hochdrücken und das hintere Knie kontrolliert nach vorn führen. Oberkörper stabil halten.'},
{id:'bulgarian',name:'Bulgarian Split Squat',cat:'Glutes · Legs',cue:'Hinteren Fuß auf Sofa oder Stuhl ablegen. Vorderen Fuß voll belasten, kontrolliert tief gehen und über die ganze Fußsohle hochdrücken.'},
{id:'pushup',name:'Push-up',cat:'Push · Full Body',cue:'Körper als feste Linie halten. Brust kontrolliert absenken und den Boden aktiv wegdrücken. Bei Bedarf Hände erhöht auf Sofa oder Tisch.'},
{id:'hip-thrust',name:'Hip Thrust',cat:'Glutes',cue:'Schulterblätter an Sofa oder Bettkante, Füße stabil. Becken über die Fersen strecken und oben das Gesäß kräftig anspannen.'},
{id:'dead-bug',name:'Dead Bug',cat:'Core Stability',cue:'Rücken stabil am Boden halten. Gegengleichen Arm und Bein langsam strecken, ohne dass sich der untere Rücken löst.'},
{id:'stepup-drive',name:'Step-up + Knee Drive',cat:'Glutes · Full Body',cue:'Auf eine stabile Stufe steigen, vollständig über das Arbeitsbein hochdrücken und das freie Knie nach vorn führen. Nicht vom Boden abspringen.'},
{id:'sl-rdl',name:'Single Leg RDL',cat:'Glutes · Hamstrings',cue:'Standbein leicht beugen, Hüfte weit nach hinten schieben und den Oberkörper mit langem Rücken nach vorn führen. Über die Hüfte wieder aufrichten.'},
{id:'band-row',name:'Resistance Band Row',cat:'Pull · Upper Body',cue:'Band sicher vor dir fixieren. Ellbogen nach hinten ziehen, Brustbein anheben und Schulterblätter zusammenführen. Langsam zurückführen.'},
{id:'single-bridge',name:'Single Leg Glute Bridge',cat:'Glutes',cue:'Eine Ferse nah zum Gesäß stellen. Becken einbeinig anheben, gerade halten und oben kurz maximal anspannen.'},
{id:'side-plank',name:'Side Plank',cat:'Core Stability',cue:'Schulter, Becken und Füße in einer Linie halten. Becken aktiv vom Boden wegdrücken und nicht nach vorn drehen.'},
{id:'reverse-lunge-drive',name:'Reverse Lunge + Knee Drive',cat:'Glutes · Full Body',cue:'Großen Schritt zurücksetzen, vorderen Fuß belastet lassen. Über das vordere Bein hochdrücken und das hintere Knie nach vorn führen.'},
{id:'sumo-squat',name:'Sumo Squat',cat:'Glutes · Legs',cue:'Breiter Stand, Knie folgen den Fußspitzen. Hüfte kontrolliert absenken und über die Füße kraftvoll aufrichten.'},
{id:'pike-pushup',name:'Pike Push-up',cat:'Push · Upper Body',cue:'Hüfte hochschieben, Kopf kontrolliert zwischen den Händen absenken und den Boden kräftig wegdrücken.'},
{id:'frog-pump',name:'Frog Pump',cat:'Glutes',cue:'Fußsohlen zusammen, Knie nach außen. Becken anheben und jede Wiederholung mit einer deutlichen Gesäßanspannung beenden.'},
{id:'bear-tap',name:'Bear Plank Shoulder Tap',cat:'Core Stability',cue:'Knie knapp über dem Boden halten. Abwechselnd die gegenüberliegende Schulter berühren, ohne das Becken zu verdrehen.'}
];
const A=(sets=3)=>({name:'Glute Strength',items:[['split-squat-drive',`${sets}×8–10/Seite`],['bulgarian',`${sets}×8–12/Seite`],['pushup',`${sets}×8–15`],['hip-thrust',`${sets}×12–15`],['dead-bug',`${sets}×8–12/Seite`]]});
const B=(sets=3)=>({name:'Glute Hinge',items:[['stepup-drive',`${sets}×8–10/Seite`],['sl-rdl',`${sets}×8–12/Seite`],['band-row',`${sets}×10–15`],['single-bridge',`${sets}×10–15/Seite`],['side-plank',`${sets}×30–45 s/Seite`]]});
const C=(sets=3)=>({name:'Glute + Core',items:[['reverse-lunge-drive',`${sets}×8–10/Seite`],['sumo-squat',`${sets}×10–15`],['pike-pushup',`${sets}×6–12`],['frog-pump',`${sets}×15–25`],['bear-tap',`${sets}×8–12/Seite`]]});
const phases=[
['Einstieg','Saubere Technik und passende Varianten finden · etwa 30–35 Min.'],
['Einstieg +','Bewegungen festigen, nicht bis zum Muskelversagen · etwa 30–35 Min.'],
['Aufbau I','Wiederholungen innerhalb der Bereiche steigern · etwa 30–40 Min.'],
['Aufbau I','Kontrollierte Wiederholungen und volle Bewegungsamplitude · etwa 30–40 Min.'],
['Aufbau I+','Glute-Hauptübungen spürbar fordernd, aber sauber · etwa 35–40 Min.'],
['Aufbau II','Schwierigere Variante oder Rucksack als Zusatzlast, wenn nötig · etwa 35–40 Min.'],
['Aufbau II','Leistung bestätigen und obere Wiederholungsgrenzen erreichen · etwa 35–40 Min.'],
['Aufbau II+','Qualität halten, keine unnötigen Zusatzübungen · etwa 35–40 Min.'],
['Intensivierung','Hauptübungen anspruchsvoller ausführen · etwa 35–45 Min.'],
['Intensivierung','Glute-Arbeit priorisieren, Oberkörper kompakt halten · etwa 35–45 Min.'],
['Intensivierung +','Stabile Leistung über alle drei Einheiten · etwa 35–45 Min.'],
['Peak','Höchste saubere Belastung des Programms · etwa 35–45 Min.'],
['Abschluss','Kernübungen wiederholen und Fortschritt vergleichen · etwa 30–40 Min.']
];
export const program={name:'Glutes & Core',subtitle:'13 Wochen · 3× pro Woche · 30–45 Min. · Zuhause',weeks:phases.map((p,i)=>({week:i+1,title:p[0],focus:p[1],days:[A(i===0?2:3),B(i===0?2:3),C(i===0?2:3)]}))};
