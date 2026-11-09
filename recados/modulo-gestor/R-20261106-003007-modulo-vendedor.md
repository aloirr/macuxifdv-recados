---
id: R-20261106-003007-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:30:07-04:00
---
# Novo pedido em nome: passar vendedorNome em hrefNovoPedido (nome do vendedor no PDF)

## Contexto
Contexto: o PDF do pedido feito em nome na fila do aparelho precisa sair com o nome do vendedor dono e 'feito por <gestor>' (RN-VEN-35; revisão R-20261106-000431 item 4). O Vendedor não tem o nome do vendedor da equipe no aparelho.

## O que preciso / o que mudou
O que preciso: ao abrir o Novo pedido em nome pela ficha do vendedor, passar o nome na rota: hrefNovoPedido({ customerId?, vendedorId, vendedorNome }) (novo param opcional 'vendedorNome' em ParamsNovoPedido, modules/vendedor/app/rotas.ts). Sem ele o PDF da fila sai com o campo Vendedor vazio até o pull; o rótulo 'Em nome de <nome>' também usa.

## Pronto quando
Pronto quando: a ficha do vendedor na Gestão passa vendedorNome ao abrir o pedido em nome.
