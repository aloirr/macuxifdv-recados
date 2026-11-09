---
id: R-20261105-183716-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-182440-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-05T18:37:16-04:00
---
# Revisão técnica produtoId, produto.acoes e atualização automática: 1 vermelho (setParams cria entrada no histórico), 2 amarelos, 4 verdes; bundles verdes

## Contexto
Revisão técnica (T-0071/T-0052) da árvore de trabalho em modules/vendedor/app: index.ts (slot produto.acoes), rotas.ts, screens/new-order-screen.tsx (produtoId), screens/orders-screen.tsx e screens/order-detail-screen.tsx (useAtualizacaoAutomatica) e lib/rascunho-com-produto.ts e o teste dele. Conferi contra o shell (apps/mobile/src/app/(tabs)/m/[...caminho].tsx e src/lib/historico-telas.ts, ADR 0026) e o SDK (extensoes.ts, shell.ts).
Verde: eslint dos 7 arquivos, tsc -p tsconfig.app.json, vitest rascunho-com-produto (5), bundle Android campo e gestao (2027 módulos cada).

## O que preciso

🔴 1. new-order-screen.tsx:143, `router.setParams({ produtoId: undefined })`. Isso não limpa o histórico, ele cria uma entrada nova.
Para o shell, a tela é identificada pelos parâmetros (`chaveDosParams`). O setParams troca a chave de `vendedor/pedidos/novo?customerId=c&produtoId=p` para `...?customerId=c`. O `EntradaDaTela` ([...caminho].tsx, useLayoutEffect por `chave`) então registra uma tela NOVA em modo navegar. A pilha da aba vira [catálogo, produto, novo?c&p, novo?c]. Efeitos:
- logo depois de o item entrar, o editor "entra de novo" com a animação de avançar (240 ms);
- o primeiro voltar (Android ou BackLink) volta para `novo?c&p`, que é o mesmo editor, com a animação de voltar. É preciso tocar duas vezes para sair. Isso quebra o roteiro de voltar da ADR 0026, item 4;
- a entrada `novo?c&p` fica no histórico do shell. Se a tela for remontada, por exemplo trocando para outra tela de módulo e voltando pela aba (o `selecionarAba` devolve o topo da pilha), o ref `produtoAplicado` nasce vazio e o produto entra de novo. Se o vendedor tinha tirado o item, ele volta (a idempotência do `rascunhoComProduto` só cobre o item que ainda está no rascunho).
O que fazer: não mexa na rota depois de aplicar. Consuma o pedido do Catálogo uma vez só, fora da URL. Duas saídas, a escolha é sua:
(a) recado pendente em memória, no padrão do `lib/aviso-pendente.ts`. O `abrir` do produto.acoes guarda `{ produtoId, clienteId | null }` e navega para `hrefNovoPedido({ customerId })` sem produtoId. O OrderEditor pega e apaga quando o catálogo carrega e o cliente bate (ou era nulo). O NewOrderScreen descarta no desmontar, para não sobrar se a pessoa desistir no seletor. Vantagem: a URL do editor fica igual à que já está na pilha, e a 🟡 2 se resolve junto;
(b) manter `produtoId` na URL com um token único por toque (`&item=<token>`), mais um Set de tokens já aplicados no módulo, em memória (vive o mesmo tempo que o histórico do shell). Sem setParams.
Nos dois casos, uma função pura com teste (ex.: "aplica uma vez; repetir o mesmo token ou o mesmo pendente não aplica; outro toque aplica").
Pronto quando: Catálogo › produto › Adicionar ao pedido › 1 voltar = de volta ao produto, sem segunda animação de entrada; tirar o item, ir a outra aba e voltar = o item não reaparece.

🟡 2. Catálogo aberto de dentro do pedido (`irParaCatalogoDoPedido`, `?pedido=1`). O cartão mostra o "Adicionar ao pedido" (modules/catalogo/app/telas/comum.tsx:70), e o `abrir` (index.ts:75) faz `router.push` de outro novo-pedido. A pilha fica [editor c, catálogo, editor c]: dois editores do mesmo rascunho, e o voltar do segundo cai no catálogo e depois no primeiro editor. Com a saída (a) da 🔴 1, a URL do editor é a mesma que já está na pilha (`novo?customerId=c`). O shell então volta até ela ("ir para uma tela que já está na pilha volta até ela", historico-telas.ts) e a 🟡 some quando o editor foi aberto por Pedidos, Início ou o seletor. Se o editor foi aberto pela ficha do cliente (com visitId e stopId), a URL difere e o problema continua. Nesse caso, peça ao modulo-catalogo um campo no `ContextoProduto` (ex.: `dentroDoPedido: boolean`, contrato do catálogo) e use `router.back()` quando vier de dentro do pedido.

🟡 3. orders-screen.tsx:73 e order-detail-screen.tsx:96, `atualizar` duplicado. O `useVendedor` já relê o aparelho a cada sync concluído (use-vendedor.ts:108-115, efeito por `estado.sincronizado_em`). O `atualizar: refreshOrders` / `loadOrder(id)` faz um segundo `recarregar()` no mesmo carimbo: duas leituras completas das linhas (`lerLinhas`) e dois renders da lista por sync, inclusive no automático do agendador. Não pisca, porque nem a lista nem o detalhe voltam ao `Loading` (`carregando` só muda no foco), mas é trabalho dobrado em Android fraco. Corrija passando `useAtualizacaoAutomatica({ tz })` sem `atualizar`. O caso 'falhou' do puxar não precisa dele, porque a fila vem do estado do motor e o useVendedor relê quando ela muda. Se quiser manter a releitura no 'falhou', use uma função que só rode quando o carimbo não mudou.

Conferido e certo (sem ação):
- Ação produto.acoes (index.ts:64-77). `apps: ['campo']` corta o item na montagem do registro da variante (platform-sdk shell.ts:163), e o bundle do Gestão traz o código, mas o item não entra. `acao: 'pedido.criar'` é filtrada com `pode`, sem resposta = escondido (extensoes.ts:77). O promotor tem `pedido.criar` negado (core matriz, RN-PRO-01, regra 7) e nunca vê o botão. Import de `@macuxi/catalogo/contracts`: só tipo, fronteira ok, e a dependência já está no package.json.
- Seletor de cliente sem cliente (new-order-screen.tsx:76). O `router.setParams({ customerId })` mantém o produtoId, e o editor aplica depois que a tabela do cliente carrega. Produto fora da tabela ou sem preço entra como aviso no rascunho, não como item (RN-CAT-06, testado).
- Offline. O `rascunhoComProduto` usa só o catálogo do aparelho, e o `garantirProdutos` v1 calcula a tabela pela consulta local. Funciona sem sinal.
- Pedidos e detalhe. `refreshing` = só `auto.puxando` (o sync do agendador é silencioso), o `sync.running` saiu do spinner e ficou só no aviso de erro, e o rodapé de última sincronização entrou nas duas telas. O hook roda antes do retorno antecipado do detalhe (ordem de hooks certa). Sem piscar.

🟢 4. new-order-screen.tsx:139. Se a tabela do cliente nunca sincronizou (catálogo vazio, sem sinal), o produto fica pendente sem aviso. Um aviso "Sincronize para ver os produtos deste cliente" ajudaria.
🟢 5. index.ts:75. O `ctx.vendavel === false` já diz que o item não tem preço para o cliente em contexto. Dá para avisar antes de abrir o pedido. Hoje o aviso aparece dentro do editor, o que também serve.
🟢 6. CustomerPicker. Vindo do Catálogo, o seletor não diz qual produto vai entrar. É texto e hierarquia, então fica com o designer-ux.
🟢 7. orders-screen.tsx:326. O rodapé usa `sync.semSinal`. Com o "Modo sem sinal" do Perfil ligado e o aparelho com rede, ele pode dizer "puxe para sincronizar" logo acima de "Modo sem sinal ligado". Confira se o `semSinal` do provider já considera o modo do Perfil.

## Pronto quando
Para fechar: 🔴 1 corrigido (sem setParams, consumo único fora da rota, teste puro) e 🟡 2 e 🟡 3 tratados ou justificados. Depois me peça nova conferência e eu rodo de novo o bundle campo e gestao.
