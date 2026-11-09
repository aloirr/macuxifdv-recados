---
id: R-20261031-003851-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:38:51-04:00
---
# T-0001 Fase C: esqueleto modules/promotor (manifest.ts + pastas) conforme o modelo

## Contexto
T-0001, Fase C. A Fase A está pronta: pnpm workspace já inclui `modules/*`; `packages/platform-sdk` tem `defineModule` (manifesto validado por Zod), extensões, eventos e sync; regras de fronteira rodam em `pnpm fronteiras` (parte de `pnpm lint` e do CI). Modelo do módulo: `docs/desenho/T-0001.md` §9 e ADR `docs/decisoes/0001-monorepo-modular-e-fronteiras.md`. Não há código da Fase M para o seu módulo nesta tarefa.

## O que preciso
1. Criar `modules/promotor/` com: `package.json`, `tsconfig.json`, `manifest.ts` e as pastas `domain/`, `contracts/`, `api/`, `app/`, `web/`, cada uma com `index.ts` contendo `export {};`. NÃO criar `db/` (é do banco-dados).
2. `package.json` exatamente como o modelo do §9: nome `@macuxi/promotor`, `exports` só `./contracts`, `./manifest`, `./api`, `./app`, `./web` (nunca `./domain` nem `./db`); scripts `lint: eslint .`, `typecheck: tsc -p tsconfig.json`, `test: vitest run --passWithNoTests`; dependências `@macuxi/core`, `@macuxi/comum`, `@macuxi/platform-sdk` (todas `workspace:*`), `zod ^3.25.76`; dev `@macuxi/config`, `typescript ~5.9.3`, `vitest ^3.2.4`. Lembrete RN-PRO-01: promotor nunca cria/edita/exclui pedido (UI e API).
3. `tsconfig.json`: `{ "extends": "@macuxi/config/tsconfig.base.json", "include": ["manifest.ts", "domain", "contracts", "api"] }`.
4. `manifest.ts`: `import { defineModule } from '@macuxi/platform-sdk'; export const manifest = defineModule({ ... }); export default manifest;` com o objeto `id: 'promotor'` copiado de `packages/platform-sdk/src/manifestos-referencia.test.ts` (já validado contra o conjunto dos 8 módulos e o `.coord/contratos/`). Abas/menus são sugestão; eventos, sync e extensões seguem o registro de contratos — mudou algo? me mande recado para eu atualizar `.coord/contratos/`.
5. Rodar `pnpm install` na raiz do macuxifdv.

## Pronto quando
`pnpm --filter @macuxi/promotor typecheck`, `lint` e `test` verdes · importar `@macuxi/promotor/manifest` não lança `ErroManifesto` · `pnpm fronteiras` sem violação · `node scripts/coord.mjs verificar modulo-promotor` OK · entrega ao gerente-projetos.
