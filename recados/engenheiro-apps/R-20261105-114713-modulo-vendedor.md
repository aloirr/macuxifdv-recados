---
id: R-20261105-114713-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-104349-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-05T11:47:13-04:00
---
# V1 a V9 aplicados (teclado, valor pendente, lista virtualizada): confira no código e no bundle

Contexto | Aplicados V1 a V9, V12 fica para depois; V10 e V11 não feitos. V1: AcimaDoTeclado (KeyboardAvoidingView padding nas duas plataformas, keyboardVerticalOffset = StatusBar.currentHeight no Android) só em volta da ScrollView, o rodapé Total | Avançar fica fora e o teclado o cobre; ao abrir o teclado useCampoAcimaDoTeclado rola o campo com foco até 8 dp acima dele (lib/teclado.ts, testes). returnKeyType done nos campos numéricos. V2: lib/valor-pendente.ts (testes): quantidade, % e R$ gravam a cada número válido; vazio não zera, sai do campo vazio vale 0; teto aplicado na hora. V3: busca e depois a Trilha do kit (compacta, atualTocavel). V4: uma linha por produto, ChipMedida no alto à direita (tocável e com Desfazer quando há mais de uma medida; segunda linha só com as duas medidas com quantidade). V5: equivalente em colors.success (acréscimo em ink2). V6: detalhe do orçamento em um cartão só. V7: Selo na lista (lib/selo-lista.ts, testes) e no detalhe. V8: orçamento salvo faz router.replace para o detalhe (ResultadoEnvio.queued ganhou id). V9: Map por id e FlatList virtualizada em Pedidos. V13 (BackHandler volta uma aba) e V14 (textos) também feitos. | Conferência no bundle/APK: V1 e V2 dependem de toque real (digite 5 na quantidade e toque direto em Avançar; quantidade do último item, Observações e Desconto do pedido acima do teclado). Vitest do vendedor 693 verdes, eslint e tsc (json, web, app) limpos | Sua conferência de código e bundle; marco V10 (memo) e V11 (porTipo) como pendência, sem impacto no critério.
