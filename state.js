const KEY='rethink_glutes_core_v1';
const defaults={view:'training',completed:{},ratings:{},setChecks:{},setPerformance:{},performanceHistory:{},summaries:{},activeSession:null,restTimer:null,sound:true};
export function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {...defaults,...x,view:['training','plan','history'].includes(x.view)?x.view:'training',completed:{...(x.completed||{})},ratings:{...(x.ratings||{})},setChecks:{...(x.setChecks||{})},setPerformance:{...(x.setPerformance||{})},performanceHistory:{...(x.performanceHistory||{})},summaries:{...(x.summaries||{})}}}catch{return structuredClone(defaults)}}
export function saveState(s){localStorage.setItem(KEY,JSON.stringify(s))}
export function exportState(s){return {app:'RETHINK.GlutesCore',schema:1,exportedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(s))}}
export function importState(p){const x=p?.state||p;if(!x||typeof x!=='object'||Array.isArray(x))throw new Error('Ungültiges Backup');const s={...defaults,...x,completed:{...(x.completed||{})},ratings:{...(x.ratings||{})},setChecks:{...(x.setChecks||{})},setPerformance:{...(x.setPerformance||{})},performanceHistory:{...(x.performanceHistory||{})},summaries:{...(x.summaries||{})}};saveState(s);return s}
export const workoutKey=(w,i)=>`gc:w${w}d${i}`;
