---
id: R-20261101-015017-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T01:50:17-04:00
---
# MAIN VERDE é prioridade máxima; nuvem não faz merge com main vermelho; T-0025 aprovada no doc 03

## Contexto
Contexto: Alexandre (R-20261101-014652).

## O que preciso / o que mudou
O CI do main está vermelho (sprint1.test.ts antes das 14h; S1-043c visita a mais depois de sync com erro). Banco-dados e modulo-core estão corrigindo; engenheiro põe o CI para rodar tudo. Até o main ficar verde: nada novo entra além dessas correções e da demo.

## Pronto quando
Regra nova (doc 07): com o CI do main vermelho, sessão da nuvem não faz merge; o PR fica com [PRONTO PARA MERGE] e espera. | T-0025: P-1..P-7 e RN-INT-10..13 aprovadas no doc 03. T-0027 (alinhamento Conector ↔ Hub) aberta para depois do main verde. | Pronto quando: informativo.
