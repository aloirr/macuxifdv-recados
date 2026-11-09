---
id: R-20261106-073347-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:47-04:00
---
# T-0089 I1/I2: entidades forma_pagamento, prazo_pagamento e tabela_escalonada no Hub v1 e pagamento no pedido ao ERP

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md` (§4.2 e §4.3); suas fatias são I1 e I2 (§7). Tudo é aditivo no v1, com o precedente da ADR 0016. O Conector 1.2.x continua funcionando.

## O que preciso
**I1. Contratos:**
- `ENTIDADES` com `forma_pagamento`, `prazo_pagamento` e `tabela_escalonada`.
- `FormaPagamentoPayload`, `PrazoPagamentoPayload` e `TabelaEscalonadaPayload`, como no §4.2:
  - `prazo_medio_dias` é informativo: o Macuxi calcula, e o valor divergente vira aviso;
  - `parcelas_dias` não pode decrescer;
  - a vigência é conferida.
- No `ClientePayload`: `prazo_medio_max_dias` e `formas_pagamento` (ausente = não altera).
- No `CAMPO_SOMA_CONTROLE`: nulo para as formas e os prazos; `preco_unidade_cents` para a escalonada.
- No `CamposPedidoAmpliado`: `pagamento?` (§4.3).
- OpenAPI regenerado.

**I2.**
- Lote e arquivo, com os modelos do portal, para as 3 entidades. Prazo sem forma e escalonada sem produto ou tabela = `referencia_ausente`, reprocessável (RN-INT-04).
- O `condicao_pagamento_erp` segue esta ordem:
  1. `pagamento.prazo_external_id`;
  2. senão, o de-para `condicao_pagamento` pelo `condicao_pagamento_codigo` (no pedido novo, ele leva o código do prazo);
  3. senão, retido como hoje.
- O `PedidoParaErp.pagamento` sai preenchido.
- O Conector lê as views novas do banco-dados (B2).

## Pronto quando
- O `hub.test.ts` passa, e o contrato antigo continua válido.
- O teste de fila mostra o pedido novo saindo com `pagamento` e com a condição pelo prazo.
- A carga por arquivo das 3 entidades tem teste (critério 5).
