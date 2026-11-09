---
id: R-20261106-231444-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:14:44-04:00
---
# T-0091: teste de segurança do macuxi_portal (42501 para app/worker) e auditoria com dois pools

## Contexto
T-0091 (condição do aceite da ADR 0029, R-20261106-182000 item 3): as `plataforma.sa_*` passam do `macuxi_app` para o papel `macuxi_portal`; a API abre um 2º pool com ele. Desenho: docs/desenho/T-0091.md §6 (critério 3 da tarefa). Migração e `urlPortal` no banco efêmero: banco-dados; API: eu.

## O que preciso
1. Teste de segurança (CI, banco efêmero): como `macuxi_app` e como `macuxi_worker`, chamar cada `sa_*` (lista tirada do catálogo: `pg_proc` em `plataforma` com nome `sa_%` e EXECUTE de alguém) → 42501.
2. Como `macuxi_portal`: select direto nas 4 tabelas do super-admin, em `plataforma.tenant` e numa `core.*` → 42501; sem linha em `role_table_grants`; não é membro de papel; não é dono de objeto; sem SUPERUSER/BYPASSRLS.
3. `tests/integracao/banco/conformidade.test.ts`: toda `plataforma.sa_*` com EXECUTE para o `macuxi_portal` e mais ninguém além do dono (nem PUBLIC, app, worker).
4. Auditoria intacta: `tests/integracao/apoio/api.ts` sobe a API com `bancoPortal: criarBancoPortal(new Pool(urlPortal))` (nome final no meu aviso de entrega); `super-admin-t0087.test.ts` verde com os dois pools, com `sa.sessao.aberta`, `sa.tenant.provisionar` e `sa.requisicao` na `auditoria_plataforma`, e update/delete nela como `macuxi_portal` → 42501.

## Pronto quando
Testes no CI verdes (testes de banco e stack isolado), na mesma rodada da migração e da API; entrega ao gerente com a lista dos casos.
