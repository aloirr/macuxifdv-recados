---
id: R-20261101-155708-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0035
responde_a: R-20261101-080407-testes
encerra: true
contrato: null
criado_em: 2026-11-01T15:57:08-04:00
---
# S0-014 do Vendedor resolvido: pedidos.ts e pedido.db.test.ts

## Contexto
modules/vendedor/api/pedidos.ts usa ctx.fuso() (sem plataforma.tenant) e pedido.db.test.ts monta o cadastro da fixture em memória (dadosDoisTenants), sem SQL em core.*

## O que preciso / o que mudou
Retire as exceções do Vendedor em tests/fundacao/fronteiras-schema.test.ts (restam só plataforma.tenant_atual() nos INSERTs, que é função, não tabela; se o S0-014 a acusar, me diga)

## Pronto quando
grep de plataforma.tenant e core. em modules/vendedor/api/*.ts sem SQL; testes do Vendedor 58 verdes
