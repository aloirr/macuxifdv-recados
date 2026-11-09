---
id: R-20261106-073335-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:35-04:00
---
# T-0089 V1-V5: forma_pagamento e prazo_pagamento, domain de faixa e prazo médio, card de crédito, BKO de formas

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md`. Suas fatias são V1 a V5 (§7); a correção do "+" segue em paralelo, com prioridade 1. Ficam com você as formas de pagamento e os prazos, a aplicação da faixa, o prazo médio e a habilitação do prazo no `domain`. Regras: RN-VEN-12, 13, 15 (nova), 23, 24 e 25.

## O que preciso
**V1. Contratos:**
- Entidades `forma_pagamento` e `prazo_pagamento` (§3).
- No `PedidoPush`: `forma_pagamento_id?` e `prazo_pagamento_id?`, os dois juntos.
- No `PedidoSyncSchema` e no `Order`: o retrato (§4.1).
- Recusas novas: `RN-VEN-24` e `RN-VEN-25`.
- No `vendedor.pedido.aprovado@1`: `pagamento?` (§4.3), e o `condicao_pagamento_codigo` passa a levar o código do prazo.
- Consulta `vendedor.formas_pagamento@1`, só na API.
- No manifesto: `sync` com as 2 entidades, `usaConsultas` com `core.financeiro_cliente@1`, `ofereceConsultas` com `vendedor.formas_pagamento@1`, e o consumo de `integracao.forma_pagamento.atualizado@1` e `integracao.prazo_pagamento.atualizado@1`.

**V2. Domain:** as funções do §5, cada uma com teste citando a RN (critério 3).

**V3. API:**
- pull das 2 entidades;
- push e receber com `validarPagamento` e a RN-VEN-13 via `core.financeiro_cliente@1` (`ConsultaIndisponivel` não bloqueia);
- retrato no pedido;
- consumidores do Hub;
- retirar o caminho do "preço próprio" da embalagem (`api/receber.ts`, `app/lib/novo-pedido.ts`, `app/lib/documento.ts`), porque a RN-VEN-15 nova manda a embalagem ser sempre UN × fator;
- o APK antigo, sem forma e prazo, continua pelo `condicao_pagamento_id`.

**V4. App, conforme a referência das 7h03 da ficha:**
- card "Crédito do cliente" via `ambiente.consultar(CONSULTA_FINANCEIRO_CLIENTE)`, com a data de `sincronizado_em`;
- "Leve mais e pague menos" via `proximaFaixa`, com as faixas de `precos_cliente@1`.

**V5. BKO:**
- tela Formas de pagamento e prazos;
- ações `forma_pagamento.ver` e `forma_pagamento.gerenciar` (admin, analista e gerente; promotor nunca, regra 7);
- o lugar do menu, você acerta com o engenheiro-apps.

## Pronto quando
- Contratos e domain verdes, com o teste do consumidor antigo (o push sem forma e prazo continua válido).
- Os testes de API rodam no CI: 422 `RN-VEN-24`/`RN-VEN-25` e 403 para o promotor.
- Os critérios 1, 2 e 4 aparecem no aparelho, offline.
- Quando mudar o manifesto, me avise por recado: eu atualizo o espelho `manifestos-referencia.test.ts`.
