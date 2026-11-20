(function(g){'use strict';
const DAYS=[
{title:'Força geral e técnica',kind:'Força',note:'Movimentos lentos; foco em aprender a execução.',required:true},
{title:'Cardio leve e mobilidade',kind:'Cardio',note:'Respiração confortável; evite se esgotar.',required:false},
{title:'Pernas e glúteos',kind:'Força',note:'Mini band opcional; preserve a técnica.',required:true},
{title:'Cardio e abdômen',kind:'Cardio',note:'Movimente-se sem precisar de saltos.',required:false},
{title:'Força geral e postura',kind:'Força',note:'Elástico opcional e movimentos controlados.',required:true}
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
 const first=allowed.slice(0,2),tail=allowed.slice(2);
 const off=((week-1)*3+day)%Math.max(1,tail.length);
 const varied=Array.from({length:Math.min(7,tail.length)},(_,i)=>tail[(off+i*3)%tail.length]).filter((x,i,a)=>a.indexOf(x)===i);
 const selected=[...first,...varied,...tail].filter((x,i,a)=>a.indexOf(x)===i).slice(0,Math.min(10,allowed.length));
 if(weightTrend==='subindo' && (day===1||day===3) && !selected.includes('march'))selected.splice(2,0,'march');
 return selected.map(k=>{let [name,hint,mode]=M[k];
   if(k==='skipping'){name=low?'Skipping sem salto':'Skipping';hint=low?'Marche elevando os joelhos sem saltar.':'Corra no lugar com passos leves; diminua o impacto se necessário.'}
   if(k==='imaginary'){name=low?'Corda imaginária sem saltar':'Pular corda imaginária';hint=low?'Gire os punhos e alterne os pés sem salto.':'Gire os punhos e salte baixo, suavemente, se estiver confortável.'}
   return {name,hint,gear:mode};
 });
}
function getPerformance(history=[],coach={},today=new Date()){
 const last14=new Date(dateOnly(today));last14.setDate(last14.getDate()-14);
 const last28=new Date(dateOnly(today));last28.setDate(last28.getDate()-28);
 const sessions=history.filter(x=>x.coach&&x.date&&new Date(x.date)<=today);
 const c14=sessions.filter(x=>new Date(x.date)>=last14).length;
 const c28=sessions.filter(x=>new Date(x.date)>=last28).length;
 const feedback=coach.feedback||{};
 const vals=sessions.filter(x=>feedback[x.coachId]).slice(-5).map(x=>feedback[x.coachId]);
 const pain=vals.some(x=>x.pain);
 const highFatigue=vals.length>0 && vals.some(x=>x.effort>=8);
 const checkins=(coach.checkins||[]).slice(-2);
 const sore=checkins.some(x=>x.soreness>=3||x.pain);
 return {c14,c28,pain,highFatigue,sore,ready:!(pain||highFatigue||sore)};
}
function duration(week,history,coach,today=new Date()){
 const perf=getPerformance(history,coach,today);
 if(!perf.ready)return 20;
 if(week<=2)return 20;
 if(week<=4)return perf.c14>=4?30:20;
 if(week<=8)return perf.c14>=4?30:20;
 return perf.c28>=13?45:perf.c14>=4?30:20;
}
function weightsTrend(weighIns=[]){
 const list=[...weighIns].filter(x=>Number.isFinite(Number(x.kg))&&/^\d{4}-\d{2}-\d{2}$/.test(x.day)).sort((a,b)=>a.day.localeCompare(b.day));
 if(list.length<3)return 'indefinida';
 const three=list.slice(-3);
 const span=(new Date(three[2].day+'T12:00:00')-new Date(three[0].day+'T12:00:00'))/86400000;
 if(span<12)return 'indefinida';
 const d1=three[1].kg-three[0].kg,d2=three[2].kg-three[1].kg,total=three[2].kg-three[0].kg;
 if(d1>0.1&&d2>0.1&&total>=0.5)return 'subindo';
 if(d1<-.1&&d2<-.1&&total<=-.5)return 'descendo';
 return 'oscilando';
}
function guidance(week,perf,trend){
 if(!perf.ready)return 'Ajuste de recuperação: reduza a intensidade, prefira exercícios sem impacto e procure orientação se houver dor.';
 if(week<=2)return 'Adaptação inicial: priorize aprender os movimentos. Três dias de força são a base; cardio leve é opcional.';
 if(trend==='subindo')return 'Houve alta persistente em três registros. O treino terá mais variedade aeróbica leve, sem deixar a musculação de lado. Uma pesagem isolada não altera o plano.';
 if(trend==='descendo')return 'Tendência de redução de peso: mantenha a musculação para desenvolver força. Aumentos de dificuldade dependem da recuperação.';
 if(week>=5)return 'Revisão do ciclo: mantenha exercícios principais para acompanhar força e varie os complementares conforme desempenho.';
 return 'Continue com constância. O professor usa frequência, recuperação e tendência de peso, não apenas a balança.';
}
g.VivaCoach=Object.freeze({DAYS,getDay,weekOf,weekKey,movesFor,getPerformance,duration,weightsTrend,guidance,daysSince});
})(window);