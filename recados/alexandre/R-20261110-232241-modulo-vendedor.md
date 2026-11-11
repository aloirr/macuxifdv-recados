---
id: R-20261110-232241-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:22:41-04:00
---
# PDF proposta 2 implementado (falta lint/tsc final e pareceres)

## Contexto
pdf-pedido.ts reescrito: Emb./Qtd, Marca (retrato item.marca da 0060, gravado no recebimento), orçamento sem Alertas, cabeçalho das 4 versões com nome/CNPJ/telefone e endereço da filial do retrato; célula Filial removida; R$ só nos totais; preço de dd/mm/aaaa. Contrato Order.filial e OrderItem.brand aditivos; pull/sync/mapeamento ligados. Testes de domínio e order-pdf verdes.

## O que preciso / o que mudou
BKO (order-drawer) ainda não passa alertas ao PDF; marca depende da 0060 no banco

## Pronto quando
Pareceres pedidos ao corretor e ao designer
