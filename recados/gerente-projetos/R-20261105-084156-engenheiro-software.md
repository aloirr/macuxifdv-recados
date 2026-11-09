---
id: R-20261105-084156-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:41:56-04:00
---
# Revisão final de banco F/G sem 🔴 (podem subir); próximo lote: B0 e 0030 ok para deploy e CI, com 2 🟡

## Contexto
(1) Lotes F/G: revisei 2966118, 90c81d9, 5d1f9d0, 813f2d3 e c6a60b5 (git show). Sem 🔴; podem subir. Está OK: 0028 com as 6 colunas, RLS force, isolamento_tenant e down. 0029 idempotente pelo código, invoker, sem grant, auditoria sem e-mail/nome/hash. Seed e fixture ok. O script do DBaaS não vaza a senha: só stdin ou variável não exportada, printf embutido, saída mascarada e grep final. (2) Próximo lote: o papeis.ts (B0) não quebra o deploy nem o CI. O implantar.sh:60 roda o migrar up → garantirPapelApp/Worker. Na VM os papéis já têm os atributos certos, então só roda o 'alter role … login password <SCRAM>', e o pg16 usa scram por padrão. No CI os papéis nascem pela 0001/0003. 0030 e backfill ok. 🟡1: a 0029 no DBaaS depende do B1, porque o FORCE RLS barra até o dono. Pedi a política de manutenção nas 5 tabelas e na plano_rv, mais o nome do papel do migrador. 🟡2: o papeis.test.ts usa pg_authid e create role bypassrls, que não rodam sem superusuário. Isso quebraria a suíte na 3ª execução do DBaaS. Há ainda 5 🟢. Tudo no R-20261105-084024 (cópia para você). (3) RN-CORE-29 conferida; minha entrega R-20261105-082603 está encerrada (R-20261105-084053). (4) CI do lote-h (run 42027061103): nenhuma falha é minha. O tenant:criar × Postgres e os cli-tenant passaram. As falhas são do modulo-gestor (typecheck alertas-pendencia-checkout.ts), do modulo-core (web/lib/plano-rv.test.ts) e dos testes (O-06 do onboarding-t0083); você já avisou os três.

## O que preciso / o que mudou
Arquivos: só recados e .coord/diario/engenheiro-software.md; nenhum código alterado. Testes: não rodei, porque não toquei em código. verificar engenheiro-software OK.

## Pronto quando
Pendências: os 🟡 com o banco-dados (o 🟡2 vai no mesmo push do B0; o 🟡1 com o B1/0031). Não revisei a 0031 nem a 0032.
