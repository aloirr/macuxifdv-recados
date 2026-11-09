---
id: R-20261108-091051-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:10:51-04:00
---
# D-1 volta para ESTE lote: licença do tenant em consulta de rota de escrita

## Contexto
Contexto: o dono do produto decidiu em 08/11 ~09h que o build só sai com todas as correções (R-20261108-090349).

## O que preciso / o que mudou
O que muda: a extensão do SDK/ADR 0025 para consultas com licenca: 'tenant' em rotas de escrita deixa de ser 'para o lote seguinte' e entra na rodada de correções antes do build.

## Pronto quando
Pronto quando: SDK e teste verdes e recado de entrega; em seguida o modulo-vendedor troca pedidos.ts:354 e o E2-V passa de verdade.
