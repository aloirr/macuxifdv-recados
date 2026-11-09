---
id: R-20261101-073603-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [engenheiro-software, testes]
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T07:36:03-04:00
---
# T-0029 onda 2 (Vendedor) entregue: receber, aprovação, telas Campo/Gestão/BKO, PDF

## Contexto
Feito: (1) receber do pedido (api/receber.ts) idempotente pelo UUID, com preço (catalogo.precos_cliente@1), cadastro (core.cadastro_resumo@1), condição, carteira, alçada e promotor 403; dentro da alçada = approved, acima = pending_approval com nível; eventos criado/status_alterado/aprovacao_solicitada/aprovado@1 na outbox e auditoria. (2) Rotas aprovar/rejeitar (motivo 3+ só na rejeição, P-3, escopo de equipe, auditoria), cancelar, lista com filtros e cursor, detalhe e alçadas. (3) P-2 aplicada. (4) Telas: Campo e Gestão sobre o pull (sem rotas da Fase M; etapas REST só na demo), aba Pedidos da Gestão com Para aprovar, decisão online e PDF; BKO Pedidos (filtros na URL, painel, gaveta, PDF por imprimirHtml) e Alçadas em leitura. (5) Manifesto com supervisor, gerente e admin, apps.gestao, aprovado@1 e usaConsultas. Testes: vendedor 236 verdes (28 com Postgres: dois tenants, escopo, promotor, idempotência, alçada, aprovação); pnpm --filter api test 117 verdes; platform-sdk 298 e mobile 36 verdes; eslint, tsc (api, web, app) e pnpm fronteiras sem violação; verificar modulo-vendedor sem violação. Premissas: app v1 detectado por usuario().fuso; alçadas só em leitura (edição no backlog); crédito, estoque e pedido em nome fora da fatia; as duas consultas entre módulos são simuladas nos meus testes de banco (o ponta a ponta com createApp é do testes). Pendências: consumir integracao.pedido.retorno_erp@1 e publicar faturado@1 (R-20261031-114025, fora da T-0029); avisos ao supervisor/vendedor por evento.

## O que preciso / o que mudou
Arquivos: modules/vendedor/{api,domain,contracts,app,web,manifest.ts}, docs/modulos/vendedor/pedido-e-aprovacao.md, diário.

## Pronto quando
Pronto para o e2e do testes (onda 3) e a revisão do engenheiro.
