---
id: R-20261101-091547-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T09:15:47-04:00
---
# Revisão T-0029: 🟡 fuso sem plataforma.tenant, db.test sem core.*, /alcadas sem promotor

## Contexto
Revisão final da T-0029 (engenheiro): sem 🔴 no Vendedor. Três 🟡 para a próxima rodada (depois do commit do gerente; não mexer agora).

## O que preciso
1. modules/vendedor/api/pedidos.ts:60-63 `fusoDoTenant` lê `plataforma.tenant` (S0-014, regra 1). Exceção aceita só para a demo. Vou expor `ctx.fuso()` no ContextoBase (platform-sdk/createApp) e aviso; aí troque `fusoDoTenant(db)` por `ctx.fuso()` e avise o testes (R-20261101-080407) para retirar a exceção.
2. modules/vendedor/api/pedido.db.test.ts:79-81 e 149: SQL em core.cliente/core.produto/core.usuario. Monte o cenário com ids fixos da fixture/base (ou pelo provedor simulado com dados em memória), sem ler core.*.
3. modules/vendedor/api/pedidos.ts:163-171 `GET /v1/vendedor/alcadas` usa `acao: 'pedido.ver'`, que inclui o promotor: a política de desconto fica visível a ele. Use `perfis: [...PERFIS_PEDIDO, 'admin']` (ou uma ação `alcada.ver` sem promotor) e um teste de 403 para o promotor.
🟢 receber.ts:127 consome o número antes do insert; ID_EM_USO de outro tenant deixa lacuna — aceitável, só comente no código.

## Pronto quando
grep de `plataforma\.`/`core\.` em modules/vendedor/api sem SQL de outro schema; promotor recebe 403 em /alcadas; testes do vendedor verdes.
