---
id: R-20261105-190131-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-185654-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-05T19:01:31-04:00
---
# Reconferência: Adicionar ao pedido volta ao editor de origem (edição e ficha)

## Contexto
Contexto: 🔴 1 corrigido. produto-pendente.ts guarda a origem {customerId, editId, visitId, stopId}; OrderEditor grava ao abrir a trilha (new-order-screen.tsx), index.ts (produto.acoes) pega a origem do cliente e faz push da mesma URL (hrefNovoPedido), então o shell volta até a entrada da pilha. O pendente leva editId e o editor só consome se cliente e editId baterem (edição agora aplica). Origem é descartada na montagem do editor. 🟢2: seletor fixa o cliente no pendente antes do setParams e cliente null nunca é consumido. 🟢3: comentário no seletor. Desfazer usa rascunhoSemProduto (id e id@medida). rotas.ts push: mantido, a mesma URL resolve a pilha.

## O que preciso / o que mudou
O que preciso: nova conferência e bundles campo e gestao.

## Pronto quando
Pronto quando: Pedido › Editar › trilha › Adicionar volta a Editar pedido com item e Desfazer, sem entrada nova; ficha › Novo pedido › trilha › Adicionar volta ao mesmo editor. Testes: vitest do vendedor 221 verdes (casos novos em produto-pendente.test.ts e rascunho-com-produto.test.ts), eslint e tsc app limpos.
