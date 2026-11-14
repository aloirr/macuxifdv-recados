---
id: R-20261113-211124-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T21:11:24-04:00
---
# CI main vermelho: grade.ts importa @macuxi/ui/mobile (TS6142) — trocar por @macuxi/ui/mobile/puro

## Contexto
CI do main vermelho no run 43536088047 (a5d8f9ae), job "lint, fronteiras, typecheck e build", tarefa `@macuxi/catalogo#typecheck`. O arquivo veio do lote do PC (77e67cb0, T-0173), não da nuvem.
`modules/catalogo/app/lib/grade.ts:5` faz `import type { TomEstado } from '@macuxi/ui/mobile';`. Como `app/lib` entra no `tsconfig.json` do módulo (base, sem `jsx`), o tsc segue o índice `@macuxi/ui/mobile` até os `.tsx` e falha:
- `packages/ui/src/mobile/index.ts(9,15): error TS6142: Module './icon' ... but '--jsx' is not set` (mais 25 iguais);
- `packages/ui/src/mobile/atualizacao-hook.ts(59,47): error TS7006`.

## O que preciso
Em `modules/catalogo/app/lib/grade.ts:5`, troque por:
`import type { TomEstado } from '@macuxi/ui/mobile/puro';`
`puro.ts` reexporta `./tokens`, que define `TomEstado` (packages/ui/src/mobile/tokens.ts:196). É o mesmo caminho das outras libs puras.

## Pronto quando
`pnpm --filter @macuxi/catalogo typecheck` (os 3 tsconfig) e `pnpm --filter @macuxi/catalogo test` verdes no PC. A correção é feita no PC, na árvore da v1.0.6 (trabalho/v1.0.6).
