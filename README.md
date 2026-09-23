# Vinicius Medrado — Automation Workspace

Portfólio profissional estático de Vinicius Medrado, publicado em **https://vinmedrado.com**.

## Identidade atual

A interface foi reconstruída como um **Automation Workspace**: linguagem inspirada em IDEs, terminais, command centers e pipelines de dados, com foco em automação, dados e sistemas.

A home inclui:

- navegação lateral estilo Explorer;
- barra de busca/command palette com `Ctrl + K`;
- hero com ilustração e workspace de automação;
- currículo em destaque;
- terminal animado e fluxo de execução;
- stack com logos reais;
- métricas de impacto;
- projetos com links para demos e GitHub;
- experiência profissional, sobre e contato;
- layout responsivo para desktop, tablet e celular;
- PT-BR e EN.

## Stack do site

- HTML
- CSS
- JavaScript vanilla
- GitHub Pages
- domínio próprio `vinmedrado.com`

Não existe etapa de build.

## Arquivos principais

- `index.html` — versão PT-BR
- `index-en.html` — versão EN
- `theme.css` — identidade visual e responsividade
- `portfolio-ui.js` — menu mobile, command palette, navegação e estados da interface
- `images/hero-workspace.webp` — arte principal do workspace
- `images/stack-real/` — logos das tecnologias
- `images/*.png|webp` — capas dos projetos
- `Vinicius_Santos_Medrado.pdf` — currículo PT-BR
- `Vinicius_Santos_Medrado_EN.pdf` — currículo EN
- `CNAME` e `.nojekyll` — publicação no GitHub Pages

Os arquivos `projects-data.js` e `projects-data.en.js` foram mantidos no repositório como base detalhada dos projetos para evoluções futuras.

## Teste local

Como é um site estático, pode ser aberto diretamente pelo `index.html`. Para uma prévia mais próxima da publicação, use qualquer servidor HTTP local, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Deploy

No repositório do portfólio:

```bash
git add .
git commit -m "feat: rebuild portfolio as automation workspace"
git push
```

O GitHub Pages publica os arquivos estáticos sem etapa de build.
