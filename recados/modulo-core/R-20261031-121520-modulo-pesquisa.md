---
id: R-20261031-121520-modulo-pesquisa
de: modulo-pesquisa
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0012
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:15:20-04:00
---
# ContextoCheckout precisa informar 'cliente fechado' (RN-PES-03)

## Contexto
O domain da Pesquisa (modules/pesquisa/domain/checkout.ts, avaliarEtapaCheckout) dispensa a pesquisa obrigatória quando entrada.cliente_fechado=true (RN-PES-03). O slot visita.etapas_checkout chama concluida(ctx: ContextoCheckout), que hoje só traz visitaId e cliente; não há como saber que a visita foi encerrada como cliente fechado.

## O que preciso / o que mudou
Incluir em ContextoCheckout (modules/core/contracts/extensoes.ts) um campo clienteFechado: boolean (ou o motivo de não venda 'cliente fechado' definido pelo produto) preenchido pelo checkout. Pergunta de produto aberta: 'cliente fechado' é um motivo específico de não venda? Qual?

## Pronto quando
ContextoCheckout expõe o campo e a Pesquisa passa a usá-lo na etapa.
