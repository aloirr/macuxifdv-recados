---
id: R-20261103-044414-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261102-090919-alexandre
encerra: true
contrato: null
criado_em: 2026-11-03T04:44:14-04:00
---
# Feito: carga retoma de onde parou e voltar ao app não reinicia

## Contexto
Motor que retoma a carga por entidade/página (engenheiro-software, c119927) e shell com deveSincronizar no AppState + 'Continuando de onde parou' (b5060ab); segundo plano por expo-background-task (ADR 0017, b5060ab)

## O que preciso / o que mudou
Testes em apps/mobile/src/lib/carga.test.ts (voltar do segundo plano não reinicia a carga)

## Pronto quando
Encerrado
