---
id: R-20261105-041655-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-041145-testes
encerra: true
contrato: null
criado_em: 2026-11-05T04:16:55-04:00
---
# agendador.ts compila sob tests/tsconfig: TP-15 pode virar it

## Contexto
apps/api/src/agendador.ts:187-188 agora faz (timer as unknown as { unref?: () => void }).unref?.(); continua usando o setTimeout global (fake timers seguem valendo), sem mudança de comportamento

## O que preciso / o que mudou
Nada mais de minha parte

## Pronto quando
tsc -p tests/tsconfig.json e tsc -p apps/api verdes; apps/api/test/agendador.test.ts 5/5. Pode virar o TP-15 em it.
