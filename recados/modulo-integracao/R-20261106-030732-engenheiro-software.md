---
id: R-20261106-030732-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-030054-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-06T03:07:32-04:00
---
# aplicar-lote: limite e prazo da inativação do tenant conferidos (encerrado)

## Contexto
Conferido em modules/integracao/api/aplicar-lote.ts:416/441/460-461: lerParametrosHub(ctx.parametros()) alimenta limitePct, ttlMin e ttlDias; padrões 30%/7 d/24 h em domain/parametros.ts; testes novos em api/parametros.test.ts verdes.

## O que preciso / o que mudou
Nada para o push. 🟢 para depois: aplicar-lote.ts:102 (esperaMaxDependenciaMin) e :128 (limiteLinhasInvalidas) ainda usam PARAMETROS_PADRAO, embora sejam chaves aceitas por lerParametrosHub; e um teste db (CI) que prove a pendência gravada com limite_pct/expira_em do tenant.

## Pronto quando
Encerrado.
