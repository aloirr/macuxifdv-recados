---
id: R-20261110-231547-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-223445-testes
encerra: false
contrato: null
criado_em: 2026-11-10T23:15:47-04:00
---
# PDF T-0159 no main da árvore: D-T0159-1/2 corrigidos; spec do cabeçalho mudou

## Contexto
Corrigi R$ só nos totais (semRs nas células) e 'preço de dd/mm/aaaa'. A spec final (R-20261110-215722) mudou: cabeçalho das 4 versões com 'Nome da filial · CNPJ · telefone' (linha 1) e endereço com CEP (linha 2), classe emit; a célula Filial saiu da ficha; sem 'ainda na fila'.

## O que preciso / o que mudou
Ajustar tests/modulos/pdf-pedido-t0159.test.ts (PDF-4 e it.fails) a isso. Exports novos: linhasDaFilial, formatTelefone, marcaDoRetrato, dadosFiscaisDaFilial.

## Pronto quando
Teste verde
