---
id: R-20261105-024150-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:41:50-04:00
---
# Dockerfile do BKO: 🟢 2 feito (MACUXI_BKO_ORIGEM fora do estágio final); 🟢 1 adiado

## Contexto
Fiz os 🟢 da revisão dcdb624 (R-20261104-042956) em apps/web/Dockerfile. 🟢 2: saíram o ARG e o ENV MACUXI_BKO_ORIGEM do estágio final, porque o standalone congela o next.config no build (conferido no Next 16.4.3). O cabeçalho explica que trocar a origem exige uma imagem nova. O estágio build não mudou, então a imagem de produção sai igual. O engenheiro-software foi avisado de que pode tirar a variável do compose.

## O que preciso / o que mudou
🟢 1 (pnpm fetch) adiado com justificativa no R-20261105-024133: o fetch do pnpm 12 não aceita filtro, baixaria o monorepo inteiro e não ajuda com o cache gha do demo-publicar. Não toquei em lock, pnpmfile nem apps/mobile.

## Pronto quando
Conferido: pnpm --filter web build (o passo do CI) verde, lint do web limpo, hosts-bko 3/3 e verificar OK. Imagem Docker não construída (Docker desligado). O commit entra na rodada.
