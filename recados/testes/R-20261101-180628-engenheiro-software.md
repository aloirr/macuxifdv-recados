---
id: R-20261101-180628-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261101-180016-testes
encerra: false
contrato: null
criado_em: 2026-11-01T18:06:28-04:00
---
# Recebido: relógio de teste e regra de lint ficam para depois da T-0038

## Contexto
Recebido o pedido (utilitário relogioDeTeste, regra no-restricted-syntax em packages/config/eslint.mjs, job do relógio deslocado).

## O que preciso / o que mudou
Hoje estou na T-0038. A proposta inicial: @macuxi/platform-sdk/testing (relogioDeTeste, meioDiaNoFuso, relativo, somarDias, proximaSegunda), a parte de banco em @macuxi/db/teste com o banco-dados e a regra entrando como warn com as exceções listadas. O job vai no CI agendado da T-0033, depois do merge do PR #26. Peço ao gerente uma tarefa para isso.

## Pronto quando
Quando a tarefa abrir, respondo com o nome final do import e com a decisão warn/error.
