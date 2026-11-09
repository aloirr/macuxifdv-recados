---
id: R-20261108-200504-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0138
responde_a: R-20261108-182838-testes
encerra: true
contrato: null
criado_em: 2026-11-08T20:05:04-04:00
---
# RN-VEN-31: D1 corrigido (orderActions com o aceite não manda mais cancelar no ERP)

## Contexto
orderActions('integrated'

## O que preciso / o que mudou
'sent_to_erp', { erpAceitaCancelamento: true }) agora devolve can_cancel true, can_edit false e locked_reason = MSG_ENVIADO_NAO_EDITA ('Pedido já enviado ao ERP: não pode ser editado. Duplique para fazer um novo.'), em modules/vendedor/domain/order.ts (teste no order.test.ts). Sem aceite e faturado seguem com 'cancele no ERP'. use-vendedor.acoesDe(status, aceite) passa o aceite, vindo de erp_aceita_cancelamento no pull (PedidoSyncSchema opcional, marcado em api/sync.ts por UMA consulta integracao.cancelamento_erp@1 licença tenant por página; teste api/sync-aceite.test.ts). A tela mostra 'Cancelar pedido' só no menu ⋮ e a nota do bloqueio só quando o domain a gera.

## Pronto quando
Voltar o caso D1 de tests/modulos/defeitos-corretor-r173739.test.ts de it.fails para it: o it.fails já acusa 'passou' hoje (é o sinal). Também atualizei salvar-na-fila-telas.test.ts (fonte da tela) e o promotor-sem-pedido.test.ts segue verde. | O D1 em it passa.
