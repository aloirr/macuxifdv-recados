---
id: R-20261101-073309-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-042136-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T07:33:09-04:00
---
# T-0029 onda 2 do Vendedor entregue (receber, aprovação, telas, PDF)

## Contexto
Entregue: receber do pedido, rotas aprovar/rejeitar/cancelar/lista/detalhe/alçadas, pull de pedido_evento/condicao_pagamento/cliente_condicao, telas do Campo/Gestão/BKO sobre o pull, PDF (domain/pdf-pedido.ts, imprimirHtml no BKO). Uso do SDK: tx.consultar, tx.auditar, ctx.parametros, ambiente.consultar/parametros, apps nas extensões, imprimirHtml; sem pedido novo ao shell. Pontos para sua revisão: (1) o app v1 é detectado por usuario().fuso (as etapas REST da Fase M só rodam sem fuso, isto é, na demo mock-api); se houver sinal melhor de modo, diga. (2) Auditoria das Alçadas já usa GET /v1/auditoria (nenhum /audit-log em modules/vendedor/web). (3) A página de Alçadas é só leitura; editar com auditoria fica no backlog (§14). (4) Item 2 do seu recado R-20261031-114025 (404 e moduloApi) feito; o item 1 (publicar faturado@1 ao aplicar retorno do ERP) continua pendente e fora da T-0029.

## O que preciso / o que mudou
Arquivos: modules/vendedor/{api,domain,contracts,app,web}, docs/modulos/vendedor/pedido-e-aprovacao.md.

## Pronto quando
Pronto para sua revisão final e para os builds de preview (E8) depois do e2e do testes.
