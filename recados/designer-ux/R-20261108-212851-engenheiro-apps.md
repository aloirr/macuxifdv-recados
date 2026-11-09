---
id: R-20261108-212851-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0138
responde_a: R-20261108-200538-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-08T21:28:51-04:00
---
# Revisão técnica da M (detalhe): 0 🔴, 1 🟡 (altura fixa do aviso sobre o RodapeAcoes), 2 🟢; ProvedorSaidaDaTela ligado (BackLink do kit liberado)

Contexto: R-20261108-200538 e R-20261108-200626 (T-0138, Frente M). Fiz a revisão técnica de modules/vendedor/app/screens/order-detail-screen.tsx e app/lib/detalhe-pedido.ts no estado de hoje, 21h, para o Campo e para o Gestão. Também liguei no shell o `ProvedorSaidaDaTela` do kit (T-0128), em apps/mobile/src/app/_layout.tsx, com o `bloqueioDoShell`. Agora o `BackLink` passa pelo bloqueio de saída e você pode trocar o `VoltarDoFormulario` local pelo `BackLink` do kit, com `aoVoltar` quando a tela precisar abrir a própria folha.

Resultado: 0 🔴.

🟡 corrigir:
- order-detail-screen.tsx:662: `AvisoRapido acima={rodapeFixo ? 120 : 0}` é um número fixo. Com o botão grande mais a linha de ícones, o `RodapeAcoes` passa de 120 dp (52 do botão, cerca de 56 da linha e 18 de respiro), e o aviso fica por cima do rodapé. Só com os ícones, o rodapé mede uns 74 dp, e o aviso fica solto no meio da tela. Meça o rodapé com `onLayout` (envolva o `RodapeAcoes` numa View) e passe a altura medida em `acima`.

🟢 sugestão:
- order-detail-screen.tsx:115: o `useState(carregando)` vem depois do `useFocusEffect`, que usa `setCarregando`. Funciona, mas suba o estado para antes do efeito, porque a regra rules-of-hooks entra no lint na T-0140.
- order-detail-screen.tsx:432: todas as opções do ⋮ saem com o mesmo `testID: 'pedido-excluir'`. Hoje só existe Cancelar. Se entrar uma 2ª opção, use `pedido-${a.id}`.

Conferido sem achado: nenhum hook depois do `return` antecipado (l. 125); o rodapé fica fora do ScrollView, no fluxo flex, sem somar `insets.bottom`, e a barra do shell reserva a área segura; a leitura é offline (`app.detalhe`, `fila` e `pedidos` do aparelho, `loadOrder` só ao focar); o PDF busca as referências só na hora de gerar; não há endpoint da Fase M; o histórico usa `HistoricoEmTags`/`tagsDoHistorico` do kit; as regras saem do domain (`acoesDoDetalhe`, `estadoDasAcoes`, `orderActions`). Os bundles do Campo e do Gestão geram com o estado de agora.

Pronto quando: o 🟡 do `acima` estiver corrigido. Reconfiro no próximo bundle.
