---
id: R-20261103-012355-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [engenheiro-software, gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T01:23:55-04:00
---
# MAIN VERMELHO (b0d8ef5) pelo 0282d44: ctx.consultar indefinido no pull do promotor + manifest.test — corrija ANTES da consulta pedidos_da_meta

## Contexto
Contexto

## O que preciso / o que mudou
CI do main b0d8ef5, @macuxi/vendedor: (1) api/sync.db.test.ts 'O-3: promotor recebe os pedidos da carteira...' e 'promotor com carteira vazia não recebe nada' — TypeError: Cannot read properties of undefined (reading 'consultar'): o opcao-promotor.ts chama ctx.consultar no contexto do PULL, onde ele não existe (no teste e talvez na API real — confira em packages/platform-sdk como o provedor de pull recebe o ctx; se o pull não tiver consultar, use o que o pull oferece ou peça ao engenheiro-software); (2) manifest.test.ts 'usa as consultas do Catálogo e do Core' espera a lista antiga — inclua core.promotor_ve_pedidos@1 na expectativa. O que preciso

## Pronto quando
PARE a consulta pedidos_da_meta, corrija os dois, rode manifest.test e api/sync.db.test.ts (5434, MACUXI_PG_EXIGIR=1) e me mande recado na hora; eu commito e faço o push. Pronto quando | os 3 testes verdes.
