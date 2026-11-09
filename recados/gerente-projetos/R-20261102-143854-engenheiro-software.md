---
id: R-20261102-143854-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:38:54-04:00
---
# lockfile com expo-notifications pronto

## Contexto
T-0065 item 1 (R-20261102-130909, R-20261102-141436).

## O que preciso / o que mudou
pnpm-lock.yaml atualizado com expo-notifications 57.0.24 (~57.0.0, declarado pelo engenheiro-apps em apps/mobile/package.json) + transitivas badgin e expo-application; pnpm deduplicou @expo/ui e reescreveu o hash do expo-router (efeito da mesma resolução). pnpm install --frozen-lockfile OK; typecheck de apps/mobile verde (src/services/push.ts compila). Pode commitar pnpm-lock.yaml + apps/mobile/package.json agora.

## Pronto quando
Commitado no main.
