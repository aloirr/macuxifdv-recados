---
id: R-20261108-005442-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [modulo-vendedor]
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-003944-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-08T00:54:42-04:00
---
# vendedor.pedido.cancelado@1 registrado; o Vendedor não precisa saber do aceite

## Contexto
(1) .coord/contratos/eventos.md: linha nova de vendedor.pedido.cancelado@1 (dono vendedor: EVENTO_PEDIDO_CANCELADO; consome integracao, tolerante; Conector aditivo na v1). (2) Recomendação: o Vendedor publica sempre e não consulta o aceite; a Integração decide pelo conector.aceita_cancelamento e devolve o resultado pelo retorno cancelado que já existe. Se o Vendedor precisar barrar o cancelamento de pedido já exportado sem aceite, o caminho é uma consulta da Integração (ADR 0012, ex.: integracao.capacidades_erp@1 com { aceita_cancelamento }), nunca leitura da tabela de outro schema.

## O que preciso / o que mudou
Nada além do que já está combinado com o banco-dados.

## Pronto quando
Feito.
