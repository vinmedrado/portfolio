(function(g){'use strict';
function run(){
 const results=[];
 function test(name,fn){try{if(!fn())throw Error('A condição esperada não foi atendida.');results.push({name,pass:true})}
 catch(err){results.push({name,pass:false,error:String(err?.message||err)})}}
 const C=g.VivaCoach,B=g.VivaBackup,X=g.VivaExercises,G=g.VivaGuide,E=g.VivaEvolution,U=g.VivaEvolutionUI,T=g.VivaTraining;
 const date=new Date('2026-11-20T12:00:00Z');
 test('Motor do professor disponível',()=>!!C&&C.DAYS.length===5);
 test('Biblioteca contém 365 treinos',()=>C.LIBRARY_SIZE===365);
 test('Agenda com três dias principais de força',()=>C.DAYS.filter(d=>d.required&&d.kind==='Força').length===3);
 for(const gear of [{mini:true,long:true},{mini:false,long:false},{mini:true,long:false},{mini:false,long:true}]){
  const label='365 treinos únicos: mini band '+(gear.mini?'sim':'não')+', elástico '+(gear.long?'sim':'não');
  test(label,()=>{const signatures=new Set(Array.from({length:365},(_,i)=>C.catalogItem(i+1,gear,true).moves.map(x=>x.id).join('|')));return signatures.size===365});
 }
 test('Paginações da biblioteca',()=>C.catalogPage(1).items.length===10&&C.catalogPage(37).items.length===5);
 test('Treino sem equipamento não sugere elásticos',()=>C.catalogItem(125,{mini:false,long:false}).moves.every(x=>x.gear==='body'));
 test('Primeiras semanas sugerem 20 minutos',()=>C.prescription(1,0,[],{},date).minutes===20);
 test('Sem frequência suficiente, duração não aumenta',()=>C.prescription(13,0,[],{},date).minutes===20);
 const wUp=[{day:'2026-11-01',kg:90},{day:'2026-11-08',kg:90.5},{day:'2026-11-15',kg:91.1}];
 test('Tendência de aumento em pesagens espaçadas',()=>C.weightsTrend(wUp)==='subindo');
 test('Duas pesagens não definem tendência',()=>C.weightsTrend(wUp.slice(0,2))==='indefinida');
 test('Pesagens próximas não definem tendência',()=>C.weightsTrend([{day:'2026-11-01',kg:90},{day:'2026-11-03',kg:90.7},{day:'2026-11-05',kg:91}])==='indefinida');
 const history=[{coach:true,coachDay:0,date:'2026-11-16T12:00:00Z',day:'2026-11-16',duration:20,coachId:'viva-1763294400000-1'},
 {coach:true,coachDay:0,date:'2026-11-16T18:00:00Z',day:'2026-11-16',duration:20,coachId:'viva-1763294400000-2'}];
 test('Duas sessões no mesmo dia contam como um dia',()=>C.sessionStats(history,date).weekDays===1&&C.sessionStats(history,date).weekMinutes===40);
 test('Dor recente reduz progressão',()=>!C.getPerformance(history,{feedback:{'viva-1763294400000-2':{pain:true,effort:8}}},date).ready);
 test('Alerta antigo não fica permanente',()=>C.getPerformance([{...history[0],date:'2026-10-01T12:00:00Z',day:'2026-10-01'}],{feedback:{'viva-1763294400000-1':{pain:true,effort:8}}},date).ready);
 test('Revisão de ciclo em quatro semanas',()=>C.cycleReview({startedAt:'2026-10-27T12:00:00Z'},[],[],date).due);
 test('Instruções detalhadas disponíveis',()=>G.keys.length>=30&&G.get('row').breathing.length>10);
 test('Mini band inclui aviso de posição',()=>G.get('miniWalk').attention.includes('joelhos'));
 test('Todos os exercícios cadastrados possuem guia textual',()=>X.ids.length>=31&&X.ids.every(id=>X.details(id).setup&&X.details(id).execution&&X.details(id).errors&&X.details(id).easier&&X.details(id).harder));
 const raw={duration:20,history,profile:{heightCm:170,age:29,weighIns:[{day:'2026-11-20',kg:90}]},coach:{startedAt:'2026-11-20T12:00:00Z',gear:{mini:true,long:true},excluded:['miniWalk','notReal'],feedback:{'viva-1763294400000-1':{effort:5,technique:'boa'}}}};
 test('Backup exporta e restaura registros',()=>{const z=B.parse(B.serialize(raw));return z.stats.trainings===2&&z.stats.weighIns===1});
 test('Backup preserva substituições válidas',()=>B.parse(B.serialize(raw)).data.coach.excluded.join('|')==='miniWalk');
 test('Backup rejeita formatos desconhecidos',()=>{try{B.parse('{"format":"invalid","data":{}}');return false}catch{return true}});
 test('Backup descarta dados não permitidos',()=>B.parse(B.serialize({profile:{weighIns:[{day:'2026-11-20',kg:-55}]}})).stats.weighIns===0);

 const dateLocal=new Date(2026,10,20,12),keyToday=E.dayKey(dateLocal);
 const normal={day:keyToday,energy:4,sleep:8,soreness:0,pain:false,warning:false};
 test('Avaliação diária exige respostas',()=>E.readiness(null,dateLocal).status==='pending'&&E.sanitizeReadiness({...normal,sleep:''},dateLocal)===null);
 test('Avaliação liberada em condições habituais',()=>E.readiness(normal,dateLocal).canStart);
 test('Dor incomum impede o início do treino',()=>E.readiness({...normal,pain:true},dateLocal).status==='stop');
 test('Sintomas de alerta impedem o início',()=>E.readiness({...normal,warning:true},dateLocal).status==='stop');
 test('Dor muscular intensa indica recuperação',()=>E.readiness({...normal,soreness:3},dateLocal).status==='rest');
 test('Sono baixo adapta para 20 minutos',()=>E.readiness({...normal,sleep:5},dateLocal).durationCap===20);
 test('Recuperação respeita exercícios excluídos',()=>{const x=E.adapt({duration:30,low:false,c:{excluded:['march','step']},d:{kind:'Força'},moves:[]},{...normal,energy:2},dateLocal);return x.duration===20&&x.moves.every(z=>z.gear==='body'&&!['march','step'].includes(z.id))});
 const logs=[{id:'row',date:'2026-11-10T11:00:00Z',difficulty:'easy',band:'light',technique:'boa',pain:false},{id:'row',date:'2026-11-19T11:00:00Z',difficulty:'easy',band:'light',technique:'boa',pain:false}];
 test('Dois registros seguros podem sugerir progressão',()=>E.exerciseAdvice('row',logs,dateLocal).status==='progress');
 test('Treino difícil recomenda manter ou reduzir',()=>E.exerciseAdvice('row',[{...logs[1],difficulty:'hard'}],dateLocal).status==='reduce');
 test('Cintura e peso são analisados sem diagnóstico',()=>E.weightWaistInsight([{day:'2026-10-01',kg:90},{day:'2026-10-08',kg:90},{day:'2026-11-20',kg:90}],[{day:'2026-10-01',waist:105},{day:'2026-11-20',waist:103}]).status==='waist');
 test('Formulário diário renderiza no professor',()=>U.dailyCard({c:{readiness:null},today:dateLocal,readiness:E.readiness(null,dateLocal)}).includes('coach-readiness'));
 test('Formulário pós-treino acompanha força',()=>U.strengthFields([{coachId:'a',coachAnchors:['squat','row']}],'a').includes('strength-difficulty-row'));
 test('Backup preserva carga e movimentos principais',()=>{const d=B.parse(B.serialize({duration:20,coach:{strengthLogs:logs},history:[{coach:true,coachDay:0,coachAnchors:['squat','row'],date:'2026-11-20T12:00:00Z',day:'2026-11-20',duration:20,coachWeek:1,coachId:'viva-1763640000000-9'}]})).data;return d.coach.strengthLogs.length===2&&d.history[0].coachAnchors.length===2});
 test('Recuperação não é contabilizada como musculação',()=>C.sessionStats([{coach:true,coachRecovery:true,coachDay:0,date:'2026-11-20T12:00:00Z',day:'2026-11-20',duration:20}],dateLocal).strengthDays===0);

 test('Planejador tem três formatos com aquecimento suficiente',()=>[20,30,45].every(n=>{const [a,b,c]=T.split(n);return a>=5&&c>=5&&a+b+c===n}));
 for(const minutes of [20,30,45]){
  for(const day of [0,1,2,3,4]){
   const base={day,week:1,kind:C.DAYS[day].kind,duration:minutes,c:{gear:{mini:true,long:true},excluded:[]},moves:C.movesFor(day,1,{mini:true,long:true})};
   const p=T.prescribe(base),steps=T.build(p);
   test('Treino '+minutes+'min, dia '+day+' soma os tempos',()=>steps[0].start===0&&steps.at(-1).end===minutes*60);
   test('Treino '+minutes+'min, dia '+day+' usa modalidade correta',()=>{const kind=C.DAYS[day].kind==='Força'?'strength':'cardio';
     return p.training.type===kind&&p.training.exercises.length>=3&&steps.some(x=>x.mode===kind)});
   if(C.DAYS[day].kind==='Força')test('Treino '+minutes+'min, dia '+day+' usa séries e repetições',()=>{const work=steps.filter(x=>x.mode==='strength'&&!x.rest),rests=steps.filter(x=>x.mode==='strength'&&x.rest);return work.length===p.training.setsTotal&&rests.length===work.length&&work.every(x=>x.setNumber>=1&&x.reps.includes('8'))});
  }
 }
 test('Aquecimento de 20 min tem cinco minutos',()=>T.split(20)[0]===5);
 test('Musculação de segunda usa padrões de movimento',()=>T.pickStrength(0,1,20,{mini:true,long:true},[]).map(x=>x.id).join(',')==='squat,row,wallPush');
 test('Sem acessórios, musculação não usa elástico',()=>[0,2,4].every(day=>T.pickStrength(day,1,30,{mini:false,long:false},[]).every(x=>x.gear==='body')));
 test('Movimentos retirados não entram nas séries',()=>!T.pickStrength(0,1,30,{mini:true,long:true},['squat','wallPush']).some(x=>['squat','wallPush'].includes(x.id)));
 test('Recuperação tem intervalos leves sem saltos',()=>{const x=T.prescribe({day:1,week:1,kind:'Recuperação ativa',duration:20,c:{gear:{mini:true,long:true},excluded:[]},moves:C.movesFor(1,1,{mini:true,long:true},true)});return x.training.type==='cardio'&&T.build(x).filter(s=>s.mode==='cardio'&&!s.rest).every(s=>s.seconds<=30)});
 test('Objetivo aeróbico cresce sem exigir 150 min inicialmente',()=>T.cardioGoals(1,0).target===30&&T.cardioGoals(12,0).target===90&&T.cardioGoals(20,0).longTerm===150);
 test('Backup preserva caminhada e modalidade do treino',()=>{const input={duration:30,history:[{coach:true,coachDay:1,coachType:'cardio',coachMainMinutes:20,coachId:'viva-1763650800000-5',day:'2026-11-20',date:'2026-11-20T12:00:00Z',duration:30}],coach:{walks:[{day:'2026-11-20',minutes:20,intensity:'moderate'}]}};const out=B.parse(B.serialize(input)).data;return out.coach.walks[0].minutes===20&&out.history[0].coachMainMinutes===20});

 test('Volume semanal mostra força por grupo muscular',()=>{const p=T.weeklyMuscleSets(1,20,{mini:true,long:true},[]);return p.counts.pernas>=4&&p.counts.costas>=4&&p.counts.empurrar>=4&&p.counts.core>=2});
 test('Aquecimento não conta como série de musculação',()=>{const p=T.weeklyMuscleSets(1,20,{mini:true,long:true},[]);return p.totalSets===18});
 test('Sexta-feira inclui estabilidade de tronco na adaptação',()=>T.pickStrength(4,1,20,{mini:true,long:true},[]).some(x=>x.id==='birdDog'));
 test('Volumetria semanal aumenta de forma estruturada',()=>T.weeklyMuscleSets(1,45,{mini:true,long:true},[]).totalSets>T.weeklyMuscleSets(1,20,{mini:true,long:true},[]).totalSets);

 test('Nomes dos dias descrevem a atividade real',()=>C.DAYS.map(x=>x.title).join('|')==='Corpo inteiro|Cardio em intervalos|Pernas e glúteos|Cardio e estabilidade|Costas, peito e abdômen');
 test('Os treinos não usam títulos promocionais',()=>C.DAYS.every(x=>!/desafio|completo e equilibrado|treino mágico|inteligente/i.test(x.title+' '+x.note)));
 test('Biblioteca mantém dia e foco por semana',()=>C.catalogItem(2).title==='Cardio em intervalos'&&C.catalogItem(5).title==='Costas, peito e abdômen');
 test('Histórico restaurado usa os rótulos atuais',()=>{const x=B.parse(B.serialize({history:[{date:'2026-11-20T12:00:00Z',day:'2026-11-20',duration:20,coach:true,coachDay:1}]})).data;return x.history[0].coachFocus==='Cardio em intervalos'});
 test('Guia apresenta objetivo e equipamento',()=>X.details('row').equipment==='Elástico longo'&&X.details('row').muscles.includes('Costas'));

 test('Sem chão não seleciona exercícios deitado',()=>[0,2,4].every(day=>T.prescribe({day,week:1,duration:20,kind:'Força',c:{gear:{mini:true,long:true},excluded:[],preferences:{noFloor:true}},moves:[]}).moves.every(m=>!X.FLOOR.has(m.id))));
 test('Sem apoio dos joelhos remove quatro apoios',()=>!X.allowed('birdDog',{mini:true,long:true},{noKneel:true}));
 test('Sem elásticos evita exercício que requer banda',()=>!X.allowed('row',{mini:false,long:false},{}));
 test('Substituição validada usa movimento permitido',()=>T.pickStrength(0,1,20,{mini:true,long:true},[],{}, {squat:'squatWide'})[0].id==='squatWide');
 test('Alternativa para ponte sem chão é exercício em pé',()=>X.alternatives('bridge',{mini:true,long:true},{noFloor:true}).some(m=>m.id==='miniKick'));
 test('Registro manual rejeita repetições impossíveis',()=>!X.sanitizeSetLog({id:'squat',setNumber:1,repsDone:0})&&!X.sanitizeSetLog({id:'squat',setNumber:1,repsDone:99}));
 test('Registro manual preserva dificuldade e técnica',()=>{const x=X.sanitizeSetLog({id:'row',setNumber:2,repsDone:9,band:'medium',difficulty:'hard',technique:'insegura'});return x?.band==='medium'&&x?.difficulty==='hard'&&x?.technique==='insegura'});
 test('Backup mantém preferências e substituições',()=>{const o=B.parse(B.serialize({coach:{preferences:{noFloor:true},replacements:{squat:'squatWide'},reasons:{squat:'discomfort'}}})).data;return o.coach.preferences.noFloor&&o.coach.replacements.squat==='squatWide'&&o.coach.reasons.squat==='discomfort'});
 test('Backup preserva séries e repetições manuais',()=>{const o=B.parse(B.serialize({history:[{coach:true,coachDay:0,coachId:'viva-1763650800000-2',day:'2026-11-20',date:'2026-11-20T14:00:00Z',duration:20,setLogs:[{id:'squat',setNumber:1,repsDone:10,difficulty:'ok',band:'none',technique:'boa'}]}]})).data;return o.history[0]?.setLogs?.[0]?.repsDone===10});
 test('Progresso só contabiliza séries informadas',()=>X.progress([{day:'2026-11-20',coachId:'a',setLogs:[{id:'squat',setNumber:1,repsDone:8}]}])[0].latest.reps===8);
 test('Alternativas respeitam motivo, equipamento e restrições',()=>X.alternatives('row',{mini:false,long:false},{noFloor:true}).length===0);

 test('Remada nunca vira extensão de tronco',()=>!X.compatible('row','superman')&&X.alternatives('row',{mini:false,long:false},{}).length===0);
 test('Bíceps não é substituído por tríceps',()=>!X.compatible('curl','bandTriceps')&&X.alternatives('curl',{mini:true,long:true},{}).length===0);
 test('Panturrilha não é trocada por caminhada',()=>!X.compatible('calf','march'));
 test('Agachamento preserva o padrão',()=>X.compatible('squat','squatWide'));
 test('Restrição sem saltos remove skipping',()=>!X.allowed('skipping',{mini:true,long:true},{noJump:true}));
 test('Mapeamento de todos os exercícios possui padrão',()=>X.ids.every(id=>!!X.pattern(id)));
 test('Backups antigos descartam substituição incompatível',()=>{const x=B.parse(B.serialize({coach:{replacements:{row:'superman',squat:'squatWide'}}})).data.coach.replacements;return x.squat==='squatWide'&&!x.row});
 const h2=[1,2].map(i=>({coach:true,coachType:'strength',coachId:'t'+i,date:i===1?'2026-11-12T12:00:00Z':'2026-11-19T12:00:00Z',day:i===1?'2026-11-12':'2026-11-19',setLogs:[1,2].map(setNumber=>({id:'row',setNumber,repsDone:9,band:'light',difficulty:'easy',technique:'boa'}))}));
 const f2={t1:{effort:5,technique:'boa',pain:false},t2:{effort:5,technique:'boa',pain:false}};
 const now2=new Date('2026-11-20T12:00:00Z');
 test('Duas sessões completas passam a meta de oito para dez',()=>E.strengthPrescription('row',h2,f2,6,now2).target===10);
 test('Sem respostas pós-treino não há progressão',()=>E.strengthPrescription('row',h2,{},6,now2).status==='hold');
 test('Dor relatada bloqueia aumento',()=>E.strengthPrescription('row',h2,{...f2,t2:{...f2.t2,pain:true}},6,now2).status==='ease');
 test('Descanso insuficiente impede progressão',()=>E.strengthPrescription('row',h2,f2,6,now2,'light').status==='hold');
 test('Série incompleta na última sessão bloqueia aumento',()=>{const h=[...h2,{...h2[1],coachId:'t3',date:'2026-11-20T10:00:00Z',day:'2026-11-20',setLogs:[{...h2[1].setLogs[0]}]}];return E.strengthPrescription('row',h,{...f2,t3:{effort:5,pain:false,technique:'boa'}},6,now2).status==='hold'});
 test('Resistência maior é apenas sugerida quando ambas sessões completam 12',()=>{const h=h2.map(x=>({...x,setLogs:x.setLogs.map(y=>({...y,repsDone:12}))}));return E.strengthPrescription('row',h,f2,6,now2).bandSuggestion==='medium'});
 test('Meta individual entra nos blocos do cronômetro',()=>{const m=T.prescribe({day:0,week:6,kind:'Força',duration:20,history:h2,c:{gear:{mini:true,long:true},feedback:f2},readiness:{status:'normal'},today:now2,moves:[]});return T.build(m).filter(x=>x.id==='row').every(x=>x.reps==='10')});
 return {passed:results.filter(r=>r.pass).length,total:results.length,ok:results.every(r=>r.pass),results};
}
g.VivaQA=Object.freeze({run});
})(window);