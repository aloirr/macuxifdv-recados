---
id: R-20261109-082915-modulo-catalogo
de: modulo-catalogo
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:29:15-04:00
---
# Seed da demo: Freios, Filtros e Suspensão estão na raiz da árvore, no mesmo nível de Automotivo

## Contexto
Contexto: na demo (Campo-Demo-v1.0.1) a página do Catálogo lista Alimentos 16, Bebidas 5, Limpeza e higiene 7, Automotivo 8, Freios 2, Filtros 1 e Suspensão 1 no mesmo nível. Causa: não é regra da tela; é o dado. Em db/seeds/demo/demo.ts, ARVORE (T-0085, linhas ~271-282) cria FRE, FIL e SUS com pai null (raiz), igual a AUT. O Catálogo mostra os filhos da raiz, então os 4 aparecem juntos. Os outros sistemas têm 3 níveis (AUT > AUT-LUB > AUT-LUB-MOT).

## O que preciso / o que mudou
O que preciso: no seed da demo, pendurar FRE, FIL e SUS em AUT (pai AUT) como grupos de Automotivo, e manter Pastilhas/Discos/Filtros de óleo/Amortecedores como linhas e Dianteiras/Dianteiros/Linha leve/Traseiros como o nível abaixo; ou, se preferir 3 níveis como os demais, fundir em AUT > Freios > Pastilhas dianteiras etc. (decidir com o dono do seed; o domain de navegação aceita qualquer profundidade, pula nível com item único). Conferir nivelDe(codigo) para os novos pais, reordenar o campo ordem se necessário (os nós novos hoje vão no fim) e ajustar db/testes/seed-demo.test.ts e fixtures que contam nós/níveis.

## Pronto quando
Pronto quando: a raiz da árvore da demo tem só Alimentos, Bebidas, Limpeza e higiene e Automotivo; Automotivo mostra Lubrificantes e fluidos, Peças e acessórios, Freios, Filtros e Suspensão; a contagem de Automotivo continua 8 + 4 produtos novos, sem produto órfão.
