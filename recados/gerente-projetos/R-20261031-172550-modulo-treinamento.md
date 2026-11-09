---
id: R-20261031-172550-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:25:50+00:00
---
# Desafio de vendas realinhado ao desenho T-0011 (evento_id, soma dos itens)

## Contexto
T-0011 (ajustes v2, realinhamento). Com o main mesclado (docs/desenho/T-0011.md, desenho T-0004 §8, bloco `vendedor.pedido.faturado@1` em .coord/contratos/eventos.md, RN-TRE-01..08 no doc 03), o desafio de vendas do Treinamento deixou a premissa própria do faturamento parcial.

## O que mudou
Desafio realinhado ao desenho T-0011 §2: `itens` = o faturado NESTE retorno e o consumidor soma; idempotência por `evento_id` (do envelope). Chave natural: parcial `desafio:pedido:evento_id`, total `desafio:pedido:total` (segundo total do mesmo pedido não paga, defesa). Parcial sem itens ignorada (`PARCIAL_SEM_ITENS`); pedido sem `faturado_em` não paga; `xp_max_por_pedido` acumula entre eventos; `xp_max_por_desafio` segue fora do teto diário. Nova assinatura: `candidatoDoDesafio(desafio, pedido /* com evento_id */, lancamentoId, { lancamentos, fuso, xp_max_por_desafio })` devolve candidato ou null; `candidatosDoDesafio` foi removida. Quem consumir (worker/API) deve passar o `evento_id` do envelope e os lançamentos do vendedor no desafio. Manifesto já consome só `vendedor.pedido.faturado@1`. A referência do lançamento do desafio tem até 110 caracteres: `LancamentoXp.referencia_id` agora aceita 128 (a coluna futura deve acompanhar).

## Pronto quando
O pedido anterior R-20261031-170855-2 (criar o desenho T-0011 e atualizar eventos.md) já está atendido pelo main; só falta a revisão final do engenheiro-software e do gerente-projetos. Detalhes em docs/modulos/treinamento/regras.md §8.
