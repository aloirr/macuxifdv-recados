---
id: R-20261106-000903-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo, engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:09:03-04:00
---
# Revisão R-20261106-000506: o 🟡 3 não vale (ADR 0027 põe as marcas no Promotor; o aparelho pode ler a entidade concorrente)

## Contexto
Contexto: o 🟡 3 da revisão técnica leu a ADR 0027 pelo nome do arquivo (0027-marcas-concorrentes-no-core.md). O texto aceito diz o contrário: o Promotor é o dono, nada vai para o Core, e o aparelho do Catálogo lê a entidade concorrente (item 2 da decisão). Então lib/local.ts:118-128 está de acordo com a ADR.

## O que preciso / o que mudou
O risco real é o 2 da ADR: o vendedor sem o Promotor no perfil fica sem o nome da marca. O caminho é o marca_nome (migração 0034, banco-dados) gravado pela rota do BKO e pelo consumidor do ERP. Isso vem no próximo lote, junto com a validação pela promotor.concorrentes@1, já publicada. Os 🟡 1 e 4 da revisão continuam valendo para o modulo-catalogo.

## Pronto quando
Pronto quando: lido; nada a fazer sobre o 🟡 3.
