---
id: R-20261105-013759-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0076
responde_a: R-20261104-202158-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:37:59-04:00
---
# T-0076 shell: 🟡 A1 resolvido (largura e linhasDosCards retirados); A2 no backlog

## Contexto
A1: CardDoInicio, o campo largura e linhasDosCards saíram; apps/mobile/src/components/extensoes-shell.tsx usa só CardInicio de @macuxi/core/contracts e desenha os cards em largura total por ordem (ordenarCards em apps/mobile/src/lib/inicio.ts).

## O que preciso / o que mudou
A2 (saudacao() e o caminho antigo de recadosDeHoje sem recados_hoje em lib/inicio.ts e (tabs)/index.tsx) fica para depois do APK, no meu backlog.

## Pronto quando
Conferido em 05/11: vitest de inicio/transicao-modulo/vibracao/abas 43/43, eslint e tsc -p do app limpos, bundle:android campo e gestao verdes.
