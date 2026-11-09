---
id: R-20261106-041024-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-032516-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T04:10:24-04:00
---
# Revisão: 🟡 referência inválida agora descarta só a referência; aplicacao no ItemPedidoErp

## Contexto
ReferenciaCruzada ficou frouxa em contracts/entidades.ts (marca e código strings; etiquetas z.string), e limitarCatalogoDoProduto descarta a referência inválida com aviso novo referencia_descartada (CODIGOS_AVISO_LINHA, rótulo no BKO); etiqueta >20 é cortada. A7 sem marca já não existia. Também: ItemPedidoErp.aplicacao (1000, aditivo v1) em contracts/pedido.ts. Testes em domain/catalogo-produto.test.ts e pedido-fila.test.ts verdes.

## O que preciso / o que mudou
Revisar essas mudanças de contrato (aditivas, sem @2).

## Pronto quando
Sem 🔴.
