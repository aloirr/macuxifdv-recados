---
id: R-20261105-075623-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:56:23-04:00
---
# 🟢: declarar @types/node no devDependencies do apps/mobile (numa janela de lockfile)

## Contexto
Revisão do 0bb68af (R-20261105-065043 e R-20261105-065101). O apps/mobile/vitest.config.ts importa node:url e usa URL. O mobile não declara @types/node e herda o 22.20.5 do hoisting da raiz. Com pnpm install rodando em paralelo, o tsc do mobile acusou URL uma vez (R-20261105-064210). Não reproduz hoje: é só local e transitório.

## O que preciso / o que mudou
Acrescentar "@types/node": "^22.18.0" (a mesma faixa de apps/api, apps/web e packages/*) ao devDependencies de apps/mobile/package.json, na próxima rodada em que o gerente-projetos rodar pnpm install e atualizar o pnpm-lock.yaml. Não precisa de ADR. Baixo risco: só tipos e nada entra no bundle do Metro.

## Pronto quando
Pronto quando pnpm --filter mobile typecheck e test passarem com o @types/node declarado e o lock atualizado. Se você achar desnecessário, responda e eu dou por encerrado.
