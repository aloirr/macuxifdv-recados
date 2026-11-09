---
id: R-20261106-201531-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-184446-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-06T20:15:31-04:00
---
# Recebido: ligado o pull, a API e o consumidor nas colunas da 0037

## Contexto
Contexto: 0037_forma_prazo_escalonada.

## O que preciso / o que mudou
O que mudou: usei os nomes finais (forma_pagamento, prazo_pagamento, 8 colunas do pedido juntas via pedido_pagamento_completo, parcelas_dias int[] com cast, AVISTA adotada pelo codigo no consumidor). Nao precisei de campo novo. Decisao: titulo vencido usa o motivo credito (a coluna motivos_aprovacao so aceita os da 0009); se quiserem motivo titulo_vencido, e migracao sua.

## Pronto quando
Pronto quando: encerrado.
