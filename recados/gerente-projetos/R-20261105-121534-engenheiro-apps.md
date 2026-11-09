---
id: R-20261105-121534-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:15:34-04:00
---
# T-0071: conferência técnica das correções do Novo pedido sem 🔴 (bundle campo/gestao verde); 4 🟡 ao vendedor e item novo do shell (voltar entre telas de módulo)

## Contexto
T-0071: conferi as correções do modulo-vendedor (R-20261105-114713) para a minha revisão R-20261105-104349, que seguiram a decisão de UX R-20261105-110220. Respondi com --encerra em R-20261105-121434. **Nenhum 🔴.**

## O que fiz / o que mudou
- **Revisão técnica**, cada item conferido no código; detalhes e arquivo:linha no R-20261105-121434:
  - teclado no Android edge-to-edge (V1);
  - valor que vale no primeiro toque (V2);
  - chip de medida (V4);
  - detalhe do orçamento (V6) e o selo "Vencido" (V7);
  - `router.replace` depois de salvar, inclusive sem sinal: o `queued` ganhou o id (V8);
  - FlatList virtualizada com `memo` e `Map` por id (V9);
  - o voltar do Android volta uma aba (V13);
  - estados offline.
- **Checks:**
  - vitest do vendedor: 694 verdes (5 arquivos pulados, de banco);
  - tsc (tsconfig.app.json) e eslint de modules/vendedor/app limpos;
  - bundle Android (`expo export:embed --dev false`) verde em campo e gestao, 2018 módulos e 8,53 MB cada, com o código novo.
- **4 🟡 para o próximo lote do vendedor**, que não seguram a T-0071:
  - W1: um "0" no meio da digitação tira o item e o desconto dele;
  - W2: o `BackHandler` do editor não está preso ao foco e engole o voltar quando a pessoa está em Início ou Mais;
  - W3: a rolagem até o campo pode rodar antes do padding do `KeyboardAvoidingView`, e o último item ficaria coberto (conferir no APK);
  - W4: o R$ trata "." como milhar, então "1.5" vira R$ 15,00 em teclado com ponto (conferir no APK).
- **4 🟢:** W5 a W8.
- **CI do lote J:** a única falha (tests/modulos/pedidos-busca-t0077.test.ts) é uma regex sobre o fonte. O comportamento continua: o vazio foi para o `ListEmptyComponent` com o mesmo `vazio`. Já está com o testes (R-20261105-120037).

## Pendências
1. **Shell, comigo, item novo para o quadro.**
   - **Problema:** o shell não tem pilha entre as telas de módulo. Todas ficam na rota única `(tabs)/m/[...caminho]`, com `backBehavior` "history".
   - **Como conferi:** simulei com o TabRouter do expo-router 57.0.29. Depois do `router.replace` do V8, o voltar do Android no detalhe manda o app para segundo plano; com `navigate`, ele ia para o Início. O "‹ Pedidos" funciona, porque cai no fallback.
   - **Proposta:** histórico de telas de módulo no shell. A base é o `historico` que já existe em lib/transicao-modulo.ts. Entram um `BackHandler` no `m/[...caminho]` e um "voltar" do shell para o `BackLink`. O `BackLink` é do kit do designer-ux e pode exigir um ponto no platform-sdk, com o engenheiro-software.
   - **Cuidado:** a ordem dos listeners com os `BackHandler` das telas, como o V13.
   - **Validação:** precisa de APK.
2. **Só no APK com toque real** (lista completa no R-20261105-121434):
   - V1: os campos de baixo acima do teclado;
   - V2: digitar 5 e tocar direto em Avançar ou Salvar;
   - V4: chip e Desfazer com o teclado aberto;
   - V6: o Transformar sem rolar em 360 × 780 dp;
   - V8: o aviso no detalhe e o voltar;
   - V9: 300 pedidos rolando;
   - V13: o voltar entre as abas do editor.
3. **Sem build EAS, sem install e sem commit.**

## Pronto quando
Do meu lado, a T-0071 está fechada no código e no bundle. O V1 e o V2 se confirmam no próximo APK autorizado.
