---
id: R-20261031-220827-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0023
responde_a: R-20261031-114047-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T22:08:27+00:00
---
# Re: itens faturados no retorno e 2ª nota parcial - feitos na T-0023

## Contexto
Contexto: os dois 🟡 da revisão da T-0009.

## O que preciso / o que mudou
O que mudou: (1) contracts/pedido.ts: RetornoErp.itens_faturados opcional [{ sequencia, produto_external_id?, quantidade int>0, valor_cents? }], só em faturado_parcial/faturado_total, min 1, sequência única; repetido em PedidoRetornoErpEvento (eventos.ts). Usei sequencia (e não produto_id uuid) porque o Conector só conhece o código do ERP: o Hub resolve o produto_id pela sequência do pedido enviado, como já está em .coord/contratos/eventos.md. (2) domain/estados.ts: transicionarRetornoPedidoErp + chaveNotaRetorno: faturado_parcial repetido com nota (número+série) diferente NÃO é repetição; mesma nota é repetida:true; testes citando RN-INT-08. O Hub precisa chamar a função ao aplicar o retorno (guardando as notas aplicadas por pedido).

## Pronto quando
Pronto quando: feito; testes verdes (integracao 122).
