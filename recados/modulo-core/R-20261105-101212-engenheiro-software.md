---
id: R-20261105-101212-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:12:12-04:00
---
# Revisão final do lote J (Core): T-0039 e web sem 🔴; 🔴 R1 na correção em curso do D-T0082a (RV pelo indicador_diario fere RN-CORE-21)

## Contexto
Revisão final do lote J, árvore de trabalho de 05/11 por volta das 10h, com `git diff origin/main` (fb1ef19). Cobre a T-0039 no Core, as correções F1, P1 e P2 da web da T-0081 e da T-0082, e as correções de D-T0081a, D-T0082a e D-T0082b que estão sendo feitas agora (farol.ts às 09:47, plano-rv.ts às 09:56, inicio.ts às 10:09).

### T-0039: sem 🔴 nem 🟡
- `etapas-pendencia.ts:129-148`. `baixarNotificacoesDaPendencia` roda na mesma transação nos dois caminhos: na baixa por evento (depois do `set situacao = 'concluida'`) e na dispensa (`:283`). Também é idempotente, pelo `deleted_at is null`. O filtro `envio_id = etapa` com origem core e tipo sistema também pega as notificações gravadas antes da 0030, que não têm subtipo.
- O pull leva a exclusão ao aparelho: a janela de `notificacoes.ts` deixa as removidas passarem sempre, e o gatilho da 0006 avança o `updated_at`.
- `contracts/sync.ts:300`: `subtipo` opcional e anulável, com o mesmo formato do CHECK da 0030. A mudança é aditiva. O app antigo tolera porque o motor não valida o payload do pull, só o do push (`motor-sync.ts:1170`), e o tipo novo é opcional.
- Testes: `etapas-pendencia.test.ts` cobre a baixa, o caso sem baixa, o subtipo e a dispensa; o `.db.test.ts` cobre o subtipo e o `deleted_at` (este só no CI). Rodei aqui `etapas-pendencia.test.ts`, `contracts/inicio.test.ts` e `manifest.test.ts`: 36 verdes.
- 🟢 C1 `etapas-pendencia.ts:143`. O `updated_at = $2` é sobrescrito pelo gatilho `notificacao_updated_at`, que grava `now()`. O resultado é o mesmo; tire o `updated_at` do `set` ou cite o gatilho no comentário.
- 🟢 C2. Pendências baixadas ou dispensadas ANTES deste lote continuam com a notificação viva. Hoje elas só somem pela janela de 30 dias do Gestor. Se quiser limpar, peça uma carga ao banco-dados. Não é obrigatório.
- 🟢 C3 `apoio-teste.ts:23`. O `hashBarato` (m=8, t=1) é bom para a velocidade, mas nenhum teste do Core exercita mais o `hashSenha` real (hoje só o `apoio-teste.ts` o citava). Vale um caso em que o `verificarSenha` confere um hash do `hashSenha` real.

### Web T-0081/T-0082: F1, P1 e P2 conferidos
- F1: `farol-page.tsx:330` usa só `lista.hasNextPage`.
- P1: `plano-rv-page.tsx:556` passa `bloqueada={edicao !== null || excluir.isPending}`.
- P2: `:247/:261` usam `aoEscolherEquipe` e `aoEscolherVendedor`.
- Foco: o `useEffect` só devolve o foco depois do commit (`isConnected`, com reserva no Novo plano).
- Sem 🔴 nem 🟡.

### Correções em curso dos defeitos do testes
- D-T0081a (`farol.ts:110` e `:188`) e o mesmo ajuste no `inicio.ts`: de acordo. A fonte vem da licença do tenant (`plataforma.tenant_modulo`), e o farol não usa consulta.
- D-T0082b (`plano-rv.ts:136-143`): de acordo. `on conflict (id) do nothing` seguido de 404 `PLANO_RV_NAO_ENCONTRADO`, sem gravar e sem auditar.
- 🔴 R1 `plano-rv.ts:200-203` (D-T0082a), se entrar no lote como está. Tirar a `fontePorConsulta(tx)` faz a RV ler SEMPRE o `core.indicador_diario`. Esse read-model ignora o tipo da meta: `calcularIndicadores` só usa `apuracao` com fonte (`metas.ts:157`). Isso troca um defeito por outro:
  - fere a RN-CORE-21, citada pela RN-CORE-29 ("Atingimento = realizado ÷ meta (RN-CORE-21)"): a meta de faturamento passa a ser apurada pelo pedido;
  - a RV deixa de bater com o `GET metas/painel` (`metas.ts:346`, ainda com a consulta) para quem tem o Vendedor. É a mesma pessoa, no mesmo mês, com realizado diferente em duas telas.

## O que preciso
1. R1 (🔴), para este lote: volte o `GET rv` para `calcularIndicadores(..., fontePorConsulta(tx))`, o estado revisado. O D-T0082a segue como `it.fails` e fica documentado para o gerente.
2. A correção certa do D-T0082a é da plataforma. A trava de `consultar` em `apps/api/src/outbox.ts:124` usa os módulos de QUEM CONSULTA (ADR 0012). Proponho uma opção explícita por chamada, `tx.consultar(def, entrada, { licenca: 'tenant' })`, que use a identidade de sistema com os módulos licenciados do tenant (a mesma `t.sistema` que o despachante já usa nos consumidores). O complemento da ADR 0012 e o teste ficam comigo. Do seu lado, `fontePorConsulta` passaria a aceitar a opção no RV, no painel e no Início. Só faço com o de acordo do gerente (cópia). A alternativa é de produto: o gerente decide que todo perfil do BKO que vê RV precisa ter o Vendedor.
3. Os 🟢 C1 a C3 ficam a seu critério.

## Pronto quando
`plano-rv.ts` sem o R1 (o RV e o painel com a mesma fonte), lint, typecheck e os testes do Core verdes, e resposta a este recado. O D-T0082a é fechado depois, quando a opção da plataforma estiver pronta (ou pela decisão de produto).
