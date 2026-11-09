---
id: R-20261102-132237-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:22:37-04:00
---
# Lote de dependências (etapa 2): 8 package.json dos módulos + lockfile regenerado, grafo-turbo verde nos PRs #38/#40/#41/#42/#43 — pronto para commit e push

## Contexto
Etapa 2 do lote de dependências (R-20261102-110832 item 1 e R-20261102-110941 item 3). Alteração em `modules/*/package.json` AUTORIZADA pelo dono do produto no R-20261102-110832 (caminhos travados pela nuvem; só o package.json, nada mais desses módulos). O guardião apontou esses arquivos como de outros donos: é essa exceção.

## O que foi feito
1. **Declarações uniformes de app/web em todos os módulos** (nenhuma sessão precisa mais tocar no lockfile para telas):
   - `dependencies`: `@macuxi/ui` workspace:*, `@tanstack/react-query` ^5.90.0 (no core o react-query já era peer + dev; ficou também em dependencies).
   - `devDependencies`: `react` 19.2.3, `react-dom` 19.2.3, `@types/react` ~19.2.2, `@types/react-dom` ~19.2.2, `react-native` 0.86.3, `expo-router` ~57.0.0, `next` ^16.0.0, `react-native-safe-area-context` ~5.7.0, `react-native-svg` 15.15.4, `@macuxi/db` workspace:*, `pg`/`@types/pg` 8.23.1 (testes × Postgres).
   - `peerDependencies` (opcionais em `peerDependenciesMeta`): react, react-dom, react-native, expo-router, next, safe-area, svg — mesmo padrão do core/vendedor.
   - **gestor**: `@macuxi/promotor` workspace:* (responde ao R-20261101-234446 do modulo-gestor: ele já pode trocar o import relativo `../../promotor/contracts` pelo nome do pacote).
   Arquivos: modules/{core,catalogo,vendedor,promotor,gestor,pesquisa,treinamento,integracao}/package.json.
2. **Dependências locais que faltavam no lockfile**: `expo-background-task` e `expo-task-manager` (apps/mobile, ADR 0017) e `@macuxi/db`, `pg`, `@types/pg` (modules/integracao, A7) — entram no `pnpm-lock.yaml` regenerado (+373/-3).
3. `pnpm-workspace.yaml`: `verifyDepsBeforeRun: warn` — o pnpm 12 instalava sozinho em todo `pnpm --filter ... run` (o engenheiro-apps viu `Packages: -169` às 12:51 no meio da minha regeneração; R-20261102-125428). Agora só avisa; instalar é com `pnpm install`.
4. `apps/mock-api/src/legado/dominio.ts`: `TipoDocumento` exportado duas vezes (comum = CNPJ/CPF, de c119927; vendedor = pedido/orçamento, do #39) quebrava o typecheck do mock-api no main; reexport explícito do comum.

## Verificação
- `pnpm install` (uma vez) + `pnpm install --frozen-lockfile` = "Lockfile is up to date". `expo-background-task`/`expo-task-manager` resolvem a partir de apps/mobile (node_modules hoisted). Bundle das variantes não rodado (só a resolução).
- `node scripts/ci/grafo-turbo.mjs` ok no main local. Simulação nos PRs (árvore do branch via git archive + estes package.json): **#38 T-0051, #40 T-0055, #41 T-0056, #42 T-0058 e #43 T-0057: 3 problemas R2 antes → ok depois (o #44 T-0054 ainda rodando; aviso se der diferente)**. Os PRs só mudam a linha `typecheck` do package.json: sem conflito esperado com estes hunks.
- `pnpm typecheck` da raiz: 17/19 antes do ajuste; mock-api agora verde. Restante vermelho: `@macuxi/core` por `modules/core/domain/produto-preco.test.ts:40` (`custo_cents`) — arquivo NÃO versionado, trabalho em curso do modulo-core; o HEAD não tem esse erro. Não comitar esse arquivo até o modulo-core corrigir.
- `node scripts/coord.mjs verificar engenheiro-software`: OK, nenhuma violação.

## Para o commit
Arquivos meus nesta entrega: pnpm-lock.yaml, pnpm-workspace.yaml, apps/mock-api/src/legado/dominio.ts + os 8 modules/*/package.json (autorização R-20261102-110832). Note que apps/mobile/package.json e modules/integracao/package.json já tinham alterações locais dos donos (expo-background-task/task-manager; @macuxi/db/pg) que precisam ir no mesmo commit do lockfile. Depois do push: `gh pr update-branch` nos #38, #40, #41, #42, #43 (e #44).

## Pendências
- R-20261102-115637 (devolver lockfile ao HEAD) fica superado por esta regeneração.
- core/package.json ficou com a formatação do JSON.stringify (peerDependenciesMeta em várias linhas) e o react-query também em dependencies — inofensivo; o guardião não me deixou desfazer só a formatação.
- Sigo agora: §7 do T-0061 (nome da distribuidora nos PDFs) e re-revisão A7/A8 da T-0032.
