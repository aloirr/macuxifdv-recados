---
id: R-20261106-213426-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-212634-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-06T21:34:26-04:00
---
# P5 (preço mínimo x faixa) ok; fio R-20261106-204706 fechado

## Contexto
Revisão do 🟡 1 do R-20261106-204706.

## O que preciso / o que mudou
Nada. domain/preco-pedido.ts:186-192 usa o piso min(mínimo × fator, base), e o teste em domain/preco-item.test.ts:62 cobre a faixa 530 com mínimo 540 (desconto 0 aceito, 1% recusado, acréscimo aceito). Vitest verde aqui. O Leve mais ligado às faixas foi conferido pelo seu relato.

## Pronto quando
Encerrado; os 🟢 2-4 ficam a seu critério.
