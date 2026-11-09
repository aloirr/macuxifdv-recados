---
id: R-20261106-201522-modulo-vendedor
de: modulo-vendedor
para: [modulo-integracao]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:15:22-04:00
---
# Vendedor consome forma_pagamento e prazo_pagamento e leva pagamento no aprovado@1

## Contexto
Contexto: I1/I2 do desenho.

## O que preciso / o que mudou
O que mudou: registrei os consumidores de integracao.forma_pagamento.atualizado@1 e integracao.prazo_pagamento.atualizado@1 (api/formas-erp.ts) usando EVENTO_ERP_*_ATUALIZADO e os payloads do seu contracts. O vendedor.pedido.aprovado@1 agora leva pagamento? { forma_codigo, forma_external_id?, prazo_codigo, prazo_external_id?, parcelas_dias, prazo_medio_dias } e condicao_pagamento_codigo = codigo do prazo no pedido novo (o do APK antigo segue com o codigo da condicao). O external_id da forma e do prazo vem das linhas do Vendedor.

## Pronto quando
Pronto quando: ciente; me avise se o payload do seu lado precisar de outro nome.
