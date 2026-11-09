---
id: R-20261105-121434-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: alta
tarefa: T-0071
responde_a: R-20261105-114713-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-05T12:14:34-04:00
---
# Conferência V1–V9/V13/V14: sem 🔴, revisão encerrada; 4 🟡 (0 na digitação, voltar fora de foco, rolagem do teclado, ponto no R$) e lista do APK

## Contexto
Conferência técnica do R-20261105-114713 (V1 a V9, V13 e V14 aplicados conforme a decisão de UX R-20261105-110220). Li o código atual em modules/vendedor/app: components/acima-do-teclado.tsx, lib/teclado.ts, lib/valor-pendente.ts, lib/medida-do-item.ts, lib/selo-lista.ts, screens/new-order-screen.tsx, screens/order-detail-screen.tsx, screens/orders-screen.tsx, components/novo-pedido.tsx, components/novo-pedido-abas.tsx e state/use-vendedor.ts.
Resultados: vitest do vendedor 694 verdes (5 arquivos pulados, de banco); tsc -p tsconfig.app.json e eslint app limpos; bundle Android (expo export:embed, --dev false) verde nas variantes campo e gestao, 2018 módulos, 8,53 MB cada, com o código novo dentro.

**Nenhum 🔴. Encerro a revisão R-20261105-104349 do meu lado.** O V1 e o V2 ainda dependem de toque real no APK; a lista está no fim.

Conferido e OK no código:
- **V1:**
  - `KeyboardAvoidingView` com padding só em volta da ScrollView; o `RodapeTotal` fica fora e o teclado o cobre.
  - O deslocamento é a barra de status no Android (`deslocamentoDoTeclado`), coerente com a faixa do `AreaSeguraSuperior`, porque a tela começa abaixo dela.
  - `useCampoAcimaDoTeclado` mede o campo em coordenadas de janela, que no edge-to-edge batem com o `screenY` do teclado.
  - `returnKeyType="done"` nos campos numéricos.
- **V2:**
  - A quantidade, o % e o R$ gravam no `onChangeText`. O `atualizarRascunho` atualiza a memória na hora (`dadosRef` + `setDados`) e só depois persiste. Por isso Avançar, a aba de cima, Salvar e o +/− de outro item já leem o valor novo.
  - O `textoAposMudancaDoValor` não apaga o "5," nem o texto enquanto o campo tem foco.
- **V4:** o chip é tocável só com uma medida visível. `trocarMedidaDaLinha` leva o ajuste em %, larga o de R$ e tem Desfazer.
- **V6 e V7:**
  - Um cartão só no orçamento.
  - O Selo vem de `seloDaLinha`, o mesmo texto do detalhe.
  - "Vencido" deixa o Duplicar como principal.
- **V8:**
  - O `ResultadoEnvio.queued` ganhou `id` (o UUID do aparelho), e o `router.replace(hrefPedido(id))` abre o detalhe também sem sinal: `fila.find(payload.id)`.
  - O aviso pendente é lido no `useFocusEffect` do detalhe.
- **V9:**
  - `FlatList` com `keyExtractor` por id e `Map` por id.
  - `OrderRow` com `memo` e o `numeroDoPedido` estável.
  - O vazio foi para o `ListEmptyComponent` com o mesmo `vazio`, e o comportamento continua. O teste de regex no fonte (tests/modulos/pedidos-busca-t0077.test.ts) quebrou só pela forma do JSX; o gerente já pediu o ajuste ao testes (R-20261105-120037).
- **V13:** o `BackHandler` é registrado depois do NavigationContainer, então é chamado antes dele. A Folha e o Dialogo (Modal com `onRequestClose`) fecham primeiro.
- **Offline:**
  - Banner sem sinal com a hora do preço.
  - Orçamento sem sinal vai para a fila e abre o detalhe da fila com o aviso "Orçamento salvo no aparelho.".
  - Edição de pedido enviado sem sinal continua bloqueada com o banner.

## O que preciso / o que mudou
🟡 W1. Um "0" no meio da digitação tira o item da lista. Arquivos: novo-pedido.tsx:323-327 e `setQtd` em :136-145.
- **O que acontece:**
  - `valorPendenteQuantidade("0")` vale 0, e o `onQtd(0)` apaga a linha e o ajuste dela.
  - Sem busca, a lista é `produtosDoRascunho`: o produto some e o campo desmonta com o teclado aberto.
- **Exemplo:** a quantidade é 10; a pessoa põe o cursor e apaga o "1" para digitar "2". O texto passa por "0", e o item e o desconto dele se perdem.
- **Correção:** durante a digitação, o 0 é tratado como o vazio (pendente). Só o `onBlur` aplica 0, e o − continua tirando o item. Por exemplo, no `onChangeText` só chamar `onQtd` com `n > 0`. Isso não muda a regra da decisão de UX: "vazio enquanto digita não zera nem tira o item".

🟡 W2. O voltar do Android é engolido em outra aba do shell. Arquivo: new-order-screen.tsx:154-161.
- **Causa:** todas as telas de módulo moram numa rota só do Tabs (`(tabs)/m/[...caminho]`). O Tabs mantém a cena montada quando a pessoa toca Início ou Mais na barra, e o listener fica ativo.
- **Efeito:** com o editor deixado em Detalhes ou Resumo, o voltar no Início troca a aba do editor escondido e devolve `true`, e a pessoa vê o voltar "não funcionar".
- **Correção:** registrar o listener dentro de `useFocusEffect(useCallback(() => { const sub = BackHandler.addEventListener(...); return () => sub.remove(); }, [aba, sent, salvarAberto, descartarAberto]))`, do expo-router.

🟡 W3. A rolagem até o campo pode ser feita antes de a área encolher. Arquivo: acima-do-teclado.tsx:28-37.
- **Causa:** o `KeyboardAvoidingView` aplica o padding no mesmo `keyboardDidShow`, mas por um `setState` assíncrono. Um `requestAnimationFrame` não garante que o layout novo já foi aplicado.
- **Efeito:** se o `scrollTo` rodar com a altura antiga, o Android corta a rolagem no máximo antigo. Justo a quantidade do último item ficaria sob o teclado. Os itens do meio não têm esse problema.
- **Conferir no APK.** Se reproduzir, guardar o `dy` pendente e rolar no `onLayout` da ScrollView, quando a altura diminuir. Outra opção é repetir a medida uma vez depois do layout.

🟡 W4. O R$ trata o ponto como milhar, e agora o valor é gravado ao vivo. Arquivos: `reaisParaCents` em lib/novo-pedido.ts:400-405 e valor-pendente.ts:87-91.
- **O que acontece:** em teclado `decimal-pad` que mostra "." (Gboard em alguns aparelhos), "1.5" vira R$ 15,00. O `valorPendentePct` aceita "." como decimal, então os dois campos se comportam diferente.
- **Correção:** com um ponto só, sem vírgula e até 2 casas depois do ponto, tratar o ponto como decimal. Teste a favor: "1.5" vale 150, "1,5" vale 150 e "1.234,56" vale 123456.
- **Conferir no APK** qual separador o teclado mostra.

🟢 W5. O deslocamento usa `StatusBar.currentHeight`, e o shell usa `max(insets.top, StatusBar.currentHeight)`. Os dois coincidem na maioria dos aparelhos. Se algum aparelho com recorte de câmera divergir no APK, peço ao engenheiro-software um `useFaixaSuperior` no platform-sdk. Por ora, sem ação.
🟢 W6. Observações (novo-pedido-abas.tsx:161-168) é multiline sem `maxHeight`: com texto longo, o campo cresce para baixo do teclado. Sugestão: `maxHeight` de cerca de 120 dp, com a rolagem dentro do campo.
🟢 W7. Com o teclado aberto, o toque no chip de medida não fecha o teclado (`keyboardShouldPersistTaps="handled"`), e o `AvisoRodape` "Desfazer" fica atrás dele. Conferir no APK; se acontecer, `Keyboard.dismiss()` no `onPress` do chip.
🟢 W8. O V10 (`memo` em LinhaDoProduto e MedidaDoItem, e `Map` no lugar do `calculo.linhas.find`, em novo-pedido.tsx:240) e o V11 continuam como pendência combinada, sem impacto no critério.

Nota sobre o V8 (do shell, comigo): o seu `router.replace` está certo, mas o voltar **do Android** a partir do detalhe ainda não leva a Pedidos.
- **Causa:** o shell não tem pilha entre telas de módulo, porque todas moram na mesma rota do Tabs. No expo-router 57, o REPLACE do TabRouter tira a entrada anterior do histórico.
- **Como conferi:** simulei com o TabRouter do próprio expo-router 57.0.29 o caminho Início → Pedidos → novo pedido → `replace` para o detalhe. Depois do replace, o histórico fica só com a rota de módulo. Com `navigate`, o voltar iria para o Início.
- **Efeito no APK:**
  - o voltar do Android no detalhe manda o app para segundo plano;
  - o "‹ Pedidos" (BackLink) funciona, porque o `canGoBack` dá falso e ele cai no fallback `/m/pedidos`.
- **Quem corrige:** fica comigo. O histórico de telas de módulo no shell, com o voltar do Android, vai ao gerente como item novo. Você não muda nada.

## Pronto quando
- Os quatro 🟡 W1 a W4 podem entrar no próximo lote do vendedor, sem segurar a T-0071 do meu lado.
- W1 e W2: corrigidos com teste (W1 em `valor-pendente` ou `ListaDeItens`; W2 é mudança de 3 linhas).
- W3 e W4: conferidos no APK e corrigidos se reproduzirem.

Só o APK com toque real confirma:
1. **V1:**
   - a quantidade e o desconto do último item, a transportadora do FOB, as Observações e o Desconto do pedido ficam visíveis com 8 dp acima do teclado;
   - o rodapé Total | Avançar fica atrás do teclado;
   - "done" fecha o teclado;
   - repetir num aparelho com recorte de câmera.
2. **V2:**
   - digitar 5 na quantidade e tocar direto em Avançar;
   - digitar "5," no Desconto do pedido e tocar direto em Salvar: a folha já mostra o total novo;
   - o separador do R$ (W4);
   - apagar o "1" de 10 (W1).
3. **V4:** o chip troca a medida num toque e o Desfazer aparece, também com o teclado aberto (W7).
4. **V6:** com 4 itens, "Transformar em pedido" aparece sem rolar em 360 × 780 dp.
5. **V8:**
   - com sinal e em modo avião, o detalhe abre com o aviso "Orçamento 000012 salvo" ou "Orçamento salvo no aparelho.";
   - o "‹ Pedidos" leva à lista;
   - o voltar do Android segue a nota acima.
6. **V9:**
   - 300 pedidos rolam sem engasgo no aparelho de campo;
   - puxar para baixo sincroniza;
   - a busca no cabeçalho da FlatList não perde o foco enquanto se digita.
7. **V13:**
   - em Detalhes e Resumo, o voltar do Android volta uma aba;
   - com a Folha aberta, o voltar fecha a Folha;
   - no Início, depois de sair do editor em Detalhes pela barra de abas, o voltar age no Início (W2).
