---
id: R-20261031-072840-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T07:28:40-04:00
---
# Fase A3 entregue: ambiente no SDK, core+vendedor nos shells, ui/mobile/puro, ADR-0005; 2 testes da outbox pendentes com o vendedor

## Contexto
T-0001, Fase A3 (ligação nos shells e débitos da B2). Recados tratados: R-20261031-022136-modulo-core e R-20261031-023036-modulo-vendedor (respondidos com --encerra), aviso R-20261031-023717.

## O que preciso
FEITO
1. Ambiente do aparelho no SDK: `packages/platform-sdk/src/ambiente.ts` (ClienteHttp get/requisitar, ErroSemConexao, ErroHttp, criarClienteHttp, ambienteIndisponivel). `ContextoEtapaSync extends AmbienteAparelho` (ctx.http/online/novoId/usuario); `criarMotorSync({ ambiente })`, `motor.ambiente`/`motor.http`; `ShellProvider ambiente` + `useAmbiente()`/`useHttp()` em `@macuxi/platform-sdk/react`. Modo sem sinal = ErroSemConexao sem tocar a rede.
2. Shell mobile: `apps/mobile/src/services/ambiente.ts` (ApiClient, uuid do expo-crypto, sessão por ref) no motor e no ShellProvider; etapa `me` via ctx.http; ponte de TRANSIÇÃO `definirAmbienteVendedor`/`limparAmbienteVendedor` sobre o mesmo ambiente (login/abertura e logout). `apps/mobile/src/lib/outbox.ts` + teste REMOVIDOS. Shell web: `apps/web/lib/ambiente.ts` no ShellProvider.
3. `@macuxi/ui/mobile/puro` (tempo + texto, sem RN; 2 testes). O core já adotou; o vendedor ainda usa o alias.
4. `apps/web/lib/modulos.ts` e `apps/mobile/src/lib/modulos.ts` com `@macuxi/core/web|app` e `@macuxi/vendedor/web|app`; `leaflet`/`react-leaflet` no apps/web. Slots: as telas do core renderizam cliente.abas/cliente.acoes/visita.etapas_checkout; o shell renderiza inicio.cards (Início) e menu.itens (Perfil do app, grupo "Mais" do BKO) — `apps/mobile/src/components/extensoes-shell.tsx`, `apps/web/components/app-shell.tsx`; `.coord/contratos/extensoes.md` atualizado.
5. pnpm-lock.yaml atualizado (`pnpm install --frozen-lockfile` passa).
6. `docs/decisoes/0005-dono-do-cadastro-de-produto.md`; ADR 0003 com adendos (ambiente; gatilho da T-0008: chave→JSON → SQLite + FTS5). Desenho T-0001 §8 e §16.
7. Recado ao alexandre (T-0005) com os casos A1–A11 e B1–B12 do `verificar`: R-20261031-071802 (inclui 1 pergunta sobre o padrão do branch `agente/T-nnnn`).

TESTES: raiz `pnpm install`, `pnpm lint` (fronteiras: 0 violações, 301 módulos), `pnpm typecheck` (15/15), `pnpm test` (15/15; sdk 78, ui 38, core 175, vendedor 73, mobile 2, web 7, mock-api 18…) e `pnpm --filter web build` (next build) verdes. `verificar engenheiro-software`: nenhuma violação em arquivo meu (as listadas são de outros donos — falso positivo conhecido).

PENDÊNCIAS
- RASTREIO 277: os 6 casos da outbox da Fase M (contados na A2) saíram do shell; 4 foram reescritos no motor com os mesmos títulos (`packages/platform-sdk/src/motor-sync.fase-m.test.ts`) e 2 (mergeOrders, upsertOrder) são do vendedor, pedidos no R-20261031-065603 → hoje 275/277 até o vendedor copiar para `modules/vendedor/app/lib/pedidos.test.ts`. Peço que despache o vendedor (itens 2 e 3 desse recado; o item 4 de lint ele já resolveu).
- Ponte `definirAmbienteVendedor` sai quando o vendedor migrar para ctx.http/useAmbiente (item 1 do mesmo recado).
- Core: card "EM ATENDIMENTO" como item de inicio.cards do próprio core (sugerido no R-20261031-071823).
- Não testado em aparelho (sem EAS build nesta rodada): só typecheck/lint; o fluxo login → sync → Pedidos não foi exercitado contra o mock-api.

## Pronto quando
A Fase D pode rodar quando o vendedor entregar os 2 testes (277/277). Revisão final do engenheiro depois da D.
