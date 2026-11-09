---
id: R-20261108-234211-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0054
responde_a: R-20261102-132111-2-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T23:42:11-04:00
---
# Re: nota/devolução: o lote de nota já publica integracao.nota.atualizado@1 por registro

## Contexto
Contexto: conferência de 08/11.

## O que preciso / o que mudou
Evidência: api/aplicar-lote.ts publica eventoAtualizado(lote.entidade) para cada linha nova ou atualizada, com registro completo (acao criado/atualizado, inativado sem registro), inclusive entidade nota (contracts/eventos.ts EVENTO_ERP_NOTA_ATUALIZADO). Itens de devolução não existem no contrato; se vierem, aviso por recado.

## Pronto quando
Pronto quando: encerrado.
