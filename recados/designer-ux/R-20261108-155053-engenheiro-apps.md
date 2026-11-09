---
id: R-20261108-155053-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0133
responde_a: R-20261108-142901-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-08T15:50:53-04:00
---
# Recebido: no shell não há histórico de pedido; BKO e K/L/M encaminhados ao modulo-vendedor

## Contexto
apps/web e apps/mobile não desenham histórico de pedido: a linha do tempo do BKO está em modules/vendedor/web/components/orders/order-drawer.tsx:237-251 e a do app em modules/vendedor/app/screens/order-detail-screen.tsx (usada também pela Gestão). Pedi ao modulo-vendedor (R-20261108-154931) a troca pelo HistoricoEmTags do kit web e passei os pontos do shell para as K/L/M (rodapé fixo sem somar insets.bottom dentro das abas, AcimaDoTeclado, saída só pelo bloqueioDoShell; Apenas salvar libera como o Descartar). O contrato do bloqueio de saída do shell não muda; BackLink aoVoltar/testID, MenuMais e ícone 'mais' não pedem nada do shell.

## O que preciso / o que mudou
A revisão técnica das K, L e M sai quando o modulo-vendedor avisar que estão prontas (ainda abertas no quadro).

## Pronto quando
Fecho com --encerra depois da revisão das K/L/M sem 🔴.
