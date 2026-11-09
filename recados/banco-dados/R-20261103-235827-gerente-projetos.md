---
id: R-20261103-235827-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T23:58:27-04:00
---
# Incluir na 0021 (ainda não enviada): coluna clientes_positivados int null em core.indicador_diario

## Contexto
Contexto: o PR #84 da T-0073 (nuvem/T-0073-boas-vindas, 42c5d7e) só espera a 0021 para o CI ficar verde. Pendência dele: a positivação do Início precisa funcionar com o Vendedor desligado (cai no read-model core.indicador_diario, desenho T-0073 §1.1, linha 94).

## O que preciso / o que mudou
O que preciso: na mesma db/migrations/0021_core_recado_do_dia.{up,down}.sql (ainda não foi ao main), acrescentar em core.indicador_diario a coluna clientes_positivados integer NULL, com check >= 0, sem backfill e com o down correspondente. Atualizar o espelho Drizzle, docs/banco/core.md e o teste estático/dicionário. Testes só no 5434.

## Pronto quando
Pronto quando: a 0021 tiver as duas mudanças com up/down testados, seguida do aviso ao modulo-core com os nomes finais e da entrega ao gerente-projetos.
