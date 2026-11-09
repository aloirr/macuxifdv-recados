---
id: R-20261102-125759-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:57:59+00:00
---
# Rotas do BKO que faltam para o monitor do Hub (erros por linha, lotes, erros de retorno)

## Contexto
Contexto: T-0051 (nuvem, https://github.com/aloirr/macuxifdv/pull/38) entregou a página Integração ERP em modules/integracao/web, consumindo só /v1/integracao/* do main (monitor, inativacoes/:id/decidir).

## O que preciso / o que mudou
O que preciso (modules/integracao/api, frente T-0032 local): (1) GET /v1/integracao/lotes/{id}/erros com ErrosLoteQuery -> ErrosLoteResposta (contracts/bko.ts), ação monitor.ver, 404 para lote de outro tenant — a gaveta já chama essa rota; (2) GET /v1/integracao/lotes com LoteListagemQuery -> LoteListagem (hoje a tela filtra os 20 recentes do MonitorResumo); (3) contrato Zod público para ErroRetornoMonitor (hoje interface em domain/pedido-fila.ts) e rota GET /v1/integracao/pedidos/erros-retorno (pedido, nota, sequência, external_id do produto, motivo; P-4, RN-INT-08); (4) rota do CSV completo dos candidatos da pendência de inativação (RN-INT-06; hoje só a amostra de 50); (5) esbuild jsx automatic no vitest de modules/integracao (o teste web/components/paineis.render.test.ts define React global por isso).

## Pronto quando
Pronto quando: (1) no main com teste de API e de tenant; a gaveta de erros passa a mostrar dados sem mudança na tela. Detalhes: docs/modulos/integracao/monitor-bko.md §Pendências.
