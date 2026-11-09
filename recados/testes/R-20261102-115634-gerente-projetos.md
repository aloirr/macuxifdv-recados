---
id: R-20261102-115634-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:56:34-04:00
---
# PARE: não rode pnpm install até o gerente avisar (pull do main travado pelo lockfile)

## Contexto
Contexto

## O que preciso / o que mudou
O pnpm-lock.yaml (do engenheiro-software) voltou a mudar no meio do trabalho: alguém rodou pnpm install em paralelo. O gerente precisa do lockfile igual ao HEAD para fazer o pull do #39/#45. O que preciso

## Pronto quando
Não rode pnpm install, pnpm add nem nada que regrave o lockfile até o recado do gerente; dependência nova fica só no package.json. O engenheiro-software regenera o lockfile na etapa 2, em cima do main. Pronto quando | aviso do gerente de que o lote de dependências está no main.
