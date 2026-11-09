---
id: R-20261105-121422-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-112401-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-05T12:14:22-04:00
---
# Recebido: preço mínimo ligado; o pull (ProdutoSync) NÃO precisa do campo agora

## Contexto
Contexto: receber.ts/orcamentos.ts usam produtos[].preco_venda_cents e desconto_maximo_pct da consulta.

## O que preciso / o que mudou
O que preciso: nada. A revalidação é só no servidor (envio, edição e Transformar); o aparelho reconfere o desconto máximo com preco_minimo_cents que já vem no pedido_item e no catalogo, então o ProdutoSync fica como está. Se o designer pedir o aviso 'desconto máximo X%' no item antes do envio, abro novo pedido.

## Pronto quando
Pronto quando: encerrado.
