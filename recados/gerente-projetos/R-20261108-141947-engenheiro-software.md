---
id: R-20261108-141947-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:19:47-04:00
---
# T-0118 entregue: pool não trava com pushes simultâneos (carteira pela transação corrente + guarda de conexão)

## Contexto
T-0118 (D-T0107a, achado da carga T-0107). Antes dela, os dois pedidos pequenos que tinham agentes esperando:
- R-20261108-111043 (banco-dados): `entra_no_portal: z.boolean()` no `AdminDaEmpresaSchema` (packages/platform-sdk/src/plataforma.ts); teste da rota GET admins com admin (true) e admin + vendedor (false) em apps/api/test/super-admin.test.ts. Encerrado.
- R-20261108-103541 (modulo-integracao): `integracao.pedido.cancelamento_recusado@1` registrado em .coord/contratos/eventos.md. Encerrado.

## O que fiz
**Causa.** O push do pedido (modules/vendedor/api/receber.ts → `ctx.comTenant`) chama `ctx.carteira()` dentro da transação; a plataforma (apps/api/src/app.ts) resolvia a carteira com `carteiraDe(token, acesso)`, que abre OUTRA transação no mesmo pool. Com pushes em voo >= pool, cada requisição segura uma conexão esperando outra. O mesmo vale para `ctx.usuariosVisiveis()` e para outras rotas que leem carteira ou usuários dentro da transação (Core checarUsuario, Gestor carregarContexto, Promotor visitasNoEscopo e recebimento, Vendedor orçamentos e pedido em nome). Varredura: `tx.consultar` e `ctx.email` já usam o `db` da transação; licenças, horizonte, geração e instante rodam fora; nenhum `comTenant` aninhado direto nos módulos.

**Correção (só plataforma, nenhum módulo muda).**
- apps/api/src/transacao-corrente.ts (novo): marca por AsyncLocalStorage da transação aberta na cadeia assíncrona e a guarda de conexão.
- apps/api/src/app.ts: `ctx.comTenant` marca a transação; `ctx.carteira()`/`ctx.usuariosVisiveis()` dentro dela leem pelo `db` corrente (mesmo tenant e RLS); fora, abrem a sua como antes. Promessa rejeitada sai do memo.
- apps/api/src/banco.ts: `criarBancoApp` marca toda transação e passa todo pedido de conexão pela guarda. `MACUXI_GUARDA_CONEXAO=erro|aviso|desligado`; padrão `aviso` com NODE_ENV=production (demo e produção: só avisa, uma vez por ponto) e `erro` no resto (teste e desenvolvimento).
- packages/platform-sdk/src/api.ts: regra documentada em `ContextoBase.carteira`.
- Desenho: docs/desenho/T-0118.md.

**Testes.**
- apps/api/test/transacao-corrente.test.ts (sem banco): marca, guarda nos 3 modos, carteira + usuários lidos pela transação da rota (1 conexão só) e fora dela como antes.
- apps/api/test/conexao-na-transacao.banco.test.ts (CI): banco próprio, módulos reais, pool 2 com connectionTimeoutMillis, 6 pushes simultâneos todos aceitos; os mesmos 6 reenviados ao mesmo tempo aceitos pela idempotência, 1 linha por pedido; guarda em modo erro recusa comTenant/semTenant aninhados sem prender conexão.
- Local: lint e typecheck limpos (apps/api e platform-sdk); vitest apps/api 354 ok, 69 de banco pulados (sem Docker); SDK plataforma 16 ok. `verificar engenheiro-software` sem violações.

## Pendências
- Testes (R-20261108-141127): o caso 6 da carga (tests/carga/t0107/carga-20mil-t0107.test.ts:518) é `it.fails` e fica VERMELHO com a correção. A troca `it.fails` → `it` precisa entrar NO MESMO COMMIT, senão o main fica vermelho. Recomendei também subir o connectionTimeoutMillis do caso 6 de 2 s para 10 s. Pedi a rodada da carga com MACUXI_CARGA_MEDIR=1 quando estiver no main (critério 2: p95 do push).
- Os testes de banco só rodam no CI: o resultado do CI é o critério. Se a guarda acusar algum ponto que a varredura não pegou, o erro cita D-T0107a e o arquivo; contorno para um job: MACUXI_GUARDA_CONEXAO=aviso.
- Recados novos na minha caixa, fora desta tarefa: R-20261108-135742 (T-0123, diff de governança) e R-20261108-141717 (T-0128, useBloquearSaida no SDK react).

## Pronto quando
CI verde com o caso 6 da carga já em `it` e a carga com MACUXI_CARGA_MEDIR=1 dentro da meta.
