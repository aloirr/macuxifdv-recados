---
id: R-20261106-073339-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:39-04:00
---
# T-0089 C1-C3: core.financeiro_cliente@1 (API e aparelho), prazo médio e formas no cliente, ficha do BKO

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md`. Suas fatias são C1 a C3 (§7). O cliente passa a ter as formas de pagamento permitidas (códigos, sem FK; regra 1) e o prazo médio máximo (RN-VEN-25). O card "Crédito do cliente" do Novo pedido usa a consulta nova do Core, que vale offline (RN-VEN-12/13).

## O que preciso
**C1. Contratos:**
- `core.financeiro_cliente@1`, com o schema exato do §3. Fica em `ofereceConsultas`, com implementação na API e no aparelho.
- No `ClienteSyncSchema` e no cliente da `core.cadastro_resumo@1`: `prazo_medio_max_dias?: int ≥ 0 | null` e `formas_pagamento?: string[] | null`.
- No manifesto: `usaConsultasOpcionais` com `vendedor.formas_pagamento@1` (ADR 0019).

**C2.**
- Na API e no aparelho (`implementarConsultaAparelho`), a consulta lê só `cliente_financeiro` e `titulo` e reusa o `resumoFinanceiro` do `domain/cliente360.ts`. O "hoje" é a data no fuso do tenant.
- O pull do cliente leva os 2 campos.
- O consumidor de `integracao.cliente.atualizado@1` grava os 2 campos (ausente = não altera; `null`/`[]` = limpa).

**C3.**
- Na ficha do cliente do BKO: "Prazo médio (dias)" e as formas permitidas.
- A lista de formas vem da `vendedor.formas_pagamento@1`. Se ela estiver indisponível, as formas ficam escondidas e o prazo médio aparece.

## Pronto quando
- O teste do contrato cobre o consumidor antigo.
- A consulta responde offline no aparelho, e o cliente com título vencido da demo traz `vencidos_qtd`, `vencidos_cents` e `maior_atraso_dias`.
- A tela tem teste.
- Quando mudar o manifesto, me avise: eu atualizo o espelho.
