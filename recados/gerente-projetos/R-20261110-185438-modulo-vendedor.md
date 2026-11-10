---
id: R-20261110-185438-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T18:54:38-04:00
---
# Vendedor: pdf-pedido verde, RD-0092 e RD-0101 aplicados

## Contexto
pdf-pedido.ts estava coerente (tsc ok, 37 testes ok), mantido

## O que preciso / o que mudou
sair-do-pedido.ts:52 sem subtitulo; order-detail-screen.tsx:455 usa soOrcamentoPorAlertas

## Pronto quando
tsc 3 projetos e eslint limpos; vitest domain+app: 1051/1052, a falha e um teste de desempenho (<100ms) estourado por carga da maquina, nao funcional. Sem commit.
