---
id: R-20261031-124824-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0007
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:48:24-04:00
---
# T-0007 🟡 aplicados, desenho do faturado@1 (T-0011) e API verde com banco

## Contexto
Escopo da rodada: (1) os 🟡 da revisão da T-0007, (2) o desenho da publicação de vendedor.pedido.faturado@1, (3) apps/api/test/banco.test.ts com a fixture nova.

## O que preciso / o que mudou
O que fiz: (1) .coord/contratos/modulos.md atualizado: vendedor depende de core e catalogo; catalogo com assistente; pesquisa e treinamento com admin. packages/platform-sdk/src/manifestos-referencia.test.ts em dia com os 8 manifestos reais (com promotor e treinamento), mais 2 testes novos (RN-CORE-03 Catálogo→Vendedor; faturado@1 publicado e consumido); está à frente do real só no core e no catálogo (integracao.produto.atualizado@1) e no treinamento (consome faturado@1), cada um com comentário e recado. ADR 0005: Transição concluída e adendo do que a T-0007 entregou. Recados ao modulo-core (R-20261031-123826) e ao modulo-catalogo (R-20261031-123834) sobre integracao.produto.atualizado@1. Revisão da T-0007 encerrada sem 🔴 (R-20261031-123858). (2) docs/desenho/T-0011.md com o fluxo Hub → outbox → despachante → consumidor do Vendedor → faturado@1 na outbox. Decisão: o RetornoErp do Conector e o retorno_erp@1 ganham itens_faturados opcional [{sequencia, quantidade}], compatível pela RN-INT-09 e ainda @1; parcial sem itens NÃO publica; o total cobre o saldo. .coord/contratos/eventos.md atualizado. Recados ao modulo-integracao (R-20261031-123752) e ao modulo-vendedor (R-20261031-123809; ele pede as tabelas ao banco-dados). (3) A fixture do banco-dados chegou. Ajustei as expectativas de banco.test.ts e também app.test.ts e sync.test.ts, que quebraram com o Core real da Fase 2 (carteira em servicos; provedor de sync de cliente). apps/api/src/outbox.ts grava usuario_id/request_id (migração 0003), com teste. Checks: pnpm --filter api test com Postgres 37/37; lint + typecheck da raiz 36/36 tarefas; fronteiras sem violação; test da raiz 17/18: só falha @macuxi/core#test (api/autenticacao.test.ts, bloqueio RF-CORE-01), que é trabalho em andamento do modulo-core. Todo o resto passa, inclusive db 124 e tests/ 170. verificar engenheiro-software OK.

## Pronto quando
Pendências: (a) push depende do @macuxi/core#test verde (modulo-core). (b) MACUXI_PG_WORKER_SENHA no .env.example da raiz, pedido do banco-dados (R-20261031-123347): a leitura do arquivo foi negada nesta sessão; peço que você ou o Alexandre acrescentem a linha. (c) Despachante da outbox + consumidores no SDK (ADR 0007; desenho T-0011 §4) precisam de tarefa para mim. (d) Pedido do core R-20261031-121740 (ErroHttpModulo, ctx.dependencias): respondi que entra na minha próxima rodada. (e) Revisões abertas na minha caixa e fora deste escopo: T-0005 (guardião do Bash) e T-0012 (Pesquisa). (f) pnpm-lock.yaml aparece alterado; não rodei install; veio de outro agente (core/package.json). Premissas: a quantidade do pedido Macuxi é inteira (unidade de venda); a sequência do pedido_item é estável.
