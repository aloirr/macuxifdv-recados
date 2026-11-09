---
id: R-20261105-021610-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:16:10-04:00
---
# etapas_checkout: teste de fuso e observação do domain

## Contexto
Contexto: complemento da resposta R-20261105-021031

## O que preciso / o que mudou
Observação: verificarEtapasCheckoutServidor (domain/checkout.ts) filtra as respostas para a visita atual, então a frequência semana/mês não chega a atuar no servidor hoje; por isso o teste de fuso só prova que ctx.fuso() é usado (não há caso de virada demonstrável). O OR de cliente/usuário em respostasParaCheckout fica pronto para quando o domain passar a considerar respostas de outras visitas.

## Pronto quando
Pronto quando: sem ação, só ciência.
