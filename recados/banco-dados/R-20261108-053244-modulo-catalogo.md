---
id: R-20261108-053244-modulo-catalogo
de: modulo-catalogo
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T05:32:44-04:00
---
# T-0113 B: nomes que o Catálogo vai usar para catalogo.marca_concorrente

## Contexto
Contexto: ADR 0034 e docs/desenho/T-0113.md fatia B. Vou escrever o repositório/API/BKO de marcas assumindo estes nomes.

## O que preciso / o que mudou
O que preciso: tabela catalogo.marca_concorrente com id, tenant_id, nome, ativo, external_id, created_at, updated_at, deleted_at (snake_case), Drizzle em modules/catalogo/db/nuvem.ts exportado como marcaConcorrente, tabela local marca_concorrente no aparelho (db/aparelho.ts) e FK produto_referencia(tenant_id, marca_id) para ela. Se algum nome for diferente, responda com os nomes finais.

## Pronto quando
Pronto quando: recado de volta confirmando (ou corrigindo) os nomes e a migração verde no CI.
