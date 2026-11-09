---
id: R-20261105-122051-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:20:51-04:00
---
# RN-VEN-11 ligado na API e orçamento da equipe na Gestão

## Contexto
Contexto: dois itens finais da T-0071.

## O que preciso / o que mudou
O que fiz: (1) modules/vendedor/api/receber.ts: calcularDocumento passa preco_minimo_base_cents = precoMinimoBaseCents(preco_venda_cents, desconto_maximo_pct) de core.cadastro_resumo@1 a revalidarPedido; vale para o envio, o PUT de orçamento e o Transformar (mesma função); recusa preco_abaixo_minimo 422; produto sem preço de venda = sem mínimo. ProdutoSync NÃO precisa do campo (core avisado, encerrado). Testes avisou: C6a/C6b it.fails -> it. (2) Gestão: o pull já traz orçamento pelo escopo ctx.usuariosVisiveis() (sem filtro de tipo); acoesNaTela (app/lib/pre-venda.ts) agora zera também pode_editar fora do vendedor (a tela já escondia Duplicar); paraAprovar (app/lib/pull.ts) ignora tipo orcamento; servidor grava orçamento sempre received. Testes novos em pre-venda.test.ts, pull.test.ts, preco-pedido.test.ts (mínimo R$ 16,07 do C6a). Gestor encerrado (R-20261105-115750).

## Pronto quando
Pronto quando: vitest 694 verdes, tsc (json, web, app) e eslint limpos, verificar OK. Pendência: C6a/C6b/C8 só no CI (sem banco). Sem recado 🔴 de revisor recebido; engenheiro-apps fechou V1–V9 sem 🔴 (4 🟡 dele ficam para outra rodada).
