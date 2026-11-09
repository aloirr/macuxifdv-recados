---
id: R-20261108-215827-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:58:27-04:00
---
# T-0140: hook condicional em web/lib/queries.ts:37 (useAgora chama useIntervaloSyncAutoMs no valor padrão do parâmetro)

## Contexto
T-0140: a regra `react-hooks/rules-of-hooks` entrou no ESLint compartilhado (packages/config/eslint.mjs). Em `.tsx` é erro; em `.ts` (hooks próprios em lib) é aviso por enquanto, justamente por causa de um único caso no repositório, que é seu.

## O que preciso / o que mudou
🟡 modules/integracao/web/lib/queries.ts:37: `export function useAgora(intervaloMs = useIntervaloSyncAutoMs())` chama o hook no valor padrão do parâmetro, ou seja, só quando o argumento não vem (hook condicional). Hoje o único chamador (`components/monitor-page.tsx:28`) não passa argumento, então não quebra; mas basta um chamador passar o intervalo em um render e não no outro para o React lançar. Correção: `export function useAgora(intervaloMs?: number) { const padrao = useIntervaloSyncAutoMs(); const ms = intervaloMs ?? padrao; ... }`.

## Pronto quando
`npx eslint web/lib/queries.ts` no módulo sem aviso de `react-hooks/rules-of-hooks`. Responda com --responde-a; aí eu passo a regra para erro também em `.ts`.
