---
id: R-20261105-104349-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: pedido
prioridade: alta
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:43:49-04:00
---
# Revisão das telas da T-0071 contra a referência enxuta: 1 🔴 (teclado no Android), 8 🟡, 5 🟢

## Contexto
Revisão técnica e de fidelidade da T-0071 (fatia 6, entrega R-20261105-095139) contra a referência enxuta aprovada (docs/produto/referencias/R-20261103-130003-alexandre-novo-pedido.png/.html, R-20261103-130240). Conferi no código de modules/vendedor/app (new-order-screen.tsx, components/novo-pedido.tsx, components/novo-pedido-abas.tsx, screens/order-detail-screen.tsx, screens/orders-screen.tsx, lib/textos-pedido.ts) e rodei o bundle Android das duas variantes a partir da árvore atual (resultado na entrega ao gerente). Não testei em aparelho: o que depende de toque real está marcado "confirmar no APK".

Conferido e OK: abas Itens (n) · Detalhes · Resumo; rodapé das abas 1 e 2 só com "Total dos itens" e Avançar; Resumo com itens compactos, linha "CIF · prazo · endereço", "Desconto do pedido", Tabela/Descontos/Total e a faixa "✓ x% · dentro da alçada"; Cancelar com "Descartar este pedido?"; folha "Salvar pedido" com "Enviar pedido — Vai direto ao ERP." / "Vai para o supervisor." e "Salvar como orçamento — Válido até dd/mm.", só orçamento com o motivo (RN-VEN-13); Folha e Dialogo fecham com o voltar do Android (Modal com onRequestClose); alvos de toque de 48 dp (Passo 48, Chip 36 + hitSlop 6, Segmentado compacto com folgaDeToque, sugestão 48); offline (banner, fila, sugestões calculadas no aparelho, Transformar sem sinal vai à fila); estados vazios (sem item, busca sem resultado, Resumo sem item, pedido fora do aparelho).

## O que preciso / o que mudou
🔴 V1. O teclado cobre os campos no Android. new-order-screen.tsx:286 usa KeyboardAvoidingView com behavior undefined no Android. No Expo 57 o app é edge-to-edge e o adjustResize não encolhe a janela (apps/mobile/app.config.ts:84-86; foi o mesmo defeito do login, R-20261101-023401). Ficam sob o teclado a quantidade e o desconto dos itens de baixo na aba Itens e os campos de FOB digitado. Com a lista longa, também o Desconto do pedido no Resumo. A ScrollView não rola até o campo, porque a janela não muda de tamanho. Correção: behavior="padding" nas duas plataformas, com keyboardVerticalOffset igual à faixa da barra de status que o shell reserva. No Android, StatusBar.currentHeight ?? 0, como em apps/mobile/src/components/area-segura.tsx e login.tsx:52. O módulo não importa do shell. Se preferir um componente pronto, peço ao designer-ux um AcimaDoTeclado no packages/ui. Pronto quando, no APK: a quantidade do último item, as Observações e o Desconto do pedido aparecem acima do teclado.

🟡 V2. O valor digitado só é gravado no onBlur/onSubmitEditing: quantidade em novo-pedido.tsx:244-249, CampoPct em :51-56 e CampoReais em :79-84. Com keyboardShouldPersistTaps="handled", alguns toques com o teclado aberto não tiram o foco antes de agir: Avançar, a aba de cima, Salvar ou o +/− de outro item. Na troca de aba o campo desmonta e o valor pode se perder. O Salvar pode abrir a folha com o cálculo antigo, e o pedido sai sem o desconto digitado. Correção: gravar a quantidade no onChangeText (inteiro, barato). Para % e R$, gravar no onChangeText quando o texto for número válido, ou chamar Keyboard.dismiss() e aplicar antes de Avançar, de trocar de aba e de Salvar. Confirmar no APK: digite 5 na quantidade e toque direto em Avançar. Se reproduzir, vira 🔴.

🟡 V3. Ordem da aba Itens (new-order-screen.tsx:325-326). Na referência vem a busca e depois a trilha "Mercearia › Bebidas", com o último nível em destaque. O código põe a trilha (com ícone de lupa) antes da busca. [visual, designer-ux]

🟡 V4. Produto com mais de uma medida mostra uma linha com +/− para cada medida (novo-pedido.tsx:165-186). Na referência, cada item tem um chip de medida no topo à direita ("FD c/ 12", "UN", "CX c/ 20"), e a embalagem maior aparece em "Leve mais", na aba Detalhes. Com UN e CX lado a lado na aba Itens, o "Leve mais" repete o que a aba Itens já mostra, contra o critério 1 ("nenhuma informação se repete"). Decidir com o designer-ux entre duas opções: um chip de medida tocável, que troca a medida da linha, ou mostrar só as medidas com quantidade maior que zero e a principal. Conferir com a spec das medidas (R-20261102-111619). [visual, designer-ux]

🟡 V5. O equivalente do desconto está na cor de destaque laranja (accentInk), em novo-pedido.tsx:266 e novo-pedido-abas.tsx:342. Na referência, "−R$ 0,89", "= 5,3%" e "−R$ 3,84" são verdes (classe .eq = --success). O laranja fica só para o "+ desconto". [visual, designer-ux]

🟡 V6. O detalhe do orçamento (order-detail-screen.tsx:460-534) não segue a hierarquia da tela 5.
- Referência: selo "Orçamento · até 10/11", depois um único cartão com os itens compactos (nome · qtd medida e o total), "Desconto do pedido (1,0%) − R$ 3,84", o Total em destaque e "CIF · 28 dias". Em seguida, [Transformar em pedido] e, abaixo, [Editar] e [PDF].
- Código, nesta ordem:
  - o cartão de totais, com "Desconto efetivo (sem frete)", "Total · prazo …", Filial e Tabela;
  - um cartão de frete com "CIF · por conta da empresa", frase explicativa contra a regra enxuta R-20261103-130240;
  - os itens, com código e "× preço";
  - só depois os botões.
- Com 4 itens ou mais, o Transformar fica abaixo da dobra, e os "2 toques" do critério 2 viram rolar mais 2 toques.
- Para ehOrc: reaproveitar itemCompacto, linhaDeEntrega e linhaDoAjusteSomenteLeitura (lib/textos-pedido.ts) num cartão só, com os botões logo abaixo. Duplicar e Cancelar orçamento podem ficar numa linha secundária, e o Histórico no fim.

[visual, designer-ux]

🟡 V7. "Vencido" só aparece no Selo do detalhe. Na lista (orders-screen.tsx:356 e 383) e no Badge reserva do detalhe (order-detail-screen.tsx:443), o rótulo vem de SITUACAO_ORCAMENTO_LABEL (domain/orcamento.ts:69-74): "Orçamento expirado" e "Orçamento aberto". A spec (R-20261103-123656) e a tarefa pedem "Vencido". Usar seloDoOrcamento também na linha da lista, ou trocar o label do domain. [texto, designer-ux]

🟡 V8. Depois de "Salvar como orçamento" com sinal, a tela continua no editor, com o cartão "Orçamento salvo", "Ver orçamento" e "Ir para Pedidos" (new-order-screen.tsx:310-315 e 408-412). A tela 5 da referência é o orçamento já aberto em Pedidos ("‹ Pedidos"). Sugestão: router.replace(hrefPedido(id)) e o aviso "Orçamento 000012 salvo". Com isso, o voltar do Android a partir do detalhe também deixa de cair de novo no editor já enviado (hoje o router.navigate de :444 empilha o editor). [fluxo, designer-ux]

🟡 V9. Desempenho da lista de Pedidos (chips Todos/…/Orçamentos), em orders-screen.tsx:314-316. O itens.find dentro do map de cada linha é O(n²), e as linhas são um map em ScrollView sem virtualização, com até 1.000 itens fora da janela (:299-303). Usar um Map por id e FlatList, ou paginar. Pronto quando: a lista com 300 pedidos rola sem engasgo no aparelho de campo.

🟢 V10. Na lista de itens, LinhaDoProduto e MedidaDoItem não têm React.memo, e calculo.linhas.find roda para cada medida (novo-pedido.tsx:168). Com 50 itens ou mais, cada toque re-renderiza todos. Sugestão: Map por chave e memo com callbacks estáveis.
🟢 V11. porTipo (lib/lista-pedidos.ts:59) não é usado. Com o chip Orçamentos ativo, os abertos que vencem primeiro não sobem para o topo, como o comentário promete.
🟢 V12. Frete e Prazo (novo-pedido-abas.tsx:58-110).
- Referência: um cartão com os rótulos FRETE e PRAZO em cima e os dois grupos lado a lado; o prazo usa o mesmo segmentado do frete.
- Código: duas linhas com o rótulo à esquerda, e o prazo em Chip pílula.

[visual, designer-ux]
🟢 V13. Nas abas Detalhes e Resumo, o voltar do Android sai do editor (o rascunho fica no aparelho). Dá para usar BackHandler para voltar à aba anterior. Decidir com o designer-ux.
🟢 V14. Dois ajustes de texto:
- Os comentários de cabeçalho estão desatualizados ("Itens, Condições e Entrega e resumo"), em new-order-screen.tsx:2 e novo-pedido.tsx:2.
- "Orçamento vencido. Duplique para fazer um novo com o preço de hoje." (domain/orcamento.ts:107) é explicação na tela; o selo "Vencido" com só o Duplicar já diz isso.

[texto, designer-ux]

## Pronto quando
V1 corrigido e conferido no APK (sem ele a T-0071 não fecha do meu lado). V2 confirmado no APK e, se reproduzir, corrigido. V3 a V9 corrigidos ou com decisão registrada do designer-ux, ou do gerente, para ficar para depois. Para cada item, responda a este recado com --responde-a; eu confiro de novo no código e no bundle.
