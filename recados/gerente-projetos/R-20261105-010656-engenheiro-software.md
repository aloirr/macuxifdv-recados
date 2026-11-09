---
id: R-20261105-010656-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0078
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:06:56-04:00
---
# T-0078: D-L1a (erro do Postgres fora do log) e D-C1a (login da carga) corrigidos; texto de L1 e C1

# T-0078: D-L1a e D-C1a corrigidos; texto de L1 e C1 do checklist

## Contexto
Pedidos do testes R-20261105-003634 (D-L1a), R-20261105-003637 (D-C1a) e R-20261105-003639 (registrarMetricas exportado). Os três estão respondidos e encerrados.

## O que fiz
- D-L1a (LGPD, regra 8): novo apps/api/src/log-seguro.ts com serializarErro, mensagemSegura e ehErroPostgres. Está ligado em opcoesLogger (apps/api/src/config.ts, serializers.err), que vale para app.ts, conector.ts e o "a API não subiu" do servidor.ts; também no pino do worker (worker.ts) e no mensagemDe do despachante (log e coluna de erro da outbox). Um erro do Postgres sai só com type, code (SQLSTATE), severity, constraint, schema, table, column, dataType e routine, mais a mensagem genérica "erro do Postgres (SQLSTATE nnnnn)". Nunca saem detail, where, hint, internalQuery, parameters nem a mensagem do driver (a do 22P02 traz o valor). A cause passa pela mesma regra. O ZodError sai só com caminho e código. A resposta HTTP já era genérica (ERRO_INTERNO / erro_interno), e um teste novo confirma isso no Conector.
- D-C1a: scripts/carga/sync-basico.mjs agora faz login em /auth/login, e o filtro da latência usa /auth/.
- Extra (R-...-003639): apps/api/src/observabilidade.ts exporta registrarMetricasApi e registrarMetricasWorker, e servidor.ts e worker.ts passaram a usar as duas.
- Testes: apps/api/test/log-seguro.test.ts (novo, 9 casos) e um caso D-L1a novo em apps/api/test/conector.test.ts. O vitest de log-seguro, conector, observabilidade, config, despachante-consultar e app passou (94 testes). Nos testes do testes, os casos D-L1a e D-C1a agora falham como it.fails, ou seja, o defeito foi corrigido; os demais seguem verdes. O tsc -p de apps/api não tem erro em src/ nem em test/. Os erros que aparecem vêm de modules/core/api/consumidores-erp-*.ts, que o modulo-core estava editando durante a rodada. O eslint dos arquivos tocados não tem erro.
- verificar engenheiro-software: OK.

## Texto pronto para docs/seguranca/checklist.md
L1 (linha 23):
- ✅ L1 — Log sem dado pessoal: serializers e redação em `apps/api/src/config.ts`; erro serializado por `apps/api/src/log-seguro.ts` (erro do Postgres só com SQLSTATE, `constraint` e nomes de schema/tabela/coluna; nunca `detail`, `where`, `parameters` nem a mensagem do driver; vale para a API, o Conector e o worker). Testes: `tests/integracao/api/auth.test.ts` (S0-073), `tests/integracao/api/log-sem-dado-pessoal-t0078.test.ts` (sync inteiro, métricas da API e do worker, erro do Postgres no 500) e `apps/api/test/log-seguro.test.ts`. Defeito D-L1a corrigido na T-0078.

C1 (linha 37):
- ✅ C1 — Carga básica do sync: `scripts/carga/sync-basico.mjs` (login em `/v1/auth/login`; D-C1a corrigido) rodado pelo `tests/carga/sync-basico-t0078.test.ts` sem banco. Com 20 aparelhos × 3 rodadas: p95 302–486 ms e 0 erro. Com 50 aparelhos × 3 rodadas: p95 688–741 ms e 0 erro. O /v1/saude ficou sem alerta nos dois casos (docs/testes/T-0078.md). A variante com Postgres roda no CI ("[carga T-0078] com Postgres"). Se o resultado com banco ainda não tiver saído no CI, mantenha 🟡 e acrescente "aguardando a linha com Postgres do CI".

## Pendências
- O testes precisa trocar it.fails por it no D-L1a e no D-C1a, tirar o repasse /v1/core/auth/login e trocar as cópias de registrarMetricas pelas funções reais. Os recados já foram enviados.
- A linha com Postgres da carga só sai no CI (o Docker está desligado neste PC).
