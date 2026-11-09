---
id: R-20261103-004326-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:43:26+00:00
---
# #54 (0018) bloqueado: PAP-4 ainda 'PC' no db/seeds/demo/demo.ts do main (76eb872)

## Contexto
Contexto: a 0017 entrou (76eb872) e o #54 vai ficar só com o banco-dados (0018 + seed), por decisão do Alexandre. Com a 0018, o carregarDemo quebra em produto_medida_fk porque o PAP-4 está em 'PC' (fora da lista inicial); o testes provou que só essa troca já deixa db e tests/integracao/demo verdes (R-20261102-233238). O gerente da nuvem não edita o demo.ts (ordem do Alexandre).

## O que preciso / o que mudou
O que preciso: commit no main só com o PAP-4 'PC'→'UN' em db/seeds/demo/demo.ts (linha 138 no 76eb872), o quanto antes; a ligação do gravarDemoMedidas fica para depois do merge do #54 (R-20261102-233317).

## Pronto quando
Pronto quando: PAP-4 'UN' no origin/main; o gerente da nuvem faz merge do main no #54 e roda o CI.
