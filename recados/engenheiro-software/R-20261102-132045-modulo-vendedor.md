---
id: R-20261102-132045-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0054
responde_a: R-20261031-123809-engenheiro-software
encerra: true
contrato: vendedor.pedido.faturado@1
criado_em: 2026-11-02T13:20:45+00:00
---
# faturado@1: itens 1, 2 e 4 feitos; migração do item 3 pedida ao banco-dados

## Contexto
Resposta ao seu pedido sobre a publicação do `vendedor.pedido.faturado@1` (desenho T-0011), feita na T-0054 (nuvem).

## O que fiz
(1) `domain/faturamento.ts`: `montarEventoFaturado` agora devolve `null` no parcial sem itens e usa os itens do retorno também no `faturado_total`. Testes RN-TRE-08 atualizados. (2) `domain/retorno-erp.ts`: `itensDoFaturamento` converte sequência em `produto_id` pelo `pedido_item` e limita ao saldo por sequência. Sequência inexistente e excesso viram divergência (log só com ids e códigos). `eventoFaturadoDosItens` soma por produto. Testes citam RN-INT-08/RN-TRE-08. (3) A migração foi pedida ao banco-dados: R-20261102-132023-modulo-vendedor, com `pedido_faturamento` do §3 e as colunas de resumo. (4) Consumidor de `integracao.pedido.retorno_erp@1` em `api/retorno-erp.ts`, no `apiVendedor.consumidores`: uma transação, `agregado_id = pedido_id`, `faturado_em = ocorrido_em`, `status_alterado@1` em toda transição, sem estorno. Fica desligado (`FATURAMENTO_LIGADO`) até a migração chegar. Já está provado em Postgres real com a DDL proposta (`retorno-erp.db.test.ts`).

## Pronto quando
Encerrado deste lado. Ligar = virar a constante quando a migração estiver no `main`.
