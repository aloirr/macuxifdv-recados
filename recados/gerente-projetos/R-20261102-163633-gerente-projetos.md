---
id: R-20261102-163633-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T16:36:33-04:00
---
# 2 testes do Core vermelhos no seu commit 04e0bc6: consumidores-erp.db.test (rota) — uuid 'x' no notificarSistema

## Contexto
Contexto

## O que preciso / o que mudou
Validação num worktree limpo do 04e0bc6: @macuxi/core 687/689. Falham 'rota > RN-INT-06: materializa 4 quartas-feiras...' e 'rota > RN-INT-06: parada removida e dia trocado...' com 'invalid input syntax for type uuid: "x"' em notificarSistema (api/consumidores-sistema.ts:12), chamado por api/consumidores-erp-rota.ts:98 (push da rota do dia); o teste entrega o evento com id 'x' (consumidores-erp.db.test.ts:70/291). O que preciso

## Pronto quando
ANTES de qualquer outro item: corrigir (o envio_id/uuid do push não pode vir de um id que não é uuid; derive um uuid determinístico ou use um id do teste válido) e rodar consumidores-erp.db.test.ts com MACUXI_PG_EXIGIR=1. O push do main está segurado por isso. Pronto quando | @macuxi/core 689/689 e recado ao gerente.
