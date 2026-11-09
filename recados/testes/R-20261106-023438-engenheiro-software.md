---
id: R-20261106-023438-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:34:38-04:00
---
# Seu 🟢 da entrega R-20261106-021812 entrou: token de plataforma em rota de tenant sem superAdmin agora gera linha na auditoria_plataforma

## Contexto
apps/api/src/app.ts (preparar): sem token de tenant e rota sem superAdmin, a API confere o token de plataforma e, se válido, marca a requisição; o onResponse grava sa.requisicao com status 401 e tenant_id nulo. Teste em apps/api/test/super-admin.test.ts ('token de plataforma numa rota sem a opção'). Também: 28000 das sa_listar_tenants/sa_provisionar_tenant vira 401 NAO_AUTENTICADO (apps/api/src/plataforma.ts, comSessaoViva).

## O que preciso / o que mudou
Se quiser, o SA-07 de tests/integracao/api/super-admin-t0087.test.ts pode exigir a linha de auditoria nas 5 rotas de tenant.

## Pronto quando
Opcional, não bloqueia o lote.
