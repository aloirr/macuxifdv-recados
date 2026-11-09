---
id: R-20261108-002257-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:22:57-04:00
---
# Exportar gerarSenhaTemporaria em @macuxi/core/api (rota do super-admin que redefine a senha do admin)

## Contexto
Fatia S (R-20261107-220900): a rota do portal POST /v1/plataforma/empresas/:tenant/admins/:usuario/redefinir-senha (apps/api/src/plataforma.ts) gera a senha temporária pela regra do Core (RN-CORE-32/34). A fronteira não deixa a API importar o domain do Core, e hoje modules/core/api/index.ts só reexporta normalizarEmail e validarSenhaInicial.

## O que preciso / o que mudou
Uma linha em modules/core/api/index.ts: export { gerarSenhaTemporaria } from '../domain/acesso-senha'; (junto do export de normalizarEmail/validarSenhaInicial). Nada mais muda no Core.

## Pronto quando
Pronto quando: import { gerarSenhaTemporaria } from '@macuxi/core/api' tipar no apps/api (pnpm --filter api typecheck).
