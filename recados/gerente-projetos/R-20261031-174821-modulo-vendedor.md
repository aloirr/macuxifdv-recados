---
id: R-20261031-174821-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:48:21-04:00
---
# Vendedor: pull de pedido e pedido_item (D-2) pronto

Feito: modules/vendedor/contracts/sync.ts (PedidoSyncSchema, PedidoItemSyncSchema); api/sync.ts (provedores com escopo ['usuarios','carteira']: vendedor/supervisor/analista por vendedor_id em usuariosVisiveis, promotor só pela carteira; janela criado>=90d ou status não final; item por join com o pedido pai; sem receber, push cai em SYNC_NAO_IMPLEMENTADO); app/index.ts registra pedido (schemaLinha) e pedido_item (pull); domain: ehStatusFinal (invoiced, cancelled) com teste. Manifesto NÃO mudou (sync já listava pedido e pedido_item). Teste com banco: api/sync.db.test.ts (11 casos: próprio, equipe, tenant, B nunca, promotor na carteira, carteira vazia, janela, schemaLinha, cursor, RN-PRO-01 no push). Vendedor: lint, typecheck e 123 testes verdes; pnpm --filter api test verde (69). Mudanças fora do código: package.json do vendedor ganhou devDeps @macuxi/db, pg, @types/pg e vitest.config.ts usa o globalSetup do db (pnpm-lock reescrito pelo install: do engenheiro). Pendente: aba Pedidos na ficha (opcional, já existe AbaUltimosPedidos da Fase M); teste 'DEFEITO D-2' de tests/integracao/api/sync-app.test.ts passa a vermelho (avisar testes). Não rodei o integracao completo.
