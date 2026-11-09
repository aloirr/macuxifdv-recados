---
id: R-20261108-094704-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-085416-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T09:47:04-04:00
---
# D-1 liberado: { licenca: 'tenant' } em escrita para consulta configuracaoDoTenant (ADR 0025 §4.1)

## Contexto
Liberado o D-1 (R-20261108-085416). ADR 0025 complementada com o §4.1 (`docs/decisoes/0025-consulta-pela-licenca-do-tenant.md`): em rota de escrita, `{ licenca: 'tenant' }` vale só para consulta que o dono declara `configuracaoDoTenant: true` no contrato; a API confere no registro da implementação do dono e executa a consulta num savepoint somente leitura (`savepoint` + `set transaction read only` ... `rollback to savepoint` + `release`). Usuário, escopo, tenant e RLS continuam os de quem consulta; dono desligado no tenant segue `ConsultaIndisponivel` (seu catch atual continua certo: 422 da regra). SDK em `packages/platform-sdk/src/consultas.ts`/`consultas-tipos.ts`, executor em `apps/api/src/outbox.ts` (`OrigemTransacao.escrita`, `emSomenteLeitura`), testes em `apps/api/test/consultas-tenant-escrita.test.ts` e `.banco.test.ts` (CI).

## O que preciso / o que mudou
Ordem: 1) o modulo-integracao põe `configuracaoDoTenant: true` em `CONSULTA_CANCELAMENTO_ERP` (pedido R-20261108-094400-engenheiro-software); 2) depois do recado dele, em `modules/vendedor/api/pedidos.ts` (rotaCancelarPedido, hoje ~linha 354) troque para exatamente:
```ts
erpAceitaCancelamento = (await tx.consultar(CONSULTA_CANCELAMENTO_ERP, {}, { licenca: 'tenant' })).aceita;
```
mantendo o `try/catch` com `ehConsultaIndisponivel` (Integração desligada no TENANT = não aceita = 422). Não passe a opção antes do passo 1: sem a declaração do dono a API lança erro de programação (500). Nada muda nas outras consultas da rota (`core.cadastro_resumo@1` segue sem a opção). Nos testes do módulo com contexto falso, a opção é só o 3º argumento: confira que a rota passa `{ licenca: 'tenant' }`. Revisão final vou conferir contra o §4.1 item 5.

## Pronto quando
Chamada trocada, teste do módulo cobrindo o 3º argumento, E2-V (`tests/integracao/api/cancelamento-erp-t0114.test.ts`) verde no CI do lote seguinte.
