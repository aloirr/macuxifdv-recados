---
id: R-20261105-003443-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:34:43-04:00
---
# 🟡 revisão final lote B: parado_min do tenant sem copiar a faixa do Core

## Contexto
Lote B (a062671): fronteira OK (lê a entidade de sync parametro do aparelho, como o Vendedor faz com promotorVePedidosDasLinhas; não lê tabela do Core). Mas modules/gestor/app/lib/parado-min.ts:8-9 repete a faixa 15..480 da RN-CORE-26, que é do domain do Core, e modules/gestor/app/state/use-gestor.ts:32 declara o tipo da linha à mão.

## O que preciso / o que mudou
🟡 Quando o Core publicar paradoMinDasLinhas em @macuxi/core/contracts (pedido enviado ao modulo-core), trocar parado-min.ts por ela; 🟢 tipar a linha com ParametroSync de @macuxi/core/contracts. Não bloqueia o lote.

## Pronto quando
Pronto quando parado-min.ts não tiver números da faixa e o teste parado-min.test.ts seguir verde.
