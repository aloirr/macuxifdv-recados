---
id: R-20261031-020724-2-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:07:24-04:00
---
# Exports do package.json e contrato do shell para a B2 (moduloWeb/moduloApp, slots, fila)

## Contexto
A2 da T-0001 entregue: ponto de extensão dos shells para as telas da B2 (ADR 0003; desenho docs/desenho/T-0001.md §13–14) e permissão por ação no manifesto (ADR 0004).

## O que preciso / o que mudou
**1. package.json (antes das telas)** — alinhe `exports` ao modelo do desenho §9: acrescente `./manifest`, `./web`, `./app` e `./api`; mantenha `"."` → manifest.ts por enquanto (os shells importam `@macuxi/core`); **remova `./domain`** (domain nunca é exportado; o único consumidor era o mock-api, que agora lê por caminho relativo como exceção registrada). Me avise quando `./web` e `./app` existirem que eu ligo `moduloWeb`/`moduloApp` do core em apps/web/lib/modulos.ts e apps/mobile/src/lib/modulos.ts.

**2. B2 (telas web 59 + app 18 testes, desenho §5–6)**
- `modules/core/web/index.ts`: `export const moduloWeb = definirModuloShell<ComponentType>({ manifesto: manifest, paginas: [...] })` — Clientes, Rotas, Metas (rótulos iguais a `apps.web.menus`; Parâmetros do plano de RV com `grupo: 'cadastros'`). `canEditParams` etc.: se forem permissão por perfil, declare em `acoes` do manifesto (ex.: `'plano_rv.editar': { perfis: ['analista','admin'] }`) e use `usePode` de `@macuxi/platform-sdk/react`.
- `modules/core/app/index.ts`: `export const moduloApp = definirModuloShell<ComponentType>({ manifesto, paginas, entidadesSync, etapasSync })` — Rota, Clientes, Metas e ficha do cliente (caminho `cliente`), com `navegacao` igual a `apps.campo.abas`/`apps.gestao.abas`.
- Slots que o core oferece (`cliente.abas`, `cliente.acoes`, `visita.etapas_checkout`, `inicio.cards`, `menu.itens`): as telas leem os itens com `useExtensoes('cliente.acoes')`; o tipo do payload de cada slot vai para `core/contracts` (ex.: `AcaoCliente = { rotulo; testID; abrir: … }`). O vendedor vai registrar "Novo pedido" em `cliente.acoes` com `acao: 'pedido.criar'` — o shell já esconde do promotor (RN-PRO-01).
- Visitas: check-in e checkout pela fila do motor: `useMotorSync().motor.enfileirar({ id: uuid, entidade: 'visita', payload: CreateVisitRequest })` e, no checkout, `entidade: 'visita'` com payload `{ visit_id, ...CheckoutVisitRequest }` (id novo). O transporte `fase-m` do shell traduz para `visit`/`checkout` do mock-api. Registre `definirEntidadeSync({ nome: 'visita', modulo: 'core', direcao: 'ambos', ... })`.
- Cargas da Fase M (carteira, rota do dia, metas): `etapasSync` gravando em `ctx.armazenamento` (armazenamento do módulo). `lib/visit.ts` usa `Order` só para ligar pedido à visita: tipo estrutural local (desenho §6).

## Pronto quando
(1) exports ajustados e `pnpm fronteiras`/typecheck verdes; (2) na B2: `moduloWeb`/`moduloApp` exportados, telas aparecendo nos shells e os 77 testes da Fase M verdes no módulo. Dúvidas sobre o contrato do shell: me pergunte por recado.
