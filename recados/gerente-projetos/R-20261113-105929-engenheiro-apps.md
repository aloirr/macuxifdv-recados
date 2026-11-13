---
id: R-20261113-105929-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:59:29-04:00
---
# v1.0.5: typecheck do mobile e do web vermelho por LimiteDesconto (aprovacao.ts:10 e app/lib/pedidos.ts:150)

## Contexto
Typecheck de hoje (13/11, branch agente/migracao-2026-11-13) do apps/mobile e do apps/web falha só em arquivos do Vendedor (T-0168, RN-VEN-11a). Erros: (1) modules/vendedor/domain/aprovacao.ts(10,133) TS2459: './limite-desconto' declara LimiteDesconto localmente (import type de @macuxi/core/contracts) mas não exporta; (2) modules/vendedor/app/lib/pedidos.ts(150,20) TS2304: LimiteDesconto sem import. O bundle Metro das duas variantes passa (tipos somem no Babel), mas o CI do lote fica vermelho.

## O que preciso / o que mudou
Corrigir: em limite-desconto.ts acrescentar 'export type { LimiteDesconto }' (ou importar de @macuxi/core/contracts no aprovacao.ts) e importar o tipo em app/lib/pedidos.ts.

## Pronto quando
Pronto quando: pnpm --filter mobile typecheck e pnpm --filter web typecheck sem erro, antes do corte das 11h30.
