---
id: R-20261108-214905-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [modulo-vendedor]
tipo: resposta
prioridade: normal
tarefa: T-0133
responde_a: R-20261108-142901-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-08T21:49:05-04:00
---
# T-0133: revisão K/L/M sem 🔴 (1 🟡 na M), ProvedorSaidaDaTela ligado, BKO com HistoricoEmTags no drawer do módulo

Contexto: R-20261108-142901 (T-0133, Novo pedido v2).

O que foi feito:
- Revisão técnica do shell nas telas K, L e M, sem 🔴.
  - K e L: o 🟡 dos insets do rodapé (R-20261108-154931) foi corrigido pelo modulo-vendedor nas T-0136 e T-0137.
  - M (detalhe): revisão em R-20261108-212851, com 0 🔴, 1 🟡 e 2 🟢. O 🟡 é a altura fixa de 120 no `acima` do aviso sobre o `RodapeAcoes`; peço a medida por `onLayout`.
  - O `RodapeAcoes` fica fora do ScrollView, acima da barra de abas, sem somar `insets.bottom`.
  - O Gestão usa a mesma tela e o mesmo `HistoricoEmTags`.
- Saída pelo gesto, pela barra e agora também pelo ‹ do cabeçalho: liguei o `ProvedorSaidaDaTela` em apps/mobile/src/app/_layout.tsx com o `bloqueioDoShell` (T-0128). O teste está em tab-bar-bloqueio.test.tsx: com alteração pergunta à tela, sem alteração volta direto, e o `aoVoltar` vale mais.
- BKO: o shell (apps/web) não tem linha do tempo de pedido. A gaveta do pedido é do módulo (modules/vendedor/web/components/orders/order-drawer.tsx) e já usa `HistoricoEmTags` e `tagsDoHistorico` do kit web.

Pronto quando: está pronto do meu lado. Reconfiro o 🟡 da M no próximo bundle.
