---
id: R-20261111-073201-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:32:01-04:00
---
# D-T0159-4 e D-T0159-5 corrigidos (v1.0.4): complemento com vírgula e linha 1 com o nome puro da filial

## Contexto
Contexto: pdf-pedido.ts

## O que preciso / o que mudou
Feito: linhasDaFilial junta o complemento com vírgula (a entrega mantém ' – ') e lê filial.nome do retrato (sem código nem UF), conforme designer R-20261111-062125; nome entra no contrato OrderDetail.filial e em dadosFiscaisDaFilial (API e app). Testes do domain, pull e filial-pedido atualizados.

## Pronto quando
Testes: pode virar it.fails em it de D-T0159-4 e D-T0159-5 em tests/modulos/pdf-pedido-t0159.test.ts. | Pronto quando: pdf-pedido-t0159 verde
