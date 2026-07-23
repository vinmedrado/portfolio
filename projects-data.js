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
    link: "https://github.com/vinmedrado",
    demo: "https://vinance-ai.netlify.app",
    image: ""
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
    link: "https://github.com/vinmedrado",
    demo: "",
    image: ""
  },
  {
    id: "matchflow",
    title: "MatchFlow Analytics",
    flagship: false,
    track: "dados",
    pill: "Dados / ML",
    category: "Modelagem Estatística Esportiva",
    year: "2025",
    status: "online · 3 modelos comparados",
    desc: "Pipeline de pesquisa quantitativa esportiva: feature engineering, comparação de RandomForest/LightGBM/XGBoost calibrados e Recommendation Engine.",
    highlight: "Backtesting multi-mercado com gestão de risco via Kelly Fracionado (25%).",
    results: [
      "3 modelos de ML comparados e calibrados",
      "Correção de 3 vazamentos críticos de dados",
      "Backtesting multi-mercado com odds reais"
    ],
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "Scikit-learn"],
    link: "https://github.com/vinmedrado",
    demo: "https://matchflow-ia.netlify.app",
    image: ""
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
    link: "https://github.com/vinmedrado",
    demo: "",
    image: ""
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
    link: "https://github.com/vinmedrado",
    demo: "",
    image: ""
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
    link: "https://github.com/vinmedrado",
    demo: "https://meu-carro-vale.netlify.app",
    image: ""
  }
];

// Não remova esta linha — permite que o site e o admin leiam o mesmo arquivo
if (typeof module !== "undefined") module.exports = PROJECTS;
