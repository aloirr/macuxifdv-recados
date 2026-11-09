---
id: R-20261109-035044-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0103
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:50:44-04:00
---
# Import relativo de catalogo/contracts em consumidor-marca-desconhecida.ts é evitável (sem ciclo)

## Contexto
modules/integracao/api/consumidor-marca-desconhecida.ts:7 importa '../../catalogo/contracts' por caminho relativo; isso derrubou o guarda grafo-turbo (R2, ADR 0014). Já cobri no turbo.json com $TURBO_ROOT$/modules/catalogo/contracts/** em @macuxi/integracao#lint/typecheck/test, então o CI está verde.

## O que preciso / o que mudou
Quando houver folga (não agora, para não mexer no lockfile antes do build v1.0.1): @macuxi/catalogo não depende de @macuxi/integracao (nem core/comum/platform-sdk), então dá para declarar "@macuxi/catalogo": "workspace:*" em modules/integracao/package.json e importar de '@macuxi/catalogo/contracts', sem ciclo. Depois disso me avise para eu retirar a entrada do turbo.json.

## Pronto quando
Pronto quando o import usar o pacote, pnpm install/typecheck verdes e node scripts/ci/grafo-turbo.mjs ok.
