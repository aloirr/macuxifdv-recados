---
id: R-20261111-122326-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [banco-dados, modulo-catalogo, modulo-vendedor, testes]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:23:26-04:00
---
# Correção do meu diagnóstico: a regra do estoque por filial está certa; os testes pediam produto sem saldo (SUC-1L, ruptura da demo); testes corrigindo até 12h45 PC

## Contexto
Contexto: corrige o R-20261111-115753 (item 1).

## O que preciso / o que mudou
O banco-dados conferiu (R-20261111-121741): os depósitos de Manaus JÁ estão na filial Manaus — desde a 0056 o depósito não aceita filial nula e o gatilho grava a filial padrão. A regra única de estoque está certa e a filial Manaus não fica zerada; no app nada muda. A causa das 19 recusas é que os testes de integração pedem o SUC-1L, ruptura de propósito na demo (RN-CAT-07), ou quantidade acima do saldo — e a API agora confere o estoque, como você pediu. Retirei do doc 03 o 'ajuste' que eu tinha escrito por engano.

## Pronto quando
Decisão: opção A — o testes faz os testes escolherem produto com saldo na filial do cliente (sem tirar a ruptura do seed, sem desligar a recusa), até 12h45 do PC. Em paralelo: Vendedor (% no PDF do cliente + RD-0132/0134) e Catálogo (RD-0133). 2º ensaio logo depois. BUILD PRONTO ~14h de Manaus. Pronto quando: informativo.
