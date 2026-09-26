export const ladders={
  squat:['sumo-squat','reverse-lunge','tempo-squat','bulgarian'],
  hinge:['kickstand-rdl','sl-rdl'],
  bridge:['glute-bridge','hip-thrust','single-bridge','single-hip-thrust'],
  push:['incline-pushup','pushup','decline-pushup','pike-pushup'],
  pull:['band-row','band-pulldown'],
  core:['bird-dog','dead-bug','bear-tap','plank-drag']
};
export const familyById=new Map(Object.entries(ladders).flatMap(([family,ids])=>ids.map(id=>[id,family])));
export function resolveExercise(id,adapt={}){
  const family=familyById.get(id);if(!family)return{id,base:id,changed:false,family:null,level:null,maxLevel:null};
  const ladder=ladders[family],base=Math.max(0,ladder.indexOf(id)),offset=Number(adapt[family]||0),idx=Math.max(0,Math.min(ladder.length-1,base+offset));
  return{id:ladder[idx],base:id,changed:idx!==base,family,level:idx+1,maxLevel:ladder.length};
}
export function applyRating({family,value,ratings,adapt}){
  if(!family||![-1,0,1].includes(value))return;
  const key=`streak:${family}`;
  let streak=Number(ratings[key]||0);
  if(value===0){ratings[key]=0;return}
  if(Math.sign(streak)!==Math.sign(value))streak=0;
  streak+=value;ratings[key]=streak;
  if(streak>=2){adapt[family]=Number(adapt[family]||0)+1;ratings[key]=0}
  if(streak<=-2){adapt[family]=Number(adapt[family]||0)-1;ratings[key]=0}
}
