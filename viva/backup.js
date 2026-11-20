(function(g){'use strict';
const DAY=/^\d{4}-\d{2}-\d{2}$/, ID=/^viva-\d{8,18}-\d{1,6}$/;
const names=['Força geral e técnica','Cardio leve e mobilidade','Pernas e glúteos','Cardio e abdômen','Força geral e postura'];
const validDay=s=>typeof s==='string'&&DAY.test(s)&&new Date(s+'T12:00:00').toLocaleDateString('sv-SE')===s;
const validISO=s=>typeof s==='string'&&Number.isFinite(Date.parse(s))&&/^\d{4}-\d{2}-\d{2}T/.test(s);
const number=(v,min,max,fallback=null)=>Number.isFinite(Number(v))&&Number(v)>=min&&Number(v)<=max?Number(v):fallback;
function normalize(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Dados inválidos.');
 const d={
  duration:[20,30,45].includes(Number(input.duration))?Number(input.duration):20,
  low:input.low!==false,sound:input.sound!==false,voice:input.voice!==false,countdown:input.countdown!==false,
  volume:number(input.volume,0,1,.45),history:[],
  profile:{heightCm:null,age:null,weighIns:[]},
  coach:{startedAt:null,gear:{mini:false,long:false},excluded:[],checkins:[],feedback:{},readiness:null,strengthLogs:[],selectedDay:null,selectedDate:null}
 };
 const p=input.profile||{};
 d.profile.age=number(p.age,20,110);
 d.profile.heightCm=number(p.heightCm,120,230);
 const weigh=new Map();
 for(const x of Array.isArray(p.weighIns)?p.weighIns.slice(-1500):[]){
  if(!validDay(x?.day))continue;
  const kg=number(x.kg,30,350);
  if(kg!==null)weigh.set(x.day,{day:x.day,kg});
 }
 d.profile.weighIns=[...weigh.values()].sort((a,b)=>a.day.localeCompare(b.day));
 for(const h of Array.isArray(input.history)?input.history.slice(-5000):[]){
  if(!validISO(h?.date)||!validDay(h?.day))continue;
  const duration=number(h.duration,20,45);if(![20,30,45].includes(duration))continue;
  const item={date:new Date(h.date).toISOString(),day:h.day,duration};
  if(h.coach&&Number.isInteger(h.coachDay)&&h.coachDay>=0&&h.coachDay<=4){
   item.coach=true;item.coachDay=h.coachDay;
   item.coachWeek=number(h.coachWeek,1,600,1);
   item.coachFocus=h.coachRecovery===true?'Movimento leve e mobilidade':names[h.coachDay];item.coachRecovery=h.coachRecovery===true;item.coachAnchors=(Array.isArray(h.coachAnchors)?h.coachAnchors:[]).filter(id=>typeof id==='string'&&!!g.VivaCoach?.getExercise(id)).slice(0,2);
   if(ID.test(h.coachId||''))item.coachId=h.coachId;
  }
  d.history.push(item);
 }
 const c=input.coach||{};
 d.coach.startedAt=validISO(c.startedAt)?new Date(c.startedAt).toISOString():null;
 d.coach.gear={mini:!!c.gear?.mini,long:!!c.gear?.long};
 d.coach.excluded=[...new Set((Array.isArray(c.excluded)?c.excluded:[]).filter(id=>typeof id==='string'&&/^[a-zA-Z]{2,24}$/.test(id)&&(!g.VivaCoach||!!g.VivaCoach.getExercise(id))))].slice(0,40);
 d.coach.selectedDay=Number.isInteger(c.selectedDay)&&c.selectedDay>=0&&c.selectedDay<=4?c.selectedDay:null;
 d.coach.selectedDate=validDay(c.selectedDate)?c.selectedDate:null;
 d.coach.readiness=g.VivaEvolution?.sanitizeReadiness(c.readiness,new Date())||null;
 d.coach.strengthLogs=(Array.isArray(c.strengthLogs)?c.strengthLogs:[]).slice(-1000).map(x=>g.VivaEvolution?.sanitizeStrengthLog(x)).filter(Boolean).sort((a,b)=>a.date.localeCompare(b.date));
 const check=new Map();
 for(const x of Array.isArray(c.checkins)?c.checkins.slice(-1000):[]){
  if(!validDay(x?.day)||!validDay(x?.weekKey))continue;
  const item={day:x.day,weekKey:x.weekKey,energy:number(x.energy,1,5,3),soreness:number(x.soreness,0,3,0),pain:!!x.pain,waist:number(x.waist,40,200)};
  check.set(item.weekKey,item);
 }
 d.coach.checkins=[...check.values()].sort((a,b)=>a.weekKey.localeCompare(b.weekKey));
 const ids=new Set(d.history.map(x=>x.coachId).filter(Boolean)),source=c.feedback||{};
 for(const id of ids){
  const f=source[id];if(!f||typeof f!=='object')continue;
  const effort=number(f.effort,1,10,null);
  if(effort===null)continue;
  d.coach.feedback[id]={effort,technique:f.technique==='insegura'?'insegura':'boa',pain:!!f.pain,date:validISO(f.date)?new Date(f.date).toISOString():null};
 }
 return d;
}
function serialize(data){
 return JSON.stringify({format:'viva-backup-v1',exportedAt:new Date().toISOString(),data:normalize(data)},null,2);
}
function parse(content){
 if(typeof content!=='string'||content.length>1200000)throw Error('Arquivo muito grande ou formato inválido.');
 let obj;try{obj=JSON.parse(content)}catch{throw Error('Não foi possível ler o JSON.');}
 if(obj?.format!=='viva-backup-v1'||!obj?.data)throw Error('Este arquivo não é um backup do VIVA.');
 const data=normalize(obj.data);
 return {data,stats:{trainings:data.history.length,weighIns:data.profile.weighIns.length,checkins:data.coach.checkins.length}};
}
g.VivaBackup=Object.freeze({normalize,serialize,parse});
})(window);