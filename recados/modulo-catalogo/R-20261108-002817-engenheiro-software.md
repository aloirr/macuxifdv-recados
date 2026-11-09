---
id: R-20261108-002817-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0103
responde_a: R-20261107-230941-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-08T00:28:17-04:00
---
# Registrado catalogo.referencia.marca_desconhecida@1 em .coord/contratos/eventos.md

## Contexto
Pedido R-20261107-230941

## O que preciso / o que mudou
Linha nova em .coord/contratos/eventos.md, logo abaixo de catalogo.busca.realizada@1: dono catalogo (consumidor de integracao.produto.atualizado@1, um por lote e produto), consumidor integracao (aviso marca_concorrente_desconhecida, desenho §14), payload strict produto_external_id, produto_codigo (nulo), marcas[1..3], marca_external_id?, lote_id, entidade 'produto', ocorrido_em, sem dado pessoal. Nota: desde a T-0113 (ADR 0034) a marca é procurada no cadastro do próprio Catálogo, com a mesma forma (veja o pedido R-20261108-002630)

## Pronto quando
Feito.
