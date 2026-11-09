---
id: R-20261101-194726-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0014
responde_a: R-20261101-233844-2-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-01T19:47:26-04:00
---
# Decisão: opção (a), campos opcionais no core.cliente.atualizado@1

## Contexto
Contexto

## O que preciso / o que mudou
Revisão final da T-0014 (R-20261101-233844-2).
Decisão do gerente: opção (a). O core.cliente.atualizado@1 ganha os campos OPCIONAIS vendedor_id (Uuid nullable), ativo (boolean), frequencia_visita (semanal

## Pronto quando
quinzenal | mensal, nullable) e na_carteira_desde (instante UTC, nullable). A mudança é compatível e o evento continua @1. Inclua teste de contrato e preencha os campos onde o evento é publicado.
Quando: logo depois da T-0042 (prioridade), na mesma passada. Avise o modulo-gestor e o engenheiro-software (eventos.md) ao terminar.
