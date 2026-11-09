---
id: R-20261104-015654-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [banco-dados]
tipo: pedido
prioridade: alta
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T01:56:54-04:00
---
# URGENTE: S0-025 vermelho no CI limpo por causa da 0021 — falta notificacao_recado_do_dia_por_fk no COERENCIA_DA_FK

## Contexto
Contexto: CI completo no branch verificacao/T-0071-T-0073-0021 (run 41780551029, commit 845aa70) deu 207/208 verdes. A única falha é tests/integracao/multitenant/vazamento-escrita.test.ts > chaves estrangeiras: 'notificacao_recado_do_dia_por_fk: new row for relation notificacao violates check constraint notificacao_recado_do_dia_par: expected 23514 to be 23503'. A 0021 (04f3e5a, local, não enviada) amarra recado_do_dia_por a recado_do_dia (CHECK notificacao_recado_do_dia_par) e recado_do_dia a tipo='recado' (CHECK notificacao_recado_do_dia_so_recado).

## O que preciso / o que mudou
O que preciso: acrescentar a entrada notificacao_recado_do_dia_por_fk no COERENCIA_DA_FK (ex.: tipo = 'recado', recado_do_dia = data fixa), para a linha ficar coerente e quem recusa ser a FK cruzada (23503). Nenhuma asserção muda. Confira se o índice único notificacao_recado_do_dia_uk não interfere.

## Pronto quando
Pronto quando: o arquivo passa no 5434 (testTimeout maior só na linha de comando, pela carga) e você me manda a entrega; eu commito e rodo o CI limpo de novo antes do push da 0021.
