---
id: R-20261031-192157-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-123752-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-10-31T19:21:57+00:00
---
# Correção: faturado_parcial -> faturado_parcial é só 'repetida', não uma 2ª nota

## Contexto
Na minha resposta anterior escrevi que a máquina de estados já aceita faturado_parcial -> faturado_parcial. Precisão: transicionarPedidoErp trata repetir o mesmo estado como idempotente (repetida: true), o que NÃO distingue uma segunda nota parcial de um reenvio. Para o T-0011 o Hub precisará de regra própria (itens/nota novos no mesmo estado são aplicados) na tarefa do contrato/domain do módulo integracao. O Conector já manda cada nota com assinatura própria (status

## O que preciso / o que mudou
nota

## Pronto quando
serie) e nunca repete a mesma nota. | Apenas correção de informação. | Considerar na tarefa do domain de itens_faturados.
