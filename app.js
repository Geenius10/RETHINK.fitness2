const DAYS = ['Mo','Di','Mi','Do','Fr','Sa','So'];
const DEFAULT_ROWS = [
  {start:'08:00',end:'08:45',cells:Array(7).fill('')},
  {start:'08:45',end:'09:30',cells:Array(7).fill('')},
  {start:'09:45',end:'10:30',cells:Array(7).fill('')},
  {start:'10:30',end:'11:15',cells:Array(7).fill('')},
  {start:'11:30',end:'12:15',cells:Array(7).fill('')},
  {start:'12:15',end:'13:00',cells:Array(7).fill('')}
];

function cloneDefault(){ return DEFAULT_ROWS.map(r=>({...r,cells:[...r.cells]})); }
function defaultSettings(){ return DAYS.map(()=>({highlight:false,divider:false})); }
function timeOptions(){
  const out=[];
  for(let h=0;h<24;h++) for(let m=0;m<60;m+=5) out.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
  return out;
}
const TIMES=timeOptions();

function migrate(raw){
  if(!raw || !Array.isArray(raw.rows)) return {title:'Mein Stundenplan',rows:cloneDefault(),dayOrder:[0,1,2,3,4,5,6],daySettings:defaultSettings()};
  const dayOrder=Array.isArray(raw.dayOrder) && raw.dayOrder.length===7 ? raw.dayOrder.map(Number) : [0,1,2,3,4,5,6];
  const settings=defaultSettings();
  if(Array.isArray(raw.daySettings)) raw.daySettings.slice(0,7).forEach((s,i)=>settings[i]={highlight:!!s?.highlight,divider:!!s?.divider});
  return {
    title: raw.title || 'Mein Stundenplan',
    dayOrder,
    daySettings:settings,
    rows: raw.rows.map(row=>{
      let start=row.start || '', end=row.end || '';
      if((!start || !end) && row.time){
        const parts=String(row.time).split(/[\u2013\u2014-]/).map(s=>s.trim());
        start=start || parts[0] || '08:00';
        end=end || parts[1] || '08:45';
      }
      const cells=Array.isArray(row.cells) ? [...row.cells] : [];
      while(cells.length<7) cells.push('');
      return {start:start||'08:00',end:end||'08:45',cells:cells.slice(0,7)};
    })
  };
}

let state = load();
const body = document.getElementById('scheduleBody');
const headRow = document.querySelector('#scheduleTable thead tr');
const titleInput = document.getElementById('titleInput');
titleInput.value = state.title || 'Mein Stundenplan';

function load(){
  try{return migrate(JSON.parse(localStorage.getItem('rethink-stundenplan')))}
  catch{return migrate(null)}
}
function save(){localStorage.setItem('rethink-stundenplan',JSON.stringify(state))}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function selectHtml(value,kind,r){
  return `<select class="time-select" data-r="${r}" data-kind="${kind}" aria-label="${kind==='start'?'Beginn':'Ende'} Zeile ${r+1}">`+
    TIMES.map(t=>`<option value="${t}"${t===value?' selected':''}>${t}</option>`).join('')+
    `</select>`;
}
function dayClass(dayId){
  const s=state.daySettings[dayId];
  return `${s.highlight?' day-highlight':''}${s.divider?' day-divider':''}`;
}

function renderHeader(){
  headRow.innerHTML='<th class="time-col">Zeit</th>' + state.dayOrder.map(dayId=>{
    const s=state.daySettings[dayId];
    return `<th class="day-head${dayClass(dayId)}" data-day="${dayId}">
      <div class="day-head-inner">
        <span class="drag-day" data-drag="${dayId}" aria-label="${DAYS[dayId]} verschieben">${DAYS[dayId]}</span>
        <div class="day-tools">
          <button class="mini-tool${s.highlight?' active':''}" data-highlight="${dayId}" aria-label="${DAYS[dayId]} hervorheben" title="Hervorheben">H</button>
          <button class="mini-tool${s.divider?' active':''}" data-divider="${dayId}" aria-label="Trennlinie nach ${DAYS[dayId]}" title="Trennlinie">|</button>
        </div>
      </div>
    </th>`;
  }).join('');
}

function render(){
  renderHeader();
  body.innerHTML='';
  state.rows.forEach((row,r)=>{
    const tr=document.createElement('tr');
    tr.dataset.row=r;
    tr.innerHTML=`<td class="time-cell"><button class="row-handle" data-rowdrag="${r}" aria-label="Zeile ${r+1} verschieben" title="Zeile verschieben">≡</button><div class="time-pickers">${selectHtml(row.start,'start',r)}<span>-</span>${selectHtml(row.end,'end',r)}</div><button class="row-delete" data-del="${r}" aria-label="Zeile loeschen">loeschen</button></td>`+
      state.dayOrder.map(dayId=>`<td class="${dayClass(dayId).trim()}" data-day="${dayId}"><textarea class="cell-input" data-r="${r}" data-day="${dayId}" aria-label="${DAYS[dayId]} Zeile ${r+1}">${esc(row.cells[dayId])}</textarea></td>`).join('');
    body.appendChild(tr);
  });
}

body.addEventListener('input',e=>{
  const r=+e.target.dataset.r;
  if(Number.isNaN(r)) return;
  if(e.target.classList.contains('cell-input')) state.rows[r].cells[+e.target.dataset.day]=e.target.value;
  save();
});
body.addEventListener('change',e=>{
  const r=+e.target.dataset.r;
  if(Number.isNaN(r) || !e.target.classList.contains('time-select')) return;
  state.rows[r][e.target.dataset.kind]=e.target.value;
  save();
});
body.addEventListener('click',e=>{
  if(e.target.dataset.del!==undefined){state.rows.splice(+e.target.dataset.del,1);save();render()}
});


// Row reordering: drag the handle to move the complete timetable row.
let rowDrag=null;
function moveRow(from,to){
  if(from<0||to<0||from===to||from>=state.rows.length||to>=state.rows.length) return;
  const [item]=state.rows.splice(from,1);
  state.rows.splice(to,0,item);
  save(); render();
}
body.addEventListener('pointerdown',e=>{
  const handle=e.target.closest('.row-handle');
  if(!handle) return;
  e.preventDefault();
  rowDrag={from:+handle.dataset.rowdrag,pointerId:e.pointerId};
  handle.setPointerCapture?.(e.pointerId);
  document.body.classList.add('row-reordering');
});
body.addEventListener('pointermove',e=>{
  if(!rowDrag || rowDrag.pointerId!==e.pointerId) return;
  const over=document.elementFromPoint(e.clientX,e.clientY)?.closest('#scheduleBody tr');
  if(!over) return;
  const to=+over.dataset.row;
  if(Number.isNaN(to) || to===rowDrag.from) return;
  moveRow(rowDrag.from,to);
  rowDrag.from=to;
});
function endRowDrag(){rowDrag=null;document.body.classList.remove('row-reordering')}
body.addEventListener('pointerup',endRowDrag);
body.addEventListener('pointercancel',endRowDrag);

titleInput.addEventListener('input',()=>{state.title=titleInput.value;save()});
document.getElementById('addTimeBtn').addEventListener('click',()=>{
  const previous=state.rows[state.rows.length-1];
  state.rows.push({start:previous?.end||'08:00',end:'08:45',cells:Array(7).fill('')});
  save();render();
});
document.getElementById('resetBtn').addEventListener('click',()=>{
  if(confirm('Stundenplan wirklich leeren?')){state=migrate(null);titleInput.value=state.title;save();render()}
});

headRow.addEventListener('click',e=>{
  const h=e.target.dataset.highlight, d=e.target.dataset.divider;
  if(h!==undefined){state.daySettings[+h].highlight=!state.daySettings[+h].highlight;save();render();}
  if(d!==undefined){state.daySettings[+d].divider=!state.daySettings[+d].divider;save();render();}
});

let drag=null;
function moveDay(dayId,targetDayId){
  const from=state.dayOrder.indexOf(dayId), to=state.dayOrder.indexOf(targetDayId);
  if(from<0||to<0||from===to) return;
  state.dayOrder.splice(from,1);
  state.dayOrder.splice(to,0,dayId);
  save();render();
}
headRow.addEventListener('pointerdown',e=>{
  const el=e.target.closest('.drag-day');
  if(!el) return;
  drag={dayId:+el.dataset.drag,pointerId:e.pointerId};
  el.setPointerCapture?.(e.pointerId);
  document.body.classList.add('reordering');
});
headRow.addEventListener('pointermove',e=>{
  if(!drag || drag.pointerId!==e.pointerId) return;
  const over=document.elementFromPoint(e.clientX,e.clientY)?.closest('.day-head');
  if(over && +over.dataset.day!==drag.dayId) moveDay(drag.dayId,+over.dataset.day);
});
function endDrag(){drag=null;document.body.classList.remove('reordering')}
headRow.addEventListener('pointerup',endDrag);
headRow.addEventListener('pointercancel',endDrag);

// Desktop fallback for drag and drop.
headRow.addEventListener('dragstart',e=>{
  const th=e.target.closest('.day-head');
  if(!th) return;
  e.dataTransfer.setData('text/plain',th.dataset.day);
  e.dataTransfer.effectAllowed='move';
});
headRow.addEventListener('dragover',e=>{if(e.target.closest('.day-head')) e.preventDefault()});
headRow.addEventListener('drop',e=>{
  const th=e.target.closest('.day-head'); if(!th) return;
  e.preventDefault(); moveDay(+e.dataTransfer.getData('text/plain'),+th.dataset.day);
});

// Mark headers draggable after every render without adding visual clutter.
const observer=new MutationObserver(()=>document.querySelectorAll('.day-head').forEach(th=>th.draggable=true));
observer.observe(headRow,{childList:true});

document.getElementById('pdfBtn').addEventListener('click',createPDF);

function normalizePdfText(str=''){
  // ASCII transliteration avoids replacement question marks in the built-in PDF font.
  return String(str)
    .replace(/AE|Ae|ae/g,'ae').replace(/OE|Oe|oe/g,'oe').replace(/UE|Ue|ue/g,'ue')
    .replace(/[\u00e4\u00c4]/g,'ae').replace(/[\u00f6\u00d6]/g,'oe').replace(/[\u00fc\u00dc]/g,'ue').replace(/\u00df/g,'ss')
    .replace(/[\u2013\u2014]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,' ');
}
function pdfEscape(s){return normalizePdfText(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
function wrap(text,max){
  const words=normalizePdfText(text).replace(/\s+/g,' ').trim().split(' ').filter(Boolean), lines=[]; let line='';
  for(const w of words){const next=line?line+' '+w:w;if(next.length>max && line){lines.push(line);line=w}else line=next} if(line)lines.push(line); return lines.slice(0,4);
}
function createPDF(){
  const W=842,H=595, margin=26, tableTop=86;
  const rows=Math.max(1,state.rows.length), rowH=Math.min(62,(H-tableTop-42)/rows), timeW=98, colW=(W-2*margin-timeW)/7;
  let c='BT /F1 24 Tf 26 552 Td ('+pdfEscape(state.title||'Stundenplan')+') Tj ET\n';
  c+='0.94 g '+margin+' '+(H-tableTop-32)+' '+(W-2*margin)+' 28 re f\n0 g\n';
  const yHeader=H-tableTop-14;
  c+='BT /F1 9 Tf '+(margin+34)+' '+yHeader+' Td (Zeit) Tj ET\n';
  state.dayOrder.forEach((dayId,i)=>{const x=margin+timeW+i*colW+colW/2-6;c+=`BT /F1 9 Tf ${x.toFixed(2)} ${yHeader} Td (${DAYS[dayId]}) Tj ET\n`});
  const top=H-tableTop-32, bottom=top-rows*rowH;
  c+='0 G 0.5 w\n';
  state.dayOrder.forEach((dayId,i)=>{
    if(state.daySettings[dayId].highlight){
      const x=margin+timeW+i*colW;
      c+=`0.95 g ${x.toFixed(2)} ${bottom.toFixed(2)} ${colW.toFixed(2)} ${(top-bottom).toFixed(2)} re f 0 g\n`;
    }
  });
  for(let i=0;i<=rows;i++){const y=top-i*rowH;c+=`${margin} ${y.toFixed(2)} m ${W-margin} ${y.toFixed(2)} l S\n`}
  const xs=[margin,margin+timeW,...Array.from({length:7},(_,i)=>margin+timeW+(i+1)*colW)];
  xs.forEach((x,i)=>{
    let width='0.5';
    if(i>1){const leftDay=state.dayOrder[i-2]; if(state.daySettings[leftDay]?.divider) width='1.8';}
    c+=`${width} w ${x.toFixed(2)} ${top} m ${x.toFixed(2)} ${bottom.toFixed(2)} l S\n`;
  });
  state.rows.forEach((row,r)=>{
    const base=top-r*rowH-18;
    c+=`BT /F1 7.5 Tf ${(margin+6).toFixed(2)} ${base.toFixed(2)} Td (${pdfEscape(`${row.start}-${row.end}`)}) Tj ET\n`;
    state.dayOrder.forEach((dayId,i)=>{
      wrap(row.cells[dayId],Math.max(8,Math.floor(colW/5.7))).forEach((line,li)=>{
        const x=margin+timeW+i*colW+4,y=base-li*10;
        c+=`BT /F1 7 Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${pdfEscape(line)}) Tj ET\n`;
      });
    });
  });
  c+='BT /F1 7 Tf 26 18 Td (RETHINK. Stundenplan) Tj ET\n';

  const objects=[];
  objects[1]='<< /Type /Catalog /Pages 2 0 R >>';
  objects[2]='<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>`;
  objects[4]=`<< /Length ${c.length} >>\nstream\n${c}endstream`;
  objects[5]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  let pdf='%PDF-1.4\n', offsets=[0];
  for(let i=1;i<=5;i++){offsets[i]=pdf.length;pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`}
  const xref=pdf.length; pdf+='xref\n0 6\n0000000000 65535 f \n';
  for(let i=1;i<=5;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
  pdf+=`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const blob=new Blob([pdf],{type:'application/pdf'}), a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=(state.title||'Stundenplan').replace(/[^a-z0-9_-]+/gi,'_')+'.pdf'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1500);
}

render();
document.querySelectorAll('.day-head').forEach(th=>th.draggable=true);
if('serviceWorker' in navigator) addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
