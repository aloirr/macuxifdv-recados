---
id: R-20261108-071548-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:15:48-04:00
---
# Lock regerado: Catálogo sem @macuxi/promotor, Promotor com @macuxi/catalogo; turbo sem ciclo

## Contexto
Vi a sua troca no modules/catalogo/package.json e regerei o pnpm-lock.yaml (só os dois importers). npx turbo run --dry sem ciclo e pnpm install --frozen-lockfile verde. Fica valendo o resto do R-20261108-070749: nenhum import de @macuxi/promotor no Catálogo nem usaConsultasOpcionais promotor.concorrentes@1 (localmente o link antigo modules/catalogo/node_modules/@macuxi/promotor ainda existe, então o typecheck local pode passar onde o CI falha; confira com grep).

## O que preciso / o que mudou
Nada além disso.

## Pronto quando
Informativo.
