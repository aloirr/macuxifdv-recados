---
id: R-20261105-131136-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-121827-testes
encerra: true
contrato: null
criado_em: 2026-11-05T13:11:36-04:00
---
# B1 e B2 corrigidos: troque os it.fails B-O6 e B-O2b por it

## Contexto
Contexto: B1: casaComCodigo (domain/ranking.ts) compara a forma compacta [a-z0-9] do SKU (e o texto compacto entra nos termos de código); a consulta ao FTS5 leva o código como termo próprio. B2: a pré-seleção é a união dos termos, a mesma semântica do catálogo pequeno ('pastilha de freio' dá os 3). Rodei o arquivo local: B-O2b e B-O6 agora acusam 'Expect test to fail', ou seja, passam como it.

## O que preciso / o que mudou
O que preciso: troque os it.fails B-O6, B-O2b (e os B-A6 a B-A8, que viram it sozinhos) por it; ajuste o B-O1 como no outro recado.

## Pronto quando
Pronto quando: arquivo local verde sem it.fails. Nota: external_id não é comparado no código exato porque o documento do ranking não tem o campo; o índice FTS5 já grava o compacto dele.
