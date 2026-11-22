(function(g){'use strict';
const reDate=/^\d{4}-\d{2}-\d{2}$/;
const dayKey=(now=new Date())=>{const d=new Date(now);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const valid=(x,min,max)=>x!==null&&x!==undefined&&x!==''&&Number.isInteger(Number(x))&&Number(x)>=min&&Number(x)<=max?Number(x):null;
function sanitizeReadiness(raw,now=new Date()){
 if(!raw||typeof raw!=='object')return null;
 const energy=valid(raw.energy,1,5),soreness=valid(raw.soreness,0,3),sleep=valid(raw.sleep,0,12);
 if(energy===null||soreness===null||sleep===null)return null;
 const day=raw.day===dayKey(now)?raw.day:null;
 return day?{day,energy,soreness,sleep,pain:raw.pain===true,warning:raw.warning===true}:null;
}
function readiness(raw,now=new Date()){
 const data=sanitizeReadiness(raw,now);
 if(!data)return {status:'pending',canStart:false,title:'Registro diário pendente',description:'Registre energia, sono e desconfortos antes do treino.',durationCap:null,low:false,recovery:false};
 if(data.warning||data.pain)return {status:'stop',canStart:false,title:'Não inicie o circuito agora',description:'Você sinalizou dor incomum ou sintomas importantes. Não force os exercícios; procure orientação de um profissional de saúde. Sintomas intensos ou súbitos exigem atendimento imediato.',durationCap:0,low:true,recovery:false};
 if(data.soreness===3)return {status:'rest',canStart:false,title:'Priorize a recuperação hoje',description:'Há dor muscular forte registrada. Evite a sessão estruturada hoje; descanse e procure orientação se não melhorar ou se piorar.',durationCap:0,low:true,recovery:false};
 if(data.energy<=2||data.sleep<=5||data.soreness===2)return {status:'light',canStart:true,title:'Sessão leve recomendada',description:'Reduzimos para 20 minutos com exercícios sem impacto. Faça somente o que estiver confortável; descansar também é uma opção.',durationCap:20,low:true,recovery:true};
 return {status:'normal',canStart:true,title:'Treino liberado',description:'Mantenha a execução controlada e ajuste o esforço conforme a recuperação durante o treino.',durationCap:null,low:false,recovery:false};
}
const RECOVERY=['march','step','birdDog','toeTap','kneeDrive','calf','standingCore','deadBug'];
function adapt(base,raw,now=new Date()){
 const state=readiness(raw,now),C=g.VivaCoach;
 const minutes=state.durationCap?Math.min(base.duration,state.durationCap):base.duration;
 let moves=base.moves,kind=base.d?.kind||'Funcional',title=base.d?.title||'Treino personalizado';
 if(state.recovery){
  moves=RECOVERY.map(id=>C?.getExercise(id)).filter(x=>x&&!(base.c?.excluded||[]).includes(x.id));
  kind='Recuperação ativa';title='Movimento leve e mobilidade';
 }
 return {...base,duration:minutes,low:base.low||state.low,moves,kind,title,readiness:state};
}
function sanitizeStrengthLog(raw){
 if(!raw||typeof raw!=='object')return null;
 const id=typeof raw.id==='string'?raw.id:'';
 if(!g.VivaCoach?.getExercise(id))return null;
 if(!/^\d{4}-\d{2}-\d{2}T/.test(raw.date||'')||!Number.isFinite(Date.parse(raw.date)))return null;
 const difficulty=['easy','ok','hard'].includes(raw.difficulty)?raw.difficulty:null;
 const band=['none','light','medium','heavy'].includes(raw.band)?raw.band:null;
 const technique=['boa','insegura'].includes(raw.technique)?raw.technique:null;
 if(!difficulty||!band||!technique)return null;
 return {id,date:new Date(raw.date).toISOString(),difficulty,band,technique,pain:raw.pain===true};
}
function exerciseAdvice(id,entries=[],now=new Date()){
 if(!g.VivaCoach?.getExercise(id))return {status:'unknown',title:'Exercício desconhecido',description:''};
 const cutoff=new Date(now);cutoff.setDate(cutoff.getDate()-35);
 const logs=(Array.isArray(entries)?entries:[]).map(sanitizeStrengthLog).filter(x=>x?.id===id&&new Date(x.date)>=cutoff&&new Date(x.date)<=now).sort((a,b)=>a.date.localeCompare(b.date));
 const last=logs.at(-1),recent=logs.slice(-2);
 if(!last)return {status:'initial',title:'Comece com resistência leve',description:'Comece com resistência confortável e registre como se sentiu após o treino.',count:0};
 if(last.pain||last.technique==='insegura'||last.difficulty==='hard')return {status:'reduce',title:'Mantenha ou reduza a dificuldade',description:'Priorize execução estável. Reduza a resistência e interrompa se houver dor.',count:logs.length};
 if(recent.length>=2&&recent.every(x=>!x.pain&&x.technique==='boa'&&x.difficulty==='easy'))
   return {status:'progress',title:'Pode aumentar a resistência',description:'Nas duas últimas sessões este exercício pareceu fácil e estável. Se estiver confortável, experimente uma resistência ligeiramente maior; a técnica deve continuar segura.',count:logs.length};
 return {status:'maintain',title:'Mantenha a resistência',description:'Continue consolidando a execução antes de aumentar a tensão do elástico ou a dificuldade.',count:logs.length};
}

/** Per-exercise double progression. Based only on user-reported, completed sets, not elapsed time. */
function strengthPrescription(id,history=[],feedback={},week=1,now=new Date(),readinessState='normal'){
 const max=week<=2?10:12,baseline={id,target:8,range:'8–'+max,status:'baseline',
  title:'Comece com 8 repetições controladas',description:'Registre todas as séries e como se sentiu. O ajuste depende de pelo menos dois treinos registrados.',bandSuggestion:null,completeSessions:0};
 if(!g.VivaCoach?.getExercise(id))return {...baseline,status:'unknown'};
 const cutoff=new Date(now);cutoff.setDate(cutoff.getDate()-42);
 const sessions=(Array.isArray(history)?history:[]).filter(h=>h&&h.coach&&h.coachRecovery!==true&&h.date
   &&Number.isFinite(Date.parse(h.date))&&new Date(h.date)>=cutoff&&new Date(h.date)<=now
   &&Array.isArray(h.setLogs)&&h.setLogs.some(x=>x.id===id))
   .map(h=>{
     const bySet=new Map();for(const raw of h.setLogs){
      const x=g.VivaExercises?.sanitizeSetLog(raw);
      if(x?.id===id)bySet.set(x.setNumber,x);
     }
     const logs=[...bySet.values()].sort((a,b)=>a.setNumber-b.setNumber);
     const fb=feedback?.[h.coachId]||null;
     return {date:new Date(h.date),day:h.day,logs,feedback:fb,
       complete:logs.length>=2,band:logs[0]?.band||null};
   }).sort((a,b)=>a.date-b.date);
 if(!sessions.length)return baseline;
 const last=sessions.at(-1);
 const redFlag=last.logs.some(x=>x.difficulty==='hard'||x.technique!=='boa')
    ||last.feedback?.pain===true||last.feedback?.technique==='insegura'
    ||Number(last.feedback?.effort)>=8;
 if(redFlag)return {...baseline,status:'ease',title:'Mantenha ou reduza a dificuldade',
   description:'Houve esforço muito alto, dor ou dificuldade técnica no último registro. Não aumente a resistência. Interrompa movimentos dolorosos.',completeSessions:sessions.filter(x=>x.complete).length};
 const complete=sessions.filter(x=>x.complete);
 const prev=complete.at(-2),current=complete.at(-1);
 if(!prev||!current||!prev.feedback||!current.feedback||readinessState!=='normal'){
   return {...baseline,status:'hold',title:'Mantenha a carga atual',
    description:'Ainda faltam dois treinos completos com esforço e técnica avaliados, ou a recuperação pede cautela.',completeSessions:complete.length};
 }
 const gap=Math.abs(current.date-prev.date)/86400000;
 const logs=[...prev.logs,...current.logs];
 const safeFeedback=[prev.feedback,current.feedback].every(x=>x.pain!==true&&x.technique==='boa'&&Number(x.effort)>=1&&Number(x.effort)<=7);
 const safeSets=logs.every(x=>x.repsDone>=8&&x.repsDone<=30&&x.technique==='boa'&&x.difficulty!=='hard');
 const sameResistance=logs.every(x=>x.band===logs[0].band);
 if(gap<1||!safeFeedback||!safeSets||!sameResistance)
   return {...baseline,status:'hold',title:'Consolide a execução',
     description:'Registre séries com boa técnica, esforço moderado e resistência comparável em dias diferentes antes de progredir.',
     completeSessions:complete.length};
 const lowest=Math.min(...logs.map(x=>x.repsDone)),next=Math.min(max,lowest+1);
 if(lowest<max){
   return {...baseline,target:next,status:'reps',title:'Alvo ajustado para '+next+' repetições',
     description:'As duas últimas sessões completas tiveram execução estável. A meta de repetições sobe apenas um passo. Se a técnica piorar, volte ao nível anterior.',
     completeSessions:complete.length};
 }
 const gear=g.VivaCoach.getExercise(id)?.gear,band=logs[0].band;
 const nextBand=band==='light'?'medium':band==='medium'?'heavy':null;
 const canUpgrade=week>2&&(gear==='mini'||gear==='long')&&nextBand;
 return {...baseline,target:max,range:baseline.range,status:canUpgrade?'band':'maintain',
   title:canUpgrade?'Pode testar uma resistência maior':'Mantenha o controle das repetições',
   description:canUpgrade?'Você concluiu pelo menos duas sessões com o limite de repetições e boa técnica. Se estiver confortável, experimente a próxima resistência; é opcional e você deve voltar à mais leve se perder controle.':'Continue com o mesmo nível até que seja seguro variar a dificuldade.',
   bandSuggestion:canUpgrade?nextBand:null,completeSessions:complete.length};
}

function strengthHighlights(entries=[],now=new Date(),limit=4){
 const byId=new Map();
 for(const entry of Array.isArray(entries)?entries:[]){
  const item=sanitizeStrengthLog(entry);
  if(item&&!byId.has(item.id))byId.set(item.id,[]);
  if(item)byId.get(item.id).push(item);
 }
 const out=[...byId].map(([id,values])=>({id,name:g.VivaCoach.getExercise(id).name,latest:values.sort((a,b)=>a.date.localeCompare(b.date)).at(-1),
  advice:exerciseAdvice(id,values,now)})).sort((a,b)=>b.latest.date.localeCompare(a.latest.date));
 return out.slice(0,Math.max(1,Math.min(10,Number(limit)||4)));
}
function weightWaistInsight(weighIns=[],checkins=[]){
 const w=(Array.isArray(weighIns)?weighIns:[]).filter(x=>x&&reDate.test(x.day)&&Number.isFinite(Number(x.kg))).sort((a,b)=>a.day.localeCompare(b.day));
 const c=(Array.isArray(checkins)?checkins:[]).filter(x=>x&&reDate.test(x.day)&&Number(x.waist)>=40&&Number(x.waist)<=200).sort((a,b)=>a.day.localeCompare(b.day));
 if(w.length<3)return {status:'early',title:'Sem dados suficientes',description:'Registre o peso em condições semelhantes, preferencialmente uma vez por semana. Não altere o treino por uma pesagem.'};
 const first=w[0],last=w.at(-1),span=(new Date(last.day+'T12:00:00')-new Date(first.day+'T12:00:00'))/86400000;
 if(span<14)return {status:'early',title:'Aguardando novas pesagens',description:'Peso e líquidos oscilam. Continue registrando semanalmente antes de interpretar tendências.'};
 if(c.length>=2){
  const firstC=c[0],lastC=c.at(-1),months=(new Date(lastC.day+'T12:00:00')-new Date(firstC.day+'T12:00:00'))/86400000;
  if(months>=21&&Number(lastC.waist)<=Number(firstC.waist)-1)
   return {status:'waist',title:'Cintura em redução',description:'Suas medidas de cintura diminuíram. É um sinal útil de acompanhamento, mesmo com oscilações do peso. Não permite concluir sozinho quanto de gordura ou músculo mudou.'};
 }
 const diff=Number(last.kg)-Number(first.kg);
 if(diff<=-Math.max(.4,first.kg*.005))return {status:'decrease',title:'Peso com tendência de redução',description:'Continue priorizando força, recuperação e hábitos consistentes. Uma queda na balança não mede isoladamente ganho ou perda muscular.'};
 if(diff>=Math.max(.4,first.kg*.005))return {status:'increase',title:'Peso aumentou desde o início',description:'Antes de aumentar o cardio, observe medidas, frequência dos treinos, alimentação e possíveis oscilações de líquidos.'};
 return {status:'stable',title:'Peso relativamente estável',description:'Peso estável não significa automaticamente falta de progresso. Observe cintura, força, disposição e regularidade.'};
}
g.VivaEvolution=Object.freeze({dayKey,sanitizeReadiness,readiness,adapt,sanitizeStrengthLog,exerciseAdvice,strengthPrescription,strengthHighlights,weightWaistInsight,RECOVERY});
})(window);