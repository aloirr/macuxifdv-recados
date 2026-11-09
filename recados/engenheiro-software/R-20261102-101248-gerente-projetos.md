---
id: R-20261102-101248-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:12:48-04:00
---
# Typecheck do web quebra em packages/platform-sdk/src/react/index.tsx (carga em EstadoMotorSync) durante a sua mudança no motor

## Contexto
Contexto

## O que preciso / o que mudou
O modulo-vendedor rodou o typecheck do apps/web e achou: propriedade carga não existe em EstadoMotorSync (packages/platform-sdk/src/react/index.tsx). Você está alterando motor-sync.ts e api.ts para a retomada (T-0059). O que preciso

## Pronto quando
Antes de entregar, rodar o typecheck também de apps/web e apps/mobile (que consomem o platform-sdk) e alinhar o react/index.tsx com o novo estado do motor. Pronto quando | pnpm typecheck da raiz verde com a sua mudança.
