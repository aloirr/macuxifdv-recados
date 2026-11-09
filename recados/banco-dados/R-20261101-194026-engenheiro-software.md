---
id: R-20261101-194026-engenheiro-software
de: engenheiro-software
para: [alexandre, gerente-projetos]
cc: [banco-dados, testes]
tipo: entrega
prioridade: normal
tarefa: T-0033
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:40:26+00:00
---
# T-0033 CI rápido: PR #26 — 467 s → 137 s (3,4×); falta só o teste vencido do Vendedor para o verde

## Resumo
PR https://github.com/aloirr/macuxifdv/pull/26 (branch `nuvem/T-0033-ci-rapido`, último commit de código `450e893`). ADR 0013 (`docs/decisoes/0013-ci-paralelo-cache-do-turbo.md`). **Ainda NÃO está [PRONTO PARA MERGE]**: o único vermelho é `@macuxi/vendedor` `api/pedido.db.test.ts`, que vence pelo relógio (AGORA fixo em 2026-11-01T15:00Z × `updated_at = now()`) e vai deixar o `main` vermelho também — bloqueio R-20261101-193203 ao modulo-vendedor. Com a correção no `main` e o `main` mesclado no branch, o `ci-ok` fica verde e eu (ou a próxima sessão) marco [PRONTO PARA MERGE] com o SHA final.

**Arquivos de governança (merge manual, doc 07):** `.github/workflows/ci.yml`, `.github/actions/preparar/action.yml` (novo), `.github/actions/salvar-turbo/action.yml` (novo). Nenhum check fica mais fraco: todos os passos antigos continuam (coord, guardiões, `verificar --base`/`--por-commit`, lint, fronteiras, typecheck, testes com Postgres, build do BKO, bundle campo/gestao) e entra uma guarda nova. Outros: `turbo.json`, `scripts/ci/grafo-turbo.mjs` + teste, ADR 0013.

## O que mudou (item a item)
1. **Antes** (5 runs verdes do `main`, job único, runner privado de 2 vCPU): parede média **467 s (7m47)**, 400–538 s. Médias: testes 199 s, typecheck 115 s, preparo 38 s, lint 35 s, bundle 29 s, coord+guardiões 18 s, build web 17 s. O `tests/` sozinho levava 163 s porque com 2 vCPU o Vitest usa 1 worker.
2. **Paralelismo**: governanca · lint+fronteiras · typecheck ×2 (core-vendedor | demais) · testes-pacotes ×2 (core-db-api-mock | demais, com Postgres) · testes-integracao ×3 (visitas-campo sozinho | resto 1/2 | resto 2/2, com Postgres) · build (BKO + bundle) · **ci-ok** (agrega; é o check a olhar). Sem fail-fast, todos os passos com `!cancelled()`, `--continue` no turbo. Grupos "demais"/"resto" por EXCLUSÃO: pacote ou arquivo novo cai neles sozinho.
3. **Cache**: `.turbo/cache` por job (chave lockfile + sha, restore por prefixo, salvo mesmo com falha, poda > 7 dias) + store do pnpm + `.next/cache`. PR lê cache; **push ao main usa TURBO_FORCE e roda tudo**. Achei e corrigi um defeito do `turbo.json`: o hash não incluía as dependências internas (mudar o platform-sdk não invalidava o typecheck do Core) → tarefa `transit`; e onde o código escapa do grafo (db/mobile/mock-api importam `modules/` por caminho relativo, db usa o platform-sdk sem declarar, integracao lê `docs/`, `tests/` importa tudo) os inputs cobrem a pasta. Guarda `scripts/ci/grafo-turbo.mjs` (R1–R3) no CI impede regressão.
4. **Banco modelo**: medido no Postgres 16: migrar do zero ≈ 0,5 s/banco × cópia por TEMPLATE ≈ 0,12 s (fixture ≈ 0,15 s). Ganho real, mas pequeno perto do paralelismo. Desenho passo a passo no recado R-20261101-192853 ao banco-dados (cc testes); fica para o LOCAL (db/ e tests/). O CI não precisa mudar para usar.
5. **ADR 0013**: estrutura, cache, sharding, `ci-ok` como check obrigatório (o plano do GitHub não permite branch protection: vale por convenção).
6. **Depois** (CI do PR #26):
| | antes (média main) | PR run 1 (cache frio, 3 shards por hash) | PR run 2 (cache quente) | PR run 3 (config final; typecheck frio) |
|---|---|---|---|---|
| **parede total** | **467 s** | **171 s** | **158 s** | **137 s** |
| lint (+fronteiras) | 37 s (passos) | 70 s (job) | 34 s (19/19 cache) | 44 s (19/19 cache) |
| typecheck | 115 s | 144 s | 37 s (19/19 cache) | 128 s / 77 s (2 grupos, frio) |
| testes pacotes | 199 s (tudo junto) | 96 s / 116 s | 87 s / 56 s | 77 s / 56 s |
| tests/ integração | (dentro dos 199 s) | 161 / 97 / 76 s | 148 / 86 / 73 s | 117 / 104 / 94 s |
| build + bundle | 46 s (passos) | 88 s (job) | 78 s | 73 s |
Tempos de job incluem ~40 s de preparo (containers + node/pnpm + install) que antes eram pagos uma vez só. Esperado com cache quente na config final: ~120 s (gargalo = visitas-campo); push ao main (forçado): ~140 s. **3,4× mais rápido** no PR (467 → 137 s).

## Riscos
- **Minutos cobrados ~2× (≈ 16–19 min/run contra ≈ 8)**: 11 jobs que arredondam para cima. Repositório privado no plano Free. Ajuste fino no `matrix` (menos grupos/partes) se o orçamento apertar.
- **Cache envenenado**: só o push ao `main` (forçado) grava o cache que todos leem; o PR lê o próprio e o do `main`; guarda R1–R3 no CI.
- **Teste instável no shard**: cada parte tem Postgres e globalSetup próprios; teste que dependa da ordem entre arquivos vai aparecer — recado ao testes.
- **`ci-ok` sem branch protection**: obrigatório por convenção (doc 07) até o plano permitir.

## Fica para o local
- banco-dados + testes: banco modelo (R-20261101-192853).
- modulo-vendedor: teste vencido pelo relógio (R-20261101-193203) — bloqueia o verde do PR e do `main`.
- gerente: mesclar o `main` no branch depois da correção (ou pedir à sessão da nuvem), conferir o `ci-ok` verde e seguir o rito de merge de governança; destravar `.github/**`, `turbo.json`, `package.json` e `scripts/**` depois do merge; diário do engenheiro-software (esta sessão não escreve em `.coord/diario`).

## Premissas
- `ubuntu-latest` de repositório privado = 2 vCPU (por isso dividir em runners rende mais que concorrência no mesmo runner).
- Cache só local do Actions (sem cache remoto do turbo, conforme a tarefa).
- Sem `--affected`: o cache por hash dá o mesmo ganho com menos risco.
- `package.json` da raiz e lockfile não mudaram (nenhuma dependência nova).
