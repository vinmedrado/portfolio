# Vinicius Medrado Portfolio — Automation & Data Systems

Portfólio profissional estático de Vinicius Medrado, com identidade visual baseada em **automação, orquestração, integrações, dados e sistemas**. O projeto preserva o DNA técnico anterior — fundo claro, azul petróleo, grid, linhas e tipografia de engenharia — mas usa esses elementos para explicar fluxos e arquitetura em vez de simular uma planta industrial.

## Narrativa

`Processo → Captura → Automação → Integração → Dados → Sistema / Resultado`

A experiência prioriza leitura rápida para recrutadores e profundidade para gestores técnicos:

`Hero → Evidências → Projetos → Trajetória → Stack → Sobre → Contato`

## Estrutura principal

- `index.html`: experiência PT-BR.
- `index-en.html`: experiência EN.
- `design-system.css`: base compartilhada de tokens, componentes e responsividade.
- `automation-systems.css`: camada visual Automation & Data Systems, incluindo nodes, conectores, workflows e estados.
- `portfolio-ui.js`: comportamento compartilhado da interface e navegação mobile.
- `projects-data.js`: fonte de verdade dos projetos em PT-BR.
- `projects-data.en.js`: fonte de verdade dos projetos em EN.
- `admin.html`: editor que preserva o objeto completo do projeto ao exportar dados.
- `images/`: capas, logos e ícones.
- `gallery/`: screenshots dos cases.
- `Vinicius_Santos_Medrado.pdf` e `Vinicius_Santos_Medrado_EN.pdf`: currículos.

## Dados dos projetos

Os projetos não são duplicados no HTML. Cada objeto pode conter, além do conteúdo já existente, um campo `flow` com o fluxo técnico verificado daquele sistema.

O frontend reutiliza esse campo em dois níveis:

- **card:** arquitetura compacta para leitura rápida;
- **case study:** fluxo completo e aprofundamento técnico.

## Como executar localmente

```bash
python -m http.server 4173
```

Depois abra `http://127.0.0.1:4173`.

## Deploy

Não há etapa de build. O conteúdo pode ser publicado diretamente no GitHub Pages.

## Regras de manutenção

- Não duplique projetos diretamente no HTML; altere `projects-data.js` / `projects-data.en.js`.
- Não invente etapas de arquitetura: `flow` deve refletir o comportamento real documentado do projeto.
- Mantenha PT-BR e EN equivalentes sempre que o conteúdo correspondente existir.
- Preserve `prefers-reduced-motion`, navegação por teclado e áreas de toque mobile ao adicionar interações.
