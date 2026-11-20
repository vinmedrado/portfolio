# VIVA — Treino em Casa

Aplicativo web responsivo de treinos guiados, com professor virtual baseado em regras transparentes e salvamento local.

## Publicação

A pasta `viva/` é servida pelo GitHub Pages do repositório `vinmedrado/portfolio`, no endereço **https://vinmedrado.com/viva/**. O site principal do portfólio permanece intacto.

## Recursos

- Treinos de 20, 30 e 45 minutos, com aquecimento, circuito e alongamento.
- Programa de segunda a sexta para retorno gradual à atividade física, com mini bands e elásticos opcionais.
- Orientações por voz em português, cronômetro, bipes e controles de pausa/navegação.
- Check-in de esforço, técnica, dor e recuperação; progressão de resistência baseada em dados recentes.
- Contagem de dias únicos de treino, marcação de agenda semanal e progresso em ciclos.
- Peso, IMC adulto e pesagens semanais com metas de referência, sem prazo final.
- Mascote e ilustrações vetoriais originais, ilustrativas e não substitutas de demonstração profissional.

## Estrutura

- `index.html`: interface e cronômetro.
- `coach.js`: planejamento e regras de progressão.
- `visual.js`: mascote e desenhos esquemáticos de exercícios (SVG).
- `backup.js`: exportação e importação de dados com validação de estrutura e campos.
- `manifest.webmanifest`: instalação como aplicativo web.
- `favicon.svg`: ícone original.

## Privacidade e limites

A aplicação não possui conta, backend, nem sincronização entre dispositivos. Os registros são salvos no `localStorage` do navegador (chave `viva-functional-v2`) e não são publicados no repositório. Limpar dados do Safari pode apagar o histórico. O aplicativo oferece backup JSON em **Ajustes > Baixar backup do VIVA** e restauração validada. O usuário deve guardar o arquivo em local seguro; ele contém informações pessoais de saúde e treino. O programa é orientação geral de condicionamento e não substitui um educador físico ou profissional de saúde.

## Desenvolvimento

Os arquivos são estáticos; não há build. Ao atualizar os arquivos nesta pasta, o GitHub Pages publica a nova versão preservando o endereço.
