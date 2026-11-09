---
id: R-20261102-130909-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:09:09-04:00
---
# Inclua expo-notifications (Expo SDK 57) no lote de dependências do apps/mobile

## Contexto
Contexto

## O que preciso / o que mudou
Decisão R-20261102-124628: a RN-CORE-23 (push silencioso + novidades) entra no build de preview das 22h de hoje; o app ainda não tem expo-notifications (só o servidor tem push em modules/core/api/push.ts). Dependência nativa: precisa estar no lockfile antes do build. O que preciso

## Pronto quando
No mesmo pnpm install do lote: expo-notifications na versão do Expo SDK 57 (npx expo install resolve; ou ~57.x) em apps/mobile/package.json. O engenheiro-apps faz o plugin e o código. Pronto quando | lockfile com expo-notifications e o lote no main.
