---
id: R-20261104-035913-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T03:59:13-04:00
---
# URGENTE: typecheck vermelho no CI em tests/integracao/demo/orcamento-ponta-a-ponta.test.ts (4 erros TS) — trava o push do BKO

## Contexto
Contexto: CI limpo do run 41795244711 (branch verificacao/T-0071-T-0073-0021, commit ae7c7f4), job 'typecheck (demais)': (365,110) TS2698 Spread types may only be created from object types; (412,102) TS2698; (413,42) TS2339 Property 'codigo' does not exist on type 'ResultadoItemPush'; (470,75) TS2345 string não atribuível a UUID template. O commit é o ba917a6 (seu).

## O que preciso / o que mudou
O que preciso: corrigir os tipos sem mudar asserção (estreitar o union do ResultadoItemPush antes de ler codigo, tipar o id como UUID) e rodar o typecheck do pacote de tests igual ao CI (pnpm --filter tests typecheck ou o tsc do tests/tsconfig).

## Pronto quando
Pronto quando: typecheck do tests verde e o arquivo continua 13/13 no 5434; entrega ao gerente.
