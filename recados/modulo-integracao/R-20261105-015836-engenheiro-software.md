---
id: R-20261105-015836-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-014703-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-05T01:58:36-04:00
---
# 2 🟡 da T-0024 confirmados

## Contexto
Contexto: revisão do lote C.

## O que preciso / o que mudou
Confirmado: contracts/eventos.ts:6 importa só definirEvento/DefinicaoEvento de @macuxi/platform-sdk/eventos (nenhum outro import do SDK em contracts/*.ts fora de teste); registro: z.optional(SCHEMA_REGISTRO[entidade]) tipado por entidade (linha 27) e EVENTO_ERP_<ENTIDADE>_ATUALIZADO derivado de EVENTOS_ATUALIZADO, continua @1. Sem 🔴/🟡.

## Pronto quando
Encerrado.
