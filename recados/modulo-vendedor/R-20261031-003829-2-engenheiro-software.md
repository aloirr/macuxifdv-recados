---
id: R-20261031-003829-2-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:38:29-04:00
---
# T-0001 Fase B: esqueleto modules/vendedor + copiar order e contracts de pedido da Fase M (37 testes)

## Contexto
T-0001, Fase B. A Fase A está pronta: raiz do monorepo (pnpm workspace inclui `modules/*`), `packages/config`, `packages/comum` (money + calendar, ADR 0002), `packages/ui`, `packages/platform-sdk` (`defineModule`) e regras de fronteira (`pnpm fronteiras`). Desenho completo: `docs/desenho/T-0001.md` (§3, §4, §9). A Fase M (`C:\Users\domon\dev\forca-vendas`) é SOMENTE LEITURA: só `cp`/`Copy-Item` de lá; nunca rodar install/vitest/tsc dentro dela. Você depende do contracts do core (pedido paralelo ao modulo-core): pode montar o esqueleto e o domain já; o contracts fecha quando `modules/core/contracts` existir.

## O que preciso
1. Esqueleto `modules/vendedor/` conforme §9 do desenho: `package.json` (`@macuxi/vendedor`, com `"@macuxi/core": "workspace:*"`), `tsconfig.json`, `manifest.ts`, `domain/`, `contracts/`, `api/`, `app/`, `web/` com `index.ts` (`export {};` onde vazio). NÃO criar `db/` (é do banco-dados).
2. `manifest.ts`: copie o manifesto `vendedor` de `packages/platform-sdk/src/manifestos-referencia.test.ts` (já validado). Mantenha eventos e extensões do `.coord/contratos/`.
3. Copiar `forca-vendas/packages/domain/src/order.ts` + `order.test.ts` (32 casos) para `modules/vendedor/domain/`. Única adaptação: `./money` → `@macuxi/comum`. `domain/index.ts` reexporta `order`.
4. Copiar `forca-vendas/packages/contracts/src/index.ts` para `modules/vendedor/contracts/index.ts` e MANTER só: pedidos (`OrderStatus` … `RejectRequest`); produtos (`StockByBranch`, `Product`, `ProductListQuery`, `MixSuggestion` — provisório, ADR de produto pendente); `CustomerDetail`; alçadas (`DiscountPolicy`, `PutDiscountPolicyRequest`); `OrdersDashboard`; sincronização (`SyncPushItem`, `SyncPushRequest`, `SyncPushResult`). Tudo o que essas seções usam do core (`Id`, `Cents`, `Pct`, `IsoDate`, `IsoDateTime`, `CustomerSummary`, `Receivable`, `CreateVisitRequest`, `CheckoutVisitRequest`) vem de `import { … } from '@macuxi/core/contracts'`. Reexporte também `ORDER_STATUSES` e `ORDER_STATUS_LABEL` do seu domain (a auditoria do shell usa).
5. Teste de contracts: do `forca-vendas/packages/contracts/src/index.test.ts`, os 5 `it` de pedido/recusa/push (todos menos "plano com peso acima de 100"), corpo sem alteração, em `modules/vendedor/contracts/index.test.ts`.
6. Dependências: `@macuxi/core`, `@macuxi/comum`, `@macuxi/platform-sdk`, `zod ^3.25.76`; dev: `@macuxi/config`, `typescript ~5.9.3`, `vitest ^3.2.4`. `pnpm install` na raiz.
7. Aviso da B2 (não fazer agora): telas web (pedidos, alçadas; 11 casos) e app (pedido, PDF, catálogo local; 18 casos) vão para `modules/vendedor/web|app` numa etapa seguinte, com recado próprio.

## Pronto quando
`pnpm --filter @macuxi/vendedor test` mostra **37 casos** verdes (32 domain + 5 contracts) · typecheck e lint verdes · `pnpm fronteiras` sem violação (nada de `modules/core/domain`) · `node scripts/coord.mjs verificar modulo-vendedor` OK · entrega ao gerente-projetos com a contagem.
