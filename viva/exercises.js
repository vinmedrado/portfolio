(function(g){'use strict';
const TARGET={
 squat:['Pernas e glúteos','Quadríceps e glúteos'],squatWide:['Pernas e glúteos','Quadríceps e glúteos'],wallPush:['Peito e braços','Peito, ombros e tríceps'],
 inclinePush:['Peito e braços','Peito, ombros e tríceps'],bridge:['Glúteos','Glúteos e posteriores'],march:['Cardio leve','Pernas e coordenação'],
 step:['Cardio leve','Pernas e coordenação'],backLunge:['Pernas e equilíbrio','Quadríceps e glúteos'],calf:['Panturrilhas','Panturrilhas'],
 birdDog:['Estabilidade','Abdômen e costas'],deadBug:['Estabilidade','Abdômen'],kneeDrive:['Cardio leve','Pernas e abdômen'],
 imaginary:['Cardio','Panturrilhas e coordenação'],skipping:['Cardio','Pernas e coordenação'],plank:['Estabilidade','Abdômen e ombros'],
 standingCore:['Estabilidade em pé','Abdômen e coordenação'],punch:['Cardio leve','Braços e coordenação'],toeTap:['Cardio leve','Pernas e coordenação'],
 hinge:['Quadril','Posteriores e glúteos'],superman:['Costas','Músculos das costas'],
 miniWalk:['Glúteos','Glúteo médio'],miniBridge:['Glúteos','Glúteos e posteriores'],miniSquat:['Pernas e glúteos','Quadríceps e glúteos'],
 miniClam:['Glúteos','Glúteo médio'],miniKick:['Glúteos','Glúteos'],row:['Costas','Costas e braços'],
 curl:['Braços','Bíceps'],bandHinge:['Quadril','Posteriores e glúteos'],bandPress:['Peito e braços','Peito e tríceps'],
 bandLateral:['Ombros','Deltoides'],bandTriceps:['Braços','Tríceps']
};
const FLOOR=new Set(['bridge','miniBridge','miniClam','deadBug','birdDog','superman','plank']);
const KNEEL=new Set(['birdDog','plank']);
const JUMP=new Set(['imaginary','skipping']);
const REPLACE={squat:['squatWide','miniSquat','backLunge'],squatWide:['squat','miniSquat'],miniSquat:['squat','squatWide'],
 wallPush:['inclinePush','bandPress'],inclinePush:['wallPush','bandPress'],bandPress:['wallPush','inclinePush'],
 bridge:['miniBridge','hinge','miniKick'],miniBridge:['bridge','hinge','miniKick'],miniClam:['miniWalk','miniKick'],
 row:['superman'],bandHinge:['hinge','bridge'],hinge:['bandHinge','bridge'],backLunge:['squat','squatWide','miniSquat'],
 birdDog:['deadBug','standingCore'],deadBug:['standingCore','birdDog'],plank:['standingCore','deadBug'],
 superman:['row'],calf:['step','march'],miniWalk:['miniKick','step'],miniKick:['miniWalk','miniClam'],
 march:['step','toeTap','kneeDrive'],step:['march','toeTap','kneeDrive'],kneeDrive:['march','step'],
 skipping:['march','kneeDrive','step'],imaginary:['step','march','toeTap'],punch:['toeTap','step'],
 toeTap:['step','march'],standingCore:['deadBug','birdDog'],curl:['bandTriceps'],bandLateral:['wallPush','bandPress'],bandTriceps:['curl']};
const gearLabel={body:'Sem equipamento',mini:'Mini band',long:'Elástico longo'};
function safePrefs(p={}){return {noFloor:!!p.noFloor,noKneel:!!p.noKneel,noJump:p.noJump!==false};}
function allowed(id,gear={mini:false,long:false},prefs={}){
 const ex=g.VivaCoach?.getExercise(id);if(!ex)return false;const p=safePrefs(prefs);
 if(ex.gear==='mini'&&!gear.mini||ex.gear==='long'&&!gear.long)return false;
 if(p.noFloor&&FLOOR.has(id)||p.noKneel&&KNEEL.has(id))return false;
 return true;
}
function details(id,name=''){
 const ex=g.VivaCoach?.getExercise(id),guide=g.VivaGuide?.get(id,name),target=TARGET[id]||['Movimento guiado','Variável'];
 const impact=JUMP.has(id)?'Baixo se feito sem saltos':'Baixo';
 return {id,name:ex?.name||name||'Movimento',objective:target[0],muscles:target[1],impact,
   equipment:gearLabel[ex?.gear]||'Sem equipamento',setup:guide?.setup||'Comece em posição confortável.',
   execution:guide?.how||'Faça o movimento com controle.',breathing:guide?.breathing||'Respire normalmente.',
   errors:guide?.attention||'Evite movimentos bruscos.',easier:guide?.easier||'Reduza a amplitude ou a resistência.',
   harder:ex?.gear==='long'||ex?.gear==='mini'?'Aumente um nível de resistência apenas quando a execução estiver estável.':'Aumente a amplitude ou a cadência gradualmente, sem perder a técnica.',
   avoid:'Interrompa se houver dor aguda, tontura ou mal-estar. Uma limitação persistente precisa de avaliação individual.'};
}
function alternatives(id,gear,prefs,excluded=[],used=[]){
 const banned=new Set([...excluded,...used,id]);
 return (REPLACE[id]||[]).filter(x=>!banned.has(x)&&allowed(x,gear,prefs)).map(x=>g.VivaCoach.getExercise(x));
}
function apply(moves=[],gear,prefs={},excluded=[],replacements={}){
 const seen=new Set();
 return (moves||[]).map(m=>{
  if(!m?.id)return null;
  const replacement=replacements?.[m.id],id=replacement&&allowed(replacement,gear,prefs)&&!excluded.includes(replacement)?replacement:m.id;
  let ex=allowed(id,gear,prefs)&&!excluded.includes(id)?g.VivaCoach.getExercise(id):null;
  if(!ex)ex=alternatives(m.id,gear,prefs,excluded,[...seen])[0]||null;
  if(ex&&seen.has(ex.id))return null;
  if(ex)seen.add(ex.id);
  return ex;
 }).filter(Boolean);
}
function sanitizeSetLog(x){
 if(!x||typeof x!=='object'||!g.VivaCoach?.getExercise(x.id))return null;
 const set=Number(x.setNumber),reps=Number(x.repsDone);
 if(!Number.isInteger(set)||set<1||set>8||!Number.isInteger(reps)||reps<1||reps>30)return null;
 const band=['none','light','medium','heavy'].includes(x.band)?x.band:'none';
 const difficulty=['easy','ok','hard'].includes(x.difficulty)?x.difficulty:'ok';
 const date=typeof x.date==='string'&&!Number.isNaN(Date.parse(x.date))?new Date(x.date).toISOString():new Date().toISOString();
 return {id:x.id,setNumber:set,repsDone:reps,band,difficulty,technique:x.technique==='insegura'?'insegura':'boa',date};
}
function progress(history=[],limit=5){
 const records=(history||[]).flatMap(h=>(h?.setLogs||[]).map(v=>({...v,day:h.day,sessionId:h.coachId}))).filter(x=>g.VivaCoach?.getExercise(x.id));
 const by=new Map();for(const r of records){const list=by.get(r.id)||[];list.push(r);by.set(r.id,list)}
 return [...by].map(([id,logs])=>{
  const sessions=new Map();
  for(const r of logs){const key=r.sessionId||r.day,entry=sessions.get(key)||{date:r.day,reps:0,sets:0};entry.reps+=Number(r.repsDone)||0;entry.sets++;sessions.set(key,entry)}
  const ordered=[...sessions.values()].sort((a,b)=>a.date.localeCompare(b.date)),latest=ordered.at(-1),previous=ordered.at(-2);
  return {id,name:g.VivaCoach.getExercise(id).name,sessions:ordered.length,latest,previous,
    label:latest.reps+' repetições em '+latest.sets+' séries'+(previous?' (registro anterior: '+previous.reps+')':'')};
 }).sort((a,b)=>(b.latest?.date||'').localeCompare(a.latest?.date||'')).slice(0,Math.max(1,limit));
}
g.VivaExercises=Object.freeze({ids:Object.keys(TARGET),details,allowed,alternatives,apply,safePrefs,sanitizeSetLog,progress,gearLabel,FLOOR,KNEEL,JUMP});
})(window);