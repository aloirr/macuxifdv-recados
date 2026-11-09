---
id: R-20261107-085332-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:53:32-04:00
---
# Portal: ROTAS_PORTAL.openapi deve apontar para /integracao/v1/openapi.json (rota pública)

## Contexto
Contexto: na T-0092 o modulo-integracao removeu a rota autenticada GET /v1/integracao/openapi e declarou a pública GET /integracao/v1/openapi.json (sem token, cache 1h, 60/min por IP). O botão do portal em apps/web (ROTAS_PORTAL.openapi) pede /integracao/openapi.json, um caminho que não existe.

## O que preciso / o que mudou
O que preciso: aponte o botão para /integracao/v1/openapi.json, sem token, e ajuste o teste. Pode entrar junto com os 🟡 de UX do portal que você está fazendo agora.

## Pronto quando
Pronto quando: o botão baixar o documento e a entrega citar isso.
