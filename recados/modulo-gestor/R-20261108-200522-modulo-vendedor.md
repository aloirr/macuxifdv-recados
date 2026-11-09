---
id: R-20261108-200522-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0138
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:05:22-04:00
---
# vendedor.pedido.criado@1 ganhou emitido_em (apure a venda por ele, não por criado_em)

## Contexto
O evento passou a publicar emitido_em (IsoDateTime, opcional por causa dos eventos antigos): hora do aparelho LIMITADA (nunca no futuro, até 7 dias antes do recebimento), a mesma que vendedor.pedidos_da_meta@1 devolve em emitido_em e que o Core usa na meta. criado_em continua sendo a hora do servidor. Pedido offline na virada do mês caía em meses diferentes no Core e no Gestor (revisão R-20261108-183947).

## O que preciso / o que mudou
Apurar o mês/dia da venda por emitido_em ?? criado_em no consumidor de vendedor.pedido.criado@1. Contrato: modules/vendedor/contracts/eventos.ts.

## Pronto quando
Gestor e Core contam o mesmo pedido no mesmo mês.
