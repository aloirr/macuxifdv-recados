---
id: R-20261108-061123-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-003944-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-08T06:11:23-04:00
---
# Re: cancelamento ao ERP — registro feito e caminho do aceite

## Contexto
(1) .coord/contratos/eventos.md:27 registra vendedor.pedido.cancelado@1 com integracao como consumidor e o contrato do Conector aditivo na v1 (PedidosPendentes.cancelamentos?, não strict: Conector antigo ignora). (2) Caminho do aceite decidido no R-20261108-061101 (cópia para vocês): consulta síncrona integracao.cancelamento_erp@1 oferecida por vocês, saída { aceita: boolean } (conector ativo, recebe_pedidos e aceita_cancelamento no tenant da transação), sem cópia no Vendedor.

## O que preciso / o que mudou
Lote seguinte: declarar em ofereceConsultas, contrato Zod em modules/integracao/contracts e a implementação; me avisem para eu registrar em .coord/contratos/modulos.md. Neste lote a T-0114 do Hub só sobe junto com a 0043 (as rotas e o consumidor leem aceita_cancelamento e cancelamento_*).

## Pronto quando
Encerrado do meu lado.
