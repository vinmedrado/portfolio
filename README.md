# Vinicius Medrado — Portfólio

Portfólio profissional estático de Vinicius Medrado, publicado em **https://vinmedrado.com**.

## Stack do site

- HTML
- CSS
- JavaScript vanilla
- GitHub Pages
- domínio próprio `vinmedrado.com`

Não há backend, banco de dados, autenticação, formulários com envio de dados ou dependências JavaScript de terceiros.

## Estrutura principal

- `index.html` — PT-BR
- `index-en.html` — EN
- `theme.css` — identidade visual atual
- `portfolio-ui.js` — navegação mobile
- `projects-data.js` — fonte de verdade dos projetos em PT-BR
- `projects-data.en.js` — fonte de verdade dos projetos em EN
- `images/` e `gallery/` — imagens e screenshots
- `docs/` — evidências/PDFs dos cases
- `Vinicius_Santos_Medrado.pdf` e `Vinicius_Santos_Medrado_EN.pdf` — currículos
- `CNAME` — domínio do GitHub Pages
- `.nojekyll` — publicação estática sem processamento Jekyll

## Segurança e privacidade

A versão publicada usa uma Content Security Policy (CSP) por página, política de referrer, `noopener noreferrer` em links externos e não contém chaves, tokens, senhas ou arquivos `.env`.

O telefone e o e-mail de contato são montados no navegador para reduzir scraping básico do HTML-fonte. O site continua sendo público; informações exibidas na interface devem ser consideradas públicas.

## Deploy

O site é publicado diretamente pelo GitHub Pages. Não existe etapa de build.

Ao substituir uma versão antiga do repositório, remova arquivos legados que não existem mais nesta distribuição, em vez de apenas copiar os novos arquivos por cima.

## Manutenção

- mantenha `projects-data.js` / `projects-data.en.js` como fonte única de verdade;
- nunca faça commit de `.env`, tokens, credenciais ou chaves privadas;
- mantenha HTTPS obrigatório no GitHub Pages;
- proteja GitHub, Cloudflare e Apple ID com 2FA/passkeys;
- revise arquivos públicos antes de adicioná-los a `docs/` ou `gallery/`.
