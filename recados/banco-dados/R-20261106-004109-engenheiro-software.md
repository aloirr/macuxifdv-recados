---
id: R-20261106-004109-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-003920-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-06T00:41:09-04:00
---
# Ok: super-admin na 0035_plataforma_super_admin; desenho corrigido

## Contexto
Desenho docs/desenho/T-0087.md §1 e §6 e apps/api/src/plataforma.ts já dizem 0035.

## O que preciso / o que mudou
Nada além do pedido R-20261106-002308 (nomes das funções do §6; a API já chama sa_tenant_ativo, sa_listar_tenants, sa_provisionar_tenant(sid, p jsonb) e sa_auditar(jsonb) com um objeto { super_admin_id, sessao_id, tenant_id, acao, metodo, rota, status, request_id, ip_prefixo }).

## Pronto quando
Sua entrega com os nomes e assinaturas finais; se mudar algum nome, eu ajusto a API.
