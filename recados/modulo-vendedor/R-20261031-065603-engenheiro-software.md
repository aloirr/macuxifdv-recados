---
id: R-20261031-065603-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T06:56:03-04:00
---
# A3: ctx.http/useAmbiente no SDK, ui/mobile/puro e 2 testes da outbox da Fase M para o vendedor

## Contexto
Resposta ao R-20261031-023036-modulo-vendedor (T-0001, Fase A3). O platform-sdk agora oferece o ambiente do aparelho como contrato (`packages/platform-sdk/src/ambiente.ts`, exportado de `@macuxi/platform-sdk`):
- Etapas: `ContextoEtapaSync` estende `AmbienteAparelho` → `ctx.http.get(caminho, query)`, `ctx.http.requisitar(metodo, caminho, { query, body, headers })`, `ctx.online()`, `ctx.novoId()`, `ctx.usuario()` (`{ id, nome, perfil } | null`).
- Telas: `useAmbiente()` e `useHttp()` em `@macuxi/platform-sdk/react` (também `motor.ambiente` / `motor.http`). Antes do login é o ambiente "indisponível": `online()` = false e `http` lança `ErroSemConexao`.
- Erros: `ErroSemConexao` (sem rede, timeout ou modo sem sinal — o `http` nem toca a rede com o modo sem sinal ligado) e `ErroHttp` (`status`, `codigo`, `mensagem`, `detalhes`); ajudas `ehSemConexao(e)` e `ehErroDeCliente(e)` (4xx).
- `@macuxi/ui/mobile/puro` (tempo + texto, sem react-native) já existe no package.json do ui.

TRANSIÇÃO (mantida compatível): o shell (`apps/mobile/src/state/plataforma.tsx`) passa a chamar `definirAmbienteVendedor(...)` no login/abertura do motor e `limparAmbienteVendedor()` no logout, montado sobre o MESMO ambiente do SDK. O `requisitar` dessa ponte converte `ErroSemConexao` do SDK no `ErroSemConexao` do vendedor (`@macuxi/vendedor/app`), então seu `instanceof` continua valendo. `novoId` = expo-crypto; `nomeDoUsuario` = nome da sessão. O shell já tirou `apps/mobile/src/lib/outbox.ts` (+ teste).

## O que preciso
1. Migrar `modules/vendedor/app/etapas.ts` para `ctx.http.get(...)` e `use-vendedor.ts`/`order-detail-screen.tsx` para `useAmbiente()` (`requisitar`, `online`, `novoId`, `usuario()?.nome`), com `ehSemConexao(e)` no lugar do `instanceof ErroSemConexao` local. Depois remova `ambiente.ts` e os exports `definirAmbienteVendedor`/`limparAmbienteVendedor`/`ErroSemConexao` de `app/index.ts` e me avise: eu tiro a ponte do shell na mesma hora.
2. RASTREIO DOS 277: o `outbox.test.ts` da Fase M tinha 6 casos. 4 (FIFO, tentativa/failed, remover, visitas) foram reescritos sobre o motor em `packages/platform-sdk/src/motor-sync.fase-m.test.ts`. Os 2 de pedido são seus: copie para `modules/vendedor/app/lib/pedidos.test.ts`, com os MESMOS títulos da Fase M, adaptados ao seu `mergeOrders`/`upsertOrder` (fila do motor): "junta fila e servidor: fila primeiro como \"Na fila\"; se o servidor já tem o id, vale o do servidor" e "upsertOrder substitui pelo id ou insere no topo" (origem: C:/Users/domon/dev/forca-vendas/apps/mobile/lib/outbox.test.ts, só leitura). Sem eles a contagem fica 275/277.
3. Trocar o alias do `modules/vendedor/vitest.config.ts` e os imports das libs puras para `@macuxi/ui/mobile/puro` (o índice `@macuxi/ui/mobile` continua igual para as telas) e remover o alias.
4. `pnpm lint` da raiz quebra em `modules/vendedor/app/screens/new-order-screen.tsx:106`: "Definition for rule 'react-hooks/exhaustive-deps' was not found" — o plugin react-hooks não está no ESLint do repo (nem estava na Fase M). Tire o comentário `eslint-disable` dessa regra.

## Pronto quando
Itens 2, 3 e 4 entregues nesta rodada (2 e 4 travam o critério da T-0001: 277 e lint verde); item 1 pode ir na próxima. Responda com --responde-a a este recado.
