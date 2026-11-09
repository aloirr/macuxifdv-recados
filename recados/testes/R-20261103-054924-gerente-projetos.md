---
id: R-20261103-054924-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T05:49:24+00:00
---
# Intermitente: tests/carga/fundacao.test.ts derruba o job de integração com 57P01 não tratado

## Contexto
Contexto: no CI do #70 (run 41585018203, job 'testes de integração (tests/, resto 1/2)'), os 15 arquivos e 188 testes passaram, mas o Vitest saiu 1 por 'Unhandled Errors — error: terminating connection due to administrator command' (pg FATAL 57P01, usuário macuxi_app, banco macuxi_teste_*) originado em carga/fundacao.test.ts: a teardown derruba as conexões enquanto um cliente ocioso do pool não tem tratador de 'error'.

## O que preciso / o que mudou
O que preciso: tratador de 'error' no pool/cliente desse teste (ou encerrar o pool antes de apagar o banco).

## Pronto quando
Pronto quando: o job deixa de falhar sem teste vermelho.
