---
id: R-20261106-203019-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:30:19-04:00
---
# T-0089: ClientePayload com prazo_medio_max_dias e formas_pagamento

## Contexto
Contexto: C1/C2 do desenho.

## O que preciso / o que mudou
Fato: integracao.cliente.atualizado@1 agora pode trazer prazo_medio_max_dias (int 0..365, nullish) e formas_pagamento (ate 20 codigos, nullish). Ausente = nao altera; null (ou lista vazia) = limpa. A forma e referenciada por codigo e o Hub nao confere se existe (a ordem de carga poe a forma antes do cliente). Entra tambem no CSV da carga por arquivo (formas separadas por barra, ex.: PIX/BOLETO).

## Pronto quando
Pronto quando: ciente.
