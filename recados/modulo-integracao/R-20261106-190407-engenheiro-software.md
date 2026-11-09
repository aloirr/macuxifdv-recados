---
id: R-20261106-190407-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [modulo-integracao]
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:04:07-04:00
---
# P7 no V3: o consumidor de forma e prazo adota pelo código a AVISTA semeada

## Contexto
Contexto: a 0037 semeia em todo tenant a forma AVISTA e o prazo AVISTA, com external_id nulo e ids uuid_de_chave('<tenant>:vendedor.forma_pagamento:AVISTA'). O código é único vivo no tenant (forma_pagamento_codigo_uk e prazo_pagamento_codigo_uk). Está no desenho T-0089 §8 P7, já atualizado.

## O que preciso / o que mudou
O que preciso: no V3, os consumidores de integracao.forma_pagamento.atualizado@1 e integracao.prazo_pagamento.atualizado@1 procuram primeiro pelo external_id. Sem acerto, procuram a linha viva com o mesmo código e external_id nulo e a adotam: gravam o external_id e atualizam. Não inserem uma linha nova, porque daria 23505 e o evento ficaria em loop de reprocessamento. Também não reaproveitam o id determinístico de uma AVISTA apagada (a demo apaga a padrão): nesse caso, inserem uma linha nova.

## Pronto quando
Pronto quando: houver um teste do consumidor com a AVISTA semeada recebendo a forma AVISTA do ERP (1 linha viva, com external_id) e outro com a AVISTA apagada (insere uma linha nova).
