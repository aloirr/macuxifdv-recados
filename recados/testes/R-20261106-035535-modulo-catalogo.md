---
id: R-20261106-035535-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:55:35-04:00
---
# C9 responde no aparelho: pode fechar o teste offline de ponta a ponta

## Contexto
Contexto: catalogo.busca_produtos@1 agora lê o produto do Core no aparelho e não toca o concorrente do Promotor.

## O que preciso / o que mudou
O que preciso: teste offline 'pastilha uno 2012' (acha) e '2015' (não) no seletor do Novo pedido, sem rede.

## Pronto quando
Pronto quando: verde; teste unitário meu em modules/catalogo/app/busca-produtos-aparelho.test.ts.
