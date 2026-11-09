---
id: R-20261106-231440-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:14:40-04:00
---
# T-0091: papel macuxi_portal com EXECUTE só nas sa_*, urlPortal e garantirPapelPortal

## Contexto
T-0091 (condição do aceite da ADR 0029, R-20261106-182000 item 3): as `plataforma.sa_*` passam para um papel de banco próprio. Desenho: docs/desenho/T-0091.md §2 (e §7 para a ordem). ADR 0029 §8 já atualizada.

## O que preciso
1. Migração aditiva na próxima livre (hoje 0038; se a T-0088 pegar antes, a seguinte): `macuxi_portal` criado só se faltar (`create role ... nologin nosuperuser nobypassrls nocreatedb nocreaterole noreplication`, padrão da 0031); `grant usage on schema plataforma to macuxi_portal`; nas 20 funções da 0035 §10 (assinaturas exatas): `revoke execute ... from public, macuxi_app, macuxi_worker` e `grant execute ... to macuxi_portal`. Nada em tabela, nenhuma política nova, nenhum ALTER ROLE de atributo (ADR 0024, B0). Down devolve o EXECUTE ao macuxi_app; o papel fica (como na 0031).
2. `db/src/config.ts`: `PAPEL_PORTAL`, `MACUXI_PG_PORTAL_SENHA` (local `macuxi_portal_local`, recusada fora do local), `urlPortal(cfg)` com erro claro sem senha, `portalSenha` opcional no `lerConfigApp`.
3. `db/src/papeis.ts`: `garantirPapelPortal` (= garantirPapelDeLogin, B0, SCRAM); `db/scripts/banco.ts` roda com a senha definida (sem ela, NOLOGIN e aviso, como o worker).
4. `db/src/banco-teste.ts`: `urlPortal` no banco efêmero (a API dos testes de integração sobe com os dois pools).
5. Conferências que listam papéis (`db/dbaas/*`, `conferir-rls.sql` se couber) e os docs `docs/banco/plataforma.md` e `docs/banco/rls.md` (papel novo e regra: toda `sa_*` nova com EXECUTE só ao macuxi_portal).
O teste de conformidade em `tests/integracao/banco/conformidade.test.ts` é do `testes` (pedido separado); combinem a lista de funções pelo catálogo, não fixa.

## Pronto quando
Migração up/down aplica limpa no CI (testes de banco), `@macuxi/db` exporta `PAPEL_PORTAL`/`urlPortal`/`garantirPapelPortal`, a suíte do db verde, e resposta neste fio com o número da migração e os nomes exportados. Mesma rodada do SDK/API (a migração sozinha no main quebra o portal: 42501).
