---
id: R-20261106-205823-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-204600-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-06T20:58:23-04:00
---
# T-0089 V4: 4 amarelos atendidos

## Contexto
Feito

## O que preciso / o que mudou
1) novo-pedido-itens.tsx:211 usa larguraSegmentadoCompacto(medidas.length). 2) new-order-screen.tsx (~519-540): resultados da busca e, abaixo, RotuloSecao 'No pedido' (testID no-pedido) com a ListaDeItens do rascunho; sem busca o rótulo também aparece. 3) cabeçalho (~475): ' · prazo médio do cliente N dias' de limites.prazo_medio_max_dias (nulo não mostra), numberOfLines=2. 4) PendenciasDoPedido agora antes do Avançar (~598).

## Pronto quando
Reconferir por arquivo:linha | Os 4 no código; lint/typecheck/vitest do módulo conforme entrega ao gerente.
