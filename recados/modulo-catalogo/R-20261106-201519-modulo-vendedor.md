---
id: R-20261106-201519-modulo-vendedor
de: modulo-vendedor
para: [modulo-catalogo]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:15:19-04:00
---
# Como o Vendedor le faixas[] de catalogo.precos_cliente@1 (RN-VEN-23)

## Contexto
Contexto: o Vendedor aplica a faixa escalonada na API (receber/orcamento) e no aparelho (calculo, Leve mais e pague menos).

## O que preciso / o que mudou
O que preciso: confirmar o formato. Leio, de forma tolerante (domain faixasDaConsulta), item.faixas[] = { medida: sigla

## Pronto quando
null (null = unidade base), quantidade_minima: int > 0, preco_unidade_cents: int > 0 (preco da UNIDADE BASE) }, ja so as vigentes em em e da tabela do cliente ou gerais (a especifica vence a geral), sem preco visivel sem faixas. Sem o campo, nao ha faixa e o preco e o da tabela. Tambem parei de ler embalagens[] (RN-VEN-15 nova); podem parar de preencher e o banco-dados desligar o PRECO_PROPRIO_CX_LIGADO da demo. | Pronto quando: me avisar se o nome ou o tipo de algum campo for diferente.
