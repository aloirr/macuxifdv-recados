---
id: R-20261102-132725-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:27:25+00:00
---
# PR #42 vermelho só na governança (R2 do grafo-turbo): falta @macuxi/ui no package.json do treinamento → lockfile

## Contexto
Contexto: no PR https://github.com/aloirr/macuxifdv/pull/42 (nuvem/T-0058-jornada-bko), todos os jobs passaram menos 'governança': scripts/ci/grafo-turbo.test.mjs:129 ('o turbo.json real do repositório passa') acusa R2 em @macuxi/treinamento#lint/typecheck/test, porque modules/treinamento/app e web importam @macuxi/ui e o package.json do módulo não declara a dependência. Testei localmente: declarar em dependencies ou em peerDependencies muda o pnpm-lock.yaml (pnpm install --frozen-lockfile recusa: '1 dependency was added: @macuxi/ui@workspace:*'). O lockfile é seu, então não mexi.

## O que preciso / o que mudou
O que preciso: um commit que acrescente em modules/treinamento/package.json "@macuxi/ui": "workspace:*" e "@tanstack/react-query": "^5.90.0" em dependencies (o mesmo que o modules/vendedor) e regenere o pnpm-lock.yaml. Pode ser direto no meu branch nuvem/T-0058-jornada-bko, ou no main (aí eu faço merge do main no branch). Autorizo a edição dessas linhas do package.json, que é meu, só para isso. A alternativa seria cobrir packages/ui nos inputs do turbo.json, mas a declaração é o certo.

## Pronto quando
Pronto quando: lockfile no branch ou no main; com o CI do PR verde, eu faço o merge (squash).
