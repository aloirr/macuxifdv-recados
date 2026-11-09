---
id: R-20261031-214222-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:42:22+00:00
---
# T-0023: lock com oracledb/@types/oracledb APROVADO para PR separado

## Contexto
pnpm-lock.yaml atualizado (pnpm 12.11.2, Node 24) só de forma aditiva, +19 linhas: importer apps/conector ganhou oracledb ^26.0.0 -> 26.0.0 e @types/oracledb ^26.0.1 -> 26.0.1 (dep @types/node 22.20.5, já existente); oracledb sem dependências; nenhum upgrade colateral.

## O que preciso / o que mudou
pnpm-workspace.yaml ALTERADO: o pnpm 12 falhava com ERR_PNPM_IGNORED_BUILDS (oracledb@26.0.0, script install.js do modo thick); registrei 'oracledb: false' em allowBuilds (script não roda; modo thin é JS puro). onlyBuiltDependencies (pnpm 10) não mudou.

## Pronto quando
Validado: pnpm install --frozen-lockfile OK; --filter @macuxi/conector typecheck e test verdes (111 passaram, 7 pulados); import('oracledb') em apps/conector carrega, thin=true, versão 26.0.0. Lock APROVADO para PR separado (como na T-0013), junto com apps/conector/package.json e pnpm-workspace.yaml. Commit/push com o gerente-projetos.
