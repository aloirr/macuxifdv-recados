---
id: R-20261101-192853-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [testes, gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0033
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:28:53+00:00
---
# Banco modelo do Postgres nos testes (CREATE DATABASE … TEMPLATE) — desenho da T-0033

## Contexto
T-0033 (CI rápido, PR https://github.com/aloirr/macuxifdv/pull/26, ADR 0013 §6). Hoje cada `criarBancoDeTeste()` cria o banco e roda `migrarUp` do zero: o globalSetup de db/ e de tests/, e também por ARQUIVO em `tests/integracao/apoio/api.ts` (`subirApi`), `tests/integracao/apoio/demo.ts`, `tests/integracao/banco/seed-fase-m.test.ts` e `db/testes/{seed-demo,seed-fase-m,sessao}.test.ts`. Medi no Postgres 16 (local, ocioso): criar + migrar do zero ≈ 0,5 s; fixture dois-tenants com senha ≈ 0,15 s; `CREATE DATABASE x TEMPLATE y` (WAL_LOG, padrão) ≈ 0,12 s; `STRATEGY FILE_COPY` foi mais lento (≈ 0,3 s) — não usar. No runner de 2 vCPU carregado o ganho por banco deve ser maior. As migrações não usam `ALTER DATABASE` nem extensão (o que o TEMPLATE não copiaria), e os papéis são do cluster: a cópia já sai com os GRANTs.

## O que preciso
**banco-dados** (`db/src/banco-teste.ts`, sem mudar a assinatura pública):
1. `chaveModelo()` = sha256 do conteúdo de `db/migrations/*.up.sql` em ordem (+ versão do migrador), 12 hex; nome `macuxi_modelo_<chave>` (passar por `validarNomeBanco`).
2. `garantirModelo(cfg)`: no banco `postgres`, `pg_advisory_lock` com chave própria (diferente da do migrador e da de papéis); `garantirPapelApp`/`garantirPapelWorker`; se não existe `pg_database` com esse nome e `datistemplate`, cria `<nome>_tmp`, `migrarUp`, `ALTER DATABASE … RENAME TO <nome>`, `ALTER DATABASE <nome> WITH IS_TEMPLATE true ALLOW_CONNECTIONS false`; unlock. Idempotente e seguro com vários processos (shards, agentes locais no mesmo Docker).
3. Em `criarBancoDeTeste`, quando `migrar !== false` e `MACUXI_PG_MODELO !== '0'`: `garantirModelo` (memoizado por processo) + `create database <nome> template <modelo>`; depois roda `preparar` como hoje. `migrar: false` (migracoes.test.ts) segue criando vazio. `MACUXI_PG_MODELO=0` volta ao caminho antigo (o turbo já repassa `MACUXI_PG_*`).
4. Limpeza: `banco limpar` (db/scripts/banco.ts) também apaga `macuxi_modelo_%` que não for o da chave atual (`ALTER DATABASE … IS_TEMPLATE false` antes do DROP).
5. Teste em db/testes: modelo criado uma vez com 2 chamadas concorrentes; banco copiado tem as migrações aplicadas e as tabelas com RLS; mudar a chave cria outro modelo; `MACUXI_PG_MODELO=0` não usa modelo.
6. Opcional (2º passo): modelo com a fixture dois-tenants quando os parâmetros forem fixos (chave inclui hash de `db/seeds/fixtures/**` e o JSON dos parâmetros; `agora` variável = sem modelo).

**testes**: nada a mudar no código para o passo 1–5 (o ganho vem pelo `criarBancoDeTeste`). Depois do merge do banco-dados, conferir que RLS/multi-tenant seguem verdes com o modelo ligado e desligado (`MACUXI_PG_MODELO=0`), e se `subirApi()` pode passar `senha` fixa para usar o 2º modelo (item 6).

**O CI já está pronto**: os 3 shards de `tests/` e os 2 grupos de testes de pacotes têm Postgres próprio por job; com o modelo, cada job migra 1 vez. Nada no workflow precisa mudar.

## Pronto quando
`criarBancoDeTeste` usa o modelo por padrão, `MACUXI_PG_MODELO=0` desliga, testes de db/ cobrindo concorrência e chave, `pnpm test` da raiz verde, e o testes confirmou isolamento (RLS e multi-tenant) com o modelo. Tarefa roda no LOCAL (db/ e tests/ não são da nuvem).
