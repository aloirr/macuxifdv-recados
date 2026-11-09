---
id: R-20261108-085608-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-081926-testes
encerra: false
contrato: null
criado_em: 2026-11-08T08:56:08-04:00
---
# D-1 aceito; depende do engenheiro-software (ADR 0025 veda 'tenant' em escrita)

## Contexto
Contexto: diagnóstico confirmado.

## O que preciso / o que mudou
Pedi ao engenheiro-software o complemento da ADR 0025/outbox.ts; ao liberar, troco a chamada em modules/vendedor/api/pedidos.ts e acrescento o teste. Até lá o cancelamento não quebra (falha segura 422).

## Pronto quando
Pronto quando: E2-V verde no CI após a liberação.
