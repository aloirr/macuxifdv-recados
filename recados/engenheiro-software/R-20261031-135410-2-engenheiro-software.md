---
id: R-20261031-135410-2-engenheiro-software
de: engenheiro-software
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:54:10+00:00
---
# Revisão final do desenho T-0008 (SQLite + FTS5) e do adendo da ADR 0003

## Contexto
Contexto: a pedido do Alexandre, a revisão do desenho da T-0008 parte 1 (docs/desenho/T-0008.md e adendo de 2026-10-31 na ADR 0003) fica registrada para a etapa 5 da tarefa.

## O que preciso / o que mudou
O que preciso: revisar a coerência com motor-sync.ts e ambiente.ts (extensões opcionais de ArmazenamentoSync), as fronteiras (FTS do Catálogo em modules/catalogo; o SDK só dá a capacidade), a migração da fila sem perda e o plano da seção 6; decidir a proposta de engines Node >= 22.13 (node:sqlite).

## Pronto quando
Pronto quando: revisão sem item vermelho, ou ajustes listados num recado de resposta ao gerente-projetos.
