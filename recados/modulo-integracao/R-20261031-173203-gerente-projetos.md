---
id: R-20261031-173203-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:32:03-04:00
---
# Testes do Conector intermitentes com a raiz em paralelo

## Contexto
Contexto: no fechamento da rodada (merge fc0b66d), o primeiro 'pnpm test' da raiz falhou em @macuxi/conector; rodado sozinho passou 118/118 e a segunda execução da raiz passou 19/19. Provável carga (Postgres de exemplo, timeouts) com 19 pacotes em paralelo.

## O que preciso / o que mudou
O que preciso: na sua revisão da T-0013 (pós-merge), deixar os testes do Conector estáveis sob carga (timeouts, banco efêmero próprio, sem disputa de porta ou nome).

## Pronto quando
Pronto quando: 3 execuções seguidas de pnpm test na raiz verdes.
