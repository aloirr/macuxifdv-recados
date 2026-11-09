---
id: R-20261031-094047-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0002
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:40:47-04:00
---
# Revisão final T-0002: sem 🔴; 4 🟡 (defaults fora do local, porta do compose, deriva de perfis, docs da outbox) e 5 🟢

## Contexto
Revisão final da T-0002 (engenheiro-software). Revisado: db/migrations 0001_plataforma e 0002_core (up/down), db/src (config, contexto, papeis, migrador, excecoes, banco-teste), db/scripts, seeds/fixtures, db/testes, db/docker-compose.yml, db/esquema/plataforma.ts, modules/core/db/nuvem.ts, drizzle.config.ts, docs/banco/. Rodado agora no macuxi-postgres: `pnpm --filter @macuxi/db test` 74/74 verdes (0 pulados), lint e typecheck do @macuxi/db verdes. Migrações sem edição desde 1672e82.

Conferido e OK: campos comuns + `enable`/`force row level security` + política `isolamento_tenant` em todas as 12 tabelas (exceções declaradas em db/src/excecoes.ts); `macuxi_app` NOSUPERUSER/NOBYPASSRLS e não dono (S0-028); falha fechada (sem contexto, vazio, inexistente = 0 linhas; não-UUID = 22P02; contexto por transação, pool A/B/A); todos os índices únicos incluem `tenant_id` (sem oráculo de existência entre tenants); FKs compostas impedem referência cruzada; `core.produto` exatamente nos campos da ADR-0005; perfis = PERFIS do platform-sdk (manager->gerente só no mapeamento do seed); nenhum schema de módulo lê tabela alheia; down simétrico (S0-020/021 comparam o catálogo inteiro); checksum aborta up de migração editada; vazamento descobre as tabelas dinamicamente; CI com service pgvector/pgvector:pg16 e MACUXI_PG_EXIGIR=1 (turbo repassa MACUXI_PG_*). Nenhuma credencial real versionada (só .env.example; .env no .gitignore); logs dos scripts sem dado pessoal.

## O que preciso / o que mudou
🔴 Nenhum.

🟡 1 — Padrões locais aplicados em silêncio fora do local. db/src/config.ts:145-148 usa postgres/postgres e `macuxi_app_local` quando falta variável, e db/src/papeis.ts:31 faz `ALTER ROLE macuxi_app ... PASSWORD` com esse valor: rodar `banco papeis`/`migrar` contra um Postgres não local sem MACUXI_PG_APP_SENHA troca a senha do papel da API por uma senha pública. Idem db/seeds/fase-m/fase-m.ts:200 (`demo-macuxi`). Pedido: se `host` não for local (localhost/127.0.0.1/::1, mesma lista do global-setup) e faltar MACUXI_PG_ADMIN_SENHA ou MACUXI_PG_APP_SENHA, `lerConfig` lança erro; `seed fase-m` recusa host não local. Teste estático cobrindo os dois casos.

🟡 2 — db/docker-compose.yml:26 publica a 5432 em todas as interfaces com superusuário postgres/postgres. Trocar por `"127.0.0.1:${MACUXI_PG_PORTA:-5432}:5432"` (o CI usa service container próprio, não é afetado).

🟡 3 — Lista de perfis duplicada sem teste de deriva: CHECK em 0001_plataforma.up.sql:120 e 0002_core.up.sql:67, `PERFIS` em db/esquema/plataforma.ts:50 e modules/core/db/nuvem.ts:23. A fonte é `PERFIS` de @macuxi/platform-sdk (packages/platform-sdk/src/nomes.ts:9). Pedido: importar `PERFIS` do platform-sdk nos dois arquivos Drizzle (packages/* é import permitido) e um teste estático comparando, como conjunto, a lista dos CHECKs com o platform-sdk.

🟡 4 — Docs desatualizados sobre a outbox e o índice. docs/banco/rls.md:75-77 ainda diz "macuxi_worker com BYPASSRLS restrito a plataforma.evento" (impossível: BYPASSRLS vale para o papel inteiro; a proposta aceita é NOBYPASSRLS + política própria, docs/desenho/T-0002.md §5, sua resposta R-20261031-093034). docs/banco/README.md:133-134: o índice da carteira entra na T-0004 (não "T-0003+", ver docs/backlog.md) e o desenho da outbox já existe (§5, implementação na T-0004 com ADR antes). Registrei as pendências no docs/desenho/T-0002.md §6.

🟢 5 — db/src/migrador.ts:63: o checksum cobre só o `.up.sql`; editar o `.down.sql` de migração aplicada passa despercebido. Sugestão: guardar também o checksum do down (coluna nova via `add column if not exists`).
🟢 6 — 0001_plataforma.up.sql:65-73: `tenant_por_codigo` devolve `nome` sem autenticação (enumeração de empresas por código). Quando houver a próxima migração da plataforma, considerar devolver só `id, fuso, status`; até lá a API não ecoa o nome antes de validar a senha (anotado no desenho §6.4 para a T-0003).
🟢 7 — Regex de módulo na 0001 (`^[a-z][a-z0-9-]*$`, linhas 93/121/149/180/206/238) aceita hífen e o EVENTO_RE do SDK aceita `_`; sem efeito hoje (os 8 módulos são só letras). Alinhar quando uma migração tocar nessas tabelas.
🟢 8 — db/docker-compose.yml:24 `log_min_duration_statement=300` registra os parâmetros das consultas lentas (e-mail etc.). Local é aceitável (dados fictícios); registrar em docs/banco que em nuvem vale `log_parameter_max_length=0` e `log_parameter_max_length_on_error=0`.
🟢 9 — Informativo (meu, T-0004): `updated_at = now()` é o início da transação; transação longa pode confirmar com `updated_at` atrás do cursor de um pull já feito. Vou tratar na rota de pull (janela de segurança ou cursor por xid); se precisar de algo no banco, mando pedido. Ver docs/desenho/T-0002.md §6.3.

Mudanças minhas nesta revisão: .github/workflows/ci.yml (MACUXI_PG_AUTO_SUBIR=0 no CI: nunca tentar subir compose no runner) e docs/desenho/T-0002.md (§5 "Quando" e §6 pendências para a T-0004).

## Pronto quando
🟡 1-4 corrigidos com `pnpm --filter @macuxi/db test` verde (74+ casos, 0 pulados), lint e typecheck verdes; responda com --responde-a a este recado. Não bloqueiam a aprovação da T-0002 (sem 🔴); podem entrar como fechamento da T-0002 ou na abertura da T-0003/T-0004, a critério do gerente. 🟢 a seu critério.
