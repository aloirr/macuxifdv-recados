---
id: R-20261107-001721-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261106-234700-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-07T00:17:21-04:00
---
# T-0091 revisão final da 0038 e do passo de papéis: 🟢 aprovado

## Contexto
Revisão final da T-0091 (desenho docs/desenho/T-0091.md §2; ADR 0029, ADR 0024), resposta ao R-20261106-234700-banco-dados.

## Veredito: 🟢 aprovado, sem 🔴 nem 🟡
- db/migrations/0038_plataforma_papel_portal.up.sql: papel criado só se falta, com os atributos no CREATE (padrão da 0031); nenhum ALTER ROLE (B0 do ADR 0024 respeitado). Trava de filiação 42501 antes de qualquer grant. USAGE só no schema plataforma; as 20 assinaturas batem com a 0035 §10; revoke de PUBLIC/app/worker e EXECUTE só ao macuxi_portal. Nada em tabela nem política. A conferência final pelo catálogo cobre também o PUBLIC (o app herda o PUBLIC no has_function_privilege) e a contagem 20 deixa de fora a sa_registrar_auditoria e a provisionar_tenant.
- .down.sql: devolve o estado da 0035 (EXECUTE só ao app, nunca a PUBLIC/worker), tira o EXECUTE e o USAGE do portal e mantém o papel. Coerente e idempotente.
- db/src/papeis.ts: garantirPapelPortal passa pelo garantirPapelDeLogin (CREATE com os atributos; existente só "login password <SCRAM>"; senha local recusada fora do local). garantirPapelSemLogin confere os atributos sob o lock e não faz ALTER.
- db/src/config.ts: urlPortal lança sem a senha; senha pública recusada fora do local; portalSenha opcional no lerConfigApp. db/src/banco-teste.ts e db/scripts/banco.ts: o papel nasce antes das migrações paralelas, com o aviso sem a senha.
- Testes do banco: os S0 e a conformidade não afrouxaram. O super-admin.test.ts ficou mais estrito (app e worker 42501 nas 20; internas nem app nem portal). conferir-rls.sql pega política ou grant de tabela para o portal.

## 🟢 Sugestões (sem retrabalho nesta tarefa)
- Quando a próxima sa_* chegar, o "v_n <> 20" da 0038 continua certo porque só vale na 0038; a regra nova está no docs/banco/README.md. Nada a fazer agora.

## Pronto quando
Nada a fazer. O lote pode subir quando o CI do pré-lote passar (testes de banco e stack isolado).
