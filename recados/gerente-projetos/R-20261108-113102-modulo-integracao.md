---
id: R-20261108-113102-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T11:31:02-04:00
---
# T-0114: aviso no monitor quando o ERP recusa o cancelamento (+ D-1); depende da 0047

## Contexto
T-0114, item "aviso no monitor quando o ERP recusar o cancelamento" (R-20261108-090349) e D-1 (R-20261108-094400).

## O que fiz
1. Contrato (aditivo na v1): `RetornoErp.status` aceita `cancelamento_recusado` com `motivo` obrigatório (até 300; itens faturados não valem). Só existe no corpo do retorno do Conector: NÃO entra em `StatusRetornoErp`, `EstadoPedidoErp`, `pedido_retorno` nem em `retorno_erp@1`. Conector antigo, sem o campo, segue válido. OpenAPI regenerado.
2. Domain: `aplicarCancelamentoRecusado` (domain/cancelamento.ts): só vale para cancelamento `enviado`; repetição idempotente; 422 em português (`cancelamento_nao_solicitado`, `_nao_entregue`, `_ja_confirmado`, `pedido_desconhecido`). Alerta novo `cancelamento_recusado` (atenção) em `montarAlertasMonitor` com pedido, número do ERP e motivo (3 primeiros + "e mais N"); some quando o ERP informa `cancelado` (confirma).
3. API: `retornoPedido` desvia a recusa (grava `cancelamento_estado='recusado'` + motivo + hora, estado do pedido intacto, publica `integracao.pedido.cancelamento_recusado@1` na mesma transação); `bko-monitor.ts` consulta os recusados do tenant e alimenta o alerta (visível a quem já tem `monitor.ver`, ADR 0033, sem ação nova). Evento no manifest.publica.
4. Conector (apps/conector/src/pedidos.ts): ao esgotar as tentativas do `pedidos.cancelamento.executar` envia o retorno `cancelamento_recusado` com o motivo mascarado.
5. Web: alerta aparece no AlertasPanel (já genérico) e no PedidosPanel ("Cancelamento recusado"); teste de renderização.
6. D-1: `configuracaoDoTenant: true` em `integracao.cancelamento_erp@1` (recado ao modulo-vendedor, que pode trocar para licença 'tenant').
7. Docs: hub-api.md, conector.md, monitor-bko.md.

## Testes e verificações
- Novos (RN-INT-08 / exceção T-0114): domain/cancelamento.test.ts (6), domain/monitor.test.ts (2), contracts/cancelamento.test.ts (5), api/rotas-pedidos.test.ts (5: com e sem o campo novo, idempotência, 422, multi-tenant, sem insert em pedido_retorno nem retorno_erp@1), web/components/paineis.render.test.ts (2), apps/conector/test/pedidos.test.ts (recusa enviada). Banco: caso novo em api/consumidores.db.test.ts (recusa, idempotência, tenant B, cancelado posterior), só no CI.
- lint e typecheck verdes em @macuxi/integracao e @macuxi/conector; testes do conector 31/31; do módulo 784 verdes, sem falha de lógica. Com a máquina muito carregada, 1 teste de timeout de 30 s (openapi.test.ts, compilação ajv do meta-schema, não relacionado) estourou nas duas rodadas completas; o teste de deriva do OpenAPI passou. `verificar modulo-integracao`: sem violações.

## Pendências
- DEPENDE da migração 0047 do banco-dados (R-20261108-095741): colunas `cancelamento_recusado_em`, `cancelamento_recusa_motivo` e CHECKs para o estado 'recusado'. Sem ela, a recusa em produção falha no update e o monitor falha na consulta; os testes de banco do CI também. Ordem: 0047 antes do deploy desta entrega.
- engenheiro-software: registrar o evento em .coord/contratos/eventos.md (R-20261108-103541).
- O1/O2 respondidos ao agente testes (R-20261108-103459): O1 premissa, O2 limite documentado (aceite desligado com pendente não alerta).
- Conector: nova versão do pacote só quando o gerente decidir o build (comportamento novo é aditivo).
