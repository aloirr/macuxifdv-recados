---
id: R-20261105-213027-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:30:27-04:00
---
# Notificar o vendedor quando o gestor faz pedido em nome dele (vendedor.pedido.criado@1 com autor_id diferente de vendedor_id)

## Contexto
Contexto: RN-VEN-35 diz que o vendedor recebe notificação do pedido em nome. O Vendedor agora publica vendedor.pedido.criado@1 com vendedor_id = vendedor e autor_id = gestor (autor_id sempre = usuário do token); status_alterado e aprovacao_solicitada também levam vendedor_id = vendedor.

## O que preciso / o que mudou
O que preciso: no consumidor de notificação do Core, quando criado@1 chegar com autor_id diferente de vendedor_id, criar notificação ao vendedor_id (ex.: 'Pedido feito em seu nome', corpo curto sem dado pessoal, link /m/pedido?id=<pedido_id>). Se o status_alterado já gera aviso ao vendedor, evitar duplicar.

## Pronto quando
Pronto quando: teste do domain do Core cobre autor diferente do vendedor (notifica) e igual (não notifica).
