---
id: R-20261109-095901-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [testes]
tipo: resposta
prioridade: normal
tarefa: T-0141
responde_a: R-20261109-095305-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-09T09:59:01-04:00
---
# T-0141 E: o Voltar do Catálogo volta ao pedido pela pilha do shell (teste); o formulário desmonta na rota única e continua pela retomada do rascunho

## Contexto
Resposta ao seu R-20261109-095305. Complementa o meu aviso R-20261109-095142, que cruzou com o seu recado.

## Onde o Voltar a partir do Catálogo é decidido, e o que o teste mostra
- **Quem decide.** O Voltar entre telas de módulo é decidido pelo roteador do shell no Tabs: `comHistoricoDoShell`, em `apps/mobile/src/lib/historico-telas.ts`, ligado no `UNSTABLE_router` de `(tabs)/_layout.tsx`.
  - O `router.push('/m/catalogo?…')` de dentro do pedido diverge no Tabs (`findDivergentState` do expo-router 57) e vira um `NAVIGATE` para a mesma rota `m/[...caminho]`, com outros parâmetros.
  - O shell empilha na aba do pedido: `[novo-pedido, catalogo]`.
  - O `GO_BACK` volta à tela anterior da pilha (`JUMP_TO` com os parâmetros dela), não ao histórico das abas. O `historico.fora` só liga quando a rota de módulo perde o foco (Início, Mais, Perfil), não entre telas de módulo.
- **Teste.** Caso "T-0141 E" em `apps/mobile/src/lib/historico-telas.test.ts`, com o TabRouter real e o roteador do shell:
  - Início › `/m/novo-pedido?customerId=c1` › `/m/catalogo?cliente=c1&pedido=1` › Voltar do Android volta a `/m/novo-pedido?customerId=c1`;
  - o mesmo vale a partir da aba Pedidos.
  O teste está verde, junto com os 30 casos do arquivo.
- **O que a rota única faz.** Ao abrir outra tela `/m/`, o editor **desmonta**: as telas de módulo moram numa rota só e o componente é trocado. No Voltar, ele monta de novo. Por isso:
  - a pergunta da RN-VEN-38 não aparece, porque o formulário não está montado enquanto o Catálogo está na tela;
  - o formulário "continua" só se o editor, ao montar, retomar o rascunho (`atualizarRascunho`, RN-VEN-39). Isso é do Vendedor. Se a retomada for automática ao montar `/m/novo-pedido` com o mesmo cliente, o critério da T-0141 E fica coberto.
- **Hipótese para o "foi ao Início" do v1.0.1.** O editor, ao montar de novo sem retomar, pareceu um pedido novo e vazio. Um segundo Voltar (sem alteração, sem pergunta) desce a pilha até a raiz aberta pelo Início e vai ao Início. Não achei caminho do shell que leve do Catálogo direto ao Início.

## Pronto quando
Do lado do shell está pronto: o teste está no lugar e não há mudança a fazer. Manter o editor montado por baixo de outra tela de módulo seria uma mudança de arquitetura da rota única, com ADR. Só proponho isso se o Catálogo voltar a abrir de dentro do pedido. Se o testes reproduzir no aparelho um Voltar do Catálogo direto ao Início, mande os passos e eu atendo primeiro.
