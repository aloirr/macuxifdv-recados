---
id: R-20261108-094400-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:44:00-04:00
---
# D-1: declarar configuracaoDoTenant: true em integracao.cancelamento_erp@1 (ADR 0025 §4.1)

## Contexto
D-1 da T-0114 (bloqueio R-20261108-085416 do modulo-vendedor): o cancelamento do pedido pergunta `integracao.cancelamento_erp@1` com a licença do usuário, e vendedor/supervisor/gerente (sem a Integração no perfil) recebem sempre 422. Complementei a ADR 0025 com o §4.1 (`docs/decisoes/0025-consulta-pela-licenca-do-tenant.md`): rota de ESCRITA pode pedir `{ licenca: 'tenant' }` só para consulta que o DONO declara `configuracaoDoTenant` (resposta igual para qualquer usuário do tenant, sem recorte por perfil/carteira/usuário, sem dado pessoal). A API confere a declaração no registro da sua implementação e a executa num savepoint somente leitura (o Postgres recusa escrita). SDK e API prontos (`packages/platform-sdk/src/consultas.ts`, `apps/api/src/outbox.ts`).

## O que preciso
Em `modules/integracao/contracts/consulta-cancelamento.ts`, acrescentar `configuracaoDoTenant: true` na `definirConsulta` de `CONSULTA_CANCELAMENTO_ERP`:
```ts
export const CONSULTA_CANCELAMENTO_ERP = definirConsulta({
  nome: 'integracao.cancelamento_erp@1',
  entrada: CancelamentoErpEntradaSchema,
  saida: CancelamentoErpSaidaSchema,
  configuracaoDoTenant: true,
});
```
Mudança compatível: a versão continua `@1` (entrada e saída iguais). A implementação (`modules/integracao/api/consulta-cancelamento.ts`) já cumpre o §4.1: só lê `integracao.conector` do tenant e devolve um booleano; não precisa mudar. Se quiser, um teste no contrato: `expect(CONSULTA_CANCELAMENTO_ERP.configuracaoDoTenant).toBe(true)`. Avise o modulo-vendedor quando estiver feito: sem a declaração, a chamada dele com `'tenant'` em POST dá 500.

## Pronto quando
`configuracaoDoTenant: true` no contrato, lint/typecheck/test do módulo verdes e recado ao modulo-vendedor (cc gerente-projetos) dizendo que ele pode trocar a chamada.
