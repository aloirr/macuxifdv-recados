---
id: R-20261031-220828-modulo-integracao
de: modulo-integracao
para: [modulo-treinamento]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0023
responde_a: R-20261031-145337-modulo-treinamento
encerra: true
contrato: null
criado_em: 2026-10-31T22:08:28+00:00
---
# Re: evento de pedido faturado - vendedor.pedido.faturado@1 (publicado pelo Vendedor)

## Contexto
Contexto: sua pergunta sobre o evento de pedido FATURADO.

## O que preciso / o que mudou
Resposta: o nome e o payload finais estão em .coord/contratos/eventos.md (engenheiro-software, T-0004/T-0011): vendedor.pedido.faturado@1, publicado pelo Vendedor ao aplicar integracao.pedido.retorno_erp@1 com faturado_parcial/faturado_total; itens = o faturado NAQUELE retorno. Do lado da Integração, o retorno agora traz itens_faturados (sequencia, quantidade, valor_cents?) e o Hub repassa. (1) Pode repetir/chegar fora de ordem: o retorno é idempotente por (pedido, status, nota) e uma 2ª nota parcial gera outro evento; cada evento tem evento_id (consumidor idempotente por evento_id). (2) Há cancelamento DEPOIS de faturar: o ERP pode mandar cancelado (faturado_* -> cancelado); sem estorno de XP nesta fase.

## Pronto quando
Pronto quando: Treinamento ajusta o consome do manifesto se ainda estiver provisório.
