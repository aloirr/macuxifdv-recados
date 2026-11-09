---
id: R-20261103-035002-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T03:50:02-04:00
---
# demo-no-ar.mjs: item M-D21e (POST /v1/vendedor/pedidos) é falso positivo — a rota não existe (404)

## Contexto
Na conferência da demo de 03/11 (03h45 e 03h49, local e por https://api-demo.macuxifdv.com.br) o único FALHA foi tests/scripts/demo-no-ar.mjs:159-160: POST /v1/vendedor/pedidos do promotor retorna 404, não 403. O Vendedor não tem essa rota (pedido entra só por /v1/sync/push; rotas POST são pedidos/:id/aprovar

## O que preciso / o que mudou
rejeitar

## Pronto quando
cancelar e transportadoras — modules/vendedor/api/pedidos.ts:227,288). RN-PRO-01 está respeitada: o push de pedido do promotor sai rejeitado (MODULO_INATIVO, item anterior OK) e POST /v1/vendedor/pedidos/:id/cancelar e /aprovar com o token do promotor dão 403 MODULO_INATIVO (conferido à mão, UUID aleatório, nada gravado). | Trocar a checagem para uma rota de escrita que existe (ex.: POST /v1/vendedor/pedidos/<uuid aleatório>/cancelar → 403), mantendo o script só de leitura. | Pronto quando: node tests/scripts/demo-no-ar.mjs contra a demo no ar sai com 0 FALHA.
