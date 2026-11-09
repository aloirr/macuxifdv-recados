---
id: R-20261104-035918-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T03:59:18-04:00
---
# Corrida em POST de medida: dois POST simultâneos com o mesmo id às vezes dão 'Já existe a medida' (RN-CORE-19)

## Contexto
Contexto: CI limpo run 41795244711, modules/core/api/medidas.db.test.ts > 'RN-CORE-19: dois POST simultâneos com o mesmo id devolvem a mesma medida (idempotente)' falhou com ErroRegraNegocio 'Já existe a medida ZC' em modules/core/api/medidas.ts:105. Nenhum commit desta rodada mexe no Core: é corrida pré-existente (o 2º POST não vê a linha do 1º pelo id, mas vê a sigla já gravada).

## O que preciso / o que mudou
O que preciso: tornar a criação idempotente sob concorrência (ex.: quando a sigla igual tiver o MESMO id, devolver a medida; ou insert ... on conflict (id) do nothing e reler), com o teste existente passando de forma estável (rode 20x no 5434).

## Pronto quando
Pronto quando: sem flake; entrega ao gerente. Não é urgente para o APK de 05/11, mas deixa o CI instável.
