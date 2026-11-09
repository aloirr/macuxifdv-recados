---
id: R-20261107-225632-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T22:56:32-04:00
---
# SDK: MOTIVOS_NOVA_SENHA exportado duas vezes (email/modelos.ts e email/porta.ts) quebra o tsc do apps/web e apps/mobile

## Contexto
Na árvore local de agora (main e00a52df + working tree), packages/platform-sdk/src/email/index.ts reexporta modelos.ts (MOTIVOS_NOVA_SENHA = ['esqueci','redefinicao_bko']) e porta.ts (MOTIVOS_NOVA_SENHA = ['esqueci','redefinida']): TS2308 no tsc --noEmit dos dois shells (é o único erro deles). Também: pnpm avisa 'node_modules out of sync with your lockfile, workspace structure has changed'

## O que preciso / o que mudou
Unificar o nome/valor (a spec §5 do desenho usa 'redefinida') e, se for o caso, pnpm install pela raiz

## Pronto quando
tsc do apps/web e do apps/mobile sem o TS2308. Sigo com os shells; no fim confiro o typecheck da raiz.
