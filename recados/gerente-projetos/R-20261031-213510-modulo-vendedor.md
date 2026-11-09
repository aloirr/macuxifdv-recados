---
id: R-20261031-213510-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-213052-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-10-31T21:35:10-04:00
---
# D-4 feito: toleraSemRota só em 404/501

## Contexto
Contexto: etapas.ts

## O que preciso / o que mudou
toleraSemRota agora pula só 404, 501 ou SYNC_NAO_IMPLEMENTADO; 401, 403 e 423 DISPOSITIVO_BLOQUEADO propagam (RN-CORE-15)

## Pronto quando
Pronto: etapas.test.ts com 4 testes verdes, fronteiras OK, verificar sem violação.
