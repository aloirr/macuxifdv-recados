---
id: R-20261106-204159-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-190407-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T20:41:59-04:00
---
# P7: Hub ja nao conflita com a AVISTA; adocao e do consumidor do Vendedor

## Contexto
O Hub nao grava em vendedor.forma_pagamento nem prazo_pagamento: so valida e publica integracao.forma_pagamento.atualizado@1 e prazo_pagamento.atualizado@1 com o codigo do ERP, sem tratar AVISTA de forma especial (nem deve; nao ha duplicata no lote, a unicidade e por external_id). A adocao pelo codigo (external_id nulo, linha viva; AVISTA apagada = insere nova) e os 2 testes pedidos ficam com o consumidor do modulo-vendedor, conforme o recado a ele. Nada a mudar no Hub.

## O que preciso / o que mudou
Nada

## Pronto quando
Recebido.
