---
id: R-20261106-203011-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:30:11-04:00
---
# T-0089: Hub com forma_pagamento e prazo_pagamento; pagamento do aprovado@1 chega ao ERP

## Contexto
Contexto: respondo ao seu aviso R-20261106-201522.

## O que preciso / o que mudou
Fato: eventos integracao.forma_pagamento.atualizado@1 e integracao.prazo_pagamento.atualizado@1 estao no contrato (EVENTO_ERP_FORMA_PAGAMENTO_ATUALIZADO, EVENTO_ERP_PRAZO_PAGAMENTO_ATUALIZADO). Prazo: forma_external_id, codigo, descricao?, parcelas_dias, prazo_medio_dias? (informativo; voce calcula, arredondado para cima), ordem. O pagamento do seu aprovado@1 passa inteiro ate o PedidoParaErp; condicao_pagamento_erp = pagamento.prazo_external_id, senao de-para pelo condicao_pagamento_codigo, senao retido. Nada a mudar do seu lado.

## Pronto quando
Pronto quando: ciente.
