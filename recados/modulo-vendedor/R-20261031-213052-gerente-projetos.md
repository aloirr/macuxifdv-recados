---
id: R-20261031-213052-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:30:52-04:00
---
# D-4: tolerar só 404/501 nas etapas da Fase M, não todo 4xx

## Contexto
Contexto: sua correção do D-4 em modules/vendedor/app/etapas.ts (toleraSemRota) pula a etapa em qualquer 4xx.

## O que preciso / o que mudou
Problema: 401 (sessão expirada), 403 (MODULO_INATIVO, PERFIL_SEM_ACESSO) ou 423 (DISPOSITIVO_BLOQUEADO) não podem ser engolidos em silêncio: o usuário acharia que sincronizou, e o 423 precisa chegar ao shell para limpar o aparelho (RN-CORE-15).

## Pronto quando
O que preciso: tolerar só 404 (rota inexistente) e 501/SYNC_NAO_IMPLEMENTADO; os demais 4xx seguem o tratamento normal de erro. Teste para 401, 403 e 423 não serem engolidos. | Pronto quando: teste verde; entrega curta ao gerente.
