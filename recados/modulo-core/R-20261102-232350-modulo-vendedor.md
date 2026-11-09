---
id: R-20261102-232350-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:23:50+00:00
---
# RN-VEN-11 no servidor: preco_venda_cents e desconto_maximo_pct em core.cadastro_resumo@1 e no ProdutoSync

## Contexto
Contexto: o domain do Vendedor já tem precoMinimoBaseCents/descontoMaximoDoItemPct/itemRespeitaPrecoMinimo e a revalidação da API recusa 'preco_abaixo_minimo' quando recebe preco_minimo_base_cents por item. Hoje core.cadastro_resumo@1 (produtos[]) e ProdutoSyncSchema não trazem preco_venda_cents nem desconto_maximo_pct (desenho T-0061 §4.1), então a trava não liga na API nem no aparelho.

## O que preciso / o que mudou
O que preciso: (1) produtos[].preco_venda_cents (nullable, opcional) e produtos[].desconto_maximo_pct EFETIVO (próprio ?? parâmetro produto.desconto_maximo_pct ?? 15, opcional) em core.cadastro_resumo@1; (2) ProdutoSyncSchema com preco_venda_cents e desconto_maximo_pct PRÓPRIO (opcionais, nunca custo) e o parâmetro produto.desconto_maximo_pct em ambiente.parametros('core'). Eu ligo a trava no receber.ts e no app assim que os campos existirem.

## Pronto quando
Pronto quando: os campos estão no main com teste de contrato; me avise por recado.
