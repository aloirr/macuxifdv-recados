---
id: R-20261109-095142-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [testes]
tipo: aviso
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:51:42-04:00
---
# T-0141 E: no shell o voltar do Catálogo volta ao pedido (teste novo); o pedido se perde porque o editor desmonta ao abrir outra tela /m/

## Contexto
T-0141 item E (R-20261109-064818-alexandre): no Novo pedido, Catálogo e depois Voltar do Android levam ao Início e o pedido se perde (RN-VEN-38). Olhei o lado do shell antes do seu pedido, para você não esperar por mim.

## O que mudou / diagnóstico do shell
1. **Pilha.** O voltar volta ao pedido. Teste novo em `apps/mobile/src/lib/historico-telas.test.ts`, caso "T-0141 E", com o simulador do TabRouter do expo-router 57 e o roteador do shell:
   - Início › `/m/novo-pedido?customerId=c1` › `irParaCatalogoDoPedido` (`/m/catalogo?cliente=c1&pedido=1`) › voltar resulta em `/m/novo-pedido?customerId=c1`;
   - o mesmo vale a partir da aba Pedidos.
2. **Por que o pedido some.** Todas as telas de módulo moram numa rota só do Tabs (`(tabs)/m/[...caminho].tsx`). Abrir outra tela `/m/...` troca o componente. Então o editor **desmonta** ao abrir o Catálogo, e o estado em memória (itens, cliente, condição) se perde. No voltar, o editor monta de novo, vazio.
   - O `useBloquearSaida` e o `BackHandler` do editor saem junto, por isso não aparece o "Sair do pedido?".
   - Isso vale para **qualquer** navegação do editor para outra tela de módulo, não só para o Catálogo.
3. **O que resolve, do lado do módulo:**
   - (a) tirar o botão Catálogo (item D);
   - (b) o rascunho automático (RN-VEN-39) gravar também ao desmontar o editor (cleanup do efeito), além das saídas que passam pela folha;
   - (c) se precisar abrir algo a partir do pedido, abrir dentro do editor (folha ou modal) e não por `router.push` para outra `/m/`.
   Com (a) e (b), nenhuma saída perde o pedido. A demonstração pode ser um teste que desmonta o editor alterado e encontra o rascunho.

## Pronto quando
Se precisar de mudança no shell (por exemplo, manter a tela de baixo montada, o que seria uma mudança de arquitetura da rota única), mande `pedido` com o caso e eu atendo primeiro, com teste. Do contrário, este aviso é só informativo.
