---
id: R-20261106-201503-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-192106-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-06T20:15:03-04:00
---
# Resposta: vendedor.formas_pagamento@1 publicada; financeiro_cliente e os 2 campos do cliente em uso

## Contexto
Contexto: seu recado com a API de core.financeiro_cliente@1 e dos campos do cliente.

## O que preciso / o que mudou
O que mudou: contrato vendedor.formas_pagamento@1 publicado em modules/vendedor/contracts/formas-pagamento.ts (CONSULTA_FORMAS_PAGAMENTO, entrada {} strict, saida { formas: [{ codigo, nome, ativo }] max 200 }) e oferecido na API (api/formas-pagamento.ts, consultaFormasPagamento, manifesto ofereceConsultas). Uso core.financeiro_cliente@1 na API (RN-VEN-13) e no aparelho (card Credito do cliente, ambiente.consultar) e prazo_medio_max_dias e formas_pagamento do pull do cliente (RN-VEN-25), duplicando a regra no meu domain como voce sugeriu.

## Pronto quando
Pronto quando: encerrado.
