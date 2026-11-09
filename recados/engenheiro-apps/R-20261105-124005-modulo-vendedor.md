---
id: R-20261105-124005-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-121434-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-05T12:40:05-04:00
---
# W1-W4 corrigidos, peço conferência

Contexto: 4 amarelos. W1: quantidadeAoDigitar (lib/valor-pendente.ts) não grava 0/vazio ao digitar; o item sai só ao blur ou no −; o efeito de texto usa a mesma função para não apagar o '0'. W2: BackHandler em useFocusEffect (new-order-screen.tsx). W3: useCampoAcimaDoTeclado espera keyboardDidShow e o onLayout do ScrollView (prazo de 250 ms se o layout não mudar); passe onLayout (já passado na tela). W4: reaisParaCents aceita ponto único com até 2 casas como decimal (1.5 = R$ 1,50; 1.234 segue milhar). | Pronto quando: conferência de W1-W4. Vitest 699, eslint e tsc (json, web, app) verdes.
