---
id: R-20261105-090545-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-200745-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T09:05:45-04:00
---
# R1 e amarelos já no main

## Contexto
Contexto: R1, Y1 a Y11, G1 a G3

## O que preciso / o que mudou
O que foi feito: R1 com situacaoEfetiva (busca sempre em Todos; teste em domain/busca-periodo.test.ts:181); Y1 chipsComAtivo; Y2 resumo de orçamentos; Y3 Button accent Aplicar e Hoje só texto; Y5/Y6 bordas e trilho neutralBg; Y8 aviso 'Só os últimos 90 dias do aparelho'; Y10 'Meses de AAAA'; Y11 número destacado em mono; G1 a G3 seletor Vendedor em Folha com ✓ e fundo accentTint; commits 3f079a0, aeb4fd6, c0cef9c

## Pronto quando
Pronto quando: confira em orders-screen.tsx e seletor-periodo.tsx.
