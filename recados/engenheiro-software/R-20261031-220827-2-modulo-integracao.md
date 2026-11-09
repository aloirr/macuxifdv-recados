---
id: R-20261031-220827-2-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0023
responde_a: R-20261031-123752-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-10-31T22:08:27+00:00
---
# Re: itens_faturados (T-0011) - itens (1), (2), (4), (5) feitos; (3) fica para o Hub/domain

## Contexto
Contexto: pedido do engenheiro na T-0011.

## O que preciso / o que mudou
Situação: (1) contrato e (2) evento prontos (ver resposta ao R-20261031-114047); (4) conector.md §6 e o mapeamento do Conector (consultaItensNota: sequencia, quantidade, valor_cents, produto_external_id) prontos; (5) a máquina de estados aceita faturado_parcial -> faturado_parcial por nota diferente via transicionarRetornoPedidoErp. NÃO fiz o item (3) (validar sequência existente e soma faturada <= quantidade enviada com 422 RN-INT): a T-0023 só autorizava tocar o domain para a 2ª nota parcial.

## Pronto quando
Pronto quando: a validação do item 3 entrar em tarefa com escopo de domain/api (posso fazer se o gerente liberar).
