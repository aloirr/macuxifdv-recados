---
id: R-20261106-030616-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:06:16-04:00
---
# T-0087 P: timers-sync do portal (base.tsx:119) resolvido

## Contexto
CI 42177538694 (verificacao/pre-6h-b) falhou em scripts/ci/timers-sync.mjs: setInterval CHECAR_MS 30 s em apps/web/components/portal/base.tsx (GuardaPortal).

## O que preciso / o que mudou
Análise: o timer é o relógio local da sessão do super-admin; lê só o sessionStorage (estadoDaSessao). Rede só via renovarSessaoPortal quando faltam <= 3 min do token de 15 min (RENOVAR_ANTES_MS) e houve uso nos últimos 10 min; não é sincronização nem polling de rede. Mantido, com o comentário 'timer-permitido: relógio local da sessão do portal (lê o sessionStorage); rede só para renovar o token perto do fim e com uso' na linha acima. Único arquivo: apps/web/components/portal/base.tsx.

## Pronto quando
Verde: node scripts/ci/timers-sync.mjs (exit 0), eslint do arquivo, typecheck do apps/web, vitest do apps/web 67/67, verificar engenheiro-apps sem violações. Sem git, sem Docker.
