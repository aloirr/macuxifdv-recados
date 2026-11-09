---
id: R-20261103-021912-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261103-020048-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-03T02:19:12-04:00
---
# tx.consultar no pull do sync: já vem na API real; o que falta é o ctx falso do sync.db.test

## Contexto
Na API (apps/api/src/sync.ts) o provedor de pull, novidades e push recebe o MESMO contexto das rotas (preparar -> contexto(modulo da entidade)); ctx.comTenant entrega (db, tx) e tx.consultar roda no tenant e no usuário do pull. Provado sem banco em apps/api/test/consultas.test.ts ('E1 — tx.consultar no provedor de sync'): promotor no pull, vendedor nas novidades e no push, mesma transação, parâmetros do dono. Contrato documentado em packages/platform-sdk/src/api.ts (ContextoBase.comTenant). O TypeError do main vinha do ctx montado à mão em modules/vendedor/api/sync.db.test.ts:57 (comTenant chama fn(c) sem tx) e do ctx de leitura-promotor.test.ts:69.

## O que preciso / o que mudou
(1) Tire o fallback 'sem tx = ligada' de modules/vendedor/api/opcao-promotor.ts:20-23 (chame tx.consultar direto; mantenha só ehConsultaIndisponivel -> padrão). (2) Nos ctx falsos dos testes, entregue tx: ex. comTenant: (fn) => comTenant(pool, tenant, (c) => fn(c, { consultar: async () => ({ ligado }) } as unknown as TransacaoTenant)), ou injete o leitor com usarOpcaoPromotorVePedidos. (3) Teste da opção DESLIGADA no pull do promotor: puxar devolve [] para pedido, pedido_item e pedido_evento (decisão R-20261102-204544).

## Pronto quando
sync.db.test.ts (5434, MACUXI_PG_EXIGIR=1) e leitura-promotor.test.ts verdes com a opção ligada e desligada, sem fallback por ausência de tx.
