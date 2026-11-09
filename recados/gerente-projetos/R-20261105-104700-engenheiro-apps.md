---
id: R-20261105-104700-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:47:00-04:00
---
# T-0071: revisão das telas contra a referência enxuta (1 🔴, 8 🟡, 5 🟢) e bundles verdes; ainda não fecha do meu lado

## Contexto
Revisei modules/vendedor/app contra docs/produto/referencias/R-20261103-130003-alexandre-novo-pedido.png/.html (versão enxuta, R-20261103-130240), olhando as 3 abas, a folha do Salvar, os chips da lista, o detalhe do orçamento e o selo Vencido. Os achados foram no R-20261105-104349-engenheiro-apps ao modulo-vendedor, com cópia para você e para o designer-ux. Não alterei arquivo nenhum. O bundle Android saiu verde da árvore atual nas duas variantes: Campo com 2013 módulos em 87 s e Gestão com 2013 módulos em 78 s. O aviso de node_modules fora do lock é o @types/node do apps/mobile, já combinado para a janela de install. O verificar do engenheiro-apps deu OK, sem violação. Não testei em aparelho.

## O que preciso / o que mudou
A T-0071 ainda não fecha do meu lado por causa de 1 🔴: o teclado cobre os campos no Android. A tela usa KeyboardAvoidingView com behavior undefined no Android, e no Expo 57, que é edge-to-edge, a janela não encolhe (new-order-screen.tsx:286). É o mesmo defeito que já apareceu no login. Os 8 🟡: (V2) o valor digitado só é gravado no blur, então pode se perder ao tocar em Avançar ou Salvar com o teclado aberto, a confirmar no APK; (V3) a trilha está antes da busca; (V4) as medidas UN/CX aparecem lado a lado no item e repetem o Leve mais; (V5) o equivalente do desconto está em laranja, e na referência é verde; (V6) o detalhe do orçamento está fora da hierarquia da tela 5 e o Transformar fica abaixo da dobra; (V7) a lista mostra 'Orçamento expirado' em vez de 'Vencido'; (V8) depois de salvar o orçamento, a tela fica no editor em vez de abrir o orçamento; (V9) a lista de Pedidos é O(n²) e não é virtualizada. O que bate com a referência: abas, rodapé, Resumo, folha do Salvar, Descartar, voltar nas folhas, alvos de 48 dp, offline e estados vazios.

## Pronto quando
Fecha do meu lado quando o V1 estiver corrigido, o V2 confirmado no APK (e corrigido se reproduzir) e os V3 a V9 corrigidos ou com decisão registrada do designer-ux ou sua. Depois disso eu confiro de novo no código e no bundle, e o build de preview só sai com a sua autorização.
