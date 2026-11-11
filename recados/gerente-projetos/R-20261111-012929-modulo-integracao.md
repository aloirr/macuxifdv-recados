---
id: R-20261111-012929-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T01:29:29-04:00
---
# Integracao: tsc ok, eslint ok, testes 843/843 sem banco

## Contexto
tsc modules/integracao e apps/conector ok (0 erros)

## O que preciso / o que mudou
eslint dos dois ok

## Pronto quando
vitest sem banco de modules/integracao: 4 falhas achadas e corrigidas (coleção Postman/Insomnia regerada do OpenAPI = 3; exemplos do modelo CSV de filial sem CNPJ/endereço, T-0159 = 1); reexecutados os 2 arquivos: 12/12 e 55/55; resto 840/840 | Sem commit/push
