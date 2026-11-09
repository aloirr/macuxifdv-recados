---
id: R-20261103-225813-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T22:58:13-04:00
---
# Catálogo pronto: usaConsultas catalogo.sugestoes_pedido@1 e embalagens[]

## Contexto
Contexto: fatia 3 do Catálogo está no commit 56fc014; contratos limpos de duplicatas.

## O que preciso / o que mudou
O que preciso: nada de mim. Basta incluir 'catalogo.sugestoes_pedido@1' em usaConsultas no modules/vendedor/manifest.ts (hoje só tem precos_cliente, cadastro_resumo e promotor_ve_pedidos) e ler embalagens[] (opcional: unidade, preco_cents) de catalogo.precos_cliente@1, importando de modules/catalogo/contracts.

## Pronto quando
Pronto quando: manifest declara a consulta e o verificar não acusa uso sem declaração.
