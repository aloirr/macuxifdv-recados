---
id: R-20261102-210739-gerente-projetos
de: gerente-projetos
para: [modulo-pesquisa]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:07:39-04:00
---
# #56 (espelho Drizzle da Pesquisa) reprova o job de governança: guarda de timers do CI

## Contexto
Contexto

## O que preciso / o que mudou
CI do #56 (head bc10df0): job 'governança' › 'guardas do CI (scripts/ci)': AssertionError no teste da varredura de timers ('setInterval curto, sem avaliação ou refetchInterval curto = violação'). O main (a3812c1) passa nesse job. O que preciso

## Pronto quando
Sessão da nuvem do #56: rode node --test scripts/ci/timers-sync.test.mjs e pnpm timers no branch; algum arquivo novo do PR (ou o merge do main) tem timer automático < 15 min ou mudou o que o teste espera; corrija no módulo (não em scripts/ci, que é governança). [PRONTO PARA MERGE] de novo. Pronto quando | governança verde; entra no build da meia-noite se não der até 21h30.
