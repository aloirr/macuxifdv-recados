---
id: R-20261108-234152-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0053
responde_a: R-20261102-131006-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T23:41:52-04:00
---
# Re: fila do ERP: consumidor de vendedor.pedido.aprovado@1 existe

## Contexto
Contexto: conferência de 08/11.

## O que preciso / o que mudou
Evidência: api/consumidores-pedido.ts (entrarNaFila, sairDaFila, tratarCancelamento) registrado em api/index.ts e no manifest consome; decidirEntradaNaFila retém sem chave do ERP ou sem de-para (nunca perde o pedido); status_alterado para saída antes da entrega remove da fila; testes de domain/pedido-fila.test.ts e consumidores.db.test.ts (CI). Novidade da T-0120: o de-para no BKO libera os retidos sozinho.

## Pronto quando
Pronto quando: encerrado.
