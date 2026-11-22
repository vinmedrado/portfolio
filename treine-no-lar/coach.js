(function(g){'use strict';
const DAYS=[
{title:'Corpo inteiro',kind:'Força',note:'Agachamento, remada e flexão com execução controlada.',required:true},
{title:'Cardio em intervalos',kind:'Cardio',note:'Marcha, corda simulada e deslocamentos, com pausas.',required:false},
{title:'Pernas e glúteos',kind:'Força',note:'Quadril, pernas e glúteos. Elásticos opcionais.',required:true},
{title:'Cardio e estabilidade',kind:'Cardio',note:'Cardio leve e movimentos para estabilidade do tronco.',required:false},
{title:'Costas, peito e abdômen',kind:'Força',note:'Remada, flexão e controle do tronco.',required:true}
];
const M={
 squat:['Agachamento controlado','Sente o quadril para trás. Joelhos acompanhando a direção dos pés.','body'],
 squatWide:['Agachamento sumô','Afaste os pés de forma confortável e desça devagar.','body'],
 wallPush:['Flexão na parede','Corpo alinhado, aproxime o peito da parede e empurre.','body'],
 inclinePush:['Flexão com apoio firme','Use uma parede ou superfície estável. Mantenha o tronco alinhado.','body'],
 bridge:['Ponte de glúteos','Eleve o quadril e contraia os glúteos sem arquear as costas.','body'],
 march:['Marcha ativa','Caminhe no lugar elevando os joelhos sem saltar.','body'],
 step:['Passos laterais','Dê passos largos e use os braços para aumentar o movimento.','body'],
 backLunge:['Passada reversa curta','Dê um passo para trás com controle; apoie-se se precisar.','body'],
 calf:['Elevação de panturrilhas','Suba e desça os calcanhares lentamente.','body'],
 birdDog:['Bird dog','Em quatro apoios, estenda braço e perna opostos sem girar o tronco.','body'],
 deadBug:['Dead bug','Deitado, alterne braço e perna opostos com abdômen firme.','body'],
 kneeDrive:['Elevação alternada de joelhos','Eleve um joelho de cada vez, postura ereta.','body'],
 imaginary:['Corda imaginária','Gire os punhos como se segurasse uma corda.','body'],
 skipping:['Skipping','Alterne os joelhos no lugar.','body'],
 plank:['Prancha adaptada','Apoie os joelhos ou a parede. Respire sem prender o ar.','body'],
 standingCore:['Abdômen em pé','Eleve o joelho em direção ao cotovelo oposto com controle.','body'],
 punch:['Boxe leve no ar','Movimente os braços com golpes controlados, sem travar o cotovelo.','body'],
 toeTap:['Toques à frente','Alterne toques dos pés à frente, movimentando os braços.','body'],
 hinge:['Dobradiça de quadril','Empurre o quadril para trás mantendo a coluna neutra.','body'],
 superman:['Extensão de costas leve','De bruços, eleve suavemente o peito sem forçar a lombar.','body'],
 miniWalk:['Passos laterais com mini band','Banda acima dos joelhos, dê pequenos passos sem colapsar os joelhos.','mini'],
 miniBridge:['Ponte com mini band','Banda acima dos joelhos; eleve quadril mantendo joelhos alinhados.','mini'],
 miniSquat:['Agachamento com mini band','Banda acima dos joelhos; agache de forma curta e controlada.','mini'],
 miniClam:['Abdução lateral com mini band','De lado, joelhos flexionados, abra o joelho de cima sem girar o quadril.','mini'],
 miniKick:['Extensão de quadril com mini band','Com apoio firme e banda acima dos joelhos, leve uma perna para trás sem inclinar o tronco.','mini'],
 row:['Remada com elástico','Pise firmemente no centro do elástico, incline o quadril e puxe as pontas em direção ao tronco.','long'],
 curl:['Rosca bíceps com elástico','Pise no centro e flexione os cotovelos próximos ao corpo.','long'],
 bandHinge:['Terra romeno com elástico','Pise no centro e leve o quadril para trás com coluna neutra.','long'],
 bandPress:['Pressão frontal com elástico','Segure o elástico atrás das costas, sem fixá-lo em móveis; empurre à frente lentamente.','long'],
 bandLateral:['Elevação lateral com elástico','Pise no centro e eleve os braços apenas até uma amplitude confortável.','long'],
 bandTriceps:['Tríceps com elástico','Segure uma ponta com a mão junto ao tronco e estenda o outro braço sem prender em objetos.','long']
};
const POOLS=[
['squat','row','wallPush','bridge','birdDog','curl','miniWalk','hinge','standingCore','bandPress','calf','superman','deadBug','step'],
['march','skipping','imaginary','step','toeTap','punch','kneeDrive','standingCore','calf','deadBug','birdDog'],
['squat','miniWalk','bridge','bandHinge','backLunge','miniSquat','calf','miniClam','squatWide','miniBridge','miniKick','hinge','deadBug','step'],
['skipping','imaginary','punch','toeTap','standingCore','step','kneeDrive','plank','birdDog','march','deadBug','calf'],
['row','squatWide','wallPush','curl','bandPress','backLunge','bridge','bandLateral','plank','bandTriceps','superman','hinge','miniWalk','deadBug']
];
function dateOnly(date){const d=new Date(date);return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function daysSince(start,today){return Math.max(0,Math.floor((dateOnly(today)-dateOnly(start))/86400000))}
function weekOf(coach,today){if(!coach?.startedAt)return 1;return Math.floor(daysSince(coach.startedAt,today)/7)+1}
function weekKey(today){const d=dateOnly(today);d.setDate(d.getDate()-(d.getDay()+6)%7);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function getDay(day){return DAYS[Math.min(4,Math.max(0,day))]}
function movesFor(day,week,gear={},low=true,weightTrend='indefinida'){
 const pool=POOLS[day]||POOLS[0],allowed=pool.filter(k=>{const mode=M[k][2];return mode==='body'||mode==='mini'&&gear.mini||mode==='long'&&gear.long});
 const anchor=allowed.slice(0,2),remaining=allowed.slice(2);
 // As três primeiras posições complementares identificam unicamente cada semana da biblioteca.
 const picked=[];let rank=Math.max(0,Math.floor(week)-1);
 for(let i=0;i<Math.min(3,remaining.length);i++){const idx=rank%remaining.length;rank=Math.floor(rank/remaining.length);picked.push(remaining.splice(idx,1)[0]);}
 let seed=((Math.imul(week+1,2654435761)^Math.imul(day+1,2246822519))>>>0)||1;
 for(let i=remaining.length-1;i>0;i--){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const idx=(seed>>>0)%(i+1);[remaining[idx],remaining[i]]=[remaining[i],remaining[idx]];}
 const chosen=[...anchor,...picked,...remaining].slice(0,Math.min(10,allowed.length));
 return chosen.map(k=>{let [name,hint,mode]=M[k];
   if(k==='skipping'){name=low?'Skipping sem salto':'Skipping';hint=low?'Marche elevando os joelhos sem saltar.':'Corra no lugar com passos leves; diminua o impacto se necessário.'}
   if(k==='imaginary'){name=low?'Corda imaginária sem saltar':'Pular corda imaginária';hint=low?'Gire os punhos e alterne os pés sem salto.':'Gire os punhos e salte baixo, suavemente, se estiver confortável.'}
   return {id:k,name,hint,gear:mode};
 });
}
function getPerformance(history=[],coach={},today=new Date()){
 const date=dateOnly(today),d7=new Date(date),d14=new Date(date),d28=new Date(date);
 d7.setDate(d7.getDate()-7);d14.setDate(d14.getDate()-14);d28.setDate(d28.getDate()-28);
 const valid=history.filter(x=>x&&x.coach&&x.date&&!Number.isNaN(Date.parse(x.date))&&new Date(x.date)<=today).sort((a,b)=>new Date(a.date)-new Date(b.date));
 const c14=new Set(valid.filter(x=>new Date(x.date)>=d14).map(x=>x.day)).size;
 const c28=new Set(valid.filter(x=>new Date(x.date)>=d28).map(x=>x.day)).size;
 const feedback=coach.feedback||{};
 const recent=valid.filter(x=>new Date(x.date)>=d7&&feedback[x.coachId]).map(x=>feedback[x.coachId]);
 const last=recent.at(-1)||null;
 const pain=!!last?.pain;
 const highFatigue=!!last&&Number(last.effort)>=8;
 const currentCheckin=(coach.checkins||[]).filter(x=>x.day&&!Number.isNaN(Date.parse(x.day))&&dateOnly(x.day)>=d7&&dateOnly(x.day)<=date).sort((a,b)=>a.day.localeCompare(b.day)).at(-1)||null;
 const sore=!!currentCheckin&&(Number(currentCheckin.soreness)>=3||!!currentCheckin.pain);
 const lowEnergy=!!currentCheckin&&Number(currentCheckin.energy)<=2;
 return {c14,c28,pain,highFatigue,sore,lowEnergy,ready:!(pain||highFatigue||sore||lowEnergy),latestEffort:last?Number(last.effort):null};
}
function duration(week,history,coach,today=new Date()){
 const p=getPerformance(history,coach,today);
 if(!p.ready||week<=2)return 20;
 if(week<=8)return p.c14>=4?30:20;
 // Só propõe 45 minutos após adaptação prolongada e frequência sustentada.
 return week>=13&&p.c28>=14&&p.latestEffort!==null&&p.latestEffort<=6?45:p.c14>=4?30:20;
}
function weightsTrend(weighIns=[]){
 const list=[...weighIns].filter(x=>x&&Number.isFinite(Number(x.kg))&&/^\d{4}-\d{2}-\d{2}$/.test(x.day)).sort((a,b)=>a.day.localeCompare(b.day));
 if(list.length<3)return 'indefinida';
 const three=list.slice(-3).map(x=>({day:x.day,kg:Number(x.kg)}));
 const span=(new Date(three[2].day+'T12:00:00')-new Date(three[0].day+'T12:00:00'))/86400000;
 const gap1=(new Date(three[1].day+'T12:00:00')-new Date(three[0].day+'T12:00:00'))/86400000;
 const gap2=(new Date(three[2].day+'T12:00:00')-new Date(three[1].day+'T12:00:00'))/86400000;
 if(span<12||gap1<5||gap2<5)return 'indefinida';
 const d1=three[1].kg-three[0].kg,d2=three[2].kg-three[1].kg,total=three[2].kg-three[0].kg;
 const change=Math.max(.5,three[0].kg*.005);
 if(d1>.1&&d2>.1&&total>=change)return 'subindo';
 if(d1<-.1&&d2<-.1&&total<=-change)return 'descendo';
 return 'oscilando';
}
function guidance(week,perf,trend){
 if(perf.pain||perf.sore)return 'Dor ou desconforto relatado. Não force a atividade e procure avaliação se persistir.';
 if(perf.highFatigue||perf.lowEnergy)return 'Recuperação abaixo do habitual. Reduza a intensidade ou descanse.';
 if(week<=2)return 'Primeiras duas semanas: aprenda a execução, mantenha o esforço leve e respeite os descansos.';
 if(trend==='subindo')return 'Peso em alta nas últimas pesagens. Observe cintura e frequência antes de alterar o treino.';
 if(trend==='descendo')return 'Peso em redução. Mantenha os dias de força e a recuperação entre as sessões.';
 if(week>=5)return 'Na revisão, compare frequência, execução e esforço antes de aumentar a resistência.';
 return 'A progressão considera frequência, esforço e recuperação.';
}
function prescription(week,day,history=[],coach={},today=new Date()){
 const perf=getPerformance(history,coach,today),minutes=duration(week,history,coach,today);
 const strength=(DAYS[day]||DAYS[0]).kind==='Força';
 const feedback=coach.feedback||{};
 const oldest=new Date(dateOnly(today));oldest.setDate(oldest.getDate()-28);
 const recent=history.filter(x=>x?.coach&&x.coachId&&x.date&&Number.isFinite(Date.parse(x.date))&&Date.parse(x.date)<=today.getTime()&&new Date(x.date)>=oldest&&DAYS[x.coachDay]?.kind==='Força'&&!x.coachRecovery&&feedback[x.coachId])
   .sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(-3).map(x=>feedback[x.coachId]);
 const lastTwo=recent.slice(-2);
 const goodForm=lastTwo.every(x=>!x.pain&&x.technique!=='insegura');
 const easy=week>2&&strength&&perf.ready&&lastTwo.length===2&&goodForm&&lastTwo.every(x=>Number(x.effort)<=5);
 const difficult=lastTwo.some(x=>Number(x.effort)>=8||x.technique==='insegura'||x.pain);
 const loadHint=!strength?'Mantenha um ritmo que permita conversar e reduza a velocidade se necessário.'
  :!perf.ready||difficult?'Prefira resistência mais leve e movimentos controlados. Não avance a tensão hoje.'
  :easy?'Dois treinos de força recentes foram leves e bem executados. É possível testar uma resistência um pouco maior.'
  :'Escolha uma resistência que permita concluir as repetições com controle. Não aumente a tensão se a técnica piorar.';
 const effortTarget=perf.ready?'Esforço percebido sugerido: de leve a moderado, aproximadamente 4–6/10.':'Hoje priorize a recuperação; se houver dor, interrompa e procure orientação.';
 const phase=week<=2?'Adaptação':week<=4?'Consolidação':week<=8?'Desenvolvimento':'Evolução';
 return {minutes,strength,phase,loadHint,effortTarget,ready:perf.ready,needsPainCare:perf.pain||perf.sore,progression:easy?'aumentar-opcional':difficult?'reduzir':'manter',c14:perf.c14,c28:perf.c28};
}

const LIBRARY_SIZE=365;
function catalogItem(number,gear={mini:true,long:true},low=true){
 const n=Math.max(1,Math.min(LIBRARY_SIZE,Math.floor(Number(number)||1)));
 const day=(n-1)%5,week=Math.floor((n-1)/5)+1,d=DAYS[day];
 return {number:n,week,day,kind:d.kind,title:d.title,required:d.required,
  moves:movesFor(day,week,gear,low),phase:week<=2?'Adaptação':week<=4?'Consolidação':week<=8?'Desenvolvimento':'Evolução',
  plannedTime:week<=2?20:week<=12?30:45};
}
function catalogPage(page=1,pageSize=10,gear={},low=true){
 const size=Math.max(5,Math.min(25,Number(pageSize)||10)),pages=Math.ceil(LIBRARY_SIZE/size);
 const current=Math.min(pages,Math.max(1,Math.floor(Number(page)||1))),start=(current-1)*size;
 return {page:current,pages,total:LIBRARY_SIZE,items:Array.from({length:Math.min(size,LIBRARY_SIZE-start)},(_,i)=>catalogItem(start+i+1,gear,low))};
}
function sessionStats(history=[],today=new Date()){
 const wk=dateOnly(today),last28=dateOnly(today);
 wk.setDate(wk.getDate()-(wk.getDay()+6)%7);last28.setDate(last28.getDate()-27);
 const valid=history.filter(x=>x?.coach&&x.date&&Number.isFinite(Date.parse(x.date))&&new Date(x.date)<=today);
 const thisWeek=valid.filter(x=>new Date(x.date)>=wk),thisMonth=valid.filter(x=>new Date(x.date)>=last28);
 return {totalCoach:valid.length,totalDays:new Set(valid.map(x=>x.day)).size,
 weekDays:new Set(thisWeek.map(x=>x.day)).size,weekMinutes:thisWeek.reduce((sum,x)=>sum+(Number(x.duration)||0),0),
 monthDays:new Set(thisMonth.map(x=>x.day)).size,strengthDays:new Set(thisWeek.filter(x=>DAYS[x.coachDay]?.kind==='Força'&&!x.coachRecovery).map(x=>x.day)).size};
}
function cycleReview(coach={},history=[],weighIns=[],today=new Date()){
 const week=weekOf(coach,today),perf=getPerformance(history,coach,today),trend=weightsTrend(weighIns);
 const cycle=Math.floor((week-1)/4)+1,weekOfCycle=((week-1)%4)+1,due=weekOfCycle===4||weekOfCycle===1&&week>1;
 const status=!perf.ready?'recuperacao':perf.c28<6?'construir-habito':'evoluir';
 const summary=status==='recuperacao'?'Recuperação insuficiente relatada. Reduza o esforço e não treine com dor.'
 :status==='construir-habito'?'Frequência abaixo da referência. Priorize manter a rotina antes de aumentar a carga.'
 :trend==='subindo'?'Antes de ajustar o cardio, observe peso, cintura e frequência por mais algumas semanas.'
 :trend==='descendo'?'Peso em queda nas últimas pesagens. Mantenha a força e ajuste a dificuldade apenas se estiver recuperado.'
 :'Frequência adequada. Mantenha os exercícios principais e ajuste a carga conforme a execução.';
 return {week,cycle,weekOfCycle,due,status,summary,metric28:perf.c28,trend};
}

function getExercise(id){const x=M[id];return x?{id,name:x[0],hint:x[1],gear:x[2]}:null}
g.VivaCoach=Object.freeze({DAYS,LIBRARY_SIZE,catalogItem,catalogPage,sessionStats,cycleReview,getExercise,getDay,weekOf,weekKey,movesFor,getPerformance,duration,weightsTrend,guidance,prescription,daysSince});
})(window);