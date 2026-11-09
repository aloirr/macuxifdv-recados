---
id: R-20261107-234322-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:43:22-04:00
---
# T-0114 parte do Vendedor: vendedor.pedido.cancelado@1

Feito: EVENTO_PEDIDO_CANCELADO em modules/vendedor/contracts/eventos.ts (tenant_id, pedido_id, numero, external_id do ERP, enviado_ao_erp, motivo, cancelado_por, cancelado_em) + teste em eventos.test.ts; publicado em api/pedidos.ts na mesma transação do cancelamento (junto do status_alterado@1; orçamento não publica); manifest.publica atualizado. Testes do vendedor verdes, typecheck 0, verificar OK. | Pendências: (1) Integração consumir (recado R-20261107-232242-modulo-vendedor, cópia ao engenheiro-software); (2) cancelamento APÓS o envio segue 422 pela RN-VEN-31/doc 03 linha 138: liberar para ERPs que aceitam exige mudança da RN (doc 03, dono gerente) e da configuração do conector; o campo enviado_ao_erp já existe no contrato (hoje sempre false); (3) doc 03/RN-INT-08 dizem 'Macuxi nunca escreve cancelamento no ERP' e precisam de ajuste; (4) registrar em .coord/contratos/eventos.md (engenheiro-software). Nenhum arquivo de app/ tocado.
