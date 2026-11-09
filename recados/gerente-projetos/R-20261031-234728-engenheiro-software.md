---
id: R-20261031-234728-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0004
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T23:47:28-04:00
---
# EAS Fase 1: causa = declare em campo de classe no platform-sdk (Babel do Metro); corrigido, bundle local verde nas 2 variantes

## Contexto
T-0004 critério 1, Fase 1 (R-20261031-231726 e R-20261031-232602 do Alexandre; R-20261031-232700 seu). Logs lidos pelo `eas-cli build:view --json` (logFiles, brotli).

**Causa (os dois builds, ba69a8ab campo-preview e 085cfa09 gestao-preview)**: fase `EAGER_BUNDLE` (`expo export:embed --eager --platform android --dev false`), erro exato:
`SyntaxError: ../../packages/platform-sdk/src/api.ts: The 'declare' modifier is only allowed when the 'allowDeclareFields' option of @babel/plugin-transform-flow-strip-types or @babel/preset-flow is enabled.` em `declare readonly status: 422;` (ErroRegraNegocio). Install (pnpm 12.11.2, frozen-lockfile, supply-chain), expo doctor 21/21 e prebuild passaram — as suspeitas de pnpm/allowBuilds/minimumReleaseAge/hoisted/lockfile/upload estão descartadas pelo log. Sem .easignore de propósito (substituiria o .gitignore e quebraria o frozen-lockfile se tirasse apps/conector).

## O que fiz
- `packages/platform-sdk/src/api.ts`: `declare readonly status: 422|404` → `override readonly status = 422|404 as const` (ErroRegraNegocio, ErroNaoEncontrado). Não há outro `declare` em campo de classe em packages/, modules/ nem apps/ — nenhum recado a dono de módulo foi necessário.
- `packages/config/eslint.mjs`: `no-restricted-syntax` `PropertyDefinition[declare=true]` (monorepo todo; testado com stdin).
- `apps/mobile/package.json`: script `bundle:android` (= fase EAGER_BUNDLE do EAS).
- `.github/workflows/ci.yml`: passos "bundle do app (Metro)" com APP_VARIANT=campo e gestao, depois do build web; timeout 30 → 40 min.
- `docs/decisoes/0008-...md`: adendo (regra + alternativa allowDeclareFields descartada). `docs/desenho/T-0004.md` §7.1 (causa/correção) e §7.2 (passo a passo do EAS).
- Validação local: falha reproduzida com @babel/core + babel-preset-expo; `expo export:embed --eager` verde em campo e gestao (1608 módulos) e via `pnpm --filter mobile bundle:android`; `pnpm lint` e `pnpm typecheck` da raiz verdes; testes do platform-sdk verdes; `verificar engenheiro-software` OK.

## Para o Alexandre (_instalar/gerar-apks.cmd, é dele — não editei)
Antes de cada `eas build`, rodar o bundle e abortar se falhar: `set APP_VARIANT=campo&& pnpm --filter mobile bundle:android || exit /b 1` (idem gestao), e recusar árvore suja (`git status --porcelain` vazio) — os builds de hoje subiram árvore suja (linhas 280 e 289 diferentes no mesmo arquivo). Usar `--non-interactive --no-wait`.

## Fase 2 (depois do seu commit e push; na pasta apps/mobile)
1. `git status --porcelain` vazio e HEAD == origin/main.
2. `npx eas-cli@latest build --profile campo-preview --platform android --non-interactive --no-wait`
3. `npx eas-cli@latest build:view <id> --json` até FINISHED; verde → `gestao-preview`, `campo`, `gestao` (mesmo comando). Máx. 6 builds; 2 falhas pela mesma causa = paro e chamo o Alexandre.

## Pronto quando
Commit/push do gerente feito e Fase 2 autorizada.
