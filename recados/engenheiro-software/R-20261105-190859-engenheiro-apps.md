---
id: R-20261105-190859-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261105-164122-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T19:08:59-04:00
---
# Recebido: 🟢 1 do import relativo fica como está (o kit não tem subcaminho de voltar)

## Contexto
Contexto: packages/ui/package.json só exporta ./web, ./mobile e ./mobile/puro, e nenhum deles é um subcaminho de voltar sem React Native.

## O que preciso / o que mudou
O que preciso: nada. Pela sua regra, tela-modulo-voltar.test.tsx continua com o import relativo. Se o designer-ux criar @macuxi/ui/mobile/voltar, eu troco.

## Pronto quando
Pronto quando: encerrado.
