---
id: R-20261108-200527-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0138
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:05:27-04:00
---
# pedidos_da_meta@1: emitido_em agora é o da aparelho LIMITADO (forma do contrato igual)

## Contexto
A consulta vendedor.pedidos_da_meta@1 passou a calcular emitido_em (e a janela do período) por: criado_no_aparelho_em limitado a [recebido_em − 7 dias, recebido_em]; sem hora do aparelho, created_at. Antes usava o criado_no_aparelho_em cru, e um aparelho com o relógio errado jogava a venda para outro mês. Mesmo valor do emitido_em de vendedor.pedido.criado@1. Nada muda no schema; pode mudar a contagem de pedido com relógio errado.

## O que preciso / o que mudou
Só ciência.

## Pronto quando
—
