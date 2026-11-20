# VIVA — Treino em Casa

PWA de treinos funcionais guiados com professor virtual baseado em regras explícitas, acompanhamento local e interface mobile.

## Publicação

- Aplicativo: **https://vinmedrado.com/viva/**
- Repositório: `vinmedrado/portfolio` → pasta `viva/`
- A publicação é feita pelo GitHub Pages. A página principal do portfólio permanece intacta.

## Funcionalidades da versão completa

- **Biblioteca de 365 treinos distintos**: 73 semanas com 5 sequências por semana, navegáveis em 37 páginas. O programa de um ano de segunda a sexta tem cerca de 260 sessões previstas; a biblioteca oferece sequências adicionais e ampliações futuras.
- **Professor virtual**: agenda de segunda a sexta (3 dias principais de força e 2 dias opcionais de cardio/mobilidade), aquecimento, treino e alongamento.
- **Adaptação gradual**: sessões de 20 minutos no início; 30 e 45 minutos são sugeridos apenas conforme frequência, recuperação, esforço relatado e tempo de adaptação.
- **Ciclos de quatro semanas** com revisões de hábitos, tendência de peso, técnica e tolerância à resistência. Alguns exercícios básicos permanecem para acompanhar força.
- **Mini bands e elásticos** opcionais e seleção de baixo impacto.
- **Substituição de exercícios**: o usuário pode retirar movimentos dos próximos planos e reativá-los em Ajustes.
- **Demonstrações**: ilustrações SVG esquemáticas, mascote original, 31 guias com preparação, execução, respiração, cuidados e alternativa simplificada.
- **Cronômetro e áudio**: anúncios em pt-BR, bipes, contagem final, avanço manual, pausa e retomada.
- **Proteção da integridade das sessões**: treino com muitos avanços manuais não é registrado como concluído. Ao sair do Safari, a sessão é pausada e recuperável após recarregar.
- **Acompanhamento**: check-ins semanais (disposição, recuperação e cintura opcional), feedback pós-treino (esforço, execução e dor), pesagens e gráfico, referência de IMC adulto, painel das últimas oito semanas e histórico.
- **Offline**: service worker guarda os arquivos principais após uma primeira visita com internet. O suporte em segundo plano e à voz depende do navegador e do sistema.
- **Backup**: exportação e restauração validada de arquivo JSON, incluindo histórico, pesagens, professor e substituições.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Interface, navegação, treinos, cronômetro e progressos |
| `coach.js` | Biblioteca de 365 combinações, intensidade, ciclos e recomendações |
| `guide.js` | Guias de execução de 31 exercícios |
| `visual.js` | Mascote e ilustrações vetoriais originais |
| `backup.js` | Exportação, validação e restauração dos registros |
| `sw.js` | Cache e funcionamento offline |
| `manifest.webmanifest` | Configuração de aplicativo web instalável |
| `favicon.svg` | Ícone do VIVA |
| `qa.js`, `qa.html` | Bateria independente de regressão (25 verificações) |

A página de QA está em **https://vinmedrado.com/viva/qa.html**.

## Segurança, limitações e privacidade

O VIVA é um orientador virtual baseado em regras, não uma avaliação clínica ou um personal trainer humano. Não diagnostica lesões, não determina uma dieta individual e não garante uma taxa de emagrecimento. O plano de força/cardio segue princípios gerais de atividade física e adaptação gradual, não é uma prescrição individual.

Os registros pessoais são salvos localmente no dispositivo pela chave `viva-functional-v2`; não existe backend, login ou sincronização automática entre celulares. Há também uma chave de sessão temporária para recuperação do treino. Limpar o armazenamento do navegador pode apagar os dados. Guarde o backup JSON em local privado, pois ele contém informações de saúde e treino e **não é criptografado**.

No iPhone, a voz e o cronômetro podem não continuar funcionando com a tela apagada; por isso o aplicativo pausa a sessão quando vai para segundo plano. Os desenhos são ilustrativos e não substituem instruções individualizadas.

## Fundamentos consultados

- [American College of Sports Medicine (2026): Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance](https://doi.org/10.1249/MSS.0000000000003897)
- [Organização Mundial da Saúde: recomendações para adultos sobre atividade física](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity)

## Desenvolvimento e publicação

Aplicativo estático, sem dependências de build. Os arquivos desta pasta são publicados por GitHub Pages. Atualizar a pasta mantém o mesmo endereço e não modifica a raiz do portfólio.
