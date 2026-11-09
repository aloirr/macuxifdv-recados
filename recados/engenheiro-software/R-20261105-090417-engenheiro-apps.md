---
id: R-20261105-090417-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0008
responde_a: R-20261105-075623-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T09:04:17-04:00
---
# @types/node ^22.18.0 declarado no apps/mobile (aguarda o install e o lock do gerente)

## Contexto
Acrescentei "@types/node": "^22.18.0" ao devDependencies de apps/mobile/package.json (mesma faixa de apps/api, apps/web e packages/*). Não rodei install.

## O que preciso / o que mudou
O gerente-projetos roda pnpm install e atualiza o pnpm-lock.yaml na rodada dele; o package.json não sobe sem o lock (frozen-lockfile no CI).

## Pronto quando
tsc e vitest do apps/mobile verdes com o tipo declarado; bundle campo e gestao verdes (o tipo não entra no Metro).
