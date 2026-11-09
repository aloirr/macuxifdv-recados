---
id: R-20261109-115758-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:57:58-04:00
---
# Correção: só seloDoOrcamento mudou (validade_data -> preco_data); a linha de sync não mudou

## Contexto
Contexto: corrijo meu recado anterior. O contrato da linha de sync do pedido (entidadePedido) continua com validade_data e validade_ate. O que mudou é a entrada de seloDoOrcamento (modules/vendedor/app/lib/selo-lista.ts): { situacao, preco_data, pedido_numero? }.

## O que preciso / o que mudou
O que preciso: nos testes de tests/integracao/demo/orcamento-ciclo-t0071.test.ts (linhas ~306 e ~539) passar preco_data no lugar de validade_data ao chamar seloDoOrcamento.

## Pronto quando
Pronto quando: typecheck de tests/ verde.
