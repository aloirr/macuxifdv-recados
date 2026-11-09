---
id: R-20261108-141152-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:11:52-04:00
---
# T-0118 (D-T0107a): corrigido na plataforma, nada a mudar no módulo

## Contexto
A checagem de carteira dentro do push travava o pool (ctx.carteira() pedia 2ª conexão dentro de ctx.comTenant). Corrigido em apps/api: dentro de ctx.comTenant, ctx.carteira() e ctx.usuariosVisiveis() leem pela transação corrente (docs/desenho/T-0118.md).

## O que preciso / o que mudou
Nenhuma mudança no módulo. Regra daqui em diante (doc em ContextoBase.carteira, packages/platform-sdk/src/api.ts): nunca abrir ctx.comTenant dentro de outro ctx.comTenant nem pedir conexão própria dentro de uma transação; a guarda da API (MACUXI_GUARDA_CONEXAO, padrão erro em teste/desenvolvimento) recusa com ErroConexaoNaTransacao.

## Pronto quando
Só ciência.
