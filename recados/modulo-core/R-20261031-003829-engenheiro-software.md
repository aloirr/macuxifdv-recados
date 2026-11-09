---
id: R-20261031-003829-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:38:29-04:00
---
# T-0001 Fase B: esqueleto modules/core + copiar domain/contracts da Fase M (45 testes)

## Contexto
T-0001, Fase B. A Fase A está pronta: raiz do monorepo (pnpm workspace já inclui `modules/*`), `packages/config`, `packages/comum` (money + calendar, ADR 0002), `packages/ui`, `packages/platform-sdk` (`defineModule`) e regras de fronteira (`pnpm fronteiras`). Desenho completo: `docs/desenho/T-0001.md` (§3, §4, §9). A Fase M (`C:\Users\domon\dev\forca-vendas`) é SOMENTE LEITURA: só `cp`/`Copy-Item` de lá; nunca rodar install/vitest/tsc dentro dela.

## O que preciso
1. Esqueleto `modules/core/` conforme §9 do desenho: `package.json` (`@macuxi/core`, sem dependência de outro módulo), `tsconfig.json`, `manifest.ts` e `domain/`, `contracts/`, `api/`, `app/`, `web/` com `index.ts` (`export {};` onde vazio). NÃO criar `db/` (é do banco-dados).
2. `manifest.ts`: copie o manifesto `core` de `packages/platform-sdk/src/manifestos-referencia.test.ts` (já validado por `defineModule` + `validarConjunto`). Ajuste abas/menus se quiser; mantenha eventos e extensões do `.coord/contratos/`.
3. Copiar de `forca-vendas/packages/domain/src/` para `modules/core/domain/`, arquivo inteiro com o teste: `analytics.ts`(6), `incentive.ts`(20), `visit.ts`(12), `route.ts`(6) = 44 casos. Única adaptação permitida: imports `./money` e `./calendar` → `@macuxi/comum`. NÃO copiar money/calendar (já estão em `packages/comum`). `domain/index.ts` reexporta os 4.
4. Copiar `forca-vendas/packages/contracts/src/index.ts` para `modules/core/contracts/index.ts` e REMOVER as seções que vão para o vendedor (pedidos; produtos e `MixSuggestion`; `CustomerDetail`; alçadas; `OrdersDashboard`; sincronização `SyncPush*`). Ficam no core: cabeçalho, `API_PREFIX`, básicos, auth/perfis, cadastros, rota e visitas, metas e RV, `CustomersDashboard`, `DashboardQuery`, auditoria, `ERROR_CODES` (tabela §4).
5. Teste de contracts: do `forca-vendas/packages/contracts/src/index.test.ts`, só o `it('plano com peso acima de 100 é inválido')` (1 caso), sem alterar o corpo, em `modules/core/contracts/index.test.ts`.
6. Dependências do package.json: `@macuxi/comum`, `@macuxi/platform-sdk`, `zod ^3.25.76`; dev: `@macuxi/config`, `typescript ~5.9.3`, `vitest ^3.2.4`. Rodar `pnpm install` na raiz do macuxifdv.
7. Aviso da B2 (não fazer agora): telas web (rotas, metas/RV, clientes; 59 casos) e app (visita, rota; 18 casos) vão para `modules/core/web|app` numa etapa seguinte, com recado próprio.

## Pronto quando
`pnpm --filter @macuxi/core test` mostra **45 casos** verdes (44 domain + 1 contracts) · `pnpm --filter @macuxi/core typecheck` e `lint` verdes · `pnpm fronteiras` sem violação · `node scripts/coord.mjs verificar modulo-core` OK · entrega ao gerente-projetos com a contagem.
