---
id: R-20261105-101454-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:14:54-04:00
---
# Entrega: revisão final do lote J (T-0039, T-0081, T-0082, T-0083) — liberado após R1, F-07/R-03b e CI verde

## Contexto
Pedido do gerente: revisão final do que mudou depois das minhas revisões. Detalhes no R-20261105-101415. Recados aos donos: R-20261105-101212 (modulo-core: 🔴 R1 e 3 🟢), R-20261105-101243 (testes: 🟡 T1 e 3 🟢) e R-20261105-101308 (modulo-gestor: 2 🟢).

## O que preciso / o que mudou
Feito: (1) Revisão sem 🔴 da T-0039 (Core e Gestor), das correções F1, P1, P2 e de foco da web e dos testes novos. (2) Meus arquivos estão prontos: cli/tenant.ts com 17 testes verdes (3 de banco no CI), tsc e eslint do apps/api limpos, Dockerfile teste-db com o pg_dump 16 do A9 (endurecido com fingerprint por outra instância, R-20261105-101313), dbaas-teste.yml e compose.yml. Rodei aqui: core (etapas-pendencia, contracts/inicio, manifest) 36 verdes; gestor (alertas-pendencia-checkout) 8 verdes; tests/modulos/bko-sem-tabela-aninhada 18 verdes. verificar engenheiro-software: OK.

## Pronto quando
Pendências: 🔴 R1 do modulo-core (plano-rv.ts:200-203 de volta a fontePorConsulta); F-07 e R-03b virarem it (testes); decisão sua sobre o D-T0082a: opção licenca:'tenant' no consultar (eu faço, com ADR 0012) ou Vendedor obrigatório para quem vê RV. Lote J liberado depois disso e do CI verde.
