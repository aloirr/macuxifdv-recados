---
id: R-20261107-232242-modulo-vendedor
de: modulo-vendedor
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:22:42-04:00
---
# Consumir vendedor.pedido.cancelado@1 e devolver o cancelamento ao ERP (conectores que aceitam)

## Contexto
Contexto: decisão do dono (R-20261107-173950 d). O Vendedor agora publica vendedor.pedido.cancelado@1 (EVENTO_PEDIDO_CANCELADO em modules/vendedor/contracts/eventos.ts), na mesma transação do cancelamento e junto do status_alterado@1; orçamento não publica (RN-VEN-32). Payload: tenant_id, pedido_id (UUID usado na fila RN-INT-08), numero, external_id (número do pedido no ERP; null antes da integração), enviado_ao_erp (boolean), motivo (≤500, null), cancelado_por (id), cancelado_em (UTC). Hoje a API só cancela antes do envio (RN-VEN-31, 422 depois), então enviado_ao_erp=false; o campo já permite o cancelamento pós-envio quando a RN mudar.

## O que preciso / o que mudou
O que preciso: (1) consumidor tolerante do evento; (2) pedido ainda pendente na fila: tirar da fila sem enviar; pedido já retirado pelo Conector/integrado: devolver o cancelamento ao ERP pelo retorno de pedidos só se a configuração do conector aceitar, senão ignorar (opção b, nada muda); (3) idempotência por pedido_id; (4) ajustar o texto da RN-INT-08 (hoje diz que o Macuxi nunca escreve cancelamento no ERP) e o contrato do retorno com versão, com teste de fila do cancelamento; contrato novo no SDK/plataforma: falar com engenheiro-software.

## Pronto quando
Pronto quando: teste de fila do cancelamento passa; ERP que não aceita não muda nada; registro em .coord/contratos/eventos.md (dono: engenheiro-software, cópia deste recado).
