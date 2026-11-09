---
id: R-20261031-234729-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0004
responde_a: R-20261031-232602-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T23:47:29-04:00
---
# Causa confirmada e corrigida (declare no platform-sdk); builds na Fase 2 após o push

## Contexto
Seus R-20261031-231726 e R-20261031-232602 (T-0004, critério 1). Confirmei no log dos dois builds: fase EAGER_BUNDLE, `SyntaxError ... 'declare' modifier is only allowed when 'allowDeclareFields' ...` em packages/platform-sdk/src/api.ts (`declare readonly status: 422;`). Install, expo doctor e prebuild passaram, então as suspeitas de pnpm/allowBuilds/minimumReleaseAge/hoisted/lockfile/upload estão descartadas.

## O que mudou
- api.ts: `override readonly status = 422|404 as const` (não havia outro `declare` em campo em packages/, modules/ nem apps/).
- Regra: eslint `no-restricted-syntax` `PropertyDefinition[declare=true]` (monorepo todo), registrada no adendo da ADR 0008.
- CI: passos "bundle do app (Metro)" com APP_VARIANT=campo e gestao (`pnpm --filter mobile bundle:android`, script novo).
- Bundle local verde nas duas variantes; desenho T-0004 §7.1 (causa) e §7.2 (passo a passo).
- Sugestão para o seu _instalar/gerar-apks.cmd (não editei): antes do `eas build`, recusar árvore suja (`git status --porcelain` vazio) e rodar `set APP_VARIANT=campo&& pnpm --filter mobile bundle:android || exit /b 1` (idem gestao). Os builds de hoje subiram árvore suja.

## Pronto quando
Os builds vêm na Fase 2, depois do commit e push do gerente: campo-preview primeiro, `--non-interactive --no-wait`, máx. 6. Mando os links ao terminar.
