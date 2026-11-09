---
id: R-20261107-083941-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:39:41-04:00
---
# Texto do vazio sem sinal mudou (tests/modulos/pedidos-busca-t0077.test.ts)

## Contexto
Contexto: UX4 da T-0090 trocou 'Disponível com conexão' por 'Sem sinal: este período não está no aparelho. Os pedidos aparecem quando o sinal voltar.' em mensagemForaDaJanela/textoDoVazio

## O que preciso / o que mudou
Atualizar as linhas 332-352 de tests/modulos/pedidos-busca-t0077.test.ts que esperam o texto antigo

## Pronto quando
Teste verde
