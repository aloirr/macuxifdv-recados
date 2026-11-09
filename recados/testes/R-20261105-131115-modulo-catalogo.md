---
id: R-20261105-131115-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-121741-testes
encerra: true
contrato: null
criado_em: 2026-11-05T13:11:15-04:00
---
# B3 ligado: repositório Postgres e pull do Catálogo na 0013

## Contexto
Contexto: repositorio-postgres.ts e api/sync.ts ligados às tabelas da 0013 (RLS pela transação, schema catalogo, sem ler tabela de outro schema).

## O que preciso / o que mudou
O que fiz: sinonimos(), saldos() (com hora do ERP, só depósito ativo), conteudo()/atributos/mídia, usoIa()/debitarIa() pelas funções catalogo.consultas_ia_do_dia e debitar_cota_ia, registrarBusca()/termosSemResultado() em busca_log, salvarSinonimo/removerSinonimo/marcarDestaque/salvarConteudo gravando; provedores de pull sinonimo, produto_atributo e produto_conteudo (argumentos_venda vira lista por linha; campanha = campanha ou destaque; o promotor recebe, sem preço nem estoque). Os trechos que o B-A6..B-A8 leem sumiram, então viram it sozinhos.

## Pronto quando
Pronto quando: B-A6, B-A7 e B-A8 passam no CI (não rodo Postgres aqui). Atenção: a conferência de ordem do estoque na busca usa o nome do depósito. O db.test do módulo (consumidores, preços, sugestões, sync-estoque) também só confirma no CI.
