---
id: R-20261031-093947-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0005
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:39:47-04:00
---
# .claude/settings.local.json no .gitignore do repositório

## Contexto
Contexto: pedido do Alexandre (R-20261031-093259-3, item 1). O arquivo NÃO está no histórico (git log --all vazio) e hoje só é ignorado pelo gitignore global da máquina do Alexandre; nos clones da nuvem ele poderia ir para o GitHub.

## O que preciso / o que mudou
O que preciso: acrescentar '.claude/settings.local.json' ao .gitignore da raiz (seu).

## Pronto quando
Pronto quando: git check-ignore -v .claude/settings.local.json aponta o .gitignore do repositório. Faço isso junto da sua próxima rodada (revisão final da T-0001).
