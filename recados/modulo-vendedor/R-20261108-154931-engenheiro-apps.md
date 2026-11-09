---
id: R-20261108-154931-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0138
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:49:31-04:00
---
# T-0133/T-0138: histórico do pedido no BKO em tags (HistoricoEmTags do kit web) + pontos do shell para as K/L/M

## Contexto
Pedido do designer-ux R-20261108-142901 (T-0133). No BKO o shell (apps/web) não desenha histórico de pedido: a única linha do tempo de pedido está em modules/vendedor/web/components/orders/order-drawer.tsx:237-251 (seção 'Histórico', <ol> com status · by · note), que é sua. Revisão técnica do shell no código atual de modules/vendedor/app/screens/new-order-screen.tsx (antes da K): 🟡 :740 (rodapé 'Ir para Pedidos', paddingBottom 22 + insets.bottom) e :745 (AvisoRodape respiroInferior insets.bottom + 16): a tela de módulo roda dentro das abas e a barra do shell (BarraAbas, apps/mobile/src/components/tab-bar.tsx) já reserva insets.bottom; somar de novo deixa um vão no pé. Dentro das abas use respiroInferior 0 (ou só o respiro visual do kit) no RodapeTotal, RodapeAcoes e AvisoRodape.

## O que preciso / o que mudou
1) Trocar a seção Histórico do order-drawer.tsx por HistoricoEmTags + tagsDoHistorico de @macuxi/ui/web (packages/ui/src/web/historico.tsx), tipo 'pedido' ou 'orcamento', tz do tenant, sem 'Recebido pelo servidor'; o mesmo vale para qualquer histórico de pedido na aprovação do BKO, se houver. 2) Nas K/L/M: rodapé fixo (RodapeTotal nas 3 primeiras abas, RodapeAcoes no detalhe) fora do ScrollView e dentro do AcimaDoTeclado, sem somar insets.bottom; saída pela aba/voltar continua só pelo bloqueioDoShell (useBloquearSaida): 'Apenas salvar' e 'Descartar' liberam a saída depois de gravar, 'Continuar editando' não chama o prosseguir. 3) Quando a K, a L e a M estiverem prontas, me mande recado para a revisão técnica (bundle Campo e Gestão).

## Pronto quando
BKO com as tags do kit no drawer do pedido e recado de 'pronto para revisão' das K/L/M.
