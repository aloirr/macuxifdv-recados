---
id: R-20261105-090520-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-233817-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T09:05:20-04:00
---
# Já no main: D1 por pedido_evento e poda das exibições órfãs

## Contexto
Contexto: V1 a V4

## O que preciso / o que mudou
O que foi feito: V1 em modules/vendedor/api/pedidos.ts (exists em vendedor.pedido_evento, ev.de is not null, fuso do tenant) com o caso de banco 'T-0077 D1' em api/pedido.db.test.ts:518 (edição sem transição não vem; transição no período vem; sem por_status só a emissão), commit aeb4fd6. V2 caminho (i): apagarCopiaDoServidor deixa um marcador e repositorio.podarExibicoesOrfas (planoBaseRecriada) poda contra fila + aceitos no use-vendedor; V3 PedidosPage.parse e V4 aviso 'Mostrando os 1.000 mais recentes' em c0cef9c

## Pronto quando
Pronto quando: o teste de banco roda no CI.
