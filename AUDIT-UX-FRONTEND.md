# Auditoria UX / Frontend — Automation & Data Systems

**Portfolio:** Vinicius Medrado  
**Revisão:** 2026.09  
**Escopo:** PT-BR + EN, projeto estático para GitHub Pages.

## Diagnóstico da versão anterior

A versão premium já tinha uma base forte: fundo claro, azul petróleo, grid, linhas técnicas, tipografia de documentação e uma hierarquia profissional mais madura. Esse DNA foi preservado.

O ponto a evoluir era o significado da linguagem visual. Alguns elementos ainda remetiam mais a **blueprint arquitetônico / desenho industrial** do que ao trabalho de Vinicius na interseção entre processos, automação, dados, integrações e software.

Elementos mantidos:

- fundo claro e contraste técnico;
- azul petróleo como cor principal;
- grid e linhas estruturais;
- tipografia técnica/editorial;
- precisão, modularidade e sensação de engenharia;
- timeline, cases, galerias, dados e conteúdo profissional existentes.

Elementos reduzidos ou ressignificados:

- coordenadas e referências decorativas;
- aparência de folha de desenho mecânico;
- cantos e marcações sem função narrativa;
- títulos com linguagem excessivamente próxima de planta técnica;
- decoração blueprint que não explicava fluxo, estado ou relação entre sistemas.

## Nova direção visual

A identidade passa a ser **Automation & Data Systems**.

A linguagem visual agora é construída principalmente com:

`INPUT → PROCESS → AUTOMATION → INTEGRATION → DATA → OUTPUT`

Nodes, conectores, estados, pipelines, pequenas rotas, módulos e indicadores de execução aparecem apenas quando ajudam a explicar o sistema. A página não foi transformada em dashboard, SaaS ou cópia de n8n/Zapier/Make.

## Implementação

### Hero

A mensagem central foi preservada:

> “Pego processo manual e dado bruto — entrego pipeline e decisão automatizada.”

O diagrama principal foi reconstruído como uma orquestração de seis estágios:

`Processo manual / Trigger → Captura / Input → Automação / Running → Integração / Sync → Dados / Validated → Decisão / Resultado / Output`

Há um indicador de execução discreto no pipeline. Com `prefers-reduced-motion`, o movimento é desativado.

### Resultados

As métricas existentes continuam inalteradas e agora funcionam como uma sequência de evidências de impacto, conectando contexto operacional e resultado em vez de parecerem quatro KPIs soltos.

Nenhum número novo foi criado.

### Projetos

`projects-data.js` e `projects-data.en.js` continuam sendo a fonte de verdade.

Foi adicionado um único campo `flow` a cada um dos sete projetos. Os fluxos foram derivados exclusivamente da descrição, arquitetura e documentação já existentes de cada projeto. Eles alimentam tanto os cards quanto o case study.

Exemplos:

- Football Decision Lab: jogos/odds → validação temporal → features → backtest → modelo → paper → settlement;
- Applymize: vagas → coleta → matching → ATS → automação → WhatsApp;
- Marketplace/SellerOS: Mercado Livre → OAuth2/API → raw → staging → mart → pricing/ML → interface.

Nos cards, fluxos longos são compactados automaticamente. No case aberto, o fluxo completo é mostrado.

### Case studies

Os detalhes dos projetos foram estruturados para leitura em camadas:

`Problema → Solução → Arquitetura → Automação/Pipeline → Funcionalidades → Desafios → Aprendizados → Evidências/Screenshots`

Quando existe `readmeHtml`, essas partes são extraídas da documentação existente e apresentadas em blocos escaneáveis. O README completo continua disponível de forma expansível, sem competir com a leitura rápida.

A versão EN continua respeitando o conteúdo disponível em `projects-data.en.js`; não foi inventada documentação técnica que não existia na fonte original.

### Trajetória

A timeline foi preservada e ganhou uma camada visual de evolução de sistema:

`Operação → Dados → Automação → Integrações → Sistemas`

Ela funciona como síntese visual; as experiências e realizações reais continuam sendo a evidência principal.

### Stack

A organização por domínio foi mantida:

- Automação;
- Dados & ETL;
- BI;
- Backend & APIs;
- Banco de Dados;
- Machine Learning & IA.

Os grupos agora se comportam visualmente como partes de um ecossistema conectado, sem virar uma parede de badges.

### Mobile

A composição recebe adaptações próprias em telas pequenas:

- Hero reorganiza os seis nodes em matriz legível;
- fluxos de projeto usam versões compactas;
- resultados passam para 2×2 em tablet/mobile;
- timeline de sistemas muda de fluxo horizontal para vertical;
- CTAs mantêm área mínima de toque;
- case study, galeria e navegação continuam utilizáveis sem depender de hover.

Breakpoints revisados: 375, 390, 430, 768, 1024 e 1440 px.

### Acessibilidade e performance

Preservado/reforçado:

- navegação por teclado;
- `focus-visible`;
- skip link;
- `aria-modal` / `aria-hidden` em overlays;
- retorno de foco e controle de Tab;
- lightbox acessível por teclado;
- `prefers-reduced-motion`;
- imagens não críticas com lazy loading/decoding assíncrono;
- ausência de preloader bloqueante;
- grid estrutural em CSS, sem geração decorativa via JavaScript.

## Arquitetura e compatibilidade

O projeto permanece em **HTML + CSS + JavaScript**, sem React, TypeScript, Next.js ou etapa de build.

Preservados:

- `index.html`;
- `index-en.html`;
- `projects-data.js`;
- `projects-data.en.js`;
- `admin.html`;
- currículos PT/EN;
- imagens e galerias;
- links GitHub e demos;
- PDFs;
- URLs e compatibilidade com GitHub Pages.

`admin.html` continua exportando o objeto completo do projeto, preservando `gallery`, `readmeHtml`, `pdf`, `flow` e campos futuros.

## Resultado de posicionamento

A interface deixa de comunicar principalmente “blueprint técnico” e passa a comunicar com mais precisão:

**processos + automação + dados + integrações + software → sistemas que reduzem trabalho manual e produzem resultado.**
