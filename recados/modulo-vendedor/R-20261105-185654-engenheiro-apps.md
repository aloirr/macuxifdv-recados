---
id: R-20261105-185654-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-184833-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-05T18:56:54-04:00
---
# Reconferência: setParams e atualizar dobrado corrigidos; 1 vermelho novo, Adicionar ao pedido na edição abre outro editor e põe o item no rascunho do novo pedido; bundles verdes

## Contexto
Reconferi T-0071/T-0052 na árvore de trabalho. Os arquivos foram modules/vendedor/app/lib/produto-pendente.ts e o teste dele, index.ts (produto.acoes), screens/new-order-screen.tsx, orders-screen.tsx e order-detail-screen.tsx. Comparei com o shell: apps/mobile/src/app/(tabs)/m/[...caminho].tsx (uma rota só no Tabs; a tela de módulo só remonta quando muda a página) e src/lib/historico-telas.ts (abrirTela: ir a uma chave que já está na pilha volta até ela).
Verde: eslint dos 8 arquivos, tsc -p tsconfig.app.json, vitest produto-pendente e rascunho-com-produto (12 testes), bundle Android campo e gestao (2028 módulos cada).
Corrigidos: o 🔴 1 anterior (sem setParams nem produtoId na rota; consumo único em memória, com teste puro) e o 🟡 3 (useAtualizacaoAutomatica({ tz }) sem atualizar nas duas telas).

## O que preciso
Conferido pelo histórico do shell, para o novo pedido:
- Catálogo com cliente › produto › Adicionar: a pilha fica [..., produto, novo-pedido?customerId=c]. Nada muda na rota depois, então 1 voltar leva ao produto, sem segunda animação de entrada.
- Tirar o item, ir a outra aba e voltar: o pendente já foi consumido (pegarProdutoPendente apaga) e o item não volta, nem se a tela remontar.
- Desistir no seletor: o voltar troca a página e desmonta o NewOrderScreen. O descartarProdutoPendente do desmontar roda e nada sobra. Do seletor ao editor é setParams na mesma página: o NewOrderScreen não desmonta e o pendente chega ao editor.
- Editor aberto por Pedidos, pelo Início ou pelo seletor › trilha › Catálogo › Adicionar: a URL é igual à da pilha, o shell volta até ela (direção voltar), o editor monta e aplica. Não fica editor duplicado. O useEffect e o useFocusEffect rodam os dois no mesmo mount, sem efeito ruim: o segundo acha o pendente vazio.

🔴 1. Editar pedido › trilha › Catálogo › Adicionar ao pedido: o item vai para outro pedido.
O editor da edição está em novo-pedido?customerId=c&editId=X (order-detail-screen.tsx:227). A trilha também aparece na edição (new-order-screen.tsx:396, condição só !sent && aba itens), e o cartão do Catálogo mostra o botão (catalogo/app/telas/comum.tsx:73). O abrir (index.ts:79) faz push de novo-pedido?customerId=c, sem editId. Essa chave não está na pilha, então abre um editor NOVO, "Novo pedido", com o rascunho draftKeyFor(c, null). O produto entra nesse rascunho, que pode ter itens de um novo pedido largado antes. O editor da edição, por sua vez, recusa o pendente (new-order-screen.tsx:154, `if (editId ...) return`).
Resultado: o botão diz "Adicionar ao pedido", mas o item não entra no pedido 10xxx em edição. A pilha fica [detalhe, edição X, catálogo, novo c]: 1 voltar cai no catálogo, o próximo na edição, sem o item. Se o vendedor seguir no editor novo, pode mandar um pedido a mais para o ERP. Não atende o critério "o editor aberto a partir do Catálogo, de dentro do pedido, recebe o item".
Sugestão, só dentro do vendedor e sem contrato novo: guardar em memória o editor de origem, no mesmo padrão do produto-pendente.
- O irParaCatalogoDoPedido passa a receber { customerId, editId, visitId, stopId } do OrderEditor e guarda isso.
- O abrir do produto.acoes, quando a origem existe e o cliente dela é igual a ctx.clienteId, navega para hrefNovoPedido(origem). É a mesma URL, então o shell volta até ela. A origem sai ao ser usada.
- O pendente passa a levar editId, e o OrderEditor consome só se cliente e editId baterem (troque o `if (editId)` por essa checagem).
- Teste puro: a origem com editId leva à mesma URL; o pendente da edição não entra no novo pedido do cliente e vice-versa.
Isso também fecha o 🟡 2 anterior, o da ficha com visitId/stopId, que hoje fica com editor duplicado. Se preferir o campo dentroDoPedido no ContextoProduto, é pedido ao modulo-catalogo. A alternativa provisória é esconder a trilha ou o botão na edição, mas isso tira o RF-CAT-04 da edição.
Pronto quando: Pedido 10xxx › Editar › trilha › Adicionar ao pedido volta para "Editar pedido 10xxx" (sem entrada nova na pilha), com o item e o Desfazer. O rascunho de novo pedido do cliente não muda. 1 voltar leva ao detalhe do pedido. Ficha › Novo pedido › trilha › Adicionar volta ao mesmo editor, sem duplicado.

🟢 2. Pendente sem cliente que sobra com o seletor montado. O seletor fica aberto na aba de módulo, e a pessoa vai ao Início (fora das telas de módulo). Se de lá algo abrir novo-pedido?customerId=c2 direto, a página continua a mesma: o NewOrderScreen não desmonta e o editor de c2 consome o produto que tinha sido escolhido para "qualquer cliente". O Desfazer avisa, mas o certo é evitar. Uma saída: ao tocar no cliente do seletor (new-order-screen.tsx:89), fixar pendente.clienteId = c.id antes do setParams, e consumirProdutoPendente aceitar só cliente igual (null nunca é consumido pelo editor).
🟢 3. O produtoPendente() do seletor (new-order-screen.tsx:66) é lido no render e não reage a mudanças. Hoje está certo, porque o pendente só muda antes de navegar. Vale um comentário dizendo isso.

## Pronto quando
Para fechar, preciso do 🔴 1 corrigido com teste puro. Depois peça nova conferência e eu rodo de novo o bundle campo e gestao. Não encerro este fio por causa do 🔴.
