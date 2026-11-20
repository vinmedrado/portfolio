(function(g){'use strict';
function run(){
 const results=[];
 function test(name,fn){try{if(!fn())throw Error('A condição esperada não foi atendida.');results.push({name,pass:true})}
 catch(err){results.push({name,pass:false,error:String(err?.message||err)})}}
 const C=g.VivaCoach,B=g.VivaBackup,V=g.VivaVisual,G=g.VivaGuide;
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
 test('Ilustrações vetoriais disponíveis',()=>V.exercise('Remada com elástico').includes('<svg')&&V.mascot().includes('<svg'));
 const raw={duration:20,history,profile:{heightCm:170,age:29,weighIns:[{day:'2026-11-20',kg:90}]},coach:{startedAt:'2026-11-20T12:00:00Z',gear:{mini:true,long:true},excluded:['miniWalk','notReal'],feedback:{'viva-1763294400000-1':{effort:5,technique:'boa'}}}};
 test('Backup exporta e restaura registros',()=>{const z=B.parse(B.serialize(raw));return z.stats.trainings===2&&z.stats.weighIns===1});
 test('Backup preserva substituições válidas',()=>B.parse(B.serialize(raw)).data.coach.excluded.join('|')==='miniWalk');
 test('Backup rejeita formatos desconhecidos',()=>{try{B.parse('{"format":"invalid","data":{}}');return false}catch{return true}});
 test('Backup descarta dados não permitidos',()=>B.parse(B.serialize({profile:{weighIns:[{day:'2026-11-20',kg:-55}]}})).stats.weighIns===0);
 return {passed:results.filter(r=>r.pass).length,total:results.length,ok:results.every(r=>r.pass),results};
}
g.VivaQA=Object.freeze({run});
})(window);