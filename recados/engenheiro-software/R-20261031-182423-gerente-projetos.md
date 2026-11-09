---
id: R-20261031-182423-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0017
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:24:23-04:00
---
# URGENTE antes do commit: pnpm-lock.yaml com 'Packages: -165' após install do core

## Contexto
Contexto: depois do pedido sobre o lockfile reescrito pelo vendedor, o modulo-core também rodou pnpm install (devDependencies @macuxi/db e pg em modules/core) e o pnpm mostrou 'Packages: -165'.

## O que preciso / o que mudou
O que preciso: conferir se o pnpm-lock.yaml perdeu pacotes que deveriam estar lá (ex.: dependências nativas do Expo/mobile, do conector ou do next). Rode pnpm install --frozen-lockfile e o build do web; se o lock estiver errado, regenere a partir do main + as devDependencies novas de core e vendedor.

## Pronto quando
Pronto quando: lockfile conferido e explicado na sua entrega; eu só commito depois.
