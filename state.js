const KEY='rethink_glutescore_v1';
const OLD_KEYS=[];
const defaults={
  view:'training',completed:{},optionalCompleted:{},ratings:{},adapt:{},setChecks:{},performance:{},setPerformance:{},performanceHistory:{},
  summaries:{},activeSession:null,restTimer:null,sound:true
};
export function loadState(){
  try{
    let raw=localStorage.getItem(KEY);
    if(!raw) for(const k of OLD_KEYS){raw=localStorage.getItem(k);if(raw)break}
    const x=JSON.parse(raw||'{}');
    const view=['training','plan','skills','programs'].includes(x.view)?x.view:'training';
    return {...defaults,...x,view,
      completed:{...(x.completed||{})},optionalCompleted:{...(x.optionalCompleted||{})},ratings:{...(x.ratings||{})},
      adapt:{...(x.adapt||{})},setChecks:{...(x.setChecks||{})},performance:{...(x.performance||{})},setPerformance:{...(x.setPerformance||{})},performanceHistory:{...(x.performanceHistory||{})},summaries:{...(x.summaries||{})}
    };
  }catch{return typeof structuredClone==='function'?structuredClone(defaults):JSON.parse(JSON.stringify(defaults))}
}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify(state))}
export const STATE_KEY=KEY;
export function exportState(state){return {app:'RETHINK.GlutesCore',schema:3,exportedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(state))}}
export function importState(payload){const incoming=payload?.state||payload;if(!incoming||typeof incoming!=='object'||Array.isArray(incoming))throw new Error('Ungültiges Backup');const merged={...defaults,...incoming,completed:{...(incoming.completed||{})},optionalCompleted:{...(incoming.optionalCompleted||{})},ratings:{...(incoming.ratings||{})},adapt:{...(incoming.adapt||{})},setChecks:{...(incoming.setChecks||{})},performance:{...(incoming.performance||{})},setPerformance:{...(incoming.setPerformance||{})},performanceHistory:{...(incoming.performanceHistory||{})},summaries:{...(incoming.summaries||{})}};saveState(merged);return merged}
export function workoutKey(week,index){return `w${week}d${index}`}
export function introKey(index){return `intro${index}`}
export function optionalKey(week){return `opt${week}`}
