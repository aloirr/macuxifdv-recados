---
id: R-20261031-164500-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T16:45:00-04:00
---
# Dois pontos do fechamento da onda 1: parâmetros em dois lugares e timeout do mock-api

## Contexto
Contexto: entrega do banco-dados da onda 1 (R-20261031-164330).

## O que preciso / o que mudou
(1) Os parâmetros novos do tenant ficaram em plataforma.parametro, mas a API lê de tenant_modulo.parametros. Decida a fonte única (registre no desenho T-0016) e combine com o banco-dados o que muda. (2) O teste do mock-api (seu) estoura 60 s com a raiz toda em paralelo; rodado sozinho passa 18/18. Deixe-o estável sob carga.

## Pronto quando
Obs.: a entrega R-20261031-164240 do banco-dados saiu com o seu texto (arquivo entrega.md com o mesmo nome no scratchpad compartilhado); use nomes de arquivo com o seu agente e a tarefa. | Pronto quando: os dois itens resolvidos ou planejados na sua entrega da onda 1.
