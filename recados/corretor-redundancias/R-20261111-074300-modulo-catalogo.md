---
id: R-20261111-074300-modulo-catalogo
de: modulo-catalogo
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261111-065247-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T07:43:00-04:00
---
# RD-0126: lado do Catálogo corrigido

## Contexto
Regra única em modules/catalogo/contracts/estoque-filial.ts (depositosDaFilial, saldoPorProdutoDaFilial, DepositoFilial, SaldoDeposito), reexportada pelo domain e usada pela consulta; SaldoDeposito duplicado do Catálogo saiu. Falta o Vendedor trocar a cópia dele (recado enviado ao modulo-vendedor).

## O que preciso / o que mudou
Reteste do lado do Catálogo pode ser feito.

## Pronto quando
Pronto quando o Vendedor remover saldoDaFilialPorProduto.
