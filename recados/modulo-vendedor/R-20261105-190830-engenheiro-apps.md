---
id: R-20261105-190830-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-190131-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-05T19:08:30-04:00
---
# Reconferência: Adicionar ao pedido volta ao editor de origem nos 4 caminhos; sem vermelho nem amarelo; bundles campo e gestao verdes

## Contexto
Reconferi T-0071/T-0052 na árvore de trabalho. Li modules/vendedor/app/index.ts (produto.acoes), rotas.ts, screens/new-order-screen.tsx, screens/order-detail-screen.tsx:227, lib/produto-pendente.ts, lib/rascunho-com-produto.ts e os testes. Comparei com o shell: apps/mobile/src/app/(tabs)/m/[...caminho].tsx (rota única; trocar de página desmonta a tela de módulo; o OrderEditor tem key cliente:editId) e src/lib/historico-telas.ts (abrirTela: ir a uma chave que já está na pilha volta até ela; a chave ordena os parâmetros, então customerId/editId/visitId/stopId em qualquer ordem dão a mesma chave).
Verde: vitest produto-pendente e rascunho-com-produto (17), eslint dos 9 arquivos, tsc -p tsconfig.app.json, bundle Android campo e gestao (2028 módulos cada).
O 🔴 1 de R-20261105-185654 está corrigido. Não há 🔴 nem 🟡; encerro o fio.

## O que conferi (os quatro caminhos)
1. Pedido novo (Pedidos › Novo › cliente c › trilha › Catálogo › produto › Adicionar): a origem é {c}. O push de novo-pedido?customerId=c acha a chave na pilha e volta até ela (sem entrada nova). O editor remonta, descarta a origem (que já tinha sido usada) e consome o pendente {p, c, null}. Item e Desfazer aparecem. 1 voltar leva à tela anterior ao editor. Nada sobra.
2. Pedido em edição (detalhe X › Editar › trilha › Adicionar): a origem é {c, X}. O push de novo-pedido?customerId=c&editId=X volta até "Editar pedido" (pilha [.., detalhe X, edição X]). O pendente leva editId X e só a edição X consome (pegarProdutoPendente(c, X)). O rascunho draftKeyFor(c, null) não muda. O Desfazer usa o draftKey da edição. O rascunho da edição sobrevive à ida ao Catálogo, porque não há limpeza no desmontar. 1 voltar leva ao detalhe X.
3. Ficha (Novo pedido com visitId/stopId › trilha › Adicionar): a origem é {c, v, s}. hrefNovoPedido tira o editId undefined, então a chave é igual à do editor da ficha e não há duplicado. O ligarRascunho roda de novo na remontagem e não muda nada (mesma visita e parada). 1 voltar leva à ficha.
4. Catálogo pelo Mais, sem editor: lá o Catálogo só tem cliente pela URL, que só a trilha do editor monta. Então ctx.clienteId é null, e pegarOrigemEditor(null) devolve null e apaga qualquer origem velha. O pendente {p, null} abre o seletor com "Item: <nome>". O toque no cliente fixa o cliente antes do setParams. O editor de c consome uma vez e põe o item no rascunho de novo pedido de c, o comportamento esperado. Se a pessoa desistir no seletor, o desmontar do NewOrderScreen descarta o pendente. Um pendente sem cliente nunca é consumido.
Nenhum editor fica duplicado nos quatro caminhos. O consumo é único, porque pegar apaga, e o useEffect e o useFocusEffect do mesmo mount acham o pendente vazio na segunda vez.

## Sugestões (não bloqueiam)
🟢 1. Caminho 4 e também Pedidos › Novo: o setParams do seletor (new-order-screen.tsx:92) muda a chave da rota, e o shell empilha o editor por cima do seletor. Assim, 1 voltar no editor leva ao "Para qual cliente?", e são 2 para voltar ao produto do Catálogo. É o comportamento de antes desta tarefa e o seletor é um passo de verdade, então não bloqueia. Se o designer-ux preferir que o editor tome o lugar do seletor, troque por router.replace(hrefNovoPedido({ customerId: c.id })): o shell marca a substituição (ADR 0026) e a página continua a mesma, então o pendente chega ao editor.
🟢 2. Sobra de origem, caso raro: a pessoa abre o Catálogo pela trilha do editor e sai dele pela barra de abas, sem voltar ao editor. A origem fica guardada até o próximo OrderEditor montar ou até o próximo Adicionar. Como o Catálogo só tem cliente quando aberto pela trilha (que regrava a origem) e a origem só vale para o mesmo cliente, não achei um caminho real que leve o item a um editor errado. Se um dia o Catálogo ganhar outra entrada com ?cliente=, o certo é o modulo-catalogo passar dentroDoPedido no ContextoProduto e o abrir usar a origem só nesse caso.

## Pronto quando
Nada pendente da minha parte para T-0071/T-0052 nestes arquivos.
