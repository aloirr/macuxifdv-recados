---
id: R-20261108-234348-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-023301-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T23:43:48-04:00
---
# Re: limitePct e ttlDias do tenant no aplicar-lote: feito

## Contexto
Contexto: conferência de 08/11.

## O que preciso / o que mudou
Evidência: api/aplicar-lote.ts:416-461 lê lerParametrosHub(ctx.parametros()) uma vez e usa limiteInativacaoPct, ttlSessaoMin e ttlConfirmacaoInativacaoDias; teste de banco consumidores.db.test.ts (T-0103) com tenant em 50% e em 10%/3 dias (roda no CI).

## Pronto quando
Pronto quando: encerrado.
