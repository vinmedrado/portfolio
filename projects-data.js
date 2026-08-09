// projects-data.js
// Fonte única de conteúdo dos projetos. O site (index.html) e o editor (admin.html)
// leem e escrevem neste mesmo formato. Para atualizar o site publicado:
// 1. Abra admin.html no navegador, edite o que quiser (inclusive as imagens)
// 2. Clique em "Gerar código atualizado"
// 3. Copie o conteúdo gerado e substitua TODO o conteúdo deste arquivo
// 4. Suba (commit/push) o projects-data.js atualizado no GitHub

const PROJECTS = [
  {
    id: "vinance",
    title: "Vinance",
    flagship: true, // projeto principal do portfólio — aparece em destaque acima da grade
    track: "dados",
    pill: "Dados / ML",
    category: "Plataforma de Inteligência Financeira",
    year: "2026",
    status: "Em desenvolvimento ativo",
    desc: "Plataforma de inteligência financeira pessoal: diagnóstico financeiro, fundamentos de mercado, ranking heurístico de ativos e um Advisor com IA que conversa com o usuário usando contexto financeiro real.",
    highlight: "Arquitetura assíncrona ponta a ponta com processamento em background e IA conversacional protegida contra prompt injection.",
    results: [
      "Backend 100% assíncrono (FastAPI + Celery + Redis)",
      "Advisor com IA via Groq, sem prometer retorno ou recomendação de compra",
      "Pipeline de ranking de ativos por perfil de risco"
    ],
    completedFeatures: [
      "Recommendation Engine",
      "Investor Profile",
      "Trend Signals",
      "Guardrails",
      "Investment Workspace",
      "Backend FastAPI",
      "APIs",
      "Banco de Dados",
      "Docker",
      "Scheduler",
      "Frontend",
      "Recommendation Score",
      "Explanations",
      "Asset Scores",
      "Ranking"
    ],
    roadmap: [
      "Trading Workspace",
      "Simulação",
      "Backtesting",
      "Estratégias",
      "Gestão de risco"
    ],
    stack: ["Python", "FastAPI (async)", "PostgreSQL", "Redis", "Celery", "React", "TypeScript", "Groq API"],
    link: "https://github.com/vinmedrado/vinance",
    demo: "https://vinance-ai.netlify.app",
    image: "images/vinance.png",
    gallery: ["gallery/vinance/vinance-01.webp", "gallery/vinance/vinance-02.webp", "gallery/vinance/vinance-03.webp", "gallery/vinance/vinance-04.webp", "gallery/vinance/vinance-05.webp", "gallery/vinance/vinance-06.webp"],
    readmeHtml: `<h1>Vinance v2</h1>
<h2>Origem do projeto</h2><p>O Vinance nasceu da necessidade de organizar minha própria vida financeira em um lugar mais claro. Em vez de depender de planilhas soltas, aplicativos separados e anotações manuais, comecei a estruturar uma plataforma que reunisse receitas, despesas, investimentos e planejamento financeiro em uma experiência única.</p><h2>Problema</h2><p>O problema inicial era a falta de visão integrada. Informações financeiras pessoais costumam ficar espalhadas, dificultando entender capacidade de investimento, prioridades, riscos e próximos passos.</p><h2>Solução</h2><p>A solução foi construir uma plataforma financeira com backend próprio, autenticação, módulos de organização financeira, inteligência educacional e um Advisor com IA. O objetivo é apoiar a tomada de decisão com contexto, sem prometer retorno financeiro ou substituir análise profissional.</p><h2>Arquitetura</h2><ul><li>Frontend em React e TypeScript.</li><li>Backend assíncrono em FastAPI.</li><li>PostgreSQL para dados transacionais e fundamentos.</li><li>Redis e Celery para cache e processamento em background.</li><li>Integração com Groq para o Advisor educacional.</li><li>Docker Compose para ambiente local.</li></ul><h2>Principais funcionalidades</h2><ul><li>Cadastro, autenticação e perfil financeiro.</li><li>Registro de receitas, despesas e diagnóstico financeiro.</li><li>Ranking educacional de ativos por perfil de risco.</li><li>Advisor IA com contexto financeiro e guardrails.</li><li>Base para evolução de módulos de investimentos e estratégias quantitativas.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Separar orientação educacional de recomendação financeira definitiva.</li><li>Modelar dados financeiros de forma extensível.</li><li>Integrar IA mantendo contexto, segurança e limites claros.</li><li>Organizar uma arquitetura assíncrona com múltiplos serviços.</li></ul><h2>Aprendizados</h2><p>O projeto consolidou aprendizados sobre arquitetura full-stack, modelagem de domínio financeiro, processamento assíncrono, integração com LLMs e construção de produto com evolução incremental.</p>
<p>Vinance v2 é uma plataforma de inteligência financeira pessoal para o mercado brasileiro. O produto combina diagnóstico financeiro, organização de receitas e despesas, fundamentos de mercado, alocação educacional por perfil, ranking heurístico de ativos e um Advisor IA com contexto do usuário.</p>
<p>O foco do projeto é demonstrar uma arquitetura fullstack: backend FastAPI modular, frontend React, integração real entre camadas, documentação operacional e preparação segura para GitHub/deploy.</p>
<h2>Visão do produto</h2>
<p>O Vinance ajuda o usuário a entender sua situação financeira antes de falar sobre investimentos. A jornada atual permite:</p>
<ul>
<li>criar conta e autenticar com JWT;</li>
<li>cadastrar perfil financeiro inicial;</li>
<li>registrar receitas e despesas;</li>
<li>gerar diagnóstico financeiro;</li>
<li>visualizar capacidade de investimento e alertas;</li>
<li>consultar dados de mercado e fundamentos cadastrados;</li>
<li>receber sugestões educacionais por classe de ativo;</li>
<li>conversar com um Advisor IA educacional usando Groq, sem promessa de lucro ou recomendação definitiva de compra.</li>
</ul>
<h2>Stack</h2>
<h3>Backend</h3>
<ul>
<li>Python 3.11+</li>
<li>FastAPI</li>
<li>SQLAlchemy Async</li>
<li>Alembic</li>
<li>PostgreSQL</li>
<li>Redis</li>
<li>Celery + Celery Beat</li>
<li>Pydantic Settings</li>
<li>httpx async para Groq</li>
<li>Pytest</li>
</ul>
<h3>Frontend</h3>
<ul>
<li>React</li>
<li>TypeScript</li>
<li>Vite</li>
<li>React Router</li>
<li>TanStack Query</li>
<li>Axios</li>
<li>Design system próprio</li>
<li>Identidade visual dark, com base inicial para light theme</li>
</ul>
<h2>Módulos implementados</h2>
<ul>
<li><code>backend/app/auth</code>: autenticação, JWT e usuário autenticado.</li>
<li><code>backend/app/financial</code>: perfil financeiro, receitas, despesas, orçamento e diagnóstico.</li>
<li><code>backend/app/catalog</code>: catálogo base de ativos.</li>
<li><code>backend/app/market</code>: indicadores e fundamentos disponíveis por mercado.</li>
<li><code>backend/app/intelligence</code>: alocação por perfil, restrições de risco, scoring heurístico e ranking educacional.</li>
<li><code>backend/app/advisor</code>: Advisor IA educacional com Groq, memória curta em Redis e proteção básica contra prompt injection.</li>
<li><code>frontend/src/design-system</code>: tokens visuais, tema, tipografia, espaçamentos, radius e sombras.</li>
<li><code>frontend/src/features</code>: domínios conectados ao backend real: auth, financial, market, intelligence e advisor.</li>
<li><code>frontend/src/pages</code>: telas funcionais com onboarding, estados vazios, loading, error e UX de demo.</li>
</ul>
<h2>Arquitetura resumida</h2>
<pre><code class="language-text">frontend/ React + Vite + TanStack Query
    ↓ HTTP /api/v1
backend/app FastAPI modular
    ↓
PostgreSQL — dados transacionais e fundamentos
Redis — cache, Celery broker/result backend e memória curta do Advisor
Celery Worker/Beat — jobs assíncronos preparados
Groq API — geração controlada do Advisor IA
</code></pre>
<h2>Status atual do projeto</h2>
<p>Fases 0 a 14 concluídas:</p>
<ul>
<li>Fase 0: saneamento arquitetural.</li>
<li>Fase 1: core backend.</li>
<li>Fase 2: módulo financeiro.</li>
<li>Fase 3: catálogo de ativos.</li>
<li>Fase 4: market data.</li>
<li>Fase 5: fundamentos de mercado.</li>
<li>Fase 6: intelligence base heurística.</li>
<li>Fase 7: Advisor IA com Groq.</li>
<li>Fase 8: limpeza técnica e hardening.</li>
<li>Fase 9: frontend base e identidade visual.</li>
<li>Fase 10: integração frontend/backend real.</li>
<li>Fase 11: onboarding financeiro e estados vazios.</li>
<li>Fase 12: refinamento funcional das páginas.</li>
<li>Fase 13: polimento final para demo.</li>
<li>Fase 14: preparação GitHub + deploy.</li>
</ul>
<p>O Vinance v2 está preparado para publicação no GitHub e para deploy futuro. Ainda não é uma versão comercial final.</p>
<h2>Como rodar o backend localmente</h2>
<ol>
<li>Copie o exemplo de ambiente:</li>
</ol>
<pre><code class="language-bash">cp .env.example .env
</code></pre>
<ol start="2">
<li>Ajuste pelo menos:</li>
</ol>
<pre><code class="language-env">DATABASE_URL=postgresql+asyncpg://vinance:vinance-local-only@postgres:5432/vinance
REDIS_URL=redis://redis:6379/0
SECRET_KEY=gere-uma-chave-real-forte-com-openssl-rand-hex-32
GROQ_API_KEY=
</code></pre>
<ol start="3">
<li>Suba os serviços:</li>
</ol>
<pre><code class="language-bash">docker compose up --build
</code></pre>
<ol start="4">
<li>Rode as migrations:</li>
</ol>
<pre><code class="language-bash">docker compose exec backend alembic upgrade head
</code></pre>
<ol start="5">
<li>Valide o healthcheck:</li>
</ol>
<pre><code class="language-bash">curl http://localhost:8000/health
</code></pre>
<h2>Como rodar o frontend localmente</h2>
<pre><code class="language-bash">cd frontend
cp .env.example .env
npm install
npm run dev
</code></pre>
<p>Por padrão, o frontend espera o backend em:</p>
<pre><code class="language-env">VITE_API_BASE_URL=http://localhost:8000
VITE_API_PREFIX=/api/v1
</code></pre>
<h2>Celery worker e beat</h2>
<p>Com Docker Compose:</p>
<pre><code class="language-bash">docker compose up celery_worker celery_beat
</code></pre>
<p>Manual:</p>
<pre><code class="language-bash">celery -A backend.app.core.celery.celery_app worker --loglevel=info -Q default,market,intelligence
celery -A backend.app.core.celery.celery_app beat --loglevel=info
</code></pre>
<h2>Variáveis de ambiente principais</h2>
<p>Backend:</p>
<ul>
<li><code>ENVIRONMENT</code></li>
<li><code>DATABASE_URL</code></li>
<li><code>REDIS_URL</code></li>
<li><code>CELERY_BROKER_URL</code></li>
<li><code>CELERY_RESULT_BACKEND</code></li>
<li><code>SECRET_KEY</code></li>
<li><code>CORS_ORIGINS</code></li>
<li><code>LOG_LEVEL</code></li>
<li><code>GROQ_API_KEY</code></li>
<li><code>GROQ_MODEL</code></li>
</ul>
<p>Frontend:</p>
<ul>
<li><code>VITE_API_BASE_URL</code></li>
<li><code>VITE_API_PREFIX</code></li>
</ul>
<h2>Endpoints principais</h2>
<ul>
<li><code>GET /health</code></li>
<li><code>POST /api/v1/auth/register</code></li>
<li><code>POST /api/v1/auth/login</code></li>
<li><code>GET /api/v1/auth/me</code></li>
<li><code>GET/POST /api/v1/financial/...</code></li>
<li><code>GET /api/v1/catalog/...</code></li>
<li><code>GET /api/v1/market/...</code></li>
<li><code>GET /api/v1/intelligence/recommendations</code></li>
<li><code>POST /api/v1/advisor/chat</code></li>
</ul>
<h2>Limitações atuais</h2>
<ul>
<li>O Advisor é educacional e não substitui consultoria financeira profissional.</li>
<li>Não há recomendação definitiva de compra/venda.</li>
<li>Não há embeddings, vector database, LangChain, CrewAI, AutoGen ou Ollama.</li>
<li>Não há backtest, LSTM, Prophet ou ML treinado.</li>
<li>O frontend ainda não possui CRUD financeiro avançado.</li>
<li>O mercado ainda não possui screener avançado ou gráficos complexos.</li>
<li>Observabilidade e CI/CD ainda devem ser evoluídos antes de produção real.</li>
</ul>
<h2>Próximos passos sugeridos</h2>
<ul>
<li>Deploy frontend no Netlify.</li>
<li>Deploy backend no Railway.</li>
<li>Provisionar Postgres e Redis gerenciados.</li>
<li>Configurar migrations em produção.</li>
<li>Criar pipeline CI/CD.</li>
<li>Adicionar observabilidade, logs estruturados e alertas.</li>
<li>Evoluir telas com screenshots reais para portfólio.</li>
</ul>
<h2>Segurança</h2>
<ul>
<li>Nunca versionar <code>.env</code> real.</li>
<li>Nunca versionar <code>GROQ_API_KEY</code>.</li>
<li>Nunca usar a <code>SECRET_KEY</code> dos exemplos em produção.</li>
<li>Gere <code>SECRET_KEY</code> forte com <code>openssl rand -hex 32</code> ou equivalente.</li>
<li>Em <code>ENVIRONMENT=production</code>, o backend bloqueia <code>SECRET_KEY</code> vazia, curta ou com marcadores inseguros em inglês/português.</li>
</ul>
<h2>Correção Fase 14 — limpeza de legado e planilhas locais</h2>
<p>A pasta <code>services/</code> da raiz foi arquivada em <code>_archived/fase14_legacy_services/services/</code> por conter código legado fora do backend oficial <code>backend/app</code>. Essa arquitetura antiga não faz parte do Vinance v2 aprovado e podia conter referências a Ollama e variáveis antigas como <code>OPENAI_API_KEY</code>.</p>
<p>O Vinance v2 aprovado utiliza o backend oficial em <code>backend/app</code> e o advisor IA isolado via Groq. Ollama não faz parte da arquitetura atual do Vinance v2.</p>
<p>Arquivos locais de planilha, como entradas financeiras ou importações B3 (<code>.xlsm</code>/<code>.xlsx</code>), não são versionados. As pastas <code>data/input/</code> e <code>data/imports/</code> permanecem apenas com <code>.gitkeep</code>.</p>
<h2>Licença</h2>
<p>MIT.</p>`
  },
  {
    id: "applymize",
    title: "Applymize",
    flagship: false,
    track: "automação",
    pill: "Automação",
    category: "Automação de Candidaturas",
    year: "2025",
    status: "online · 6 integrações ativas",
    desc: "Scraping simultâneo em 6 plataformas de vagas, deduplicação e engine de ATS com IA (LLaMA 3.3 via Groq) que retorna score, gaps e plano de desenvolvimento.",
    highlight: "Auto-candidatura via Selenium com funil Kanban persistente.",
    results: [
      "Scraping simultâneo em 6 plataformas de vagas",
      "Score de compatibilidade gerado por IA (LLaMA 3.3 70B)",
      "Auto-candidatura automatizada via Selenium"
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Groq API", "Selenium"],
    link: "https://github.com/vinmedrado/applymize",
    demo: "https://applymize.netlify.app",
    image: "images/applymize.webp",
    gallery: ["gallery/applymize/applymize-01.webp", "gallery/applymize/applymize-02.webp", "gallery/applymize/applymize-03.webp", "gallery/applymize/applymize-04.webp", "gallery/applymize/applymize-05.webp", "gallery/applymize/applymize-06.webp", "gallery/applymize/applymize-07.webp", "gallery/applymize/applymize-08.webp"],
    readmeHtml: `<h1>Applymize</h1>
<h2>Origem do projeto</h2><p>O Applymize nasceu durante meu período de busca por emprego. Ao acompanhar vagas em várias plataformas, percebi que parte relevante do processo era repetitiva: procurar oportunidades, comparar requisitos com meu curriculo, organizar candidaturas e entender onde meu perfil estava mais ou menos aderente.</p><h2>Problema</h2><p>A busca manual consumia tempo e dificultava priorizar vagas realmente compativeis. Além disso, conceitos de ATS e triagem automatizada eram pouco transparentes para quem estava se candidatando.</p><h2>Solução</h2><p>A solução foi criar uma plataforma para descobrir vagas, avaliar aderência ao curriculo, organizar o funil de candidaturas e apoiar a preparação para processos seletivos. O projeto também explora análise de perfil do LinkedIn e simulações inspiradas em testes usados por plataformas de recrutamento.</p><h2>Arquitetura</h2><ul><li>Frontend em React e TypeScript.</li><li>Backend em FastAPI.</li><li>PostgreSQL para persistência.</li><li>Scrapers e automações com Python e Selenium.</li><li>Integração com IA via Groq para análise textual.</li><li>Fluxos de notificação e apoio operacional via WhatsApp.</li></ul><h2>Principais funcionalidades</h2><ul><li>Descoberta de vagas em múltiplas plataformas.</li><li>Análise de aderência entre vaga e curriculo.</li><li>Laboratório ATS para curriculos e descrições de vagas.</li><li>Funil de candidaturas com acompanhamento de status.</li><li>Ferramentas de apoio para LinkedIn e preparação de testes.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Lidar com dados heterogeneos de diferentes plataformas.</li><li>Construir uma análise útil sem transformar o score em uma promessa absoluta.</li><li>Organizar automações de candidatura com controle e revisão humana.</li><li>Conectar backend, frontend, IA e persistência em uma experiência coerente.</li></ul><h2>Aprendizados</h2><p>O projeto aprofundou minha visão sobre produto aplicado a carreira, automação de workflows, análise semantica de curriculos, APIs e construção de ferramentas que apoiam decisões sem remover o julgamento humano.</p>
<p><img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&amp;logo=python&amp;logoColor=white" />
<img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&amp;logo=fastapi&amp;logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" />
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white" />
<img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" /></p>
<h2>Visão geral</h2>
<p>Plataforma autoral de inteligência de carreira criada como portfolio full-stack e ferramenta de uso pessoal. O projeto reune descoberta de vagas, filtro de relevância, matching, análise ATS, acompanhamento de candidaturas, automações e alertas.</p>
<h2>Problema</h2>
<ul>
<li>Busca manual em múltiplas plataformas.</li>
<li>Falta de criterio consistente para relevância e matching.</li>
<li>Curriculos e vagas avaliados sem contexto.</li>
<li>Acompanhamento de candidaturas disperso.</li>
</ul>
<h2>Solução</h2>
<p>Applymize organiza o fluxo de candidatura em uma única experiência: encontrar vagas, avaliar aderência, acompanhar status e apoiar próximos passos com automação e IA contextual.</p>
<p><a href="https://applymize.netlify.app">Site público</a></p>
<h2>Arquitetura</h2>
<pre><code class="language-mermaid">flowchart TD
  U[Usuário] --&gt; F[Frontend React]
  F --&gt; A[FastAPI]
  A --&gt; D[PostgreSQL]
  A --&gt; I[Intelligence / ATS]
  A --&gt; AU[Automation]
  AU --&gt; N[WhatsApp / Alerts]
  I --&gt; S[Scoring / Matching]
  D --&gt; T[Tracking / History]
</code></pre>
<h2>Tecnologias</h2>
<p>Python, FastAPI, PostgreSQL, React, Vite, TypeScript, Docker Compose, Selenium, Groq API.</p>
<h2>Funcionalidades</h2>
<ul>
<li>Descoberta de vagas em múltiplas plataformas.</li>
<li>Matching e scoring de aderência.</li>
<li>Laboratório ATS para PDF, DOCX, TXT e texto colado.</li>
<li>Demo pública interativa.</li>
<li>IA contextual em função serverless.</li>
<li>Auto-candidatura e funil Kanban persistente.</li>
<li>Integração pessoal com WhatsApp.</li>
</ul>
<h2>Demonstração</h2>
<ul>
<li>Demo pública: <a href="https://applymize.netlify.app">applymize.netlify.app</a></li>
<li>Laboratório ATS: rota pública da demo</li>
</ul>
<h2>GIF</h2>
<p><img alt="Applymize demo" src="assets/demo/demo.gif" /></p>
<h2>Screenshots</h2>
<p><img alt="Applymize" src="assets/demo/overview.webp" /></p>
<h2>Como executar</h2>
<pre><code class="language-bash">cp .env.example .env
docker compose up -d --build
</code></pre>
<p>Frontend local:</p>
<pre><code class="language-bash">cd frontend
npm ci
npm run dev
</code></pre>
<h2>Estrutura do projeto</h2>
<pre><code class="language-text">backend/       API e domínio
frontend/      UI React
automation/    automações
intelligence/  scoring e IA
docs/          branding e documentação
tests/         testes automatizados
assets/demo/   screenshots e GIFs
</code></pre>
<h2>Roadmap</h2>
<ul>
<li>Adicionar GIFs curtos das jornadas principais.</li>
<li>Expandir explicabilidade de matching e ATS.</li>
<li>Evoluir observabilidade das automações.</li>
</ul>
<h2>Principais aprendizados</h2>
<ul>
<li>Arquitetura em camadas</li>
<li>APIs REST</li>
<li>Docker</li>
<li>PostgreSQL</li>
<li>FastAPI</li>
<li>React</li>
<li>Automações</li>
<li>Engenharia de Dados</li>
</ul>
<h2>Licenca</h2>
<p>MIT.</p>`
  },
  {
    id: "footballdecisionlab",
    title: "Football Decision Lab",
    flagship: false,
    track: "dados",
    pill: "Dados / ML",
    category: "ML & Decision Intelligence Esportiva",
    year: "2026",
    status: "experimento prospectivo ativo · paper trading",
    desc: "Evolução do MatchFlow: plataforma de pesquisa e operação paper que transforma partidas em decisões rastreáveis, com validação temporal, modelo champion congelado (hash SHA-256) e settlement automático.",
    highlight: "Governança champion/challenger com promoção deliberada, calibração (Brier) auditada e guardrails fail-closed — reporta com honestidade quando o intervalo de confiança do ROI cruza zero.",
    results: [
      "Separação temporal rigorosa (sem data leakage) entre backfill, backtest e captura prospectiva",
      "Guardrails fail-closed, imutabilidade de sinais e hash SHA-256 do modelo",
      "Governança human-in-the-loop na promoção entre modelo challenger e champion"
    ],
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "Scikit-learn"],
    link: "https://github.com/vinmedrado/football-decision-lab",
    demo: "https://football-decision-lab.netlify.app/",
    image: "images/footballdecisionlab.png",
    gallery: ["gallery/footballdecisionlab/footballdecisionlab-01.webp", "gallery/footballdecisionlab/footballdecisionlab-02.webp", "gallery/footballdecisionlab/footballdecisionlab-03.webp", "gallery/footballdecisionlab/footballdecisionlab-04.webp", "gallery/footballdecisionlab/footballdecisionlab-05.webp", "gallery/footballdecisionlab/footballdecisionlab-06.webp", "gallery/footballdecisionlab/footballdecisionlab-07.webp", "gallery/footballdecisionlab/footballdecisionlab-08.webp", "gallery/footballdecisionlab/footballdecisionlab-09.webp", "gallery/footballdecisionlab/footballdecisionlab-10.webp", "gallery/footballdecisionlab/footballdecisionlab-11.webp"],
    readmeHtml: `<h1>Football Decision Lab</h1>
<h2>Origem do projeto</h2><p>O Football Decision Lab nasceu da combinação entre interesse por esportes e a percepção de que decisões em apostas esportivas eram frequentemente tomadas sem base estatística suficiente. A ideia evoluiu para um laboratório de pesquisa, não para uma promessa de previsão de resultados.</p><h2>Problema</h2><p>O problema era avaliar estratégias com dados incompletos, sem validação temporal clara e sem separar o que foi aprendido no passado do que poderia ser testado prospectivamente.</p><h2>Solução</h2><p>A solução foi estruturar um pipeline de pesquisa com coleta, validação temporal, feature engineering, backtesting, congelamento de modelo e operação em ambiente paper. Quando houver ROI calculado, ele deve ser interpretado apenas como resultado de teste simulado, não como garantia de retorno real.</p><h2>Arquitetura</h2><ul><li>Pipeline em Python para coleta, normalização e validação.</li><li>Pandas e bibliotecas de Machine Learning para features e modelos.</li><li>Backtesting com separação temporal.</li><li>Congelamento de modelo champion com hash.</li><li>Captura pre-jogo e settlement em modo paper.</li><li>Site estático para apresentação e documentação.</li></ul><h2>Principais funcionalidades</h2><ul><li>Coleta e preparação de jogos e odds.</li><li>Validação temporal para reduzir risco de data leakage.</li><li>Engenharia de atributos para análise quantitativa.</li><li>Backtesting e avaliação de calibração.</li><li>Operação prospectiva simulada com controle de ciclo.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Evitar vazamento temporal entre treino, backtest e operação simulada.</li><li>Separar hipótese estatística de conclusão operacional.</li><li>Organizar governanca entre modelos champion e challenger.</li><li>Manter rastreabilidade de sinais e resultados liquidados.</li></ul><h2>Aprendizados</h2><p>O projeto consolidou aprendizados sobre validação temporal, backtesting, calibração, governanca de modelos e a importância de comunicar incerteza de forma honesta.</p>
<p>Pipeline local de pesquisa e operação simulada para mercados de futebol. O
projeto coleta jogos e odds, valida dados no tempo, gera features, roda
backtests, congela modelos, captura entradas pré-jogo e liquida resultados em
uma banca paper.</p>
<blockquote>
<p>Estado em 23/07/2026: sistema operacional em modo <code>PAPER_ONLY</code>, automação
ativa e apostas reais bloqueadas.</p>
</blockquote>
<h2>Estado atual</h2>
<table>
<thead>
<tr>
<th>Item</th>
<th>Configuração</th>
</tr>
</thead>
<tbody>
<tr>
<td>Ciclo</td>
<td><code>PAPER_2026_07_TG_FT_O25_V1</code></td>
</tr>
<tr>
<td>Mercado avaliado</td>
<td>Mais de 2,5 gols (<code>TG_FT_O25</code>)</td>
</tr>
<tr>
<td>Captura</td>
<td>30 a 90 minutos antes do jogo</td>
</tr>
<tr>
<td>Valor simulado</td>
<td>R$ 5,00 por entrada</td>
</tr>
<tr>
<td>Limite diário</td>
<td>10 apostas simuladas</td>
</tr>
<tr>
<td>Apostas reais</td>
<td>Desativadas</td>
</tr>
<tr>
<td>Primeira revisão</td>
<td>Não antes de 01/10/2026</td>
</tr>
<tr>
<td>Meta principal</td>
<td>300 apostas liquidadas</td>
</tr>
</tbody>
</table>
<p>O histórico reconstruído permanece disponível para auditoria, mas não é
misturado com o ciclo prospectivo atual.</p>
<h2>Fluxo do pipeline</h2>
<pre><code class="language-text">Jogos e odds do dia
        |
Validação temporal e preparação dos dados
        |
Feature engineering
        |
Backtest por janela temporal
        |
Treinamento e congelamento do modelo
        |
Captura pré-jogo imutável
        |
Banca simulada
        |
Settlement, ROI, risco e calibração
</code></pre>
<p>O sistema pode analisar muitas linhas para uma mesma partida. Isso não significa
que todas sejam apostas. O dashboard mostra somente entradas oficialmente
aprovadas pelo ciclo paper atual; análises rejeitadas e arquivos pré-ciclo ficam
guardados apenas para auditoria.</p>
<h2>Estrutura do repositório</h2>
<pre><code class="language-text">01_scripts/            coleta, normalização e rotinas de pipeline
02_validation/         validações temporais e qualidade de dados
03_backtest/           avaliação histórica e métricas de estratégia
04_ml/                 treinamento, modelo congelado, paper trading e settlement
core/                  regras e componentes compartilhados
scripts/               utilitários operacionais
tests/                 testes de regressão e automação
web_dashboard_lux/     dashboard local
docs/                  documentação publicada do projeto
site/                  site estático de demonstração
reference/             contrato público mínimo do paper trading
</code></pre>
<p>Dados brutos, caches, logs, datasets, artefatos de modelo e outputs locais ficam
fora do Git por padrão. Ajuste <code>.env</code> a partir de <code>.env.example</code> e não versione
chaves de provedores.</p>
<h2>Instalação</h2>
<pre><code class="language-powershell">python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
pip install -r web_dashboard_lux\\requirements.txt
copy .env.example .env
</code></pre>
<h2>Execução manual</h2>
<p>Validar o modelo congelado:</p>
<pre><code class="language-powershell">python 04_ml\\paper_model_manager.py validate
</code></pre>
<p>Inspecionar a automação sem executar rotinas:</p>
<pre><code class="language-powershell">python automation_orchestrator.py --status
python automation_orchestrator.py --run-due --dry-run
</code></pre>
<p>Executar rotinas vencidas:</p>
<pre><code class="language-powershell">python automation_orchestrator.py --run-due
</code></pre>
<p>Executar testes:</p>
<pre><code class="language-powershell">pytest tests -q
</code></pre>
<h2>Operação automática</h2>
<p>O Agendador de Tarefas do Windows mantém dois processos:</p>
<ul>
<li><code>FootballDecisionLab-Paper-Automation</code>: verifica as rotinas a cada 15 minutos;</li>
<li><code>FootballDecisionLab-Dashboard</code>: mantém o painel local disponível.</li>
</ul>
<p>Instalar ou reaplicar as tarefas:</p>
<pre><code class="language-powershell">powershell -ExecutionPolicy Bypass -File .\\install_automation.ps1
</code></pre>
<p>Remover as tarefas:</p>
<pre><code class="language-powershell">powershell -ExecutionPolicy Bypass -File .\\uninstall_automation.ps1
</code></pre>
<p>Após desligamento, suspensão ou falta de energia, o controlador recupera rotinas
vencidas quando o notebook volta. Uma janela pré-jogo já perdida não é recriada
retrospectivamente, pois isso contaminaria o experimento.</p>
<h2>Dashboard</h2>
<ul>
<li>No notebook: <code>http://127.0.0.1:8060</code></li>
<li>No celular conectado à mesma rede: <code>http://IP_DO_NOTEBOOK:8060</code></li>
</ul>
<p>O painel apresenta apostas aprovadas do ciclo atual, saldo simulado, ROI, taxa
de acerto, drawdown, resultados pendentes e liquidados, calibração, Brier,
progresso da amostra, saúde da automação, modelos e mercados para inspeção.</p>
<p>O dashboard é local. Não exponha a porta <code>8060</code> diretamente na internet.</p>
<h2>Calendário automático</h2>
<table>
<thead>
<tr>
<th>Rotina</th>
<th style="text-align: right;">Frequência</th>
</tr>
</thead>
<tbody>
<tr>
<td>Atualizar jogos e odds</td>
<td style="text-align: right;">a cada 60 minutos</td>
</tr>
<tr>
<td>Procurar entradas paper</td>
<td style="text-align: right;">a cada 15 minutos</td>
</tr>
<tr>
<td>Atualizar resultados por horário</td>
<td style="text-align: right;">a cada 15 minutos</td>
</tr>
<tr>
<td>Liquidação geral</td>
<td style="text-align: right;">diariamente às 10:00 e 22:30</td>
</tr>
<tr>
<td>Monitor e alertas</td>
<td style="text-align: right;">diariamente às 23:15</td>
</tr>
<tr>
<td>Atualizar base oficial</td>
<td style="text-align: right;">terça-feira às 02:00</td>
</tr>
<tr>
<td>Treinar desafiante</td>
<td style="text-align: right;">dia 2 de cada mês às 03:00</td>
</tr>
</tbody>
</table>
<p>O modelo desafiante nunca substitui automaticamente o modelo do ciclo atual.
Qualquer promoção exige revisão humana, validação temporal e abertura de um novo
<code>cycle_id</code>.</p>
<h2>Documentação de continuidade</h2>
<ul>
<li><a href="OPERACAO_PAPER.md">Operação paper</a></li>
<li><a href="CADERNO_CONTINUIDADE.md">Caderno de continuidade</a></li>
<li><a href="04_ml/RETRAINING_POLICY.md">Política de retreinamento</a></li>
<li><a href="04_ml/README_SETTLEMENT_FLASHSCORE.md">Liquidação pelo Flashscore</a></li>
</ul>
<h2>Licença</h2>
<p>MIT.</p>
<h2>Aviso</h2>
<p>O projeto trabalha com simulações. Resultado histórico positivo não comprova
lucro futuro, e nenhuma saída do sistema constitui recomendação financeira.</p>`
  },
  {
    id: "marketplace",
    title: "Marketplace Seller Platform",
    flagship: false,
    track: "automação",
    pill: "Automação",
    category: "Automação para Marketplaces",
    year: "2025",
    status: "online · pipeline raw→staging→mart",
    desc: "Backend com OAuth2 real (Mercado Livre), pipelines em camadas orquestrados via Apache Airflow, multi-tenant.",
    highlight: "Feature store e ML para precificação dinâmica com proteção de margem.",
    results: [
      "Integração OAuth2 real com Mercado Livre",
      "Pipeline raw → staging → mart via Airflow",
      "Banco multi-cliente com isolamento por tenant"
    ],
    stack: ["FastAPI", "Airflow", "PostgreSQL", "SQLAlchemy", "Docker"],
    link: "https://github.com/vinmedrado/marketplace-seller-platform",
    demo: "https://vinmedrado.github.io/marketplace-seller-platform/",
    image: "images/marketplace.png",
    gallery: ["gallery/marketplace/marketplace-01.webp", "gallery/marketplace/marketplace-02.webp", "gallery/marketplace/marketplace-03.webp", "gallery/marketplace/marketplace-04.webp", "gallery/marketplace/marketplace-05.webp", "gallery/marketplace/marketplace-06.webp", "gallery/marketplace/marketplace-07.webp", "gallery/marketplace/marketplace-08.webp"],
    readmeHtml: `<h1>MarketPlace Seller Platform</h1>
<h2>Origem do projeto</h2><p>O Marketplace Seller Platform nasceu após desenvolver uma solução para um cliente que precisava cadastrar produtos no Mercado Livre. Durante esse processo, ficaram evidentes dificuldades de organização, duplicidade de anúncios e tomada de decisão sobre preços.</p><h2>Problema</h2><p>Vendedores podem perder controle quando produtos, anúncios e preços são gerenciados de forma manual ou espalhada. A duplicidade de cadastros e a falta de referência competitiva tornam a operação menos confiável.</p><h2>Solução</h2><p>A solução evoluiu para uma plataforma de gestão conectada a API do Mercado Livre, com organização de produtos e estudos para sugerir preços competitivos com apoio de dados e Machine Learning.</p><h2>Arquitetura</h2><ul><li>Frontend para operação e acompanhamento.</li><li>Backend com APIs para produtos, anúncios e integrações.</li><li>Banco de dados para catálogo e histórico operacional.</li><li>Integração com API do Mercado Livre.</li><li>Módulos de análise e estudos de precificação.</li></ul><h2>Principais funcionalidades</h2><ul><li>Organização de produtos e anúncios.</li><li>Integração com Mercado Livre.</li><li>Controle de duplicidades e estrutura de catálogo.</li><li>Base para análise de preços e competitividade.</li><li>Fluxos de operação voltados a sellers.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Entender regras e limites da API do marketplace.</li><li>Modelar produtos, anúncios e variações de forma consistente.</li><li>Lidar com duplicidade e atualização de dados externos.</li><li>Transformar uma necessidade de cliente em produto reutilizável.</li></ul><h2>Aprendizados</h2><p>O projeto trouxe aprendizados sobre integração com APIs externas, modelagem de catálogo, automação comercial e evolução de uma entrega sob demanda para uma plataforma mais ampla.</p>
<p>Estudo de caso full-stack para operação e inteligência de sellers em
marketplaces. O projeto combina React, FastAPI, PostgreSQL, pipelines de dados,
pricing assistido, ML explicável e privacidade por design.</p>
<p>O MarketPlace Seller Platform não é comercializado. O repositório mantém duas experiências
deliberadamente separadas:</p>
<ul>
<li><code>frontend/</code>: console pessoal conectado à API e às integrações reais.</li>
<li><code>portfolio/</code>: demonstração pública para recrutadores, sem backend, usuários,
  tokens ou dados reais.</li>
</ul>
<p><a href="https://github.com/vinmedrado/marketplace-seller-platform/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/vinmedrado/marketplace-seller-platform/actions/workflows/ci.yml/badge.svg" /></a></p>
<p><strong><a href="https://vinmedrado.github.io/marketplace-seller-platform/">Abrir demonstração pública</a></strong></p>
<h2>O que a demonstração apresenta</h2>
<p>A aplicação pública oferece nove áreas preenchidas por um cenário sintético e
determinístico: visão executiva, catálogo, pricing e concorrência, War Room,
forecast, reconciliação financeira, ML explicável, arquitetura e LGPD.</p>
<p>As ações da demo são armazenadas apenas em <code>sessionStorage</code>. O botão
“Reiniciar cenário” restaura a experiência original, e nenhum visitante altera
o cenário visto por outra pessoa.</p>
<pre><code class="language-text">portfolio/ ── JSON sintético versionado ── GitHub Pages

frontend/ ── FastAPI ── service layer ── PostgreSQL
                              ├── Mercado Livre OAuth
                              ├── pricing/forecast
                              └── datasets e modelos ML por tenant
</code></pre>
<h2>Executar a demo pública</h2>
<p>Requer Node.js 22.12 ou superior.</p>
<pre><code class="language-bash">cd portfolio
npm ci
npm test
npm run check
npm run build
npm run dev
</code></pre>
<p>O workflow <code>.github/workflows/pages.yml</code> testa, compila e pública
automaticamente a pasta <code>portfolio/</code> no GitHub Pages a cada atualização da
branch <code>main</code>. O <code>netlify.toml</code> foi preservado apenas como alternativa de
implantação.</p>
<h2>Executar o console pessoal</h2>
<p>Copie <code>.env.example</code> para <code>.env</code>, ajuste segredos e execute:</p>
<pre><code class="language-bash">docker compose up --build
</code></pre>
<ul>
<li>Console: <code>http://localhost:5173</code></li>
<li>API: <code>http://localhost:8000</code></li>
<li>OpenAPI, somente fora de produção: <code>http://localhost:8000/docs</code></li>
</ul>
<p>O container executa <code>alembic upgrade head</code> antes de iniciar a API. A conta demo
é habilitada por padrão somente em desenvolvimento/teste e deve permanecer
desabilitada em produção.</p>
<p>Para preparar o cenário sintético local sem Docker:</p>
<pre><code class="language-bash">alembic upgrade head
python scripts/seed_demo.py
</code></pre>
<p>O reset é bloqueado em produção e exige confirmação explícita:</p>
<pre><code class="language-bash">python scripts/reset_demo.py --yes
</code></pre>
<h2>Qualidade</h2>
<p>Backend:</p>
<pre><code class="language-bash">python -m compileall -q .
pytest -q
python -m pip_audit -r requirements.txt
</code></pre>
<p>Console:</p>
<pre><code class="language-bash">cd frontend
npm ci
npm run check
npm run lint
npm test
npm run build
</code></pre>
<p>Demo pública:</p>
<pre><code class="language-bash">cd portfolio
npm ci
npm run check
npm test
npm run build
npm audit
</code></pre>
<h2>Privacidade e LGPD</h2>
<p>A demo pública possui uma tela de acesso inteiramente local, com credenciais
fictícias já preenchidas. Não há autenticação remota, analytics, formulários
de coleta, API ou banco remoto.
O console pessoal oferece aviso de transparência, exportação autenticada e
protocolos de direitos do titular. Logs, tokens, nonces e convites possuem
política explícita de retenção e descarte.</p>
<pre><code class="language-bash"># apenas informa registros elegíveis
python scripts/privacy_cleanup.py

# aplica a política configurada
python scripts/privacy_cleanup.py --apply
</code></pre>
<p>Produção exige um canal privado em <code>PRIVACY_CONTACT_EMAIL</code>. Consulte o
<a href="PRIVACY.md">Aviso de Privacidade</a> e a
<a href="docs/LGPD.md">Governança LGPD</a>. Esses controles apoiam conformidade, mas não
substituem decisões do controlador, contratos e avaliação jurídica.</p>
<h2>Organização</h2>
<table>
<thead>
<tr>
<th>Diretório</th>
<th>Responsabilidade</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ui/</code></td>
<td>Contratos HTTP FastAPI</td>
</tr>
<tr>
<td><code>services/</code></td>
<td>Casos de uso e inteligência operacional</td>
</tr>
<tr>
<td><code>models/</code></td>
<td>ORM e schemas Pydantic</td>
</tr>
<tr>
<td><code>db/alembic/</code></td>
<td>Evolução executável do schema</td>
</tr>
<tr>
<td><code>pricing/</code></td>
<td>Regras, guardrails e cálculo de preço</td>
</tr>
<tr>
<td><code>ml/</code></td>
<td>Features, treinamento, inferência e fallback</td>
</tr>
<tr>
<td><code>data_engineering/</code></td>
<td>Raw, staging, marts e feature store</td>
</tr>
<tr>
<td><code>integrations/</code></td>
<td>OAuth e API Mercado Livre</td>
</tr>
<tr>
<td><code>frontend/</code></td>
<td>Console pessoal</td>
</tr>
<tr>
<td><code>portfolio/</code></td>
<td>Experiência pública no GitHub Pages</td>
</tr>
<tr>
<td><code>tests/</code></td>
<td>Testes unitários e integrados do backend</td>
</tr>
</tbody>
</table>
<p>Mais detalhes em <a href="docs/ARCHITECTURE.md">Arquitetura</a>,
<a href="docs/SECURITY.md">Segurança</a>, <a href="docs/LGPD.md">Governança LGPD</a> e
<a href="docs/DEMO_DATA.md">Política de dados da demo</a>. Logos, cores e o card social
estão documentados em <a href="docs/BRAND.md">Identidade visual</a>.</p>
<h2>Limites assumidos</h2>
<ul>
<li>Jobs do console pessoal executam em processo; não representam uma fila
  distribuída.</li>
<li>Forecast é heurístico e sempre comunica confiança e limitações.</li>
<li>Billing e planos foram mantidos como exercício arquitetural histórico, não
  como oferta comercial.</li>
<li>Amazon e Shopee não são anunciados como integrações implementadas.</li>
</ul>
<h2>Licença</h2>
<p>MIT.</p>`
  },
  {
    id: "lumyra",
    title: "Lumyra",
    flagship: false,
    track: "automação",
    pill: "Automação",
    category: "Plataforma de Eventos Operacionais",
    year: "2025",
    status: "online · websocket realtime",
    desc: "SaaS de operação de eventos: RSVP, mapa de mesas e comunicação via WhatsApp para assessorias e convidados.",
    highlight: "Dashboards em tempo real via WebSocket, multi-tenant com isolamento por cliente.",
    results: [
      "Dashboards em tempo real via WebSocket",
      "Automação de convites e RSVP via WhatsApp API",
      "Arquitetura multi-tenant isolada por cliente"
    ],
    stack: ["FastAPI", "React", "WebSocket", "WhatsApp API"],
    link: "https://github.com/vinmedrado/Lumyra",
    demo: "https://lumyra-events.netlify.app/",
    image: "images/lumyra.png",
    gallery: ["gallery/lumyra/lumyra-01.webp", "gallery/lumyra/lumyra-02.webp", "gallery/lumyra/lumyra-03.webp", "gallery/lumyra/lumyra-04.webp", "gallery/lumyra/lumyra-05.webp", "gallery/lumyra/lumyra-06.webp", "gallery/lumyra/lumyra-07.webp", "gallery/lumyra/lumyra-08.webp", "gallery/lumyra/lumyra-09.webp", "gallery/lumyra/lumyra-10.webp", "gallery/lumyra/lumyra-11.webp", "gallery/lumyra/lumyra-12.webp", "gallery/lumyra/lumyra-13.webp", "gallery/lumyra/lumyra-14.webp"],
    readmeHtml: `<h1>Lumyra</h1>
<h2>Origem do projeto</h2><p>O Lumyra nasceu durante a organização do meu casamento. Ao comparar soluções existentes, percebi que muitas plataformas eram limitadas para quem queria uma experiência mais personalizada, organizada e premium para convidados, noivos e assessorias.</p><h2>Problema</h2><p>Eventos envolvem informações, confirmações, listas, comunicação e detalhes de experiência. Quando esses pontos ficam espalhados, a organização se torna mais trabalhosa e a jornada do convidado perde qualidade.</p><h2>Solução</h2><p>A solução foi projetar uma plataforma de eventos com foco em personalização, gerenciamento completo e experiência visual mais cuidadosa, indo além de uma pagina simples de convite.</p><h2>Arquitetura</h2><ul><li>Frontend para experiência dos convidados e painel do evento.</li><li>Backend para organização de dados do evento.</li><li>Banco de dados para convidados, confirmações e configurações.</li><li>Deploy web para acesso público.</li><li>Base para integrações futuras com comunicação e gestão de fornecedores.</li></ul><h2>Principais funcionalidades</h2><ul><li>Pagina personalizada do evento.</li><li>Gerenciamento de convidados e confirmações.</li><li>Experiência visual premium para noivos e convidados.</li><li>Estrutura para assessorias acompanharem informações do evento.</li><li>Configurações de conteúdo e personalização.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Equilibrar experiência visual com organização operacional.</li><li>Modelar dados de convidados e confirmações.</li><li>Criar uma experiência responsiva e simples de usar.</li><li>Pensar o produto para diferentes perfis de usuário.</li></ul><h2>Aprendizados</h2><p>O projeto reforcou aprendizados sobre experiência do usuário, produto orientado a eventos, personalização e construção de plataformas que combinam operação e apresentação.</p>
<p><img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" />
<img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&amp;logo=fastapi&amp;logoColor=white" />
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white" />
<img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" /></p>
<h2>Visão geral</h2>
<p>Lumyra e uma plataforma SaaS para operação de eventos sociais e corporativos, conectando assessorias, clientes e convidados em uma experiência com RSVP, WhatsApp, formulários dinamicos, mapa de mesas, financeiro, documentos, analytics, workflows e realtime.</p>
<h2>Problema</h2>
<ul>
<li>Operação fragmentada entre planilhas, mensagens e ferramentas isoladas.</li>
<li>Falta de rastreabilidade em RSVP, mesas e comunicação.</li>
<li>Dificuldade de manter experiência consistente para convidados.</li>
</ul>
<h2>Solução</h2>
<p>O projeto foi desenhado para unir experiência do convidado, controle operacional e comunicação em tempo real.</p>
<p><a href="https://lumyra-events.netlify.app">Live demo</a></p>
<h2>Arquitetura</h2>
<pre><code class="language-mermaid">flowchart TD
  G[Convidado] --&gt; R[Portal RSVP]
  A[Assessoria] --&gt; F[Frontend React]
  F --&gt; B[FastAPI]
  B --&gt; D[SQLite / PostgreSQL]
  B --&gt; W[Workers]
  B --&gt; S[Scheduler]
  B --&gt; WS[WebSocket Realtime]
  D --&gt; N[Notifications / Analytics]
</code></pre>
<h2>Tecnologias</h2>
<p>Python, FastAPI, React, TypeScript, Tailwind CSS, WebSocket, SQLite, Docker, Netlify.</p>
<h2>Funcionalidades</h2>
<ul>
<li>Landing page SaaS.</li>
<li>Login e demo mode.</li>
<li>Área da assessoria/admin.</li>
<li>Área dos noivos/clientes.</li>
<li>Portal do convidado mobile-first.</li>
<li>Notification center.</li>
<li>Realtime indicator e WebSocket.</li>
<li>Demo integrada entre personas.</li>
</ul>
<h2>Demonstração</h2>
<ul>
<li>Demo pública: <a href="https://lumyra-events.netlify.app">lumyra-events.netlify.app</a></li>
<li>Convite de demonstração: link público do portal do convidado</li>
</ul>
<h2>GIF</h2>
<p><img alt="Lumyra demo" src="assets/demo/demo.gif" /></p>
<h2>Screenshots</h2>
<p><img alt="Lumyra" src="assets/demo/overview.png" /></p>
<h2>Como executar</h2>
<h3>Frontend</h3>
<pre><code class="language-bash">cd frontend_web
npm ci
npm run dev
</code></pre>
<h3>Backend</h3>
<pre><code class="language-bash">python -m venv .venv
pip install -r requirements.txt
uvicorn backend.main:app --reload
</code></pre>
<h3>Docker</h3>
<pre><code class="language-bash">cp .env.example .env
docker compose up --build
</code></pre>
<h2>Estrutura do projeto</h2>
<pre><code class="language-text">frontend_web/   frontend principal
backend/        API
services/       negocio
workers/        jobs
db/             banco e models
migrations/     migrations
docs/           doc técnica
storage/        armazenamento local
tests/          testes
assets/demo/    screenshots e GIFs
</code></pre>
<h2>Roadmap</h2>
<ul>
<li>Adicionar galerias reais de telas no README.</li>
<li>Continuar a consolidação da migração para PostgreSQL.</li>
<li>Evoluir RBAC e observabilidade.</li>
</ul>
<h2>Principais aprendizados</h2>
<ul>
<li>Arquitetura em camadas</li>
<li>APIs REST</li>
<li>Docker</li>
<li>PostgreSQL</li>
<li>FastAPI</li>
<li>React</li>
<li>Automações</li>
<li>Engenharia de Dados</li>
</ul>
<h2>Licenca</h2>
<p>MIT.</p>`
  },
  {
    id: "meucarrovale",
    title: "Meu Carro Vale",
    flagship: false,
    track: "dados",
    pill: "Dados / ML",
    category: "Valuation Automotivo",
    year: "2026",
    status: "online · fonte + confiança exibidas",
    desc: "Valuation automotivo com dados FIPE local-first combinados a comparáveis reais de anúncios de mercado.",
    highlight: "Mostra fonte e confiança de cada estimativa; laudo em PDF premium.",
    results: [
      "Dados FIPE local-first, resiliente a instabilidade de API",
      "Comparáveis reais de anúncios de mercado",
      "Laudo em PDF premium exportável"
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "Alembic"],
    link: "https://github.com/vinmedrado/meu-carro-vale",
    demo: "https://vinmedrado.github.io/meu-carro-vale/",
    image: "images/meucarrovale.png",
    pdf: "docs/laudo-meu-carro-vale.pdf",
    pdfLabel: "ver laudo em PDF",
    gallery: ["gallery/meucarrovale/meucarrovale-01.webp", "gallery/meucarrovale/meucarrovale-02.webp", "gallery/meucarrovale/meucarrovale-03.webp", "gallery/meucarrovale/meucarrovale-04.webp"],
    readmeHtml: `<h1>Meu Carro Vale</h1>
<h2>Origem do projeto</h2><p>O Meu Carro Vale nasceu da dificuldade em encontrar um preço justo para veículos usados. Ao observar anúncios em diferentes canais, percebi que a referência da FIPE sozinha não explicava totalmente a realidade de mercado.</p><h2>Problema</h2><p>Quem compra ou vende um veículo usado precisa comparar preço, ano, versão, quilometragem, estado e comportamento do mercado. Essas informações normalmente ficam dispersas em FIPE e marketplaces.</p><h2>Solução</h2><p>A solução foi criar uma plataforma que reune informações da FIPE e de marketplaces como OLX, Mercado Livre e Webmotors para formar uma base historica e permitir analises futuras com Machine Learning para estimativa de preços.</p><h2>Arquitetura</h2><ul><li>Frontend para consulta e apresentação de analises.</li><li>Backend para normalização, cache e regras de negocio.</li><li>Banco de dados para histórico e consultas.</li><li>Integrações com FIPE e fontes publicas de anúncios.</li><li>Base para modelos futuros de precificação.</li></ul><h2>Principais funcionalidades</h2><ul><li>Consulta de referências por veículo.</li><li>Coleta e organização de anúncios de mercado.</li><li>Construção de histórico para análise futura.</li><li>Relatórios e visualização de preço estimado.</li><li>Preparação para modelos de Machine Learning.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Normalizar dados de fontes diferentes.</li><li>Lidar com variações de versão, ano e descrição dos veículos.</li><li>Construir cache e fallback para APIs externas.</li><li>Projetar uma base útil para análise historica.</li></ul><h2>Aprendizados</h2><p>O projeto aprofundou aprendizados sobre integração de dados externos, normalização, modelagem de domínio automotivo e preparação de dados para modelos preditivos.</p>
<p><strong>Meu Carro Vale</strong> é uma plataforma SaaS de valuation automotivo inteligente para o mercado brasileiro. O produto combina FIPE local-first, dados reais de mercado, comparáveis de anúncios, dashboard premium, laudo PDF e gates de monetização para ajudar usuários a estimar o valor correto de venda de carros com mais clareza e confiança.</p>
<blockquote>
<p>Status: projeto disponível para demonstração local, portfólio técnico e preparação de deploy. Integrações de pagamento permanecem em modo <strong>Pagar.me-ready</strong>, sem cobrança real por padrão.</p>
</blockquote>
<hr />
<h2>Visão geral</h2>
<p>A plataforma orienta o usuário por um wizard de avaliação, calcula uma faixa de preço com base em dados disponíveis, exibe um dashboard visual com score, comparáveis e insights, e permite exportar um laudo premium conforme o plano contratado.</p>
<p>O foco do projeto é demonstrar uma arquitetura SaaS completa, com backend em FastAPI, frontend React premium, PostgreSQL, Alembic, Docker Compose, tracking de uso e preparação para billing.</p>
<hr />
<h2>Problema resolvido</h2>
<p>Vender um veículo pelo preço errado pode gerar perda financeira, baixa liquidez ou demora excessiva na negociação. A FIPE sozinha nem sempre reflete anúncios ativos, diferenças regionais, quilometragem, estado do veículo e estratégia de venda.</p>
<p>O Meu Carro Vale centraliza esses sinais em uma experiência simples:</p>
<ul>
<li>coleta informações do veículo;</li>
<li>consulta dados locais de referência;</li>
<li>usa comparáveis reais quando disponíveis;</li>
<li>explica a fonte e a confiança do cálculo;</li>
<li>gera um relatório profissional para apoiar a venda.</li>
</ul>
<hr />
<h2>Diferenciais do produto</h2>
<ul>
<li><strong>FIPE local-first:</strong> evita quebrar o fluxo do usuário quando APIs externas ficam indisponíveis ou rate limited.</li>
<li><strong>Dados reais de mercado:</strong> estrutura preparada para Mercado Livre API e registros locais de anúncios.</li>
<li><strong>Transparência:</strong> o dashboard mostra fonte dos dados, confiança e avisos quando houver fallback.</li>
<li><strong>UX premium:</strong> wizard, dashboard, admin e PDF com linguagem visual de SaaS financeiro.</li>
<li><strong>Monetização:</strong> planos FREE, PRO e BUSINESS com gates de uso, PDF e comparáveis.</li>
<li><strong>Deploy-ready:</strong> Docker Compose, Alembic, seed demo e documentação operacional.</li>
</ul>
<hr />
<h2>Funcionalidades principais</h2>
<ul>
<li>Wizard premium de avaliação do veículo.</li>
<li>Valuation com faixa de venda rápida, preço ideal e valor premium.</li>
<li>Result Dashboard Premium com score, comparáveis, distribuição e insights.</li>
<li>Exportação de laudo PDF premium.</li>
<li>Admin Dashboard para saúde dos dados e operações.</li>
<li>FIPE cache/local-first com fallback seguro.</li>
<li>Adapter Mercado Livre API para dados de mercado.</li>
<li>Tracking de uso mensal por tenant/usuário.</li>
<li>Gates de planos e preparação para Pagar.me.</li>
</ul>
<hr />
<h2>Stack técnica</h2>
<h3>Backend</h3>
<ul>
<li>FastAPI</li>
<li>SQLAlchemy</li>
<li>Alembic</li>
<li>PostgreSQL</li>
<li>Passlib para hash de senha</li>
<li>Pytest</li>
</ul>
<h3>Frontend</h3>
<ul>
<li>React</li>
<li>Vite</li>
<li>TypeScript</li>
<li>Tailwind CSS</li>
<li>Framer Motion</li>
<li>Recharts</li>
<li>jsPDF/html2canvas para PDF</li>
</ul>
<h3>Infra local</h3>
<ul>
<li>Docker Compose</li>
<li>PostgreSQL 16</li>
<li>Redis 7</li>
</ul>
<hr />
<h2>Arquitetura</h2>
<pre><code class="language-text">Usuário
  ↓
Frontend React/Vite
  ↓
Backend FastAPI
  ├─ Auth/JWT
  ├─ Valuation Engine
  ├─ FIPE Service local-first
  ├─ Market Data Services
  ├─ SaaS/Billing Gates
  └─ Admin/Data Operations
  ↓
PostgreSQL + Alembic
</code></pre>
<p>O <code>mcv-data-engine/</code> permanece como módulo separado para coleta/processamento de dados, enquanto o backend principal consome dados persistidos e expõe endpoints para a experiência SaaS.</p>
<hr />
<h2>Fluxo do produto</h2>
<ol>
<li>Usuário acessa a landing/app.</li>
<li>Preenche o Wizard de Avaliação.</li>
<li>Backend valida gates de uso do plano.</li>
<li>Valuation consulta FIPE local e dados de mercado disponíveis.</li>
<li>Result Dashboard exibe score, faixa de preço, comparáveis e insights.</li>
<li>Usuário PRO/BUSINESS pode exportar PDF.</li>
<li>Admin acompanha saúde de FIPE, market data e jobs.</li>
</ol>
<hr />
<h2>Fluxo de dados</h2>
<pre><code class="language-text">FIPE/API externa → Cache local PostgreSQL → Valuation
Mercado Livre API → market_listings → Comparáveis/estatísticas → Valuation
Valuation → valuation_reports → Dashboard/PDF/Histórico
UsageTracking → Gates de plano → Controle de monetização
</code></pre>
<p>Quando dados reais são insuficientes, o sistema mantém fallback explícito e honesto na interface.</p>
<hr />
<h2>Como rodar localmente</h2>
<h3>1. Preparar variáveis</h3>
<pre><code class="language-bash">cp .env.example .env
</code></pre>
<p>Revise <code>.env</code> antes de subir os containers. Para demo local, mantenha:</p>
<pre><code class="language-env">PAGARME_ENABLED=false
APP_ENV=local
DEMO_MODE=true
</code></pre>
<h3>2. Subir containers</h3>
<pre><code class="language-bash">docker compose up -d
</code></pre>
<h3>3. Rodar migrations</h3>
<pre><code class="language-bash">docker compose exec backend alembic -c /workspace/alembic.ini upgrade head
</code></pre>
<h3>4. Rodar seed demo</h3>
<pre><code class="language-bash">docker compose exec backend python /app/scripts/seed_demo.py
</code></pre>
<h3>5. Acessar</h3>
<ul>
<li>Frontend: <code>http://localhost:9000</code></li>
<li>Backend: <code>http://localhost:8020</code></li>
<li>Docs FastAPI: <code>http://localhost:8020/docs</code></li>
</ul>
<hr />
<h2>Variáveis de ambiente</h2>
<p>Principais variáveis usadas localmente:</p>
<table>
<thead>
<tr>
<th>Variável</th>
<th>Uso</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>DATABASE_URL</code></td>
<td>conexão SQLAlchemy com PostgreSQL</td>
</tr>
<tr>
<td><code>JWT_SECRET</code></td>
<td>assinatura dos tokens JWT</td>
</tr>
<tr>
<td><code>FRONTEND_URL</code></td>
<td>origem principal do frontend</td>
</tr>
<tr>
<td><code>BACKEND_CORS_ORIGINS</code></td>
<td>origens liberadas no CORS</td>
</tr>
<tr>
<td><code>PAGARME_ENABLED</code></td>
<td>liga/desliga billing real</td>
</tr>
<tr>
<td><code>PAGARME_API_KEY</code></td>
<td>chave Pagar.me quando habilitado</td>
</tr>
<tr>
<td><code>PAGARME_WEBHOOK_SECRET</code></td>
<td>validação de webhook Pagar.me</td>
</tr>
<tr>
<td><code>VITE_API_URL</code></td>
<td>URL do backend para o frontend</td>
</tr>
<tr>
<td><code>FIPE_CACHE_TTL_SECONDS</code></td>
<td>TTL do cache FIPE</td>
</tr>
<tr>
<td><code>MARKET_COLLECTION_ENABLED</code></td>
<td>habilita coleta de mercado</td>
</tr>
<tr>
<td><code>MCV_DATA_ENGINE_API_URL</code></td>
<td>URL opcional do data engine</td>
</tr>
</tbody>
</table>
<blockquote>
<p>Use <code>JWT_SECRET</code>, não <code>SECRET_KEY</code>. A documentação foi padronizada conforme o backend.</p>
</blockquote>
<hr />
<h2>Seed demo</h2>
<p>O seed local cria dados mínimos e idempotentes para demonstração:</p>
<ul>
<li>tenant demo;</li>
<li>usuário demo;</li>
<li>planos FREE/PRO/BUSINESS;</li>
<li>assinatura FREE local;</li>
<li>usage tracking zerado;</li>
<li>FIPE demo;</li>
<li>market listings demo;</li>
<li>valuation report demo.</li>
</ul>
<p>Executar:</p>
<pre><code class="language-bash">docker compose exec backend python /app/scripts/seed_demo.py
</code></pre>
<p>O seed usa a função real de hash do projeto (<code>app.core.security.hash_password</code>) e não cria pagamento real.</p>
<hr />
<h2>Login demo</h2>
<pre><code class="language-text">Email: demo@meucarrovale.local
Senha: Demo@123456
</code></pre>
<hr />
<h2>Testes</h2>
<p>Backend:</p>
<pre><code class="language-bash">docker compose exec backend pytest
</code></pre>
<p>Compilação pontual de arquivos Python:</p>
<pre><code class="language-bash">python -m py_compile backend/scripts/seed_demo.py
</code></pre>
<p>Frontend:</p>
<pre><code class="language-bash">cd frontend
npm ci
npm run build
</code></pre>
<hr />
<h2>Build frontend</h2>
<p>Para validar o build de produção:</p>
<pre><code class="language-bash">cd frontend
npm ci
npm run build
</code></pre>
<p>O output fica em <code>frontend/dist/</code>.</p>
<hr />
<h2>Docker</h2>
<p>Comandos úteis:</p>
<pre><code class="language-bash">docker compose config
docker compose up -d
docker compose logs -f backend
docker compose logs -f frontend
docker compose down
</code></pre>
<p>O backend monta o código em <code>/app</code> e as migrations Alembic em <code>/workspace</code>, por isso o comando de migration usa:</p>
<pre><code class="language-bash">docker compose exec backend alembic -c /workspace/alembic.ini upgrade head
</code></pre>
<hr />
<h2>Alembic/migrations</h2>
<p>Rodar migrations:</p>
<pre><code class="language-bash">docker compose exec backend alembic -c /workspace/alembic.ini upgrade head
</code></pre>
<p>Criar nova migration, se necessário:</p>
<pre><code class="language-bash">docker compose exec backend alembic -c /workspace/alembic.ini revision -m &quot;descricao_da_migration&quot;
</code></pre>
<hr />
<h2>Pagar.me-ready</h2>
<p>O projeto está preparado para billing com Pagar.me, mas o modo local deve permanecer desativado:</p>
<pre><code class="language-env">PAGARME_ENABLED=false
</code></pre>
<p>Em produção, configure chaves reais somente no ambiente seguro do provedor de deploy. Não versionar segredos.</p>
<hr />
<h2>APIs externas</h2>
<ul>
<li>FIPE/Parallelum: usada como fonte externa quando disponível, com cache local-first.</li>
<li>Mercado Livre API: usada para coleta pública de anúncios quando habilitada.</li>
</ul>
<p>A aplicação deve continuar funcionando em modo degradado se APIs externas falharem.</p>
<hr />
<h2>Screenshots</h2>
<p>Sugestão de capturas para documentação visual após rodar o projeto localmente:</p>
<pre><code class="language-text">docs/screenshots/landing.png
docs/screenshots/wizard.png
docs/screenshots/result-dashboard.png
docs/screenshots/admin-dashboard.png
docs/screenshots/pdf-report.png
</code></pre>
<hr />
<h2>Roadmap</h2>
<ul>
<li>Deploy de backend e frontend em ambiente cloud.</li>
<li>Monitoramento de jobs e logs em produção.</li>
<li>Webhooks Pagar.me em ambiente real.</li>
<li>Expansão controlada de market data.</li>
<li>Treinamento futuro de modelos ML quando houver volume suficiente.</li>
</ul>
<hr />
<h2>Troubleshooting</h2>
<h3><code>alembic.ini</code> não encontrado</h3>
<p>Use o comando completo:</p>
<pre><code class="language-bash">docker compose exec backend alembic -c /workspace/alembic.ini upgrade head
</code></pre>
<h3>Login demo não funciona</h3>
<p>Reexecute o seed após migrations:</p>
<pre><code class="language-bash">docker compose exec backend python /app/scripts/seed_demo.py
</code></pre>
<h3>Frontend não encontra backend</h3>
<p>Confira <code>VITE_API_URL</code> e se o backend está em <code>http://localhost:8020</code>.</p>
<h3>CORS bloqueando requisições</h3>
<p>Verifique <code>BACKEND_CORS_ORIGINS</code> no <code>.env</code>.</p>
<h3>Billing aparece indisponível</h3>
<p>Para demo local, isso é esperado com <code>PAGARME_ENABLED=false</code>.</p>
<hr />
<h2>Status do projeto</h2>
<p>Projeto em estágio <strong>portfolio/demo-ready</strong>, com arquitetura SaaS funcional e preparação para deploy. Antes de produção real, revisar secrets, domínio, HTTPS, webhooks Pagar.me, backups e observabilidade.</p>
<h2>Licença</h2>
<p>MIT.</p>`
  },
  {
    id: "freelancebot",
    title: "FreelanceBot AI",
    flagship: false,
    track: "automação",
    pill: "Automação",
    category: "Automação Comercial para Freelancers",
    year: "2026",
    status: "online · demo estática no GitHub Pages",
    desc: "Sistema local que encontra oportunidades freelance em Workana, 99Freelas e Freelancer.com, avalia aderência ao perfil, calcula preço/prazo e gera propostas comerciais estruturadas para revisão humana.",
    highlight: "Pipeline determinístico de precificação e proposta com IA (Groq) apenas na análise textual — preço e horas nunca dependem do modelo.",
    results: [
      "Scraping via Playwright em 3 plataformas de freelance",
      "Pricing Engine determinístico (horas, faixa de preço, confiança)",
      "Geração de proposta curta, completa e PDF comercial"
    ],
    stack: ["Python", "Flask", "Playwright", "Groq API", "SQLite", "pytest"],
    link: "https://github.com/vinmedrado/freelance-bot",
    demo: "https://vinmedrado.github.io/freelance-bot/",
    image: "docs/images/demo-dashboard.png",
    pdf: "docs/proposta-99freelas.pdf",
    pdfLabel: "ver proposta em PDF",
    gallery: ["docs/images/demo-dashboard.png", "docs/images/demo-detail.png", "docs/images/demo-proposal.png", "docs/images/landing.png"],
    readmeHtml: `<p align="center">
  <img src="branding/banner.svg" alt="FreelanceBot AI - radar de oportunidades, propostas e precificação" width="100%">
</p>

<p align="center">
  <img src="branding/logo.svg" alt="FreelanceBot AI logo" width="360">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python 3.11+">
  <img src="https://img.shields.io/badge/Flask-dashboard-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Playwright-scraping-2EAD33?style=flat-square" alt="Playwright">
  <img src="https://img.shields.io/badge/Groq-LLM-0F2340?style=flat-square" alt="Groq">
  <img src="https://img.shields.io/badge/SQLite-persistence-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/tests-pytest-55D6A8?style=flat-square" alt="pytest">
  <img src="https://img.shields.io/badge/license-MIT-D9A441?style=flat-square" alt="MIT license">
</p>

<h1>FreelanceBot AI</h1>
<h2>Origem do projeto</h2><p>O FreelanceBot nasceu para reduzir o tempo gasto procurando oportunidades em plataformas de freelancers. A busca manual exigia abrir várias plataformas, filtrar projetos pouco compativeis e escrever propostas do zero repetidas vezes.</p><h2>Problema</h2><p>O problema era separar oportunidades realmente aderentes do ruido. Além disso, estimar preço, prazo e escopo de forma consistente consumia tempo antes mesmo de saber se o projeto valia uma proposta.</p><h2>Solução</h2><p>A solução foi criar um sistema local que coleta oportunidades, compara requisitos com meu perfil, calcula estimativas de preço e horas e gera propostas personalizadas para revisão humana.</p><h2>Arquitetura</h2><ul><li>Dashboard Flask para revisão e controle das oportunidades.</li><li>Scrapers com Playwright conectados ao Chrome.</li><li>SQLite para persistência local.</li><li>Base de conhecimento em YAML com perfil, serviços e cases.</li><li>Pricing Engine deterministico para preço, horas e confianca.</li><li>Integração com Groq para análise textual e apoio a proposta.</li></ul><h2>Principais funcionalidades</h2><ul><li>Coleta de oportunidades em plataformas freelance.</li><li>Matching com perfil profissional.</li><li>Classificação de categoria, complexidade e riscos.</li><li>Estimativa de preço, prazo e horas.</li><li>Geração de proposta curta, completa e PDF.</li><li>Dashboard local para revisão, copia e controle de status.</li></ul><h2>Principais desafios técnicos</h2><ul><li>Lidar com mudancas nas interfaces das plataformas.</li><li>Evitar que IA defina preço ou prazo sem regra verificavel.</li><li>Manter o sistema útil mesmo quando algum dado vem incompleto.</li><li>Separar automação de envio automático, preservando revisão humana.</li></ul><h2>Aprendizados</h2><p>O projeto consolidou aprendizados sobre automação com navegador, produto operacional local, geração estruturada de propostas, precificação deterministica e integração de IA com regras de negocio.</p>
<p>Sistema local para encontrar oportunidades freelance, avaliar aderência ao perfil profissional, calcular preço/prazo e gerar propostas comerciais estruturadas para revisão humana.</p>
<p>O projeto automatiza a triagem e a preparação da proposta, mas não envia propostas automaticamente.</p>
<p><strong>Portfolio publicado</strong></p>
<ul>
<li>Landing: https://vinmedrado.github.io/freelance-bot/</li>
<li>Demo navegavel: https://vinmedrado.github.io/freelance-bot/demo.html</li>
</ul>
<p>A demo publicada no GitHub Pages e estática e roda 100% no navegador, com dados simulados. Ela existe para demonstrar a experiência do produto sem exigir instalação. O produto local completo roda com Python, Flask, SQLite, Playwright e integração Groq.</p>
<h2>Por que existe</h2>
<p>Freelancers precisam revisar muitas oportunidades em plataformas como Workana, 99Freelas e Freelancer.com antes de encontrar projetos compativeis. Depois disso, ainda precisam entender o escopo, estimar valor, separar provas profissionais e escrever uma proposta convincente.</p>
<p>O FreelanceBot AI reduz esse trabalho repetitivo com um pipeline local e auditavel.</p>
<h2>O que o sistema faz</h2>
<ol>
<li>Coleta oportunidades nas plataformas configuradas.</li>
<li>Filtra projetos por aderência ao perfil profissional.</li>
<li>Classifica categoria, complexidade, riscos e perguntas de escopo.</li>
<li>Calcula horas, faixa de preço, confianca e premissas.</li>
<li>Monta estratégia comercial, proposta curta, proposta completa e PDF.</li>
<li>Exibe tudo em um dashboard Flask para revisão, copia, download e controle de status.</li>
</ol>
<p>A IA via Groq e usada no fluxo de análise textual. As camadas de inteligência, estratégia, precificação, proposta estruturada, PDF e dashboard possuem fallback deterministico para visualização e revisão.</p>
<h2>Demo de portfolio</h2>
<p>A demo em <code>docs/demo.html</code> replica a experiência principal do dashboard com dados demonstrativos:</p>
<ul>
<li>fila de oportunidades por status;</li>
<li>filtros por texto e categoria;</li>
<li>seleção de projeto com diagnóstico e entregaveis;</li>
<li>estimativa de preço, horas, prazo, confianca e risco;</li>
<li>proposta editavel e copiavel;</li>
<li>simulação de varredura e mudanca de status.</li>
</ul>
<p>Essa separação evita depender de login, scraping ou banco local para uma avaliação rapida do projeto.</p>
<h2>Principais recursos</h2>
<ul>
<li>Scrapers com Playwright para Workana, 99Freelas e Freelancer.com.</li>
<li>Matching local por palavras-chave e base profissional.</li>
<li>Base de conhecimento em YAML para serviços, experiências, cases, tecnologias, estilo, negociação e preços.</li>
<li>Proposal Intelligence deterministica para diagnóstico do projeto.</li>
<li>Commercial Strategy para posicionamento, objeções, provas e chamada para ação.</li>
<li>Pricing Engine deterministico com horas, valor/hora, faixa, confianca e premissas.</li>
<li>Proposal Generator 2.0 com proposta curta, proposta completa e estrutura preparada para PDF.</li>
<li>PDF Generator 2.0 com layout comercial compacto e fallback legado.</li>
<li>Dashboard Flask para revisar oportunidades, copiar propostas, baixar PDF e atualizar status.</li>
<li>Persistência simples em SQLite.</li>
<li>Testes automatizados com <code>pytest</code>.</li>
</ul>
<h2>Fluxo</h2>
<pre><code class="language-text">Scrapers
  -&gt; Matching
  -&gt; Proposal Intelligence
  -&gt; Commercial Strategy
  -&gt; Pricing Engine
  -&gt; Proposal Generator
  -&gt; PDF Generator
  -&gt; Dashboard
</code></pre>
<h2>Arquitetura</h2>
<table>
<thead>
<tr>
<th>Módulo</th>
<th>Responsabilidade</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>main.py</code></td>
<td>Orquestra CLI, scrapers, matching, análise e persistência.</td>
</tr>
<tr>
<td><code>scrapers/</code></td>
<td>Conecta ao Chrome via CDP e coleta projetos das plataformas.</td>
</tr>
<tr>
<td><code>matcher.py</code></td>
<td>Calcula aderência inicial entre projeto e perfil profissional.</td>
</tr>
<tr>
<td><code>knowledge_engine.py</code></td>
<td>Carrega YAMLs e seleciona contexto profissional relevante.</td>
</tr>
<tr>
<td><code>proposal_intelligence.py</code></td>
<td>Classifica categoria, complexidade, tecnologias, serviços, riscos, cases e perguntas.</td>
</tr>
<tr>
<td><code>commercial_strategy.py</code></td>
<td>Define posicionamento comercial, proposta de valor, objeções, provas e CTA.</td>
</tr>
<tr>
<td><code>pricing_engine.py</code></td>
<td>Calcula horas, valor/hora, preço sugerido, faixa, confianca e premissas.</td>
</tr>
<tr>
<td><code>proposal_generator_v2.py</code></td>
<td>Gera proposta estruturada, proposta completa e proposta curta.</td>
</tr>
<tr>
<td><code>ai_engine.py</code></td>
<td>Integra Groq ao fluxo de geração, preservando preço e horas deterministicos.</td>
</tr>
<tr>
<td><code>pdf_generator.py</code></td>
<td>Gera PDF comercial em memória com fallback estruturado ou legado.</td>
</tr>
<tr>
<td><code>webapp.py</code></td>
<td>Landing, dashboard, APIs, detalhe do projeto, status, PDF e copia de propostas.</td>
</tr>
<tr>
<td><code>db.py</code></td>
<td>Persistência SQLite e migração mínima de colunas existentes.</td>
</tr>
</tbody>
</table>
<p>Mais detalhes em <a href="docs/architecture.md">docs/architecture.md</a>.</p>
<h2>Como executar</h2>
<h3>Requisitos</h3>
<ul>
<li>Python 3.11+</li>
<li>Chrome instalado</li>
<li>Conta/chave Groq para o fluxo com IA</li>
</ul>
<h3>Instalação</h3>
<pre><code class="language-bash">git clone &lt;url-do-repositório&gt;
cd freelance_bot
python -m venv .venv
</code></pre>
<p>Ative o ambiente:</p>
<pre><code class="language-bash"># Windows
.venv\\Scripts\\activate

# macOS/Linux
source .venv/bin/activate
</code></pre>
<p>Instale dependências:</p>
<pre><code class="language-bash">pip install -r requirements.txt
playwright install chrome
</code></pre>
<p>Configure variaveis:</p>
<pre><code class="language-bash">copy .env.example .env
</code></pre>
<p>No macOS/Linux:</p>
<pre><code class="language-bash">cp .env.example .env
</code></pre>
<p>Principais variaveis:</p>
<pre><code class="language-env">GROQ_API_KEY=...
GROQ_MODEL=llama-3.3-70b-versatile
CHROME_CDP_URL=http://127.0.0.1:9222
WEBAPP_HOST=0.0.0.0
WEBAPP_PORT=5050
</code></pre>
<p>Abra o Chrome com debug remoto antes de rodar os scrapers:</p>
<pre><code class="language-bash">chrome.exe --remote-debugging-port=9222
</code></pre>
<h3>Execução</h3>
<p>Rodar varredura:</p>
<pre><code class="language-bash">python main.py
</code></pre>
<p>Filtrar plataforma:</p>
<pre><code class="language-bash">python main.py --plataforma workana
python main.py --plataforma 99freelas
python main.py --plataforma freelancer
</code></pre>
<p>Ajustar score mínimo:</p>
<pre><code class="language-bash">python main.py --min-score 40
</code></pre>
<p>Revisar propostas geradas:</p>
<pre><code class="language-bash">python main.py --revisar
</code></pre>
<p>Rodar dashboard:</p>
<pre><code class="language-bash">python webapp.py
</code></pre>
<p>Acesse:</p>
<pre><code class="language-text">http://localhost:5050
</code></pre>
<h2>Inicialização automática no Windows</h2>
<p>Para manter o dashboard sempre aberto ao ligar ou reiniciar o notebook:</p>
<pre><code class="language-powershell">powershell -NoProfile -ExecutionPolicy Bypass -File .\\install_autostart.ps1
</code></pre>
<p>O script inicia um watchdog que religa <code>webapp.py</code> se o processo cair. Se o
Agendador de Tarefas negar permissão, ele cria automaticamente um atalho na
pasta Startup do usuário.</p>
<p>Para remover:</p>
<pre><code class="language-powershell">powershell -NoProfile -ExecutionPolicy Bypass -File .\\uninstall_autostart.ps1
</code></pre>
<p>No notebook, acesse <code>http://127.0.0.1:5050</code>. No celular conectado ao mesmo Wi-Fi,
use o IP do notebook, por exemplo <code>http://192.168.0.227:5050</code>.</p>
<p>O dashboard não precisa de aba do Chrome aberta. Para varreduras que usam login
do navegador, o watchdog tenta manter um Chrome de automação minimizado em
<code>http://127.0.0.1:9222</code>, com perfil separado em <code>.chrome_bot_profile/</code>.</p>
<p>Na aba <code>Todos</code>, projetos recem-coletados ainda sem proposta salva também recebem
estimativa deterministica de valor e horas. Assim o painel evita <code>R$ 0</code> quando o
banco ainda tem <code>suggested_price_brl</code> vazio, mas o escopo ja permite calcular uma
faixa inicial.</p>
<h2>Screenshots</h2>
<p><img alt="Landing" src="docs/images/landing.png" />
<img alt="Dashboard da demo" src="docs/images/demo-dashboard.png" />
<img alt="Detalhe da oportunidade" src="docs/images/demo-detail.png" />
<img alt="Proposta editavel" src="docs/images/demo-proposal.png" /></p>
<h2>Qualidade</h2>
<p>Comandos recomendados:</p>
<pre><code class="language-bash">pytest -q
python validate_setup.py
python -m py_compile ai_engine.py commercial_strategy.py db.py knowledge_engine.py main.py matcher.py pdf_generator.py pricing_engine.py proposal_generator_v2.py proposal_intelligence.py project_validation.py validate_setup.py webapp.py
</code></pre>
<h2>Documentação</h2>
<ul>
<li><a href="docs/architecture.md">Arquitetura</a></li>
<li><a href="docs/decision-log.md">Decision Log</a></li>
<li><a href="docs/proposal-intelligence.md">Proposal Intelligence</a></li>
<li><a href="docs/commercial-strategy.md">Commercial Strategy</a></li>
<li><a href="docs/pricing-engine.md">Pricing Engine</a></li>
<li><a href="docs/proposal-generator.md">Proposal Generator</a></li>
<li><a href="docs/pdf-generator.md">PDF Generator</a></li>
<li><a href="ROADMAP.md">Roadmap</a></li>
<li><a href="CHANGELOG.md">Changelog</a></li>
<li><a href="CONTRIBUTING.md">Contributing</a></li>
</ul>
<h2>Valor como portfolio</h2>
<p>Este e um projeto recomendavel para portfolio porque demonstra automação, produto, dados, IA aplicada, regras deterministicicas, persistência, interface web e testes. A landing apresenta o problema e a proposta de valor; a demo permite experimentar o fluxo operacional sem instalar nada.</p>
<h2>Limitações e segurança</h2>
<ul>
<li>Scrapers dependem da estrutura das plataformas e podem exigir ajustes quando as telas mudam.</li>
<li>Algumas plataformas exigem login ou sessão de navegador ja autenticada.</li>
<li>O projeto não envia propostas automaticamente; a revisão humana faz parte do fluxo.</li>
<li>Dados locais, banco SQLite, perfis de navegador, artefatos e <code>.env</code> ficam fora do versionamento.</li>
<li>Preços e prazos são estimativas assistivas, não garantias comerciais.</li>
</ul>
<h2>Licenca</h2>
<p>Distribuido sob licenca MIT. Veja <a href="LICENSE">LICENSE</a>.</p>`
  }
];

// Não remova esta linha — permite que o site e o admin leiam o mesmo arquivo
if (typeof module !== "undefined") module.exports = PROJECTS;
