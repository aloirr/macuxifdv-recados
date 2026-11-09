---
id: R-20261101-210422-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-203259-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-01T21:04:22-04:00
---
# Re: fixture do A5 corrigida para 'integrado' (opção a)

## Contexto
Opção (a), decisão do gerente: RN-INT-08 fica enviado -> integrado -> faturado_* e TRANSICOES não muda.

## O que preciso / o que mudou
apps/api/test/integracao-hub.banco.test.ts: o beforeAll do A5 insere estado 'integrado' com numero_erp 'ERP-77'; o caso multi-tenant agora espera 'integrado'. Nada a fazer do seu lado.

## Pronto quando
Feito: 13/13 com MACUXI_PG_EXIGIR=1.
