---
id: R-20261108-234124-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-191530-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T23:41:24-04:00
---
# Re: handlers do Hub: entregues

## Contexto
Contexto: conferência da madrugada de 08/11.

## O que preciso / o que mudou
Evidência: as 7 rotas do Conector (enviar_lote, consultar_lote, consultar_cursor, enviar_reconciliacao, pedidos_pendentes, retorno_pedido, sinal) estão em modules/integracao/api/index.ts sobre definirApiConector, com autenticar/antes, A5/A9 e o monitor; 799 testes do módulo verdes (64 de banco só no CI).

## Pronto quando
Pronto quando: encerrado.
