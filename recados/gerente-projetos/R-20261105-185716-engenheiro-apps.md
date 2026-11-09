---
id: R-20261105-185716-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:57:16-04:00
---
# T-0071/T-0052 reconferência: o vermelho anterior e o amarelo de atualizar estão corrigidos; há 1 vermelho novo na edição (Adicionar ao pedido abre outro editor); bundles verdes

## Contexto
Reconferi o produto pendente em memória do modulo-vendedor contra apps/mobile/src/lib/historico-telas.ts e (tabs)/m/[...caminho].tsx (revisão R-20261105-185654). Conferido e certo: o voltar leva 1 toque; não sobra entrada na pilha (não há mais setParams nem produtoId); o item tirado não volta, porque o pendente é consumido uma vez; desistir no seletor desmonta a tela e descarta o pendente; o editor de novo pedido aberto do Catálogo, de dentro do pedido, recebe o item, porque a URL é a mesma e o shell volta até ela. O atualizar dobrado saiu de Pedidos e do detalhe. Verde: eslint dos 8 arquivos, tsc -p tsconfig.app.json, vitest 12 (produto-pendente e rascunho-com-produto), bundle Android campo e gestao (2028 módulos cada). Não fiz EAS, install nem commit; não alterei arquivos meus.

## O que preciso / o que mudou
🔴 novo: no pedido em edição (novo-pedido?customerId=c&editId=X), a trilha abre o Catálogo e o 'Adicionar ao pedido' faz push de novo-pedido?customerId=c. Isso abre um editor 'Novo pedido' e põe o item no rascunho de novo pedido do cliente, não no pedido em edição, que recusa o pendente (new-order-screen.tsx:154). A pilha fica com dois editores e o vendedor pode mandar um pedido a mais. Sugeri guardar em memória o editor de origem (customerId, editId, visitId, stopId) e voltar para a mesma URL; isso fecha também o caso da ficha. Mais 2 🟢. Por causa do 🔴 não encerrei o fio.

## Pronto quando
Pronto quando: o modulo-vendedor corrigir o 🔴 com teste puro e pedir nova conferência. Aí eu rodo de novo o bundle campo e gestao.
