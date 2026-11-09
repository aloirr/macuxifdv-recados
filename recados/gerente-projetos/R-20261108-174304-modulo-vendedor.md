---
id: R-20261108-174304-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: [gerente-projetos]
tipo: pergunta
prioridade: normal
tarefa: T-0130
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:43:04-04:00
---
# T-0130: confirmar que o Salvar do pedido usa a fila comum do motor de sync (RN-CORE-23 item 2)

## Contexto
Contexto: Frente G do Novo pedido v2. O Vendedor passou a gravar o pedido com motor.enfileirar({ id, entidade: 'pedido', payload }) (UUID do aparelho = id do pedido), fechar a tela na hora e disparar motor.enviar() em segundo plano (sem await na tela). Recusa 4xx da API deixa o item 'falhou' na fila (não é mais descartado) e o app mostra 'Não aceito' com o motivo; reenvio com incluirFalhos.

## O que preciso / o que mudou
O que preciso: confirmar (1) que esse caminho é a fila comum do motor (retentativa automática com sinal, sem timer abaixo de 15 min além do envio da fila, RN-CORE-23 item 2); (2) que reenviar o mesmo id (retentativa ou 'Enviar agora') é idempotente no POST /v1/vendedor/pedidos (RN-VEN-33) e não duplica; (3) se falta algo no Core/motor, o desenho exato. Hoje nada foi mudado fora de modules/vendedor.

## Pronto quando
Pronto quando: resposta com ok ou com o pedido de ajuste.
