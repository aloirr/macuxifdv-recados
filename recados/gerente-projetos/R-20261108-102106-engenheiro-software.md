---
id: R-20261108-102106-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:21:06-04:00
---
# D-1 resolvido no SDK/API: ADR 0025 §4.1 (consulta configuracaoDoTenant em escrita, savepoint somente leitura); falta flag da Integração e troca do Vendedor

## Contexto
D-1 da T-0114 (bloqueio R-20261108-085416 do modulo-vendedor; correção para o lote SEGUINTE). A pergunta "o ERP deste tenant aceita cancelamento?" (`integracao.cancelamento_erp@1`) é do tenant; em rota de escrita o SDK recusava `{ licenca: 'tenant' }`.

## O que fiz
- ADR 0025 complementada com o §4.1 (`docs/decisoes/0025-consulta-pela-licenca-do-tenant.md`): o DONO declara `configuracaoDoTenant: true` no contrato (resposta igual para qualquer usuário, sem recorte por perfil/carteira/usuário, sem dado pessoal). Só essa consulta pode usar `'tenant'` em escrita. A API confere a declaração no REGISTRO da implementação do dono (cópia "disfarçada" do consumidor não vale) e executa a consulta em `savepoint` + `set transaction read only` → `rollback to savepoint` + `release`: o Postgres recusa qualquer escrita, a transação volta a leitura/escrita para a rota seguir. Usuário, escopo, tenant e RLS continuam os de quem consulta; dono desligado no tenant segue `ConsultaIndisponivel`; GET/HEAD, consumidor, tarefa, Conector e aparelho não mudam.
- platform-sdk: `DefinicaoConsulta.configuracaoDoTenant?: true`, opção em `definirConsulta` (compatível: sem a chave nada muda), docs de `OpcoesConsulta` (`packages/platform-sdk/src/consultas-tipos.ts`, `consultas.ts`, `api.ts`); teste em `consultas.test.ts`.
- apps/api: `OrigemTransacao.escrita`, `modulosDoTenant` também em escrita, `emSomenteLeitura` e `SAVEPOINT_SOMENTE_LEITURA` (`apps/api/src/outbox.ts`, `apps/api/src/app.ts`); testes novos `apps/api/test/consultas-tenant-escrita.test.ts` (10, banco falso) e `consultas-tenant-escrita.banco.test.ts` (2, Postgres, roda no CI: escrita recusada com 25006 e rollback total; rota volta a escrever depois da consulta).

## Testes
platform-sdk: lint e typecheck 0; vitest 705 testes, só 1 timeout de 5 s em `motor-sync.leituras.test.ts` (SQLite, máquina carregada), que passou isolado. apps/api: lint e typecheck 0; os 10 novos e `consultas.test.ts` verdes; suíte inteira com 1 vermelho ALHEIO: `test/eventos-contratos.test.ts:74`, `integracao.pedido.cancelamento_recusado@1` publicado sem DefinicaoEvento no contracts (trabalho em curso da Integração; aviso R-20261108-102033). `coord verificar engenheiro-software`: OK.

## Pendências
1) modulo-integracao: `configuracaoDoTenant: true` em `CONSULTA_CANCELAMENTO_ERP` (pedido R-20261108-094400). 2) modulo-vendedor, depois do 1: `tx.consultar(CONSULTA_CANCELAMENTO_ERP, {}, { licenca: 'tenant' })` em `rotaCancelarPedido` (resposta R-20261108-094704, encerra o bloqueio). Antes do 1 a chamada dá 500, por isso a ordem. 3) A prova do savepoint no Postgres (`.banco.test.ts`) e o E2-V só rodam no CI. Premissa: o Postgres desfaz o `transaction_read_only` no `rollback to savepoint` (comportamento documentado do SET em subtransação); o teste de banco cobre isso.
