---
id: R-20261101-091541-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T09:15:41-04:00
---
# Revisão final T-0029: sem 🔴; 5 🟡 pós-commit (S0-014 aceito para a demo)

## Contexto
Revisão final da T-0029, só leitura (diff de trabalho x HEAD): modules/vendedor (onda 2), modules/core/app/lib/entidades-produto.ts + app/index.ts, minhas mudanças da T-0026 em apps/{api,mobile,web}, tests/integracao/demo/pedido-fatia.test.ts e tests/e2e/bko/pedidos-bko.spec.ts. Nenhum arquivo alterado por mim nesta passada.

## Veredito: sem 🔴. Pode commitar e gerar os APKs preview.

**🟢 aprovado**
- Fronteiras: vendedor importa só @macuxi/{core,catalogo}/contracts, @macuxi/ui e @macuxi/db/teste (só em teste). O aparelho lê `cliente`, `produto` e `cliente_tabela_preco` locais com tipos dos contracts (permitido pelo desenho §3.5; ambos em `depende`).
- Regra no domain: domain/aprovacao.ts (revalidarPedido, resultadoDoRecebimento P-1, decidirAprovacao P-3/RN-GES-08, recusaDePerfil, dataDoPreco P-4, montarPedidoAprovado) puro; aprovacao.test.ts cita RN (50 refs). P-2 aplicada: order.ts:248 não tem mais 'approved' editável; app edita só o que está na fila (order-detail-screen.tsx:105).
- Revalidação na API: api/receber.ts:58-246 — Zod do PedidoPush pela plataforma (sdk sync.ts:235), perfil (64), trava consultiva + idempotência por UUID e hash (68-77, RN-VEN-33; conflito sem regravar), carteira (80), cadastro por core.cadastro_resumo@1 (90), preço por catalogo.precos_cliente@1 (100, RN-CAT-06), condição (105, RN-VEN-14), alçada e total do servidor (113, RN-VEN-02/10). Uma transação por item; 5xx derruba o lote para reenvio (262-265).
- Licença/perfil/escopo: rotas com `acao` do manifesto (pedido.ver/aprovar/cancelar) + escopo por usuariosVisiveis/carteira com 404 fora do escopo (pedidos.ts:66-77); decisão com `for update` (194).
- Promotor (regra 7): barrado no push (sdk sync.ts:229), no domain (aprovacao.ts:189, 277, 343) e nas rotas de escrita (manifesto sem promotor em criar/editar/cancelar/aprovar); só leitura da carteira (sync.ts:52). Casos 11a–11c do pedido-fatia cobrem.
- Dinheiro em centavos inteiros; desconto em pct com 2 casas; PDF com escapeHtml em todo campo (pdf-pedido.ts:86 e usos).
- Sem `declare` em campo de classe em modules/*/{app,domain,contracts}, packages/platform-sdk e packages/comum. Sem console.* nem log com dado pessoal; consulta loga só dono/consulta/request_id (apps/api/src/outbox.ts).
- entidades-produto.ts: correta (pull, servidor_vence, mesmo schema da API); ligada em core/app/index.ts.
- T-0026 (minhas): /v1/saude estável com SaudeRespostaSchema (app.ts:267-269), tx.consultar/tx.auditar/ctx.parametros por requisição, mobile health via testarServidor; sem regressão no que li.
- Cobertura: pedido-fatia.test.ts mapeia critérios 1, 2, 3 (API), 4 (API), 5 (PDF) e 7; pedidos-bko.spec.ts cobre 4 e o PDF do BKO. Critério 8 (APKs + roteiro) é o próximo passo.

**🟡 corrigir depois do commit (não bloqueia a demo nem os APKs)**
1. S0-014 — modules/vendedor/api/pedidos.ts:60-63 lê `plataforma.tenant` (fuso). **Aceito como exceção temporária para a demo** (só leitura, sob RLS). Correção: eu exponho `ctx.fuso()` no ContextoBase (platform-sdk + createApp, lido junto com licenças/parâmetros) e o modulo-vendedor troca `fusoDoTenant` por ele; depois o testes retira a exceção. Prazo: próxima rodada, antes de fechar a T-0029.
2. S0-014 — modules/vendedor/api/pedido.db.test.ts:79-81 e 149 fazem SQL em core.*. Aceito para a demo; trocar por ids da fixture/base (ou decisão sua liberando *.db.test.ts a semear outro schema — eu prefiro não liberar).
3. modules/vendedor/api/pedidos.ts:163-171 `GET /alcadas` usa `acao: 'pedido.ver'`, que inclui o promotor: ele passa a ver a política de desconto. Trocar para `perfis: [...PERFIS_PEDIDO, 'admin']` (ou ação própria). Recado ao vendedor.
4. `Claude outputs/engenheiro-apps.md` (sem dono) é a única violação do `coord verificar`: não commitar (ou dar dono).
5. apps/web/next-env.d.ts (O-4): solução definitiva fica comigo — pôr `apps/web/next-env.d.ts` no .gitignore, `git rm --cached` e typecheck do web como `next typegen && tsc --noEmit` (o Next 15.5+/16 gera o arquivo; o tsconfig já inclui .next/types e .next/dev/types). Faço na próxima rodada; agora concordo em não commitá-lo.

**🟢 sugestões**
- receber.ts:127 consome o número antes do insert; com ID_EM_USO de outro tenant (153) fica uma lacuna na numeração. Aceitável; só documentar.
- .coord/contratos/modulos.md:34 menciona leitura local de cliente/produto; acrescentar `cliente_tabela_preco` (Catálogo) que o Vendedor também lê no aparelho (pull.ts:42).
- `status_alterado@1.motivo` leva texto livre do aprovador/rejeitador: consumidores não devem logá-lo.

## Pronto quando
Sem 🔴: commit da rodada e builds campo-preview/gestao-preview liberados. 🟡 1-3 por recado ao modulo-vendedor (cc testes); 🟡 1 (SDK) e 5 ficam comigo na próxima rodada. Caixa: outros 7 pedidos abertos (T-0004 EAS, T-0005, T-0014, T-0023, T-0025, T-0026 trustProxy) não tratados nesta passada por instrução sua.
