# Migração do VIVA para Treine no Lar

## Status
- Origem ativa: `vinmedrado/portfolio/viva/` — manter disponível para exportar backups
- Preparação: branch `feature/treine-no-lar-migracao`, pasta `treine-no-lar/`
- Destino pretendido: repositório público `vinmedrado/treine-no-lar`, arquivos desta pasta na raiz
- Subdomínio pretendido: `https://treinenolar.vinmedrado.com/` — não publicado nem configurado
- Não mesclar a branch de preparação no `main` do portfólio: ela é apenas a origem para transferir o novo projeto.

## Criação do repositório
Crie `treine-no-lar` em https://github.com/new (público e **com a opção Add a README file ativada**, para iniciar a branch `main`). Volte à conversa: o assistente poderá transferir os arquivos da branch de preparação para a raiz do repositório via GitHub conectado. Não publique backups ou dados reais de usuários.

## Hospedagem e domínio
Em Settings → Pages do novo repositório, selecione `main` e `/ (root)`.
Configure o domínio personalizado `treinenolar.vinmedrado.com`.
No DNS do domínio adicione o `CNAME` com o host `treinenolar` apontando para `vinmedrado.github.io`.
Ative HTTPS quando a validação terminar. O arquivo `CNAME` incluído neste pacote pertence à raiz do novo repositório.

## Spotify
No Spotify Developer Dashboard, adicione **exatamente** `https://treinenolar.vinmedrado.com/` às Redirect URIs permitidas antes de testar o login. O `spotify.js` calcula a URL de retorno com base na raiz da página publicada e utiliza PKCE, sem Client Secret. Mantenha também a URL antiga cadastrada enquanto o antigo VIVA estiver ativo.

## Privacidade e dados dos treinos
A troca de domínio muda a origem do `localStorage`: o histórico antigo não aparece automaticamente.
No aplicativo antigo, exporte o backup JSON em Ajustes; no Treine no Lar, restaure-o em Ajustes.
A chave interna `viva-functional-v2` e o formato `viva-backup-v1` ficam preservados por compatibilidade, apesar da nova marca.
Os backups JSON contêm dados sensíveis em texto simples. Guarde-os privadamente e remova cópias temporárias.
Não redirecione automaticamente a URL antiga antes de os usuários poderem exportar seus dados.

## Correções incluídas
- O service worker não intercepta nem coloca em cache URLs de retorno OAuth com `code`, `state` ou `error`.
- Dados locais são normalizados na abertura do app; nomes e dicas de etapas são escapados antes de renderizar HTML.
- O treino avulso bloqueia início quando a avaliação diária sinaliza dor, alerta ou recuperação intensa. Com prontidão baixa, utiliza 20 minutos e baixo impacto quando há avaliação.
- Tokens Spotify continuam em `sessionStorage`, fora dos backups.

## Checklist antes de divulgar
- Abrir o site no iPhone/Safari e no desktop; verificar cabeçalho e ícone.
- Executar e revisar `qa.html`, cronômetro e 20/30/45 minutos, pausa, voz e modo offline.
- Exportar e restaurar backup de teste sem dados pessoais reais.
- Testar login Spotify Premium e playlists usando a nova URL registrada.
- Atualizar o portfólio apenas depois da publicação validada.
