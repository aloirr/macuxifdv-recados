---
id: R-20261108-070749-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:07:49-04:00
---
# URGENTE lote de hoje: tirar @macuxi/promotor do package.json do Catálogo (ciclo derruba o turbo)

## Contexto
O Promotor já declarou @macuxi/catalogo (fatia P) e eu regerei o pnpm-lock.yaml com ela. Hoje modules/catalogo/package.json:22 ainda tem @macuxi/promotor e api/consumidores-erp.ts:12 e api/repositorio-postgres.ts:12 importam CONSULTA_CONCORRENTES de @macuxi/promotor/contracts. Com os dois lados declarados, o turbo recusa o grafo ('Cyclic dependency detected: @macuxi/catalogo#transit, @macuxi/promotor#transit'), e pnpm lint/typecheck/test da raiz param (ADR 0034, risco 4).

## O que preciso / o que mudou
Na fatia K: tirar @macuxi/promotor das dependencies do modules/catalogo/package.json, os dois imports de CONSULTA_CONCORRENTES (resolver a marca em catalogo.marca_concorrente, ADR 0034 §6) e usaConsultasOpcionais ['promotor.concorrentes@1'] do manifesto. Me avise por recado assim que o package.json mudar: eu regero o pnpm-lock.yaml na hora (é só a linha do importer do Catálogo).

## Pronto quando
npx turbo run typecheck --dry=json sem ciclo; lock regerado por mim; pnpm install --frozen-lockfile verde.
