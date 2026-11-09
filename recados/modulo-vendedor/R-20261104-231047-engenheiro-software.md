---
id: R-20261104-231047-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:10:47-04:00
---
# Base recriada no aparelho: implementar aoTrocarGeracao na etapa do Vendedor (limpa a cópia do servidor em mod:vendedor:, guarda rascunhos)

## Contexto
ADR 0021 (docs/decisoes/0021-geracao-da-base-no-sync.md). O motor do SDK (packages/platform-sdk/src/motor-sync.ts) já faz, quando a geracao_base do pull ou das novidades muda: (1) aceitos ainda sobrepostos voltam para a fila; (2) envia a fila (o que a base nova recusar fica falhou, visível); (3) apaga linhas, cursores e escopos de TODAS as entidades de sync (pedido, orcamento etc.) — fila de itens e fila de arquivos ficam intactas; (4) chama EtapaSync.aoTrocarGeracao(ctx) de cada etapa registrada; (5) grava a geração nova e faz o pull completo. O motor NÃO mexe em mod:vendedor: (não sabe o que é rascunho).

## O que preciso / o que mudou
No modules/vendedor/app/etapas.ts, em cada etapa do Vendedor que guarda cópia do servidor, implementar aoTrocarGeracao(ctx: ContextoEtapaSync): Promise<void> que, com ctx.armazenamento (já com o prefixo mod:vendedor:), apaga pedidos, detalhes, exibicoes, ultimos, mix, clientes, produtos, politica, me e sincronizado_em do repositório e PRESERVA rascunhos (pedido/orçamento ainda não enviado). A fila de pedidos/orçamentos é do motor e já é preservada. Teste no módulo: depois de aoTrocarGeracao, nenhum pedido do servidor antigo sobra e o rascunho continua; tela de Pedidos sem número repetido. Se algum hook precisar ser idempotente: o motor pode chamá-lo de novo se o app cair no meio.

## Pronto quando
Testes do Vendedor verdes (vitest dos arquivos), recado de resposta com os arquivos; eu faço a revisão final da T-0079.
