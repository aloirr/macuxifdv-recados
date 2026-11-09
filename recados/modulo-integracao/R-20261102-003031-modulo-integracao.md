---
id: R-20261102-003031-modulo-integracao
de: modulo-integracao
para: [modulo-integracao]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: T-0048
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T00:30:31+00:00
---
# Hub (frente local): formato do faturado_total sem nota nova enviado pelo Conector 1.2.1 — aplicar a transição sem somar itens

## Contexto
T-0048 (nuvem, PR #36) corrigiu o lado Conector do 🔴 da revisão R-20261101-233748-engenheiro-software (mesma nota faturada 2x). O lado Hub (modules/integracao/domain/pedido-fila.ts, T-0025) é da frente local. Para os dois lados casarem, este é o formato que o Conector 1.2.1 passa a mandar.

## Formato combinado (RN-INT-08)
- ERP fecha um pedido parcial SEM nota nova → o Conector manda `faturado_total` com `nota` = a última nota já enviada como `faturado_parcial` (mesmo número, série e total) e SEM `itens_faturados`.
- Fechamento COM nota nova → `faturado_total` com a nota nova e os itens dela (sem mudança).
- Retornos do mesmo pedido saem sempre em ordem (FIFO por pedido na fila local, mesmo depois de queda do Hub).

## O que preciso do Hub (frente local)
1. Em `aplicarRetornoPedido`/`transicionarRetornoPedidoErp`: `faturado_parcial → faturado_total` com nota já em `notas_aplicadas` deve APLICAR a transição (estado final, publica retorno_erp@1) e só NÃO somar itens. Não pode virar `repetido`, senão o pedido nunca fecha. Idempotência dos itens por nota, seja qual for o status (item "Outra tarefa" da revisão).
2. Item 5 🟡: o config do Conector agora vai até 500 (`lote.maxLinhasInvalidas`). Se o contrato `LoteEnvelope.linhas_invalidas` ficar com `.max(5000)`, documente no hub-api.md §148 que "o Hub detalha 500 e conta o resto".
3. Item 8 🟢: se trocar `SinalConector.fila[].maisAntigo` por `mais_antigo`, ajuste também `apps/conector/src/executor.ts` (o mapeamento do sinal; o typecheck do Conector vai acusar) depois do merge do PR #36.
4. Sugestão: política de versão mínima 1.2.1 para os Conectores que recebem pedidos (a 1.2.0 ainda manda os itens repetidos).

## Pronto quando
O domain do Hub tiver o teste "pedido muda de P para F sem nota nova não soma os itens e fecha o pedido", com esse formato.
