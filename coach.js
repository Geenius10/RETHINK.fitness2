export const ladders={
 push:['incline-pushup','pushup','decline-pushup','diamond-pushup'],
 dip:['support-hold','dip-negative','dip','straight-bar-dip'],
 pull:['body-row','pullup-negative','band-pullup','pullup','chest-bar','archer-pullup'],
 legs:['split-squat','bulgarian','pistol-box','pistol'],
 core:['hollow-tuck','hollow'],
 lsit:['l-sit-tuck','l-sit','compression','v-sit'],
 handstand:['crow','wall-handstand','chest-wall','handstand'],
 muscleup:['muscle-transition','jump-muscleup','muscleup'],
 front:['tuck-front','adv-tuck-front','straddle-front','full-front'],
 back:['skin-cat-tuck','tuck-back','adv-tuck-back','straddle-back','full-back'],
 planche:['planche-lean','tuck-planche','adv-tuck-planche','straddle-planche','full-planche']
};
export const familyById=new Map(Object.entries(ladders).flatMap(([family,ids])=>ids.map(id=>[id,family])));
export function resolveExercise(id,adapt={}){const family=familyById.get(id);if(!family)return{id,changed:false,family:null};const ladder=ladders[family],base=ladder.indexOf(id),offset=Math.max(-1,Math.min(1,Number(adapt[family]||0))),idx=Math.max(0,Math.min(ladder.length-1,base+offset));return{id:ladder[idx],base:id,changed:idx!==base,family}}
export function applyRating({family,value,previous,ratings,adapt}){if(!family||![-1,0,1].includes(value))return;let score=Number(ratings[`score:${family}`]||0);if(Number.isFinite(previous))score-=previous;score+=value;ratings[`score:${family}`]=score;if(score>=2){adapt[family]=Math.min(1,Number(adapt[family]||0)+1);ratings[`score:${family}`]=0}else if(score<=-2){adapt[family]=Math.max(-1,Number(adapt[family]||0)-1);ratings[`score:${family}`]=0}}
