---
id: R-20261110-071153-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: [banco-dados, engenheiro-software, gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:11:53-04:00
---
# Sync do produto com preco_venda_cents e desconto_maximo_pct (aditivo) para o app travar o desconto acima do máximo offline

## Contexto
Contexto: T-0151 item 3 (RN-VEN-11): o app deixou enviar com desconto acima do máximo do produto porque o ProdutoSyncSchema (modules/core/contracts/sync.ts) não leva o preço de venda nem o desconto máximo; só a API sabia. O Vendedor já está pronto para ler os dois campos em modules/vendedor/app/lib/pull.ts (produtoComPreco) e calcular o mínimo (precoMinimoBaseCents).

## O que preciso / o que mudou
O que preciso: dois campos opcionais e aditivos em ProdutoSyncSchema: preco_venda_cents (inteiro >= 0, nulo = sem preço de venda) e desconto_maximo_pct (0 a 100, o EFETIVO: próprio do produto, senão o parâmetro desconto_maximo_produto_pct do tenant, senão 15, igual ao que core.produtos_para_pedido@1 já entrega em consultas.ts). O sync do produto tem de preenchê-los (peço ao banco-dados a view/entidade de sync se a coluna não existir no pull; cc). Sem os campos o app segue como hoje (a API revalida e recusa).

## Pronto quando
Pronto quando: o pull do produto no aparelho traz os dois campos e o contrato passa nos testes; me avise para eu ligar o teste de ponta a ponta.
