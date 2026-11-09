---
id: R-20261105-124324-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [designer-ux]
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:43:24-04:00
---
# T-0071/T-0072: histórico de telas de módulo por aba no shell; o voltar do Android desempilha antes de sair do app (bundle campo/gestao verde)

## Contexto
Contexto: achado R-20261105-121434. As telas de módulo ficam na rota única (tabs)/m/[...caminho], e o REPLACE do TabRouter do expo-router 57 tirava o Início do histórico. Por isso o voltar no detalhe do orçamento salvo mandava o app para segundo plano.

## O que preciso / o que mudou
O que fiz: (1) apps/mobile/src/lib/historico-telas.ts, puro: uma pilha por aba (chave = href da aba). Navegar empilha; ir para uma tela que já está na pilha volta até ela; replace substitui o topo (o editor sai da pilha, como no docs/design/componentes.md §7.2); abrir uma tela de módulo vindo do Início, do Mais ou do Perfil recomeça a pilha da aba dela, e o voltar na raiz devolve à tela de origem. Na barra, trocar de aba volta ao topo guardado da aba; tocar de novo na aba em uso volta à raiz; logout e aparelho bloqueado zeram (limparHistoricoDoShell). Guarda só caminho e ids. (2) (tabs)/_layout.tsx: UNSTABLE_router do Tabs com comHistoricoDoShell. No GO_BACK numa tela de módulo com anterior na pilha, vai para a anterior (o roteador é puro, então o canGoBack a seco não mexe em nada). O REPLACE entre telas de módulo vira JUMP_TO e mantém o histórico das abas. Um ouvinte __unsafe_action__ marca o replace, e o foco/blur da rota m diz quando a tela vem de fora. (3) m/[...caminho].tsx registra a tela pelos params crus (useRoute) e mantém a animação do §6 (avançar pela direita, voltar pela esquerda, sem deslocar na troca de aba e com reduzir movimento). (4) tab-bar.tsx e mais.tsx usam abrirAba. (5) transicao-modulo.ts ficou só com a chave e a animação; a chave ignora params nulos e os __internos do expo-router. O BackLink do kit e o platform-sdk não precisaram de ajuste: o router.canGoBack()/router.back() do BackLink passa pelo mesmo roteador e desempilha, e o fallback só vale sem histórico. Os BackHandler das telas (V13) continuam rodando antes do shell. W2 ao modulo-vendedor (R-20261105-123749): o histórico não resolve o W2, porque a cena do Tabs fica montada no Início/Mais; o useFocusEffect que ele já pôs fica. Conferi também os W1-W4 dele: sem 🔴/🟡, encerrado em R-20261105-124251. Checks: vitest apps/mobile 212/212 (24 arquivos; historico-telas.test.ts tem 20 testes, 11 deles de ponta a ponta sobre o TabRouter real do expo-router 57.0.29, mais um que reproduz o bug sem o roteador); tsc --noEmit e eslint src limpos; bundle Android (expo export:embed --dev false) verde em campo e gestao, 2019 módulos; verificar engenheiro-apps sem violações. Sem EAS, sem install e sem commit; não toquei em modules/*.

## Pronto quando
Pronto quando: validar no próximo APK autorizado. (a) Pedidos > Novo > Salvar orçamento > voltar do Android = Pedidos > voltar = Início > voltar = sai. (b) Pedidos > detalhe, depois Clientes > cliente, depois Pedidos = detalhe; voltar = lista. (c) Card do Início > tela > voltar = Início. (d) Mais > Treinamento > lição > voltar, voltar = Mais. (e) O ‹ Pedidos do BackLink e a Folha/Dialogo abertos fecham primeiro. Pendência para o quadro: 'tocar de novo na aba volta à raiz' é a regra Material que adotei; designer-ux em cc para confirmar ou pedir outra.
