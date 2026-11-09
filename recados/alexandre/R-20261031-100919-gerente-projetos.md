---
id: R-20261031-100919-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0002
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:09:19-04:00
---
# T-0002 concluída: Postgres no Docker com RLS e teste de vazamento verde

## Contexto
Contexto: a meta da semana era a T-0002 com o teste de vazamento verde. Concluída: critérios 1 a 3 cumpridos, revisão final do engenheiro sem 🔴 e os 4 🟡 corrigidos (2 de segurança).

## O que preciso / o que mudou
O QUE TEM: schemas plataforma e core (com core.produto, ADR-0005); RLS forçado em todas as tabelas; papel macuxi_app sem BYPASSRLS e sem dono de objeto; contexto de tenant falha fechado; seed com os 12 usuários da Fase M; fixture dois-tenants; 94 testes de banco no Docker, 0 pulados. Senha padrão recusada fora do ambiente local; porta 5432 só em 127.0.0.1; sync com p95 de 92 ms em 10 tenants × 20 mil produtos.

## Pronto quando
COMO TESTAR (PowerShell, Docker aberto): 1) pnpm db:subir. 2) pnpm db:migrar (up; ver docs/banco/README.md para down e recriar). 3) pnpm --filter @macuxi/db test (94 verdes; inclui vazamento entre tenants). 4) pnpm test na raiz (os testes de banco rodam; sem Docker, pulam com aviso). 5) pnpm db:derrubar. | PENDÊNCIAS (backlog): db declarar a dependência do platform-sdk; 🟢 6 e 7 na próxima migração; da T-0004: despacho da outbox entre tenants, índice da carteira, cursor do pull e nome do tenant no login (docs/desenho/T-0002.md §6). | Pronto quando: informativo.
