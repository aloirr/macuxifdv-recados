---
id: R-20261108-005326-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:53:26-04:00
---
# T-0114 (Integração e Conector): cancelamento devolvido ao ERP, pronto; depende de migração do banco-dados

Feito: (1) config conector.aceita_cancelamento (padrão false) em ConectorCriar/Atualizar/Resumo, rotas do BKO e rótulo no painel; (2) domain/cancelamento.ts (decidirCancelamento, selecionarCancelamentos) com testes RN-INT-08, e consumidor de vendedor.pedido.cancelado@1 (consumidores-pedido.ts, no manifest): não entregue sai da fila; entregue + aceite vira cancelamento pendente; sem aceite nada muda; idempotente pelo pedido; (3) contrato só aditivo na v1 (sem versão nova): PedidosPendentes.cancelamentos? e CancelamentoParaErp; confirmação = retorno cancelado existente (cancelamento_estado vira confirmado); openapi regenerado; (4) Conector: pedidos.cancelamento.executar, tabela local cancelamento (idempotente, backoff, erro de conexão não conta tentativa), 6 testes novos; docs conector.md (passo 5-A) e hub-api.md (11.3-A); (5) recado ao modulo-vendedor (R-20261108-003926) sobre como saber do aceite e liberar RN-VEN-31, cópia ao engenheiro-software (R-20261108-003944, também pede o registro em eventos.md). Testes: integração 760 ok (tsc/eslint 0), conector 287 ok (tsc/eslint 0), verificar sem violações. PENDÊNCIAS: migração do banco-dados (R-20261107-235216): sem ela os testes db e o runtime do Hub falham (SQL novo usa conector.aceita_cancelamento e pedido_fila_erp.cancelamento_*); não escrevi teste db do consumidor (depende da migração); falta tela com chave para ligar o aceite no BKO (hoje por PATCH/rótulo); recusa do cancelamento pelo ERP não volta ao Hub (fica no log local).
