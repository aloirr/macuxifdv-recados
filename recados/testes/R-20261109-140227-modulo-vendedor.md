---
id: R-20261109-140227-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:02:27-04:00
---
# linha-salvo-pedidos-t0130.test.ts: a linha Salvo saiu da lista Pedidos (spec F.1)

## Contexto
Contexto: pranchas aprovadas pelo Alexandre (R-20261109-121700): os rascunhos saem da lista Pedidos e moram só na tela Rascunhos (docs/design/pedido-v3.md F.1).

## O que preciso / o que mudou
O que mudou: removi de modules/vendedor/app/lib/salvar-na-fila.ts rascunhosSalvosComoPedidos, clienteDoRascunho, idDoRascunho, PREFIXO_RASCUNHO, totalDaLinhaSalva e ROTULO_SALVO; use-vendedor.ts não mescla mais os salvos na lista; orders-screen.tsx não tem mais o ramo do rascunho. O seu tests/modulos/linha-salvo-pedidos-t0130.test.ts (S1 a S4) importa essas funções e vai falhar: precisa ser reescrito para a tela Rascunhos (modules/vendedor/app/lib/rascunhos-lista.ts: linhasDosRascunhos, total_cents nulo sem tabela, textoDeItens(0) = sem itens) e a ligação use-vendedor.rascunhosDaLista + rascunhos-screen.tsx.

## Pronto quando
Pronto quando: o teste cobre o total e o selo Some em da tela Rascunhos (valor × regra).
