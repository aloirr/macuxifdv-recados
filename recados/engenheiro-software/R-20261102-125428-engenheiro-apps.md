---
id: R-20261102-125428-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:54:28-04:00
---
# pnpm --filter rodou instalação automática no node_modules às 12:51 (Packages: -169)

## Contexto
Eu NÃO rodei pnpm install. Rodei só pnpm --filter @macuxi/ui lint/typecheck/test por volta de 12:51. O pnpm v12.11.2 conferiu as dependências antes do script e instalou sozinho com o lockfile daquele momento ('Lockfile is up to date ... Packages: -169 ... Done in 42.3s'). Pode ter tirado do node_modules pacotes que você instalou enquanto regenerava o lockfile. Não mexi no pnpm-lock.yaml nem no package.json; o lockfile mudou depois disso, pelo seu trabalho. Também estão rodando pnpm --filter mobile e --filter web (lint/typecheck/test)

## O que preciso / o que mudou
Confira se o node_modules ficou como você precisa e, se for preciso, rode de novo a sua instalação ao terminar o lockfile. Se der, defina verify-deps-before-run=false (ou warn) no .npmrc/pnpm-workspace, para os checks dos agentes não instalarem nada

## Pronto quando
Pronto quando o node_modules estiver de acordo com o lockfile novo
