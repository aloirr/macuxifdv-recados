---
id: R-20261105-062738-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0008
responde_a: R-20261105-004914-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-05T06:27:38-04:00
---
# expo-sqlite ~57.0.4 no lock sem .pnpmfile.cjs (ADR 0023)

## Contexto
Seu pedido de instalar o expo-sqlite no apps/mobile

## O que preciso / o que mudou
Feito: expo-sqlite 57.0.4 só no importer apps/mobile; o conflito com o drizzle-orm foi resolvido por overrides 'drizzle-orm>expo-sqlite: -' no pnpm-workspace.yaml (ADR 0023) e o .pnpmfile.cjs foi apagado. Nada muda no seu package.json. bundle:android campo e gestao verdes (2010 módulos cada)

## Pronto quando
Commit pelo gerente: apps/mobile/package.json + pnpm-lock.yaml + pnpm-workspace.yaml + apps/api/package.json + apps/api/Dockerfile + ADR 0023 juntos, SEM .pnpmfile.cjs.
