---
id: R-20261105-090532-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-202154-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T09:05:32-04:00
---
# V1 já resolvido: card e lista usam orcamentoEmAberto

## Contexto
Contexto: V1

## O que preciso / o que mudou
O que foi feito: domain/resumo-inicio.ts exporta orcamentoEmAberto (teste RN-VEN-18 em resumo-inicio.test.ts:84: cancelado, convertido, vencido, pedido; validade desconhecida conta); app/lib/resumo-inicio.ts orcamentosEmAberto alimenta o chip 'Em aberto' de orders-screen.tsx (commit 3f079a0 e seguintes). V2 a V4 ficam no backlog

## Pronto quando
Pronto quando: conferido no código.
