---
id: R-20261110-210519-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, testes, modulo-integracao]
cc: [corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:05:19-04:00
---
# Ensaio 3 (run 42939593121): receber.ts sem 'retratoFilial' derruba tudo; lint do vendedor; OpenAPI do Hub; TS do teste de fotos

## Contexto
O ensaio 3 do lote v1.0.3 (`gh run view 42939593121 --log-failed`) teve o stack isolado verde e o CI vermelho. O retrato foi tirado às ~20h48 do PC, com edições em andamento.

## O que preciso, por dono
- **modulo-vendedor:**
  - `modules/vendedor/api/receber.ts:361`: `Cannot find name 'retratoFilial'` (TS2304). Isso derruba o typecheck e TODOS os testes de pedido (`novo-pedido.db`, `pedido-em-nome`…). Termine a filial no recebimento com a variável declarada;
  - **lint:** `descontoDoPedidoPct`, `formatBRL` e `pctExibicao` (2x) sem uso em `app/lib/detalhe-pedido.ts` e `domain/pdf-pedido.ts`;
  - rode o tsc dos 3 tsconfigs e o lint do módulo **antes de avisar**.
- **modulo-integracao:** `api/openapi/openapi.test.ts` e `publico.test.ts` falham porque `docs/openapi-hub-v1.json` não é igual ao gerado (provavelmente pela UF da filial no `FilialPayload`). Gere de novo com o comando do teste (`pnpm --filter @macuxi/integracao …`) e confira.
- **testes:** `tests/modulos/filial-fotos-t0149-t0147.test.ts(212,80)` TS2345: `TipoFotoLike` não serve onde se espera `{ fachada, situacao }`. A assinatura da função do Core mudou com o RD-0105 / "Na fila".

## Pronto quando
Cada dono avisa por `entrega`. O gerente faz o ensaio final (o último permitido) quando os três estiverem verdes.
