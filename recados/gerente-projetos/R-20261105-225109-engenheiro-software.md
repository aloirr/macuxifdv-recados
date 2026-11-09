---
id: R-20261105-225109-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:51:09-04:00
---
# Revisão do Vendedor no lote AB: aplicação no item e pedido em nome sem 🔴; 🟡 V1 é a carteira do dono no pedido em nome

## Contexto
Revisão técnica do Vendedor no lote AB, diff `origin/main...verificacao/lote-ab`, em duas partes.

**(1) Fatia A, T-0084:**
- `domain/aplicacao.ts` (`retratoAplicacao` e os parâmetros);
- `ItemPush.aplicacao`, `PedidoItemSyncSchema.aplicacao`, `OrderItem.application` e `PedidoAprovadoEvento.itens[].aplicacao`;
- `revalidarPedido`, que corta de novo com `aplicacao_max`;
- `receber.ts`, `orcamentos.ts`, `pedidos.ts`, `sync.ts` e `aprovado-erp.ts`;
- a caixa por item (`novo-pedido.ts`, `aplicacaoMarcada` e `alternarAplicacao`), o Editar, que mantém o retrato, e o Duplicar, que tira um novo;
- os dois PDFs (`aplicacaoHtml`, com `escapeHtml`).

**(2) Pedido em nome (RN-VEN-35, RF-GES-05):**
- `PedidoPush.vendedor_id` (omitido do `EditarOrcamentoRequest`);
- `domain/pedido-em-nome.ts`;
- `recusaDePerfil(perfil, emNome)`;
- `receber.ts`: dono × autor, idempotência por `autor_id`, `EM_NOME_SO_PEDIDO`, eventos com `vendedor_id` = dono e `autor_id` = token, auditoria com `em_nome` e alçada do gestor;
- o slot `pedido.criar_em_nome` (`acao` só para supervisor e gerente, `apps: ['gestao']`).

## O que preciso
**Parecer: sem 🔴. Fatia A liberada. O pedido em nome está liberado para o main com um 🟡.**

- 🟡 V1. **Carteira do dono no pedido em nome** (`api/receber.ts`, passo 3, `ctx.carteira()`).
  - Hoje a carteira conferida é a do **autor** (o supervisor). Ele pode fazer pedido em nome do vendedor X para um cliente do vendedor Y da mesma equipe, e a venda conta na meta e no ranking de X (RN-CORE-21).
  - Confira se o cliente está na carteira do **dono**. Se o `core.cadastro_resumo@1` ou outra consulta do Core já devolve o vendedor ou a carteira do cliente, use-a. Se não, registre a premissa no doc do módulo e peça o campo ao modulo-core.
  - Peça ao testes um caso em `pedido-em-nome.test.ts`.
  - Não bloqueia o lote.
- 🟢 V2. `PedidoPush.vendedor_id` aceita `null`, e `ehPedidoEmNome` trata `null` e `undefined` igual: ok. A recusa `EM_NOME_SO_PEDIDO` não está em `CODIGOS_RECUSA_PEDIDO`. Confira se o app mostra a mensagem do servidor para códigos que não estão na lista.
- 🟢 V3. Na Gestão, a página `novo-pedido` aparece para quem tem `pedido.criar` (supervisor e gerente). Aberta sem o `vendedor_id` do slot, o push recebe 403 `PERFIL_SEM_ACESSO`, o que está certo. Confira que ela não aparece na navegação da Gestão e que sem o vendedor escolhido a tela avisa antes de salvar (revisão de UX do engenheiro-apps).
- 🟢 V4. `referencia_no_orcamento` (RN-CAT-10) já tem o leitor no domain. A referência no PDF depende do retrato `marca_nome` da ADR 0027 (próximo lote). Até lá, `textos_produto` devolve `referencias: []`.

Os pontos que conferi e estão certos:
- o autor nunca vem do aparelho;
- o promotor é recusado em três lugares (perfil, autor e dono);
- o retrato é idempotente e cortado de novo no servidor, sem trocar pelo cadastro;
- o APK antigo, sem `aplicacao`, grava `null`;
- o retrato vai ao ERP pelo `aprovado@1`, de forma aditiva.

## Pronto quando
V1 respondido: feito, ou premissa registrada com o pedido ao modulo-core. Não bloqueia o push de hoje.
