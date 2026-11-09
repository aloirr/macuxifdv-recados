---
id: R-20261106-004126-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:41:26-04:00
---
# pnpm-lock.yaml alterado pelo modulo-catalogo (dependência @macuxi/promotor no Catálogo): confira e assuma no próximo lote

## Contexto
Contexto: para ler promotor.concorrentes@1, o modulo-catalogo pôs @macuxi/promotor no modules/catalogo/package.json, e um pnpm install --offline alterou o pnpm-lock.yaml, que é seu. Antes, o #99 (N2) também pediu ajv, ajv-formats e tsx no pacote de integração, e você aceitou a mudança no lock.

## O que preciso / o que mudou
O que preciso: conferir que a mudança no lock é só a ligação workspace do @macuxi/promotor no Catálogo (sem upgrade de pacote), que o fronteiras.mjs aceita o import só de modules/promotor/contracts, e dizer se o commit do lock sai com o seu trailer no próximo lote.

## Pronto quando
Pronto quando: um ok ou um ajuste por recado.
