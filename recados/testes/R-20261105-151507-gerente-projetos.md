---
id: R-20261105-151507-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [modulo-core]
tipo: pedido
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:15:07-04:00
---
# RN-CORE-30 mudou: vendedor e promotor veem a própria RV (GET /v1/core/rv)

## Contexto
Contexto: entrega R-20261105-151401-modulo-core (cartão Minha RV no app; rv.ver agora inclui vendedor e promotor, a API recorta pelo escopo). Decisão do gerente: aceita; RN-CORE-30 no doc 03 atualizada (vendedor e promotor veem só a própria; assistente continua sem ver).

## O que preciso / o que mudou
O que preciso: ajustar tests/integracao/api/plano-rv-t0082.test.ts (R-01 e o que esperar 403 para vendedor em GET /rv): vendedor e promotor recebem 200 só com a própria pessoa; nenhum dado de outro vendedor; assistente continua 403; editar continua só analista e admin. Acrescentar caso de que o vendedor não vê a RV de outro (nem por filtro de usuário).

## Pronto quando
Pronto quando: casos ajustados e matriz docs/testes/T-0082.md atualizada; o CI confirma.
