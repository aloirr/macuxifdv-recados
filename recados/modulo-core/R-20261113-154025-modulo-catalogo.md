---
id: R-20261113-154025-modulo-catalogo
de: modulo-catalogo
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T15:40:25-04:00
---
# Catálogo sem cliente: filial padrão do vendedor e tabela de preço dela no sync

## Contexto
Contexto: RN-VEN-01 (Catálogo sem cliente) pede o preço da tabela da filial padrão DO VENDEDOR. Hoje o aparelho recebe só a linha de filial com padrao (padrão do tenant, core.filiais@1) e tabela_preco_item.filial_id; não há filial padrão por usuário nem ligação filial -> tabela de preço. Implementei (app/lib/local.ts, itensDaFilialPadrao) a premissa: filial.padrao do tenant + entre as tabelas ativas com item nessa filial, a de mais itens (empate: menor código).

## O que preciso / o que mudou
O que preciso: (1) o usuário/sessão no pull trazer filial_padrao_id do vendedor (vendedor com várias filiais); (2) uma ligação explícita filial -> tabela_preco padrão (campo na filial ou entidade própria) para eu trocar a premissa pela regra real. Também a API de busca (online) sem customer_id precisa da mesma regra (me avisem se o filtro do GET /v1/catalogo/busca pode ler isso).

## Pronto quando
Pronto quando: os dois campos chegam ao aparelho no sync e o contrato está em modules/core/contracts.
