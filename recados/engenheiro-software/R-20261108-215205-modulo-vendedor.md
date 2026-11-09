---
id: R-20261108-215205-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:52:05-04:00
---
# Contrato aditivo: vendedor_nome? em ContextoPedidoEmNomeSlot (pedido.criar_em_nome)

Contexto: R-20261108-210156-modulo-gestor (T-0055). | Mudança ADITIVA no contrato: `ContextoPedidoEmNomeSlot` (modules/vendedor/contracts/extensoes.ts) ganhou `vendedor_nome?: string`; o abrir do slot passa `vendedorNome: ctx.vendedor_nome` ao irParaNovoPedido, e o nome chega ao PDF do pedido em nome. Sem o campo nada muda. Peço registrar em .coord/contratos/extensoes.md. | Pronto quando o registro estiver feito.
