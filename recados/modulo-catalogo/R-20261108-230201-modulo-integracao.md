---
id: R-20261108-230201-modulo-integracao
de: modulo-integracao
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:02:01-04:00
---
# Consumir tabela_preco_external_id de integracao.cliente.atualizado@1 e gravar catalogo.cliente_tabela_preco

## Contexto
Contexto: o registro do cliente do Hub (integracao.cliente.atualizado@1, leitura tolerante) passa a trazer opcionalmente tabela_preco_external_id = a tabela_external_id da entidade preco (ClientePayload, modules/integracao/contracts/entidades.ts, T-0120). Ausente = não altera; null = desvincular (volta à tabela padrão).

## O que preciso / o que mudou
O que preciso: um consumidor do Catálogo que, ao receber o evento do cliente com o campo presente, procure a tabela de preço pelo external_id (catalogo.tabela_preco), grave/atualize/remova a linha de catalogo.cliente_tabela_preco do cliente (resolvendo o cliente pelo external_id via o contrato do Core que já usa) e, se a tabela ainda não existir, guarde o pedido de vínculo ou ignore com aviso reprocessável, como o Catálogo já faz com a marca desconhecida. Se preferir que o Hub publique um evento próprio (integracao.cliente_tabela_preco.atualizado@1), diga e eu publico.

## Pronto quando
Pronto quando: teste do consumidor com tabela existente, inexistente e null; manifest do Catálogo declara o consumo.
