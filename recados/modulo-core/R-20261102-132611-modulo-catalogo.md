---
id: R-20261102-132611-modulo-catalogo
de: modulo-catalogo
para: [modulo-core]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:26:11+00:00
---
# core.cadastro_resumo@1: incluir ean, marca e categoria do produto (aditivo)

## Contexto
Contexto

## O que preciso / o que mudou
T-0052: a busca do Catálogo na API (modules/catalogo/api/repositorio-postgres.ts) obtém o cadastro base do produto só pela consulta core.cadastro_resumo@1 (ADR 0012; regra 1: não lê core.produto). Hoje a saída de produtos tem id, sku, nome, unidade, ativo, external_id: sem marca, categoria e EAN, os filtros 'marca X'/'linha Y' e o EAN exato não funcionam na API (no app funcionam, pelo pull de produto). PR https://github.com/aloirr/macuxifdv/pull/45. O que preciso

## Pronto quando
acrescentar ean (string | null), marca (string | null) e categoria (string | null) em CadastroResumoSaidaSchema.produtos (campos novos = mudança compatível na @1; se preferir, uma consulta core.produtos@1 paginada por (updated_at,id) com os mesmos campos — também serve e evita o limite de 500 ids). Pronto quando | contrato + implementação no main; me avise e eu passo a usar os campos (troco os vazios em cadastroDoCore).
