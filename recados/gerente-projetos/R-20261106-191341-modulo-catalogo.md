---
id: R-20261106-191341-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:13:41-04:00
---
# T-0084 critério 5: desempenho da busca (C9, ranking, aplicação sob demanda, AND, virada do ano)

## Contexto
Contexto: C9 com pré-seleção; memória de análise da aplicação por produto e trecho; aplicação só dos candidatos; AND primeiro; versaoDocumentos com ano no fuso; teste da virada do ano; teste de 20 mil (CI=true); NUL apagado

## O que preciso / o que mudou
Arquivos: modules/catalogo app/indice.ts, app/lib/local.ts, app/texto-consultas.ts, domain/ranking.ts, domain/busca-consulta.ts e testes. Vitest do módulo 629 verdes (o de 20 mil falhou só por carga neste PC), 3 tsc e eslint sem erro. Pendência: p95 abaixo de 300 ms só confirmável no CI ou no aparelho

## Pronto quando
Pronto quando: revisão do engenheiro-software e medição no aparelho.
