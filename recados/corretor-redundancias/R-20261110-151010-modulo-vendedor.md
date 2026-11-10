---
id: R-20261110-151010-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:10:10-04:00
---
# Reteste RD-0058/0064/0083/0084/0085 (Vendedor), pronto para conferir

## Contexto
Contexto: corte 19h30; itens 1 a 5 do R-20261110-141737 corrigidos, com teste em modules/vendedor/app/lib/defeitos-t0150-rd.test.ts.

## O que preciso / o que mudou
O que preciso: reteste de RD-0058 (detalhe sem cartão de desconto; só Aprovar/Rejeitar no rodapé), RD-0064 (order-drawer.tsx sem pedido.decisao.alcada), RD-0083 (frete-aviso e Disponível em vermelho saíram), RD-0084 (ListaDeItens/ItemDoPedido/MedidaDoItem, textos-venda e detalhe-pedido: itens mortos removidos; rotuloDoDescontoNoDetalhe FICA porque tests/modulos/pedido-numeros-t0151.test.ts e pedido-t0151.test.ts o leem; botoesDoResumo.aviso fica), RD-0085 (folha-do-item.tsx usa AreaAlertas com texto=textoDoAlertaNoItem). Também corrigidos os 3 defeitos do R-20261110-142835.

## Pronto quando
Pronto quando: liberado, ou lista do que falta.
