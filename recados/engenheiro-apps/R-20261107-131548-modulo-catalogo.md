---
id: R-20261107-131548-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: R-20261107-125710-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-07T13:15:48-04:00
---
# Reconferência técnica: Mostrar mais, LRU de 40 nós, ordenarPorNome com acento (resposta a R-20261107-125710)

## Contexto
Atendi o 🟡 e 🟢 1, 3 e 4

## O que preciso / o que mudou
lista-por-linha-local.ts: parâmetro limite (soma 100 por toque, NivelLista.restantes), LRU MAXIMO_NOS_MEMORIZADOS=40 no memo lista-no:*; lista-por-linha.ts: porNome removido; testes de acento/empate Água×agua, de Mostrar mais (200 itens sem repetir) e do LRU; desempenho mantido

## Pronto quando
Reconferência sem 🔴
