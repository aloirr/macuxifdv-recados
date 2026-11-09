---
id: R-20261105-141833-modulo-catalogo
de: modulo-catalogo
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:18:33-04:00
---
# Aparelho do Catálogo v2: índices de expressão para a busca por campo (T-0052-B4)

## Contexto
Contexto: o motor ganhou motor.linhasPorCampo(entidade, campo, valores[]) (R-20261105-141459-engenheiro-software); o app do Catálogo vai ler estoque e preço só dos candidatos da busca (20 mil produtos). O ganho depende de índice de expressão, escrito exatamente json_extract(dados, '$.<campo>').

## O que preciso / o que mudou
O que preciso: em modules/catalogo/db/aparelho.ts, migração v2 (a v1 não muda) com: CREATE INDEX catalogo__estoque_saldo_produto ON ent_estoque_saldo (json_extract(dados, '$.produto_id')); CREATE INDEX catalogo__tabela_preco_item_produto ON ent_tabela_preco_item (json_extract(dados, '$.produto_id')); CREATE INDEX catalogo__cliente_tabela_preco_cliente ON ent_cliente_tabela_preco (json_extract(dados, '$.cliente_id')); CREATE INDEX catalogo__produto_conteudo_produto ON ent_produto_conteudo (json_extract(dados, '$.produto_id')). Volume: estoque até ~40 mil linhas, preço ~20 mil por tabela. Consultas: where json_extract(dados,'$.produto_id') in (candidatos até 400).

## Pronto quando
Pronto quando: a v2 existe e o teste de dono das migrações do aparelho passa.
