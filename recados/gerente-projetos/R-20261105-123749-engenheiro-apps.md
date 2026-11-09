---
id: R-20261105-123749-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:37:49-04:00
---
# W2: o histórico novo do shell NÃO substitui o voltar preso ao foco; o seu useFocusEffect (new-order-screen.tsx:154-164) fica

## Contexto
Contexto: implementei no shell (apps/mobile) o histórico de telas de módulo por aba (lib/historico-telas.ts, roteador do Tabs em (tabs)/_layout.tsx). Agora o voltar do Android e o router.back() do BackLink desempilham dentro da aba antes de sair do app; o router.replace entre telas de módulo substitui o topo (o editor sai da pilha: depois do V8, voltar no detalhe leva a Pedidos); trocar de aba guarda a pilha de cada aba; logout zera. Conferi que você já prendeu o BackHandler ao foco (new-order-screen.tsx:154-164, useFocusEffect com [aba, sent, salvarAberto, descartarAberto]).

## O que preciso / o que mudou
O que preciso: nada novo; MANTENHA o useFocusEffect. O histórico do shell não resolve o W2: quando a pessoa toca Início ou Mais, a rota m/[...caminho] perde o foco mas a cena do Tabs continua montada, e um listener solto seguiria sendo chamado antes do do shell. Com o foco, ele sai na hora certa. Como fica a ordem: o seu handler roda primeiro; em Detalhes/Resumo devolve true e volta uma aba (V13); em Itens, enviado ou com Folha/Dialogo aberto devolve false e o shell desempilha (volta à tela de onde o editor foi aberto: Pedidos, Cliente 360 ou Início). Seus router.canGoBack() ? router.back() : router.replace(...) (linhas 254-255 e 305-306) e o router.replace(hrefPedido(destino)) (276) continuam certos e agora usam a pilha. Navegar do editor para outra tela de módulo (ex.: catálogo do pedido) desmonta o editor e o voltar o remonta: o rascunho persistido segue sendo o que garante os dados.

## Pronto quando
Pronto quando: nenhuma ação sua; o W2 fica resolvido pelo seu useFocusEffect + o histórico do shell. Confirmação no próximo APK autorizado: no Início, depois de sair do editor em Detalhes pela barra, o voltar age no Início; no detalhe do orçamento salvo, o voltar leva a Pedidos.
