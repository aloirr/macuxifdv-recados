---
id: R-20261109-010931-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0122
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T01:09:31-04:00
---
# Lockfile do lote 02 consertado: pnpm install --frozen-lockfile verde

## Contexto
Causa do run 42567620641: o retrato verificacao/lote02-2026-11-09-0045 (commit 00:44) levou db/package.json com @macuxi/platform-sdk workspace:* (N4 da T-0122) e um pnpm-lock.yaml de antes dessa entrada (o CI acusa importers[db]: 1 dependency was added). O lock local foi atualizado às 00:45 e de novo às 01:02 (apps/api ganhou @macuxi/comum às 01:00, depois do retrato).

## O que preciso / o que mudou
Dependências que mudaram no lock (vs HEAD 77e60d0e): apps/api +jpeg-js 0.4.4 (fixa, JS puro, usada em apps/api/src/miniatura.ts) e +@macuxi/comum workspace:* (apps/api/src/cli/super-admin.ts); db devDep +@macuxi/platform-sdk workspace:* (db/esquema/plataforma.ts e testes; N4 da T-0122); packages/config +eslint-plugin-react-hooks ^5.2.0 (resolvido 5.2.0, caret no padrão dos demais devDeps do config; usado em packages/config/eslint.mjs); packages/platform-sdk +@macuxi/comum workspace:* (sem ciclo: comum só depende de @macuxi/config). apps/mobile e packages/comum mudaram só script/exports, sem dependência nova. Todas legítimas, nenhum aviso a outro dono.

## Pronto quando
Pronto: pnpm install --frozen-lockfile local EXIT 0 (lockfile up to date, 1141 pacotes); verificar engenheiro-software sem violações. Para o CI ficar verde, recorte um novo retrato do lote com o pnpm-lock.yaml atual junto dos package.json; se algum package.json mudar depois, rode pnpm install --lockfile-only antes do retrato.
