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
    image: "images/vinance.png"
  },
  {
    id: "applymize",
    title: "Applymize",
    flagship: false,
    track: "automacao",
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
    image: "images/applymize.jpg"
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
    image: "images/footballdecisionlab.png"
  },
  {
    id: "marketplace",
    title: "Marketplace Seller Platform",
    flagship: false,
    track: "automacao",
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
    demo: "https://marketplace-seller-platform.netlify.app/",
    image: "images/marketplace.png"
  },
  {
    id: "lumyra",
    title: "Lumyra",
    flagship: false,
    track: "automacao",
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
    image: "images/lumyra.png"
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
    demo: "https://meu-carro-vale.netlify.app",
    image: "images/meucarrovale.png"
  }
];

// Não remova esta linha — permite que o site e o admin leiam o mesmo arquivo
if (typeof module !== "undefined") module.exports = PROJECTS;
