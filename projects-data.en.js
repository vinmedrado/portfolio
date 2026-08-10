// projects-data.en.js
// English version of project content, consumed by index-en.html.
// Keep this in sync manually with projects-data.js when you edit projects there.

const PROJECTS = [
  {
    id: "vinance",
    title: "Vinance",
    flagship: true,
    track: "dados",
    pill: "Data / ML",
    category: "Financial Automation & Data",
    year: "2026",
    status: "Actively in development",
    desc: "End-to-end personal financial automation: market data pipeline, rule-based recommendation engine, and asset ranking — with a conversational Advisor that uses that context to answer the user, without promising returns.",
    highlight: "End-to-end async architecture with background processing and conversational AI hardened against prompt injection.",
    results: [
      "100% async backend (FastAPI + Celery + Redis)",
      "AI Advisor via Groq, never promises returns or buy recommendations",
      "Asset ranking pipeline by risk profile"
    ],
    completedFeatures: [
      "Recommendation Engine",
      "Investor Profile",
      "Trend Signals",
      "Guardrails",
      "Investment Workspace",
      "FastAPI Backend",
      "APIs",
      "Database",
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
      "Simulation",
      "Backtesting",
      "Strategies",
      "Risk Management"
    ],
    stack: ["Python", "FastAPI (async)", "PostgreSQL", "Redis", "Celery", "React", "TypeScript", "Groq API"],
    link: "https://github.com/vinmedrado/vinance",
    demo: "https://vinance-ai.netlify.app",
    image: "images/vinance.png",
    gallery: ["gallery/vinance/vinance-01.webp", "gallery/vinance/vinance-02.webp", "gallery/vinance/vinance-03.webp", "gallery/vinance/vinance-04.webp", "gallery/vinance/vinance-05.webp", "gallery/vinance/vinance-06.webp"]
  },
  {
    id: "applymize",
    title: "Applymize",
    flagship: false,
    track: "automacao",
    pill: "Automation",
    category: "Job Application Automation",
    year: "2025",
    status: "live · 6 active integrations",
    desc: "Applying to jobs manually across platforms is slow and repetitive. Applymize automates that: simultaneous search across 6 job platforms, deduplication, and AI (LLaMA 3.3 via Groq) that scores each job's fit and flags resume gaps.",
    highlight: "Automated Selenium-based applications with a persistent Kanban pipeline.",
    results: [
      "Simultaneous scraping across 6 job platforms",
      "AI-generated compatibility score (LLaMA 3.3 70B)",
      "Automated applications via Selenium"
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Groq API", "Selenium"],
    link: "https://github.com/vinmedrado/applymize",
    demo: "https://applymize.netlify.app",
    image: "images/applymize.webp",
    gallery: ["gallery/applymize/applymize-01.webp", "gallery/applymize/applymize-02.webp", "gallery/applymize/applymize-03.webp", "gallery/applymize/applymize-04.webp", "gallery/applymize/applymize-05.webp", "gallery/applymize/applymize-06.webp", "gallery/applymize/applymize-07.webp", "gallery/applymize/applymize-08.webp"]
  },
  {
    id: "footballdecisionlab",
    title: "Football Decision Lab",
    flagship: false,
    track: "dados",
    pill: "Data / ML",
    category: "ML & Sports Decision Intelligence",
    year: "2026",
    status: "active prospective experiment · paper trading",
    desc: "Evolution of MatchFlow: a research and paper-trading platform that turns matches into traceable decisions, with temporal validation, a frozen champion model (SHA-256 hash), and automatic settlement.",
    highlight: "Champion/challenger governance with deliberate promotion, audited (Brier) calibration, and fail-closed guardrails — honestly reports when the ROI confidence interval crosses zero.",
    results: [
      "Rigorous temporal separation (no data leakage) between backfill, backtest, and prospective capture",
      "Fail-closed guardrails, signal immutability, and SHA-256 model hashing",
      "Human-in-the-loop governance for challenger → champion promotion"
    ],
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "Scikit-learn"],
    link: "https://github.com/vinmedrado/football-decision-lab",
    demo: "https://football-decision-lab.netlify.app/",
    image: "images/footballdecisionlab.png",
    gallery: ["gallery/footballdecisionlab/footballdecisionlab-01.webp", "gallery/footballdecisionlab/footballdecisionlab-02.webp", "gallery/footballdecisionlab/footballdecisionlab-03.webp", "gallery/footballdecisionlab/footballdecisionlab-04.webp", "gallery/footballdecisionlab/footballdecisionlab-05.webp", "gallery/footballdecisionlab/footballdecisionlab-06.webp", "gallery/footballdecisionlab/footballdecisionlab-07.webp", "gallery/footballdecisionlab/footballdecisionlab-08.webp", "gallery/footballdecisionlab/footballdecisionlab-09.webp", "gallery/footballdecisionlab/footballdecisionlab-10.webp", "gallery/footballdecisionlab/footballdecisionlab-11.webp"]
  },
  {
    id: "marketplace",
    title: "Marketplace Seller Platform",
    flagship: false,
    track: "automacao",
    pill: "Automation",
    category: "Marketplace Automation",
    year: "2025",
    status: "live · raw→staging→mart pipeline",
    desc: "Sellers running multiple Mercado Livre accounts have no consolidated view of their data. This platform centralizes that: a layered data pipeline (raw → staging → mart) orchestrated via Airflow, with real OAuth2 integration and per-client isolation.",
    highlight: "Feature store and ML for dynamic pricing with margin protection.",
    results: [
      "Real OAuth2 integration with Mercado Livre",
      "raw → staging → mart pipeline via Airflow",
      "Multi-client database with tenant isolation"
    ],
    stack: ["FastAPI", "Airflow", "PostgreSQL", "SQLAlchemy", "Docker"],
    link: "https://github.com/vinmedrado/marketplace-seller-platform",
    demo: "https://vinmedrado.github.io/marketplace-seller-platform/",
    image: "images/marketplace.png",
    gallery: ["gallery/marketplace/marketplace-01.webp", "gallery/marketplace/marketplace-02.webp", "gallery/marketplace/marketplace-03.webp", "gallery/marketplace/marketplace-04.webp", "gallery/marketplace/marketplace-05.webp", "gallery/marketplace/marketplace-06.webp", "gallery/marketplace/marketplace-07.webp", "gallery/marketplace/marketplace-08.webp"]
  },
  {
    id: "lumyra",
    title: "Lumyra",
    flagship: false,
    track: "automacao",
    pill: "Automation",
    category: "Event Operations Platform",
    year: "2025",
    status: "live · realtime websocket",
    desc: "Event operations SaaS: RSVP, seating charts, and WhatsApp communication for planners and guests.",
    highlight: "Real-time dashboards via WebSocket, multi-tenant with per-client isolation.",
    results: [
      "Real-time dashboards via WebSocket",
      "Automated invitations and RSVP via WhatsApp API",
      "Multi-tenant architecture isolated per client"
    ],
    stack: ["FastAPI", "React", "WebSocket", "WhatsApp API"],
    link: "https://github.com/vinmedrado/Lumyra",
    demo: "https://lumyra-events.netlify.app/",
    image: "images/lumyra.png",
    gallery: ["gallery/lumyra/lumyra-01.webp", "gallery/lumyra/lumyra-02.webp", "gallery/lumyra/lumyra-03.webp", "gallery/lumyra/lumyra-04.webp", "gallery/lumyra/lumyra-05.webp", "gallery/lumyra/lumyra-06.webp", "gallery/lumyra/lumyra-07.webp", "gallery/lumyra/lumyra-08.webp", "gallery/lumyra/lumyra-09.webp", "gallery/lumyra/lumyra-10.webp", "gallery/lumyra/lumyra-11.webp", "gallery/lumyra/lumyra-12.webp", "gallery/lumyra/lumyra-13.webp", "gallery/lumyra/lumyra-14.webp"]
  },
  {
    id: "meucarrovale",
    title: "Meu Carro Vale",
    flagship: false,
    track: "dados",
    pill: "Data / ML",
    category: "Automotive Valuation",
    year: "2026",
    status: "live · source + confidence shown",
    desc: "Automotive valuation combining local-first FIPE data with real comparable market listings.",
    highlight: "Shows the source and confidence of every estimate; premium exportable PDF report.",
    results: [
      "Local-first FIPE data, resilient to API instability",
      "Real comparable market listings",
      "Exportable premium PDF report"
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "Alembic"],
    link: "https://github.com/vinmedrado/meu-carro-vale",
    demo: "https://vinmedrado.github.io/meu-carro-vale/",
    image: "images/meucarrovale.png",
    pdf: "docs/laudo-meu-carro-vale.pdf",
    pdfLabel: "view sample report (PDF)",
    gallery: ["gallery/meucarrovale/meucarrovale-01.webp", "gallery/meucarrovale/meucarrovale-02.webp", "gallery/meucarrovale/meucarrovale-03.webp", "gallery/meucarrovale/meucarrovale-04.webp"]
  },
  {
    id: "freelancebot",
    title: "FreelanceBot AI",
    flagship: false,
    track: "automacao",
    pill: "Automation",
    category: "Commercial Automation for Freelancers",
    year: "2026",
    status: "online · static demo on GitHub Pages",
    desc: "Local system that finds freelance opportunities on Workana, 99Freelas and Freelancer.com, scores fit against a professional profile, calculates price/timeline and generates structured commercial proposals for human review.",
    highlight: "Deterministic pricing and proposal pipeline with AI (Groq) used only for text analysis — price and hours never depend on the model.",
    results: [
      "Playwright scraping across 3 freelance platforms",
      "Deterministic pricing engine (hours, price range, confidence)",
      "Generates short proposal, full proposal and commercial PDF"
    ],
    stack: ["Python", "Flask", "Playwright", "Groq API", "SQLite", "pytest"],
    link: "https://github.com/vinmedrado/freelance-bot",
    demo: "https://vinmedrado.github.io/freelance-bot/",
    image: "docs/images/demo-dashboard.png",
    pdf: "docs/proposta-99freelas.pdf",
    pdfLabel: "view sample proposal (PDF)",
    gallery: ["docs/images/demo-dashboard.png", "docs/images/demo-detail.png", "docs/images/demo-proposal.png", "docs/images/landing.png"]
  }
];

if (typeof module !== "undefined") module.exports = PROJECTS;
