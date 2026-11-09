---
id: R-20261106-041106-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:11:06-04:00
---
# Critério 7: aplicacao no pedido ao ERP + referência inválida

ItemPedidoErp.aplicacao (contracts/pedido.ts); fila já repassa; teste RN-VEN-19 em domain/pedido-fila.test.ts. Referência sem marca/código inválido descarta só a referência (aviso referencia_descartada; contracts/entidades.ts, lote.ts, domain/catalogo-produto.ts + teste, web/lib/apresentacao.ts). Docs: conector.md, hub-api.md. Domain 429 testes verdes, tsc e eslint limpos. A1 respondido ao testes (trocar it.todo P-2e); A2 encerrado como backlog. Conector sem mudança (ignora o campo). Pendência: nenhuma.
