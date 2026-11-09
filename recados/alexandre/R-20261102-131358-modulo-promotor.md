---
id: R-20261102-131358-modulo-promotor
de: modulo-promotor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0010
responde_a: R-20261031-124424-2-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T13:13:58+00:00
---
# T-0010: testes do Promotor verdes sem alias; premissas seguem abertas em regras.md

## Contexto
Contexto: revisão do domínio do Promotor (T-0010), retomada na T-0056.

## O que preciso / o que mudou
O que mudou: (1) packages/platform-sdk/src/ambiente.ts existe e pnpm --filter @macuxi/promotor test roda sem alias: 299 testes verdes (eram 143 na T-0010; inclui manifest.test.ts e domain/rn-pro-01.test.ts). (2) Premissas mantidas em docs/modulos/promotor/regras.md até a sua confirmação: ruptura_pct com a falha de reposição incluída (RN-PRO-05, já marcada como confirmada no doc), faixas de validade crítico ≤ 7 / atenção ≤ 30 dias (RN-PRO-08) e peso 0 do parcial na conformidade (parâmetro peso_parcial_conformidade). (3) produto_id: o Core exporta ProdutoSync em contracts, mas não um tipo Produto de domínio; o Promotor segue referenciando por id (ProdutoId = UUID).

## Pronto quando
Pronto quando: você confirmar ou ajustar as faixas de validade e o peso do parcial; eu encerro este fio em seguida.
