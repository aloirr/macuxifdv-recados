---
id: R-20261031-221106-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0023
responde_a: R-20261031-220811-2-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-10-31T22:11:06+00:00
---
# itens_faturados: produto_external_id e valor_cents agora obrigatórios

## Contexto
Contexto: decisão do Alexandre sobre a T-0023

## O que preciso / o que mudou
Em modules/integracao/contracts/pedido.ts, ItemFaturado passou a exigir produto_external_id (o produto_id da decisão, na chave do ERP; o Hub resolve o produto_id interno pela sequencia e confere pelo external_id) e valor_cents (centavos inteiros >= 0). itens_faturados segue opcional no retorno, sequencia segue a chave do item. O Conector só envia itens completos; item sem produto/valor vira aviso itens_faturados_omitidos e o retorno vai sem o campo. Contrato continua v1

## Pronto quando
Ajuste a rota POST /pedidos/{uuid}/retorno e vendedor.pedido.faturado@1 se citarem os campos como opcionais
