# VIVA — Treino em Casa

Aplicativo de treinos em casa com plano semanal de força e cardio, cronômetro, acompanhamento local e funcionamento offline. As recomendações são calculadas por regras explícitas; **não há IA generativa nem avaliação de movimentos por câmera**.

## Publicação

- Aplicativo: **https://vinmedrado.com/viva/**
- Repositório: `vinmedrado/portfolio` → pasta `viva/`
- A publicação é feita pelo GitHub Pages. A página principal do portfólio permanece intacta.

## Funcionalidades da versão completa

- **Biblioteca de 365 sequências de referência**: 73 semanas com cinco dias por semana, consultáveis em 37 páginas. São combinações para consulta, **não 365 prescrições independentes**. O plano semanal preserva exercícios principais ao longo dos ciclos, e há aproximadamente 260 dias de segunda a sexta em um ano.
- **Plano semanal**: segunda a sexta, com três dias de força e dois dias opcionais de cardio/mobilidade, aquecimento e volta à calma.
- **Treino de força com prescrição própria**: exercícios de agachar, puxar, empurrar, quadril e estabilidade; 2–3 séries por movimento, 8–12 repetições orientativas, pausas de aproximadamente 55–100 segundos e controles por grupo muscular. O cronômetro disponibiliza uma janela para cada série, mas **não conta as repetições automaticamente**.
- **Cardio em intervalos próprios**: alterna movimento e recuperação, com intensidade adaptada ao início e às semanas seguintes. A versão de 20 minutos tem 5 minutos de aquecimento, 10 de circuito e 5 de volta à calma; 30 minutos têm 5/20/5, e 45 minutos têm 7/30/8.
- **Registro aeróbico gradual**: painel distingue minutos de cardio com esforço autorrelatado e caminhadas moderadas registradas, com referências semanais progressivas. Não usa minutos de musculação para alegar que uma meta aeróbica foi atingida.
- **Adaptação gradual**: sessões de 20 minutos no início; 30 e 45 minutos são sugeridos apenas conforme frequência, recuperação, esforço relatado e tempo de adaptação.
- **Avaliação diária de prontidão**: antes de iniciar, o usuário informa energia, sono e desconfortos. O sistema pode manter a sessão, propor recuperação ativa de 20 minutos ou recomendar não treinar em caso de sinais de alerta. Sem diagnóstico médico.
- **Diário individual de força**: após treinos de força, registra a dificuldade de dois exercícios principais e a resistência usada, sugerindo progressão somente após registros recentes favoráveis e execução segura.
- **Ciclos de quatro semanas** com revisões de hábitos, tendência de peso, técnica e tolerância à resistência. Alguns exercícios básicos permanecem para acompanhar força.
- **Mini bands e elásticos** opcionais e seleção de baixo impacto.
- **Substituição de exercícios**: o usuário pode retirar movimentos dos próximos planos e reativá-los em Ajustes.
- **Demonstrações**: ilustrações SVG esquemáticas, mascote original, 31 guias com preparação, execução, respiração, cuidados e alternativa simplificada.
- **Cronômetro e áudio**: anúncios em pt-BR, bipes, contagem final, avanço manual, pausa e retomada.
- **Proteção da integridade das sessões**: avançar manualmente grande parte da sessão impede o registro de conclusão. Ao sair do Safari, a sessão é pausada e pode ser retomada após recarregar.
- **Acompanhamento**: check-ins semanais (disposição, recuperação e cintura opcional), feedback pós-treino (esforço, execução e dor), pesagens e gráfico, referência de IMC adulto, painel das últimas oito semanas e histórico.
- **Offline**: service worker guarda os arquivos principais após uma primeira visita com internet. O suporte em segundo plano e à voz depende do navegador e do sistema.
- **Backup**: exportação e restauração validada de arquivo JSON, incluindo histórico, pesagens, professor, substituições, caminhadas e modalidade dos treinos.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Interface, navegação, treinos, cronômetro e progressos |
| `coach.js` | Biblioteca de 365 combinações, intensidade, ciclos e recomendações |
| `evolution.js` | Prontidão diária, recuperação ativa, progressão de força e leitura integrada de peso/cintura |
| `evolution-ui.js` | Formulário diário, avaliação pós-treino e cartões de força |
| `training.js` | Protocolos separados de força e cardio, distribuição muscular e aquecimento/volta à calma |
| `guide.js` | Guias de execução de 31 exercícios |
| `visual.js` | Mascote e ilustrações vetoriais originais |
| `backup.js` | Exportação, validação e restauração dos registros |
| `sw.js` | Cache e funcionamento offline |
| `manifest.webmanifest` | Configuração de aplicativo web instalável |
| `favicon.svg` | Ícone do VIVA |
| `qa.js`, `qa.html` | Bateria independente de regressão (90 verificações) |

A página de QA está em **https://vinmedrado.com/viva/qa.html**.

## Segurança, limitações e privacidade

**Interface:** rótulos descritivos, navegação por Início, Plano, Avulso, Progresso e Ajustes. Linguagem direta, sem nomes de personagens inventados nem promessas de resultados automáticos.

**Exclusão de treinos:** o comando em Ajustes apaga o histórico de sessões e suas avaliações de força associadas, mantendo pesagens, caminhadas e configurações. Faça backup antes de limpar registros.

O VIVA oferece orientações gerais calculadas por regras, não uma avaliação clínica ou acompanhamento presencial de um profissional de Educação Física. A avaliação diária é autorrelatada, não mede sinais vitais ou condições médicas; dor incomum, sintomas preocupantes e dor muscular intensa exigem precaução. Em caso de sintomas intensos ou súbitos, procure atendimento imediato. Não diagnostica lesões, não determina uma dieta individual e não garante uma taxa de emagrecimento. O plano de força/cardio segue princípios gerais de atividade física e adaptação gradual, não é uma prescrição individual.

Os registros pessoais são salvos localmente no dispositivo pela chave `viva-functional-v2`; não existe backend, login ou sincronização automática entre celulares. Há também uma chave de sessão temporária para recuperação do treino. Limpar o armazenamento do navegador pode apagar os dados. Guarde o backup JSON em local privado, pois ele contém informações de saúde e treino e **não é criptografado**.

No iPhone, a voz e o cronômetro podem não continuar funcionando com a tela apagada; por isso o aplicativo pausa a sessão quando vai para segundo plano. Os desenhos são ilustrativos e não substituem instruções individualizadas.

## Fundamentos consultados

- [American College of Sports Medicine (2026): Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance](https://doi.org/10.1249/MSS.0000000000003897)
- [Organização Mundial da Saúde: recomendações para adultos sobre atividade física](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity)

## Desenvolvimento e publicação

Aplicativo estático, sem dependências de build. Os arquivos desta pasta são publicados por GitHub Pages. Atualizar a pasta mantém o mesmo endereço e não modifica a raiz do portfólio.
