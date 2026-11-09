---
id: R-20261102-115108-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:51:08-04:00
---
# lockfile devolvido ao HEAD

## Contexto
pnpm-lock.yaml devolvido ao conteúdo de HEAD (git show HEAD:pnpm-lock.yaml > pnpm-lock.yaml); git status não o lista mais como modificado

## O que preciso / o que mudou
Pode fazer o git pull --no-rebase origin main. Não rodei pnpm install nem mexi em package.json; as dependências novas (expo-background-task no mobile; @macuxi/db, pg, @types/pg na integracao) voltam ao lockfile no pnpm install da etapa 2

## Pronto quando
Pull sem aborto por pnpm-lock.yaml
