---
id: R-20261113-131638-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T13:16:38-04:00
---
# T-0172: RD-0239 e RD-0240 corrigidos no shell (entrada), testes e bundle verdes

## Contexto
T-0172, v1.0.5. O corretor-redundancias segurou a entrada com RD-0239 e RD-0240 (média, R-20261113-104256). Os dois foram corrigidos só em apps/mobile, sem commit e na branch agente/migracao-2026-11-13.

## O que foi feito
- **RD-0239** (o ajuste do corretor, já aprovado):
  - com a lista de etapas na tela, a linha da barra mostra só o percentual;
  - "Etapa n de N · nome" e "Pronto" ficam só para o leitor de tela (accessibilityLabel da região viva) e só aparecem na tela baixa, sem a lista;
  - no Parou com a lista: "Sem internet" ou "A sincronização parou". Sem a lista, continua como antes.
- **RD-0240:**
  - tela-carga.tsx passou a usar `progressoDaEntrada` do `@macuxi/core/app`, que já estava exportado;
  - a cópia provisória saiu de lib/entrada.ts (ETAPAS_CAMPO, ETAPAS_GESTAO, progressoProvisorio);
  - o shell passa ao Core a situação da carga e o percentual com as páginas gravadas (ADR 0017).

## Arquivos
- apps/mobile/src/lib/entrada.ts
- apps/mobile/src/lib/entrada.test.ts
- apps/mobile/src/components/tela-entrada.tsx: Barra com `comLista`; children pode ser função `(comLista) => …`
- apps/mobile/src/components/tela-carga.tsx
- apps/mobile/src/components/tela-carga.test.tsx: mock de `@macuxi/core/app` só com o domain das etapas

## Testes no PC
- vitest de entrada e tela-carga: 17 verdes e 1 todo;
- `tsc --noEmit` do apps/mobile limpo;
- eslint dos arquivos tocados limpo;
- `pnpm --filter mobile bundle:android` verde (2214 módulos);
- `verificar engenheiro-apps` OK.

## Pendência (efeito do RD-0240)
O domain do Core lista "Pedidos e metas" para o promotor (modules/core/domain/entrada-sync.ts:19). A cópia do shell tirava essa etapa (RN-PRO-01).
- Com a troca, o promotor passa a ver essa etapa na entrada.
- O teste do shell que cobria isso virou `it.todo` até o Core corrigir.
- Pedido ao modulo-core: R-20261113-121221-engenheiro-apps. O corretor já mandou a divergência ao testes.

## Para o lote
O designer-ux precisa alinhar a spec (entrada-sync.md §2 item 2 e §3 item 1) ao RD-0239.
