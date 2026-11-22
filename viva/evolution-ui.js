(function(g){'use strict';
function dailyCard(m){
 const today=window.VivaEvolution.sanitizeReadiness(m.c.readiness,m.today),s=m.readiness;
 const selected=(v,t)=>Number(v)===Number(t)?'selected':'';
 const energy=['Muito baixa','Baixa','Normal','Boa','Excelente'];
 return `<section id="viva-preflight" class="viva-preflight"><div class="viva-preflight-head"><div><div class="kicker">ANTES DE TREINAR</div><h3>Como está seu corpo hoje?</h3><small>Registre sua disposição antes de começar.</small></div><span class="viva-preflight-symbol">✓</span></div>
 <form id="coach-readiness">
 <div class="coach-form-grid"><label>Energia<select id="viva-energy" required><option value="" disabled ${!today?'selected':''}>Selecionar</option>${[1,2,3,4,5].map(v=>`<option value="${v}" ${today?selected(today.energy,v):''}>${v} · ${energy[v-1]}</option>`).join('')}</select></label>
 <label>Horas de sono<select id="viva-sleep" required><option value="" disabled ${!today?'selected':''}>Selecionar</option>${[5,7,8].map(v=>`<option value="${v}" ${today?selected(today.sleep,v):''}>${v===5?'Até 5 horas':v===7?'6–7 horas':'8 horas ou mais'}</option>`).join('')}</select></label></div>
 <label class="viva-field-label">Desconforto muscular<select id="viva-soreness" required><option value="" disabled ${!today?'selected':''}>Selecionar</option>${[0,1,2,3].map(v=>`<option value="${v}" ${today?selected(today.soreness,v):''}>${['Nenhum','Leve','Moderado','Forte'][v]}</option>`).join('')}</select></label>
 <label class="coach-checkbox"><input type="checkbox" id="viva-pain" ${today?.pain?'checked':''}> Tenho dor diferente do cansaço muscular normal</label>
 <label class="coach-checkbox"><input type="checkbox" id="viva-warning" ${today?.warning?'checked':''}> Tive tontura, dor no peito ou falta de ar fora do habitual</label>
 <button class="coach-save" type="submit">${today?'Atualizar avaliação de hoje':'Salvar avaliação e adaptar'}</button></form>
 <div class="viva-readiness-state ${s.status==='stop'||s.status==='rest'?'viva-readiness-stop':s.status==='light'?'viva-readiness-light':''}" role="status"><b>${s.title}</b><p>${s.description}</p></div></section>`;
}
function strengthFields(history,id){
 if(!id)return '';
 const record=(Array.isArray(history)?history:[]).find(x=>x.coachId===id),anchors=Array.isArray(record?.coachAnchors)?record.coachAnchors.slice(0,2):[];
 if(!anchors.length)return '';
 return `<div class="viva-strength-feedback"><div class="kicker">REGISTRO DE FORÇA</div><h3>Como foram os exercícios principais?</h3><p>A dificuldade registrada ajuda a ajustar a resistência nas próximas sessões.</p>
 ${anchors.map(id=>{const e=window.VivaCoach.getExercise(id);if(!e)return '';
 return `<div class="viva-strength-question"><b>${e.name}</b><label>Dificuldade<select id="strength-difficulty-${id}"><option value="easy">Fácil, consegui fazer com folga</option><option value="ok" selected>Moderada, consegui manter controle</option><option value="hard">Difícil, quase perdi o controle</option></select></label>
 ${e.gear==='body'?'':`<label>Elástico utilizado<select id="strength-band-${id}"><option value="light" selected>Resistência leve</option><option value="medium">Resistência média</option><option value="heavy">Resistência forte</option><option value="none">Sem elástico</option></select></label>`}</div>`}).join('')}</div>`;
}
function highlights(entries,now=new Date()){
 const list=window.VivaEvolution.strengthHighlights(entries,now,4);
 return `<section class="viva-strength-overview"><div class="section"><h2>Evolução da força</h2><small>Últimos movimentos avaliados</small></div>
 ${list.length?list.map(item=>`<div class="viva-strength-result"><div><b>${item.name}</b><small>Último registro: ${new Date(item.latest.date).toLocaleDateString('pt-BR')}</small></div><div class="viva-strength-callout"><strong>${item.advice.title}</strong><p>${item.advice.description}</p></div></div>`).join(''):
 `<div class="info">Sem registros de força. Após o treino, informe como foram os exercícios principais.</div>`}
 <p class="minitip">As recomendações usam o esforço informado e não substituem orientação profissional.</p></section>`;
}
g.VivaEvolutionUI=Object.freeze({dailyCard,strengthFields,highlights});
})(window);