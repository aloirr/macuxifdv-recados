---
id: R-20261101-213435-engenheiro-software
de: engenheiro-software
para: [alexandre, gerente-projetos]
cc: [testes, banco-dados]
tipo: entrega
prioridade: alta
tarefa: T-0033
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T21:34:35+00:00
---
# [PRONTO PARA MERGE] PR #26 T-0033 (CI rápido e custo): conteúdo 5f8e4e7, head = commit deste recado; arquivos de governança

## [PRONTO PARA MERGE] — rito de merge de governança (doc 07)
- **PR**: https://github.com/aloirr/macuxifdv/pull/26 (branch `nuvem/T-0033-ci-rapido`).
- **Conteúdo validado no commit `5f8e4e71791e997d711216be5bf895bd2b8a01e3`**: o `main` verde `8318b16` (run 41351719888) já mesclado, mais a ADR renumerada. O **head do PR é o commit deste recado**, filho direto do `5f8e4e7`, que só acrescenta arquivos em `.coord/recados/`. O SHA exato do head e o resultado do `ci-ok` dele ficam no título e num comentário do PR assim que o CI terminar. Sem `ci-ok` verde no head, este recado não vale.
- **Arquivos de governança e o que cada um muda:**
  - `.github/workflows/ci.yml`: 1 job vira governança (decide escopo e matrizes) + lint + typecheck + testes-pacotes + testes-integracao + build + `ci-ok` (agregador). Também traz: escopo de coordenação, matriz enxuta em PR e push, run diário 07:00 UTC e manual com matriz completa, e concurrency (cancela só em PR).
  - `.github/actions/preparar/action.yml` (novo): Node 24, pnpm (store em cache), `install --frozen-lockfile` e restauração do cache do turbo, que só acontece no PR.
  - `.github/actions/salvar-turbo/action.yml` (novo): poda (> 7 dias) e salva o `.turbo/cache`.
- **Algum check fica mais fraco? Dois pontos, ambos aprovados pelo Alexandre:**
  1. Commit/PR só de coordenação (`.coord/**`, `docs/status/**`, `docs/backlog.md`, `docs/produto/**`) roda só a governança (coord, guardiões, `verificar --base`/`--por-commit`) e o `ci-ok`. A guarda R4 (`scripts/ci/grafo-turbo.mjs`) prova que nenhum código ou teste lê esses caminhos.
  2. O push ao `main` usa menos runners (matriz enxuta), mas continua rodando TODAS as suítes, forçado e sem cache. A divisão máxima em paralelo fica no run diário.

  Fora isso, todos os passos antigos continuam, e entram as guardas R1–R4 e o `ci-ok`.
- Outros arquivos (não são de governança): `turbo.json` (tarefa `transit` + inputs), `scripts/ci/{escopo,grafo-turbo}.mjs` e os testes deles, e `docs/decisoes/0014-ci-paralelo-cache-do-turbo.md`. A ADR foi **renumerada para 0014**, porque a 0013 (rotas do Conector) entrou antes no `main`; os recados R-20261101-192853 e R-20261101-194026 dizem "ADR 0013" e se referem a esta.

## Custo (detalhe na ADR 0014, item 7, e no PR)
| evento | antes | depois |
|---|---|---|
| PR | 423 s · 7,2 min | 195 s · **13 min** (medido) |
| push ao `main` | 467 s · 8,2 min | ~190 s · **~17 min** (estimado) |
| push só de coordenação | 489 s · 9 min | ~35 s · **2 min** (estimado) |
| run diário completo | — | ~165 s · **~22 min/dia** (estimado) |

Estimativa mensal, com o ritmo de 31/10–01/11:
- Gerente com push ao fechar tarefa ou de 2 em 2 h (~10 pushes por dia, 3 só de coordenação) e PRs no ritmo atual: **~12.400 min** (antes ~6.900). Desse total, ~8.000 vêm dos PRs.
- Com ~2 PRs por dia depois de 05/11: **~5.200 min** (antes ~2.900).

**Nenhum cenário cabe nos 2.000 min/mês do plano gratuito.** No mesmo ritmo, o CI paralelo custa ~1,8× o antigo, porque cada job paga preparo e arredondamento. Alavancas ainda não implementadas, para o Alexandre decidir:
1. PR em rascunho roda só a governança. Os PRs cairiam de ~8.000 para ~2.500 min/mês.
2. Modo econômico com 2 jobs pesados: ~9 min por run e ~250 s.
3. Run diário só em dias úteis, ou desligado (−200 a −660 min/mês).

## Para o gerente depois do merge
- Destravar `.github/**`, `turbo.json`, `package.json` da raiz e `scripts/**`.
- Diário do engenheiro-software (a nuvem não escreve em `.coord/diario`).
- Anotar a ADR 0014 no quadro e na T-0033.
- No 1º push ao `main`, medir o custo real com `gh run view`: soma dos jobs arredondados.
- **Conferir o run diário no início de cada rodada** (`gh run list --workflow CI --event schedule --limit 1`). Diário vermelho vale como `main` vermelho.
- O branch `nuvem/T-0033-ci-rapido-reserva` foi só um backup sem CI e pode ser apagado pelo Alexandre.
- Fica para o local: o banco modelo (R-20261101-192853, banco-dados e testes).

## Premissas
- O `main` nunca cancela run, por causa do `--por-commit`.
- Fora do PR o CI roda tudo (`TURBO_FORCE`).
- Os números de push ao `main`, de coordenação e do diário são estimativas a partir de jobs medidos.
