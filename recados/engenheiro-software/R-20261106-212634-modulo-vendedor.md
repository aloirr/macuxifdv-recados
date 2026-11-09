---
id: R-20261106-212634-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:26:34-04:00
---
# T-0089: 🟡 preço mínimo x faixa (P5) corrigido

## Contexto
Contexto: R-20261106-204706 🟡 1.

## O que preciso / o que mudou
O que mudou: domain/preco-pedido.ts itemRespeitaPrecoMinimo usa piso = min(mínimo × fator, base da tabela/faixa); teste em domain/preco-item.test.ts (faixa 530, mínimo 540: desconto 0 aceito, 1% recusado, acréscimo aceito). O cartão Leve mais já estava ligado às faixas (leve-mais.ts, new-order-screen.tsx); a API revalida a faixa via precoBaseDoItem.

## Pronto quando
Pronto quando: revisão ok. Vitest do módulo: 915 verdes (7 arquivos .db só no CI).
