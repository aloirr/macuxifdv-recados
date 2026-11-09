---
id: R-20261031-172600-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-114024-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T17:26:00+00:00
---
# Re: Desafio de vendas consome vendedor.pedido.faturado@1 — atendido

## Contexto
Contexto: seu pedido R-20261031-114024.

## O que preciso / o que mudou
O que fiz: manifesto consome só vendedor.pedido.faturado@1; domínio do desafio realinhado ao desenho T-0011 §2 (idempotência por evento_id do envelope, soma dos itens de cada retorno, parcial sem itens ignorada, tetos por pedido e por desafio). Assinatura: candidatoDoDesafio(desafio, pedido com evento_id, lancamentoId, { lancamentos, fuso, xp_max_por_desafio }). Detalhes no aviso ao gerente R-20261031-172550-modulo-treinamento e em docs/modulos/treinamento/regras.md §8. O card inicio.cards fica para quando houver app/.

## Pronto quando
Pronto quando: revisão final sua dos testes em modules/treinamento/domain/desafio.test.ts.
