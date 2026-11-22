(function(g){'use strict';
// Treine no Lar guided training prescription. Time blocks are coaching windows, NOT a substitute for counted repetitions.
const SPLITS={20:[5,10,5],30:[5,20,5],45:[7,30,8]};
const STRENGTH={
 0:[['squat','row','wallPush'],['bridge','hinge','birdDog','miniWalk'],['calf','deadBug','bandPress','standingCore']],
 2:[['bandHinge','backLunge','bridge'],['miniWalk','miniClam','calf','miniBridge'],['deadBug','squatWide','miniKick','birdDog']],
 4:[['row','wallPush','birdDog'],['bandPress','hinge','backLunge','bridge'],['squatWide','calf','standingCore','bandLateral']]
};
const warmup=[
 ['Marcha no lugar','Comece devagar, soltando os braços.'],
 ['Círculos de ombros','Faça movimentos pequenos com os ombros, sem forçar.'],
 ['Passos laterais','Mova-se de lado suavemente, sem saltar.'],
 ['Mobilidade de quadril','Leve o quadril para trás e retorne, devagar.'],
 ['Elevação alternada de joelhos','Eleve um joelho por vez sem pressa.']
];
const cooldown=[
 ['Respiração tranquila','Ande bem devagar e respire naturalmente.'],
 ['Alongar panturrilhas','Apoie-se e alongue suavemente sem balançar.'],
 ['Alongar quadríceps','Com apoio firme, alongue a frente da coxa sem dor.'],
 ['Alongar posteriores','Incline-se pelo quadril, mantendo os joelhos confortáveis.'],
 ['Alongar ombros','Alongue suavemente um braço de cada vez.']
];
function split(minutes){
 return SPLITS[minutes]||SPLITS[20];
}
function getExercise(id,gear,excluded=[],prefs={},replacements={},used=[]){
 const X=g.VivaExercises,skip=new Set(excluded||[]),seen=new Set(used||[]);
 const selected=replacements?.[id];
 // An old saved substitution may not meet the updated technical requirements.
 const preferred=selected&&X?.compatible(id,selected)?selected:id;
 for(const candidate of [preferred,id]){
  if(seen.has(candidate)||skip.has(candidate))continue;
  if(X?.allowed(candidate,gear,prefs))return g.VivaCoach.getExercise(candidate);
 }
 return X?.alternatives(id,gear,prefs,excluded,used)[0]||null;
}
function pickStrength(day,week,minutes,gear,excluded=[],prefs={},replacements={}){
 const bank=STRENGTH[day]||STRENGTH[0],n=minutes===45?5:minutes===30?4:3,
 block=Math.floor(Math.max(1,week)-1)/8|0,chosen=[],seen=new Set();
 const pools=[...bank[0],bank[1][block%bank[1].length],bank[2][block%bank[2].length],
 ...bank[1],...bank[2],...bank[0]];
 for(const id of pools){const e=getExercise(id,gear,excluded,prefs,replacements,[...seen]);if(e&&!seen.has(e.id)){seen.add(e.id);chosen.push(e)}if(chosen.length>=n)break}
 return chosen.slice(0,n);
}
function pickCardio(day,week,available,low,recovery=false){
 const shift=Math.floor(Math.max(1,week)-1)/4|0;
 const all=(available||[]).filter(x=>x?.id&&x?.name);
 if(recovery)return all.slice(0,6);
 const n=Math.min(8,all.length);
 if(!n)return [];
 const anchor=all.slice(0,2),others=all.slice(2);
 const rotated=others.length?others.slice(shift%others.length).concat(others.slice(0,shift%others.length)):[];
 return [...anchor,...rotated].slice(0,n);
}
function strengthSetCount(minutes,week,history=[],feedback={},today=new Date(),readinessState='normal'){
 if(minutes===45)return 3;
 if(minutes!==30||week<5||readinessState!=='normal')return 2;
 const cutoff=new Date(today);cutoff.setDate(cutoff.getDate()-42);
 const recent=(Array.isArray(history)?history:[]).filter(h=>h?.coach&&h.coachRecovery!==true&&h.coachType==='strength'
   &&h.date&&Number.isFinite(Date.parse(h.date))&&new Date(h.date)>=cutoff&&new Date(h.date)<=today)
   .sort((a,b)=>new Date(a.date)-new Date(b.date));
 if(!recent.length)return 2;
 const latest=recent.at(-1),lastFeedback=feedback?.[latest.coachId];
 if(!lastFeedback||lastFeedback.pain===true||lastFeedback.technique!=='boa'
   ||Number(lastFeedback.effort)>7)return 2;
 const safeDays=new Set();
 for(const h of recent){
  const fb=feedback?.[h.coachId],byId=new Map();
  if(!fb||fb.pain===true||fb.technique!=='boa'||!(Number(fb.effort)>=1&&Number(fb.effort)<=7))continue;
  for(const raw of Array.isArray(h.setLogs)?h.setLogs:[]){
   const x=g.VivaExercises?.sanitizeSetLog(raw);
   if(!x||x.repsDone<8||x.technique!=='boa'||x.difficulty==='hard')continue;
   const set=byId.get(x.id)||new Set();set.add(x.setNumber);byId.set(x.id,set);
  }
  if([...byId.values()].filter(sets=>sets.size>=2).length>=2)safeDays.add(h.day);
 }
 return safeDays.size>=8?3:2;
}

function prescribe(m){
 const minutes=[20,30,45].includes(m.duration)?m.duration:20, [warm,main,cool]=split(minutes);
 const recovery=m.kind==='Recuperação ativa',strength=m.kind==='Força'&&!recovery;
 const gear=m.c?.gear||{mini:false,long:false},excluded=m.c?.excluded||[],prefs=m.c?.preferences||{},replacements=m.c?.replacements||{};
 const exercises=strength?pickStrength(m.day,m.week,minutes,gear,excluded,prefs,replacements):
  pickCardio(m.day,m.week,g.VivaExercises?g.VivaExercises.apply(m.moves||[],gear,prefs,excluded,replacements):(m.moves||[]),m.low,recovery);
 const sets=strength?strengthSetCount(minutes,m.week,m.history||[],m.c?.feedback||{},m.today||new Date(),m.readiness?.status||'normal'):null;
 const targets=strength?Object.fromEntries(exercises.map(e=>[e.id,g.VivaEvolution?.strengthPrescription(e.id,m.history||[],m.c?.feedback||{},m.week,m.today||new Date(),m.readiness?.status||'normal')||null])):{};
 const reps=strength?(m.week<=2?'8–10':'8–12'):null;
 const rest= strength?Math.floor((main*60)/(Math.max(1,exercises.length)*sets))-(minutes===20?45:50):null;
 const intensity=recovery?'Bem leve, sem saltos e com liberdade para pausar':
  strength?'Movimentos controlados; termine cada série antes de perder a boa técnica.':
  minutes===20?'Ritmo leve a moderado, sem obrigação de saltar.':'Ritmo moderado confortável; você deve conseguir falar frases.';
 return {...m,moves:exercises,training:{type:strength?'strength':'cardio',warm,main,cool,sets,reps,rest,exercises,
  setsTotal:strength?sets*exercises.length:0,targets,intensity,recovery}};
}
function build(m){
 const p=m.training?m:prescribe(m),spec=p.training,total=p.duration*60,seq=[];let at=0;
 function add(phase,name,hint,seconds,extra={}){
  if(seconds<=0)return;
  seq.push({phase,name,hint,seconds,start:at,end:at+seconds,rest:false,...extra});at+=seconds;
 }
 function fullPhase(phase,length,source){
  let remaining=length*60,i=0;
  while(remaining>0){const sec=Math.min(30,remaining),e=source[i++%source.length];
   add(phase,e[0],e[1],sec);remaining-=sec}
 }
 fullPhase('Aquecimento',spec.warm,warmup);
 const mainSecs=spec.main*60;
 if(spec.type==='strength'){
  const exercise=spec.exercises,slots=exercise.length*spec.sets,slot=mainSecs/Math.max(1,slots);
  if(!exercise.length||!Number.isInteger(slot)||slot<65)throw Error('Volume de treino incompatível com a duração.');
  const work=p.duration===20?45:50,rest=slot-work;
  for(let ix=0;ix<exercise.length;ix++){
   for(let set=1;set<=spec.sets;set++){
    const e=exercise[ix]; add('Treino',e.name,e.hint,work,
      {id:e.id,mode:'strength',sets:spec.sets,setNumber:set,reps:String(spec.targets?.[e.id]?.target||8),rest:false});
    add('Treino',set===spec.sets&&ix===exercise.length-1?'Transição para alongamento':'Descanso entre séries',
      'Descanse, hidrate-se se necessário e ajuste o elástico com segurança.',rest,{mode:'strength',rest:true});
   }
  }
 }else{
  if(!spec.exercises.length)throw Error('Sem movimentos disponíveis para este treino.');
  let remaining=mainSecs,index=0;
  const moveTime=spec.recovery?30:p.week<=2?30:p.duration===45?45:40;
  const easyTime=60-moveTime;
  while(remaining>0){
   const e=spec.exercises[index++%spec.exercises.length],active=Math.min(moveTime,remaining);
   add('Treino',e.name,e.hint,active,{id:e.id,mode:'cardio'});remaining-=active;
   if(remaining>0){const easy=Math.min(easyTime,remaining);
    add('Treino',spec.recovery?'Respiração e caminhada leve':'Recuperação ativa',
      'Respire normalmente, dê passos lentos e prepare-se para o próximo movimento.',
      easy,{mode:'cardio',rest:true});remaining-=easy;}
  }
 }
 fullPhase('Alongamento',spec.cool,cooldown);
 if(at!==total||seq[0]?.start!==0||seq.at(-1)?.end!==total)throw Error('As fases não somam a duração do treino.');
 return seq;
}
function scheduleSummary(week,minutes=20,gear={mini:true,long:true}){
 const strengthDays=[0,2,4];
 return strengthDays.map(day=>{
  const exercises=pickStrength(day,week,minutes,gear,[]);
  return {day,sets:minutes===45?3:2,exercises:exercises.map(e=>e.id),
    patterns: day===0?['agachar','puxar','empurrar']:day===2?['quadril','unilateral','glúteos']:['puxar','empurrar','core']};
 });
}
function cardioGoals(week=1,done=0){
 const target=week<=2?30:week<=4?45:week<=8?60:week<=12?90:120;
 return {target,done:Math.max(0,Math.round(done)),remaining:Math.max(0,target-Math.max(0,Math.round(done))),
   longTerm:150,explanation:'Referência progressiva de atividade aeróbica semanal, não meta obrigatória. Caminhadas e outras atividades também contam.'};
}

const GROUPS={
 squat:['pernas','gluteos'],squatWide:['pernas','gluteos'],backLunge:['pernas','gluteos'],calf:['pernas'],
 bandHinge:['posteriores','gluteos'],hinge:['posteriores','gluteos'],bridge:['gluteos','posteriores'],miniBridge:['gluteos','posteriores'],
 miniWalk:['gluteos'],miniClam:['gluteos'],miniKick:['gluteos'],miniSquat:['pernas','gluteos'],
 row:['costas'],superman:['costas','core'],wallPush:['empurrar'],inclinePush:['empurrar'],
 bandPress:['empurrar'],bandLateral:['empurrar'],bandTriceps:['empurrar'],curl:['costas'],
 birdDog:['core'],deadBug:['core'],plank:['core'],standingCore:['core']
};
const GROUP_LABELS={pernas:'Pernas',gluteos:'Glúteos',posteriores:'Posterior',costas:'Costas',empurrar:'Peito, ombros e braços',core:'Abdômen e estabilidade'};
function weeklyMuscleSets(week=1,minutes=20,gear={mini:true,long:true},excluded=[],prefs={},replacements={},history=[],feedback={},today=new Date(),readinessState='normal'){
 const dosage=strengthSetCount(minutes,week,history,feedback,today,readinessState),counts=Object.fromEntries(Object.keys(GROUP_LABELS).map(id=>[id,0])),days=[];
 for(const day of [0,2,4]){
  const moves=pickStrength(day,week,minutes,gear,excluded,prefs,replacements);
  for(const e of moves)for(const group of GROUPS[e.id]||[])counts[group]+=dosage;
  days.push({day,sets:dosage,moves:moves.map(e=>e.id)});
 }
 return {counts,labels:GROUP_LABELS,days,totalSets:days.reduce((sum,d)=>sum+d.sets*d.moves.length,0),
  note:'Séries semanais planejadas. Um exercício pode contribuir para mais de um grupo; os números não medem intensidade nem comprovam séries executadas.'};
}

g.VivaTraining=Object.freeze({SPLITS,GROUPS,weeklyMuscleSets,strengthSetCount,split,pickStrength,prescribe,build,scheduleSummary,cardioGoals});
})(window);