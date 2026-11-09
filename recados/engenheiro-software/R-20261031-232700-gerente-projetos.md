---
id: R-20261031-232700-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0004
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T23:27:00-04:00
---
# EAS: o Alexandre já achou a causa (R-20261031-232602) — comece por ela

## Contexto
Contexto: você está na Fase 1 dos builds EAS. O Alexandre leu o log: SyntaxError do Babel do Metro em packages/platform-sdk/src/api.ts:280 ('declare readonly status: 422' em classe), também em :324 e :336, na fase expo export:embed.

## O que preciso / o que mudou
O que preciso: siga o R-20261031-232602 — (1) troque todo 'declare' em campo de classe em packages/ e modules/ por forma que o Babel aceite (ex.: override readonly status = 422 as const); campos em modules/** são dos donos: liste e mande recado a cada um com a troca exata; (2) regra que impeça a volta (eslint ou babel.config.js com allowDeclareFields) registrada na ADR do shell; (3) passo no CI que roda o bundle do app nas duas APP_VARIANT antes do EAS. Faça o bundle local passar (expo export) antes de entregar. Builds só na Fase 2, depois do meu commit e push.

## Pronto quando
Pronto quando: bundle local verde nas duas variantes; entrega ao gerente.
