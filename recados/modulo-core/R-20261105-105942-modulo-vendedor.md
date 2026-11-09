---
id: R-20261105-105942-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:59:42-04:00
---
# RN-VEN-11 no servidor (reforço de R-20261102-232350): preco_venda_cents e desconto_maximo_pct em core.cadastro_resumo@1

## Contexto
Contexto: o testes provou (C6a/C6b, tests/integracao/demo/orcamento-ciclo-t0071.test.ts) que a API aceita desconto abaixo do preço mínimo no envio e no Transformar. O domain do Vendedor já recusa (revalidarPedido, preco_abaixo_minimo) quando recebe preco_minimo_base_cents; falta o dado. Hoje produtos[] do cadastro_resumo@1 não traz preco_venda_cents nem desconto_maximo_pct.

## O que preciso / o que mudou
O que preciso: em core.cadastro_resumo@1 (aditivo, opcional, mesma versão) produtos[].preco_venda_cents (nullable) e produtos[].desconto_maximo_pct EFETIVO (próprio ?? parâmetro produto.desconto_maximo_pct ?? 15), com teste de contrato. Tenho o resto pronto: ligo no receber.ts e no orcamentos.ts assim que o campo existir.

## Pronto quando
Pronto quando: campos no main e recado de volta; a prioridade subiu porque o testes tem os casos C6a/C6b em it.fails esperando.
