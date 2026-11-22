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
- **Progressão por exercício**: a meta de repetições usa duas sessões completas em dias diferentes, com séries registradas, execução controlada e avaliação de esforço; dor e recuperação insuficiente bloqueiam aumentos. Trocar para elástico mais forte é uma sugestão opcional.
- **Número de séries**: nos treinos de 30 minutos, pode passar de duas para três séries após oito dias de força registrados com segurança, a partir da semana 5. Sessões de 20 minutos mantêm duas séries.
- **Substituições por padrão de movimento**: as alternativas respeitam o padrão do exercício, equipamentos e restrições. Quando não há equivalente adequado, o movimento não é substituído automaticamente.
- **Ciclos de quatro semanas** com revisões de hábitos, tendência de peso, técnica e tolerância à resistência. Alguns exercícios básicos permanecem para acompanhar força.
- **Mini bands e elásticos** opcionais e seleção de baixo impacto.
- **Substituições compatíveis**: escolha de alternativas por equipamento, restrições para exercícios no chão e apoio dos joelhos, motivo da troca e opção de reverter em Ajustes.
- **Instruções técnicas em texto**: 31 exercícios com objetivo, músculos trabalhados, equipamento, execução, erros comuns, versão mais fácil e progressão. As imagens esquemáticas e o mascote foram removidos por falta de precisão visual.
- **Cronômetro e áudio**: anúncios em pt-BR (validado pelo usuário no iPhone), bipes, contagem final, avanço manual, pausa e retomada.
- **Proteção da integridade das sessões**: avançar manualmente grande parte da sessão impede o registro de conclusão. Ao sair do Safari, a sessão é pausada e pode ser retomada após recarregar.
- **Registro manual de séries**: botão para concluir cada série de força, informar repetições realizadas, resistência, esforço e técnica. Séries sem registro manual não entram na contagem de repetições.
- **Acompanhamento**: check-ins semanais, feedback pós-treino, pesagens, gráfico de oito semanas, comparações de repetições por exercício e histórico de força.
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
| `exercises.js` | Catálogo de exercícios, restrições, alternativas e séries informadas manualmente |
| `backup.js` | Exportação, validação e restauração dos registros |
| `sw.js` | Cache e funcionamento offline |
| `manifest.webmanifest` | Configuração de aplicativo web instalável |
| `favicon.svg` | Ícone do VIVA |
| `qa.js`, `qa.html` | Bateria independente de regressão (133 verificações) |

A página de QA está em **https://vinmedrado.com/viva/qa.html**.

## Segurança, limitações e privacidade

**Interface:** rótulos descritivos, navegação por Início, Plano, Avulso, Progresso e Ajustes. Linguagem direta, sem nomes de personagens inventados nem promessas de resultados automáticos.

**Exclusão de treinos:** o comando em Ajustes apaga o histórico de sessões e suas avaliações de força associadas, mantendo pesagens, caminhadas e configurações. Faça backup antes de limpar registros.

O VIVA oferece orientações gerais calculadas por regras, não uma avaliação clínica ou acompanhamento presencial de um profissional de Educação Física. A avaliação diária é autorrelatada, não mede sinais vitais ou condições médicas; dor incomum, sintomas preocupantes e dor muscular intensa exigem precaução. Em caso de sintomas intensos ou súbitos, procure atendimento imediato. Não diagnostica lesões, não determina uma dieta individual e não garante uma taxa de emagrecimento. O plano de força/cardio segue princípios gerais de atividade física e adaptação gradual, não é uma prescrição individual.

Os registros pessoais são salvos localmente no dispositivo pela chave `viva-functional-v2`; não existe backend, login ou sincronização automática entre celulares. Há também uma chave de sessão temporária para recuperação do treino. Limpar o armazenamento do navegador pode apagar os dados. Guarde o backup JSON em local privado, pois ele contém informações de saúde e treino e **não é criptografado**.

No iPhone, a voz e o cronômetro podem não continuar funcionando com a tela apagada; por isso o aplicativo pausa a sessão quando vai para segundo plano. Os guias são textuais. Não há detecção automática de postura, contagem por câmera ou avaliação médica.

## Fundamentos consultados

- [American College of Sports Medicine (2026): Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance](https://doi.org/10.1249/MSS.0000000000003897)
- [Organização Mundial da Saúde: recomendações para adultos sobre atividade física](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity)

## Desenvolvimento e publicação

Aplicativo estático, sem dependências de build. Os arquivos desta pasta são publicados por GitHub Pages. Atualizar a pasta mantém o mesmo endereço e não modifica a raiz do portfólio.

## Música durante o treino — Spotify Premium

O VIVA oferece um painel de música que permanece montado enquanto o cronômetro muda de exercício. Há duas modalidades:

- **Player oficial**: em Início, toque em **Música**, cole um endereço `https://open.spotify.com/playlist/...`, salve e abra o player oficial. Não exige Client ID. O comportamento de reprodução completa é determinado pelo Spotify e pelo Safari.
- **Controle Premium (Web Playback SDK)**: permite autenticar uma conta Premium, listar até 30 playlists disponíveis e controlar reproduzir/pausar, faixa anterior e próxima dentro do VIVA, respeitando as limitações do navegador e as permissões da API.

### Configurar o Spotify Premium

1. Abra [Spotify for Developers](https://developer.spotify.com/dashboard) com uma conta Premium e crie um app autorizado para **Web Playback SDK**.
2. Cadastre exatamente `https://vinmedrado.com/viva/` como **Redirect URI** (HTTPS, com barra final). Adicione sua conta aos usuários permitidos se o dashboard solicitar.
3. No VIVA, abra **Música → Configuração do Spotify for Developers**, cole o **Client ID** e salve. **Nunca insira o Client Secret** no VIVA ou em qualquer arquivo público do GitHub.
4. Toque em **Conectar Spotify Premium**, autorize sua conta, depois em **Ativar player** e **Reproduzir**. No iPhone, o Safari pode exigir mais de um toque devido às políticas de autoplay.

O Client ID é um identificador público guardado neste navegador. A autenticação utiliza Authorization Code com PKCE, sem servidor e sem Client Secret. Tokens são guardados no `sessionStorage` do navegador e **não entram no arquivo de backup do VIVA**. Sair do navegador ou trocar entre PWA e Safari pode exigir uma nova conexão. O SDK precisa de internet; o modo offline do VIVA não permite ouvir Spotify offline pelo site.

**Limites atuais da plataforma (novembro de 2026)**: apps novos em Development Mode exigem Premium do proprietário, permitem até cinco usuários autenticados e, em geral, um Client ID por conta de desenvolvedor. Não anuncie a integração como disponível a qualquer visitante do portfólio. O Spotify Web Playback SDK não pode ser usado em projetos comerciais sem autorização da plataforma. A música não pode ser alterada ou sincronizada com vídeo pelo aplicativo. Consulte a [documentação oficial](https://developer.spotify.com/documentation/web-playback-sdk) e as [regras de desenvolvimento de fevereiro de 2026](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide).
