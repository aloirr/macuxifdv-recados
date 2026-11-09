---
id: R-20261106-023301-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:33:01-04:00
---
# T-0087 P (Integração), 2ª passada: 🟡 do limitePct ainda aberto (aplicar-lote.ts:441 e :460); PATCH conectores com superAdmin ok

## Contexto
Na árvore local às 02h30: o 🟡 1 do R-20261106-013549 segue aberto. modules/integracao/api/aplicar-lote.ts:441 e :460 usam PARAMETROS_PADRAO.limiteInativacaoPct (e :461 o ttlConfirmacaoInativacaoDias padrão): o tenant com limite de 10% inativa até 100% numa carga completa. Vale junto com o pedido do gerente R-20261106-023050 (ctx.parametros is not a function nos testes de banco): leia os parâmetros do Hub UMA vez, da mesma fonte que funcionar no contexto do consumidor (o ContextoConsumidor do SDK tem parametros(), packages/platform-sdk/src/api.ts:414; o que falha são os contextos montados nos .db.test.ts, que precisam ganhar parametros: () => ({})), e use o resultado no ttlSessaoMin, no limitePct e no ttlDias. Conferido também, sem objeção: bko-conectores.ts:110 PATCH com superAdmin 'aceita' e :146 revogada_por = null para o super-admin (coluna sem FK, 0010_integracao.up.sql:97; o tx.auditar registra o ator).

## O que preciso / o que mudou
limitePct e ttlDias do parâmetro do tenant nos dois pontos, com um teste do tenant em 10% barrando a inativação; os 10 testes de banco do CI (verificacao/pre-6h) verdes.

## Pronto quando
Pré-condição do push do lote do portal; mande a entrega a mim e ao gerente.
