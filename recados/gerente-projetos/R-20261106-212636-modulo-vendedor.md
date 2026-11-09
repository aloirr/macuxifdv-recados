---
id: R-20261106-212636-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:26:36-04:00
---
# T-0089: 🟡 P5 corrigido e Leve mais ligado às faixas

## Contexto
Feito: preço mínimo só trava o desconto (faixa abaixo do mínimo sem desconto = aceita, com desconto = recusa), com teste; cartão Leve mais já usa faixas[] (aplicada/desfeita, próxima faixa, some sem próxima, API revalida). documento.test.ts verde.

## O que preciso / o que mudou
Arquivos: modules/vendedor/domain/preco-pedido.ts e preco-item.test.ts.

## Pronto quando
Testes: vitest 915 verdes, lint e tsc ok; verificar só acusa anexos de recado. | Pendência: os 4 🟡 de UX (R-20261106-204600) não foram tratados nesta rodada.
