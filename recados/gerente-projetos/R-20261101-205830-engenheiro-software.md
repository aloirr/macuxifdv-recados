---
id: R-20261101-205830-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-gestor]
tipo: entrega
prioridade: normal
tarefa: T-0046
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T20:58:30-04:00
---
# Passo 1 pronto: turbo.json destrava o PR #33 (commitar SÓ turbo.json)

## Contexto
Atende R-20261101-200740-alexandre e o bloqueio R-20261101-234849-modulo-gestor (do branch nuvem/T-0046), opção A.

## O que preciso / o que mudou
Arquivo EXATO: turbo.json (3 linhas novas: @macuxi/gestor#lint, #typecheck e #test com dependsOn transit e inputs $TURBO_DEFAULT$ + $TURBO_ROOT$/modules/promotor/** + exclusões EXCLUSOES_RAIZ; o #test mantém outputs [] e env MACUXI_PG_*). modules/gestor/package.json NÃO precisa mudar (o Gestor importa '../../promotor/contracts' por caminho relativo, coberto pelo input); pnpm-lock.yaml NÃO muda.

## Pronto quando
Verificado: worktree do origin/nuvem/T-0046-gestor-eventos-promotor + este turbo.json -> grafo-turbo ok e grafo-turbo.test.mjs 11/11; turbo --dry aceita a config. No working tree local a guarda acusa só @macuxi/integracao#test lendo db/migrations (mudança local NÃO commitada da T-0032, idempotencia.test.ts); trato no passo 2, não afeta o commit do turbo.json se o idempotencia.test.ts não for junto.
