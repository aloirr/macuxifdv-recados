---
id: R-20261105-131143-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:11:43-04:00
---
# Busca offline em 20 mil SKUs: sobra ~250 ms de leitura de linhas no motor

## Contexto
Contexto: com a pré-seleção por FTS5 o ranking do Catálogo caiu para ~5 ms e o FTS5 ~10 ms.

## O que preciso / o que mudou
O que sobra: motor.linhas('produto') com 20 mil linhas custa ~140 ms (parse do JSON) e a leitura de deposito/estoque/preço em contextoLocal ~120 ms, a cada busca.

## Pronto quando
Pedido: se couber no platform-sdk, uma leitura por ids (linhas por chave) ou cache da entidade invalidado pelo sync; aí o Catálogo lê só os candidatos. Sem urgência para a demo (36 produtos).
