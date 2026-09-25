export const ladders={
 push:['incline-pushup','pushup','decline-pushup'],
 bridge:['glute-bridge','hip-thrust','single-hip-thrust'],
 hinge:['kickstand-rdl','sl-rdl'],
 squat:['reverse-lunge','bulgarian'],
 core:['bird-dog','dead-bug','bear-tap']
};
export const familyById=new Map(Object.entries(ladders).flatMap(([family,ids])=>ids.map(id=>[id,family])));
export function resolveExercise(id,adapt={}){const family=familyById.get(id);if(!family)return{id,changed:false,family:null};const ladder=ladders[family],base=ladder.indexOf(id),offset=Math.max(-1,Math.min(1,Number(adapt[family]||0))),idx=Math.max(0,Math.min(ladder.length-1,base+offset));return{id:ladder[idx],base:id,changed:idx!==base,family}}
export function applyRating({family,value,previous,ratings,adapt}){if(!family||![-1,0,1].includes(value))return;let score=Number(ratings[`score:${family}`]||0);if(Number.isFinite(previous))score-=previous;score+=value;ratings[`score:${family}`]=score;if(score>=2){adapt[family]=Math.min(1,Number(adapt[family]||0)+1);ratings[`score:${family}`]=0}else if(score<=-2){adapt[family]=Math.max(-1,Number(adapt[family]||0)-1);ratings[`score:${family}`]=0}}
