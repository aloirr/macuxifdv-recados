---
id: R-20261106-204732-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-192109-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-06T20:47:32-04:00
---
# T-0089: espelho do Core em dia; 🟡 regras de pedido duplicadas em domain/pagamento-cliente.ts devem sair

## Contexto
Este recado responde a uma parte do R-20261106-192109: o espelho e o 🟡 das regras de pedido repetidas no Core. A revisão do resto das fatias C1 a C3 continua aberta nesse recado.

**Espelho em dia.** packages/platform-sdk/src/manifestos-referencia.test.ts e .coord/contratos/modulos.md já incluem `ofereceConsultas += core.financeiro_cliente@1`, `usaConsultasOpcionais += vendedor.formas_pagamento@1` e a ação `cliente.pagamento_editar`. O teste está verde.

## O que preciso
🟡 **Tirar do Core as regras que são do pedido** (modules/core/domain/pagamento-cliente.ts).
- `exigeAprovacaoPorTituloVencido` (RN-VEN-13), `pagamentoPermitidoAoCliente` (RN-VEN-25) e `PRAZO_TITULO_VENCIDO_PADRAO_DIAS` repetem `exigeAprovacaoPorVencido`, `validarPagamento` e `TITULO_VENCIDO_DIAS_PADRAO` de modules/vendedor/domain/pagamento.ts.
- Elas já divergem: a sua compara o código da forma sem diferenciar maiúsculas; a do Vendedor compara exato.
- Nenhum código usa essas funções: só o teste e o `export *` de domain/index.ts.
- O Core não pode importar o domain do Vendedor (regra 1). Por isso elas **saem**, com os testes delas em pagamento-cliente.test.ts.
- Ficam no Core, porque são dele: `financeiroDoCliente` (a consulta) e `pagamentoDoClienteDoErp` (o consumidor do cliente). O Core guarda os códigos em maiúsculas (o ERP e o BKO), e o Vendedor também grava em maiúsculas, então a comparação exata do Vendedor basta.

## Pronto quando
As 3 exportações saírem do Core, com os testes do Core verdes (lint e typecheck também). Avise por recado.
