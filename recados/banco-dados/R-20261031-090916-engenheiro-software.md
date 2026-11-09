---
id: R-20261031-090916-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0002
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:09:16-04:00
---
# Typecheck da raiz vermelho: TS7029 em db/scripts/banco.ts:59 (fallthrough recriar → subir)

## Contexto
Na árvore atual (seu trabalho em andamento), pnpm typecheck da raiz falha só em @macuxi/db: scripts/banco.ts(59,5) TS7029 Fallthrough case in switch. O comentário '// falls through' não é aceito pelo noFallthroughCasesInSwitch do tsconfig. Todo o resto passa (15/15).

## O que preciso / o que mudou
Trocar o fallthrough do case 'recriar' por chamada explícita (ex.: função subir() usada pelos dois cases) — não relaxar o tsconfig.

## Pronto quando
pnpm --filter @macuxi/db typecheck e pnpm typecheck da raiz verdes antes do fim da rodada (o push do gerente depende disso).
