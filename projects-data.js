// projects-data.js
// Fonte única de conteúdo dos projetos. O site (index.html) e o editor (admin.html)
// leem e escrevem neste mesmo formato. Para atualizar o site publicado:
// 1. Abra admin.html no navegador, edite o que quiser (inclusive as imagens)
// 2. Clique em "Gerar código atualizado"
// 3. Copie o conteúdo gerado e substitua TODO o conteúdo deste arquivo
// 4. Suba (commit/push) o projects-data.js atualizado no GitHub

const PROJECTS = [
  {
    id: "applymize",
    title: "Applymize",
    track: "automacao", // "automacao" ou "dados"
    pill: "Automação",
    status: "online · 6 integrações ativas",
    desc: "Scraping simultâneo em 6 plataformas de vagas, deduplicação e engine de ATS com IA (LLaMA 3.3 via Groq) que retorna score, gaps e plano de desenvolvimento.",
    highlight: "Auto-candidatura via Selenium com funil Kanban persistente.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Groq API", "Selenium"],
    link: "https://github.com/vinmedrado",
    demo: '', // link do frontend ao vivo (Netlify, etc.)
    image: "" // cole aqui uma URL de imagem, ou use o admin.html para enviar um arquivo
  },
  {
    id: "matchflow",
    title: "MatchFlow Analytics",
    track: "dados",
    pill: "Dados / ML",
    status: "online · 3 modelos comparados",
    desc: "Pipeline de pesquisa quantitativa esportiva: feature engineering, comparação de RandomForest/LightGBM/XGBoost calibrados e Recommendation Engine.",
    highlight: "Backtesting multi-mercado com gestão de risco via Kelly Fracionado (25%).",
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "Scikit-learn"],
    link: "https://github.com/vinmedrado",
    demo: 'https://matchflow-ia.netlify.app', // link do frontend ao vivo (Netlify, etc.)
    image: ""
  },
  {
    id: "marketplace",
    title: "Marketplace Seller Platform",
    track: "automacao",
    pill: "Automação",
    status: "online · pipeline raw→staging→mart",
    desc: "Backend com OAuth2 real (Mercado Livre), pipelines em camadas orquestrados via Apache Airflow, multi-tenant.",
    highlight: "Feature store e ML para precificação dinâmica com proteção de margem.",
    stack: ["FastAPI", "Airflow", "PostgreSQL", "SQLAlchemy", "Docker"],
    link: "https://github.com/vinmedrado",
    demo: '', // link do frontend ao vivo (Netlify, etc.)
    image: ""
  },
  {
    id: "financeos",
    title: "FinanceOS",
    track: "dados",
    pill: "Dados / ML",
    status: "online · backtests automatizados",
    desc: "Plataforma de inteligência financeira: backend modular com dashboard analítico em Streamlit, scores e backtests.",
    highlight: "Algoritmos de rebalanceamento e diversificação automatizados.",
    stack: ["FastAPI", "SQLAlchemy", "Streamlit", "SQLite"],
    link: "https://github.com/vinmedrado",
    demo: 'https://vinance-ai.netlify.app', // link do frontend ao vivo (Netlify, etc.)
    image: ""
  },
  {
    id: "lumyra",
    title: "Lumyra",
    track: "automacao",
    pill: "Automação",
    status: "online · websocket realtime",
    desc: "SaaS de operação de eventos: RSVP, mapa de mesas e comunicação via WhatsApp para assessorias e convidados.",
    highlight: "Dashboards em tempo real via WebSocket, multi-tenant com isolamento por cliente.",
    stack: ["FastAPI", "React", "WebSocket", "WhatsApp API"],
    link: "https://github.com/vinmedrado",
    demo: '', // link do frontend ao vivo (Netlify, etc.)
    image: ""
  },
  {
    id: "meucarrovale",
    title: "Meu Carro Vale",
    track: "dados",
    pill: "Dados / ML",
    status: "online · fonte + confiança exibidas",
    desc: "Valuation automotivo com dados FIPE local-first combinados a comparáveis reais de anúncios de mercado.",
    highlight: "Mostra fonte e confiança de cada estimativa; laudo em PDF premium.",
    stack: ["FastAPI", "React", "PostgreSQL", "Alembic"],
    link: "https://github.com/vinmedrado",
    demo: 'https://meu-carro-vale.netlify.app', // link do frontend ao vivo (Netlify, etc.)
    image: ""
  }
];

// Não remova esta linha — permite que o site e o admin leiam o mesmo arquivo
if (typeof module !== "undefined") module.exports = PROJECTS;
