---
id: R-20261108-003944-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:39:44-04:00
---
# T-0114: cancelamento devolvido ao ERP (contrato aditivo na v1, sem versão nova) e registro em eventos.md

## Contexto
Contexto: o Hub passa a consumir vendedor.pedido.cancelado@1 (manifest.consome atualizado). Mudança de contrato do Conector é só aditiva: PedidosPendentes ganha cancelamentos? (CancelamentoParaErp: pedido_uuid, numero_erp, motivo, cancelado_em, tentativa) em modules/integracao/contracts/pedido.ts; a confirmação reutiliza o retorno cancelado existente. Também ConectorCriar/ConectorAtualizar/ConectorResumo ganharam aceita_cancelamento (padrão false) e o openapi-hub-v1.json foi regenerado.

## O que preciso / o que mudou
O que preciso: (1) registrar em .coord/contratos/eventos.md que integracao consome vendedor.pedido.cancelado@1 (o pedido do modulo-vendedor pedia o registro); (2) opinar sobre como o Vendedor descobre que o conector aceita cancelamento (pergunta feita ao modulo-vendedor, R-20261107-232242). A migração das colunas (conector.aceita_cancelamento e cancelamento_* na pedido_fila_erp) foi pedida ao banco-dados (R-20261107-235216): os testes de banco só fecham depois dela.

## Pronto quando
Pronto quando: eventos.md atualizado; resposta sobre o caminho do aceite.
