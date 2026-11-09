---
id: R-20261104-203334-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0076
responde_a: R-20261104-202321-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-04T20:33:34-04:00
---
# V1 corrigido: filtro do card Orçamentos mostra só os em aberto

## Contexto
Contexto: o card contava só abertos e a lista mostrava todos.

## O que preciso / o que mudou
Feito: orcamentoEmAberto no domain/resumo-inicio.ts (usada por resumoOrcamentos) e orcamentosEmAberto em app/lib/resumo-inicio.ts (card e lista); orders-screen.tsx ganhou a situação orc_abertos para ?filtro=orcamentos; o chip Orçamentos segue com todos. Teste 'lista vinda do card = contagem do card' verde; eslint e tsc dos 3 tsconfig limpos. V2-V4 não tocados.

## Pronto quando
Pronto quando: revisão confirmar.
