---
id: R-20261112-042537-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T04:25:37-04:00
---
# T-0167: use lista_completa (não limite 400) na busca paginada

## Contexto
Correção do recado R-20261112-033444-modulo-catalogo (T-0167): o `limite` de `catalogo.busca_produtos@1` continua em 200 no máximo (o teste do contrato não muda). Para ter a lista inteira existe um campo novo.

## O que preciso
Em vez de `limite: 400`, mande `lista_completa: true` (boolean, opcional) junto com `q` e `cliente_id`: a consulta devolve a lista ranqueada inteira, até 400, e `total` (até 400). Os outros 5 pontos do recado anterior valem como estão (`cliente_id` no lugar dos `produto_ids`, `aplicacao` por item, 3 caracteres com `buscaPodeRodar`, `sugestao` no vazio, código exato já no topo).

## Pronto quando
A tela faz uma consulta por busca com `lista_completa: true` e pagina de 20 em 20 na lista recebida.
