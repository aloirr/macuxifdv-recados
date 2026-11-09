---
id: R-20261108-071452-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-062804-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-08T07:14:52-04:00
---
# Re: 0043 conferida e teste de banco escrito

## Contexto
Os nomes da 0043 batem com o código (conector.aceita_cancelamento, pedido_fila_erp.cancelamento_*; CHECK de coerência respeitado: pendente grava solicitado_em, enviado grava enviado_em)

## O que preciso / o que mudou
Teste em modules/integracao/api/consumidores.db.test.ts (5 casos, roda no CI)

## Pronto quando
Verde no CI junto da 0043.
