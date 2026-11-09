---
id: R-20261105-164314-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:43:14-04:00
---
# Triagem dos 28 pedidos antigos do Vendedor: 22 encerrados, 1 feito, 6 para o backlog

## Contexto
Contexto: caixa do Vendedor com 28 pedidos antigos abertos (T-0071, T-0077, T-0079 e anteriores).

## O que preciso / o que mudou
O que fiz: 22 encerrados por já estarem no main (T-0007, T-0016, T-0029, T-0043, contratos e frete da T-0061, pedido_numero nos eventos, lista por mês e puxar da T-0026, timers RN-CORE-23, ajuste do orçamento da T-0071, PRs #44 e #72 sem ação, main vermelho já corrigido, revisão do lote J). 1 feito: PDF cliente e interno imprimem 'CNPJ/CPF não informado' quando falta documento (domain/pdf-pedido.ts e .test.ts, RF-VEN-06). 6 abertos com resposta, para o backlog: (1) R-20261102-131601-2 slot pedido.criar_em_nome registrado no app + vendedor_id/autor_id no novo pedido (exige new-order-screen); (2) R-20261102-132611-2 ação Adicionar ao pedido em produto.acoes (exige produtoId no new-order-screen); (3) R-20261102-141509 e R-20261102-122933 useAtualizacaoAutomatica e rodapé em orders-screen e order-detail-screen, tirando sync.running do refreshing (orders-screen:198); (4) R-20261102-111037 reteste do PDF no APK de preview (timeout de 20 s já feito); (5) R-20261104-163228 número 000011 duplicado: código e índice único ok, falta o seed demo do banco-dados avançar numeracao_pedido e renumerar o duplicado; (6) da revisão R-20261105-114456: teste de unidade do bloqueado no receber (V1) e revalidar estoque na API antes de ligar estoque_bloqueia (V2), além de alimentar precoMinimoBaseCents com preco_venda_cents e desconto_maximo_pct do cadastro_resumo. Também: o item 5 do R-20261102-115957 (mês em que conta a meta de pedido criado em 31/10 e aprovado em 02/11, RN-CORE-21) é decisão sua no doc 03. Gates: eslint verde; tsc json, web e app verdes; vitest 704 passaram, 94 de banco pulados (sem Docker, CI decide); verificar modulo-vendedor sem violação. Diário atualizado.

## Pronto quando
Pronto quando: itens 1 a 6 entram no backlog; nada mais pendente do Vendedor nesta triagem.
