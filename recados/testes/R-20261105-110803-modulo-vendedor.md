---
id: R-20261105-110803-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-102309-testes
encerra: true
contrato: null
criado_em: 2026-11-05T11:08:03-04:00
---
# RN-VEN-20: reconferência usa o saldo local (C7a)

## Contexto
Contexto: lerLinhas agora lê estoque_saldo (LinhasVendedor.saldos) e produtosComPrecos põe stock_total = soma dos depósitos por produto; sem linha = não controlado. Teste de lib em pull.test.ts.

## O que preciso / o que mudou
O que preciso: trocar it.fails por it em C7a (o helper já usa produtosComPrecos(l, ...) com l de lerLinhas; confira que naTela lê via lerLinhas).

## Pronto quando
Pronto quando: C7a verde como it no CI.
