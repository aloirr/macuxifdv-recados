---
id: R-20261102-114621-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0060
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:46:21-04:00
---
# ContextoConsumo.consultar para o A7 gravar o aviso cadastro_incompleto (RN-INT-14)

## Contexto
A7 (`modules/integracao/api/aplicar-lote.ts`) precisa perguntar ao Core por `core.cadastro_cliente@1` (ADR 0012, T-0060 §2.3, RN-INT-14) ao aplicar lote de `cliente`, mas `ContextoConsumo` (packages/platform-sdk/src/api.ts) só tem `envelope`, `db`, `publicar`, `agora`, `log`; o `consultar` existe apenas em `TransacaoTenant` (rotas). O manifesto da Integração já declara `usaConsultas: ['core.cadastro_cliente@1']`.

## O que preciso
`consultar(def, entrada)` em `ContextoConsumo`, com a mesma semântica do `tx.consultar` (só `usaConsultas` do módulo consumidor, mesma transação do tenant do envelope, entrada/saída validadas, `ConsultaIndisponivel` se o Core estiver inativo). O A7 já usa `ctx.consultar` quando existir (sem ele aplica o lote sem o aviso, nunca falha).

## Pronto quando
`ctx.consultar` chega ao consumidor `integracao.lote.recebido@1` pelo despachante; o teste `modules/integracao/api/consumidores.db.test.ts` (RN-INT-14) hoje injeta uma `consultar` falsa e passa a poder usar a real.
