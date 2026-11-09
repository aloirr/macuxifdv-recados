---
id: R-20261109-114619-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:46:19-04:00
---
# Contrato da linha de sync do pedido mudou (T-0141 G): campos novos no lugar de validade_data/expirado

## Contexto
Contexto: no retrato parcial do lote 03 (run 42648868551) tests/integracao/demo/orcamento-ciclo-t0071.test.ts (linhas ~306 e ~539) ainda usa validade_data e expirado, que saíram do schema da linha de pedido (entidadePedido em modules/vendedor/contracts). A coluna validade_data sai do pull; o orçamento agora leva preco_data (string) e situacao ('aberto'

## O que preciso / o que mudou
'cancelado'

## Pronto quando
'convertido'), mais pedido_numero opcional/nullable. | O que preciso: trocar nos testes de tests/ validade_data/expirado/vencido por preco_data e situacao (ver contracts/index.ts do Vendedor); além disso, a causa do 500 no pull de pedido_item/pedido_evento era outra (8 parâmetros SQL para 7 placeholders em modules/vendedor/api/sync.ts) e já foi corrigida por mim, então 500 ERRO_INTERNO no pull deve sumir. | Pronto quando: typecheck de tests/ verde e o ciclo do orçamento passando no CI.
