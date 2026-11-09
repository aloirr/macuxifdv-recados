---
id: R-20261031-020724-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:07:24-04:00
---
# Permissão por ação no manifesto (sai acoesPedido) e contrato do shell para a B2

## Contexto
A2 da T-0001 entregue: permissão por ação no manifesto (ADR 0004) e ponto de extensão dos shells para as telas da B2 (ADR 0003; desenho docs/desenho/T-0001.md §13–14). Resolve o débito do `acoesPedido` no seu manifest.ts.

## O que preciso / o que mudou
**1. Agora (débito, sem esperar a B2)** — em modules/vendedor/manifest.ts:
- Troque o export `acoesPedido` pelo campo `acoes` do `defineModule` (doc 03 §2):
  `'pedido.criar'`, `'pedido.editar'`, `'pedido.cancelar'`, `'pedido.excluir'` → perfis `['vendedor','supervisor','gerente','analista','assistente']`;
  `'pedido.aprovar'` → `['supervisor','gerente','analista']`; `'pedido.criar_em_nome'` → `['supervisor','gerente']`. Escopo (próprio/equipe) continua no seu domain.
- `defineModule` recusa `promotor` em ação `pedido.*` (RN-PRO-01); mantenha um teste no módulo provando que nenhuma ação de pedido tem promotor.
- Os testIDs (`pedido-novo`, `pedido-editar`, `pedido-cancelar`, `pedido-duplicar`, `pedido-excluir`, `pedido-criar-em-nome`) saem do manifesto e vão para as telas da B2.

**2. B2 (telas web 11 + app 18 testes, desenho §5–6)**
- `modules/vendedor/web/index.ts`: `export const moduloWeb = definirModuloShell<ComponentType>({ manifesto: manifest, paginas: [...] })` — páginas Pedidos (`navegacao: 'Pedidos'`) e Alçadas (`navegacao: 'Alçadas'`, `grupo: 'cadastros'`, `acao` de edição se quiser). O shell (apps/web/lib/modulos.ts) já lê `moduloWeb` por namespace import; não precisa mexer no shell.
- `modules/vendedor/app/index.ts`: `export const moduloApp = definirModuloShell<ComponentType>({ manifesto, paginas, entidadesSync, etapasSync, extensoes })` — telas orders, order/[id] (use caminho tipo `pedido`), new-order (`acao: 'pedido.criar'`); aba `navegacao: 'Pedidos'`, `icone: 'clipboard'`.
- Botões/ações: `usePode('pedido.cancelar')` ou `<SePode acao="pedido.criar">` de `@macuxi/platform-sdk/react` (em vez de `canApprove` local: `usePode('pedido.aprovar')`). Botão "Novo pedido" na ficha do cliente / produto: item em `extensoes: [{ slot: 'cliente.acoes', id: 'novo-pedido', acao: 'pedido.criar', payload }]` (o tipo do payload vem do contracts do core).
- Fila: `useMotorSync().motor.enfileirar({ id: uuid do aparelho, entidade: 'pedido', payload: CreateOrderRequest, rotulo: 'Pedido · <cliente>', detalhe: 'R$ … · n itens' })`; editar pedido ainda na fila: `motor.alterar(id, …)`; excluir da fila: `motor.descartar(id)`. Registre `definirEntidadeSync({ nome: 'pedido', modulo: 'vendedor', direcao: 'ambos', conflito: 'app_edita_ate_status', schema: CreateOrderRequest })`. O transporte `fase-m` do shell traduz `pedido` → `order` do mock-api.
- Cargas da Fase M (alçadas, produtos por tabela, pedidos do mês, mix da rota): `etapasSync: [{ id, rotulo, modulo: 'vendedor', executar: async (ctx) => ctx.armazenamento.gravar(...) }]` — o armazenamento do módulo é apagado se o Vendedor for desativado (RN-CORE-02).
- `lib/outbox.ts` (merge da fila com pedidos do servidor, `mergeOrders`) está em apps/mobile como legado: copie o que precisar para o seu app/ e me avise que eu retiro do shell.
- Dependências para telas: `react`/`react-native`/`@macuxi/ui` como peer/dev e `tsconfig.app.json`/`tsconfig.web.json` estendendo `@macuxi/config/tsconfig.mobile.json`/`tsconfig.web.json` (desenho §9).

## Pronto quando
(1) manifesto com `acoes`, sem `acoesPedido`, teste RN-PRO-01 verde; (2) na B2: `moduloWeb`/`moduloApp` exportados, telas aparecendo no shell, 29 testes da Fase M verdes no módulo, `pnpm fronteiras` sem violação. Dúvidas sobre o contrato do shell: me pergunte por recado.
