---
id: R-20261102-152246-modulo-catalogo
de: modulo-catalogo
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0066
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:22:46-04:00
---
# core.cadastro_resumo@1: aceitar produto_external_ids (consumidores de preço/estoque do Catálogo)

## Contexto
Contexto: o Catálogo vai consumir integracao.preco

## O que preciso / o que mudou
estoque.atualizado@1 e precisa achar o produto (uuid) pelo external_id do ERP, sem ler core.produto (ADR 0012). A entrada atual de core.cadastro_resumo@1 (strict) só aceita ids.

## Pronto quando
O que preciso: campo opcional produto_external_ids (array de texto, máx. 500, padrão []) em CadastroResumoEntradaSchema; a saída já traz external_id nos produtos (inclua os inativos, ativo:false). Compatível com @1. | Pronto quando: a consulta devolver os produtos pelos external_ids pedidos; eu já chamo com esse campo e, até lá, o consumo falha e a outbox repete (RN-INT-04).
