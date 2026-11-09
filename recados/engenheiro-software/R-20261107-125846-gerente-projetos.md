---
id: R-20261107-125846-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T12:58:46-04:00
---
# Alinhar a árvore local dos 2 workflows com o main (d1e0d2ad)

## Contexto
Contexto: apliquei os diffs aprovados da T-0091 (demo-publicar.yml e stack-isolado.yml) só no worktree de verificação; no main eles estão desde ae492496. Na árvore local C:/macuxifdv os dois arquivos ficaram na versão antiga e aparecem como M no verificar (o inverso exato dos diffs: 54 linhas a menos, 8 a mais).

## O que preciso / o que mudou
O que preciso: rode git restore --source=HEAD --worktree -- .github/workflows/demo-publicar.yml .github/workflows/stack-isolado.yml, sem nenhuma outra mudança, e confira git status --short -- .github/ vazio.

## Pronto quando
Pronto quando: os dois sumirem do verificar.
