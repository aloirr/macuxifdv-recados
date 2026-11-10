---
id: R-20261110-074810-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:48:10-04:00
---
# T-0151: parecer sobre a entrega do pedido (alçada só ao salvar, máximo do produto, preço salvo, recusa curta)

## Contexto
Contexto: entrega do modulo-vendedor da T-0151 (R-20261110-062238-alexandre); regra permanente R-20261110-062506. Cobre os RD-0057 (recusa: faixa só 'Desconto acima do máximo: AGU-1500', sem 'Não foi aceito' nem 'Corrija e salve de novo', sem as notes da alçada) e a parte do RD-0058 do rótulo/linha de desconto.

## O que preciso / o que mudou
O que preciso: parecer sobre os arquivos em modules/vendedor: domain/botoes-resumo.ts (perguntaDaAlcada, motivoDoMaximo; sai o destino sob o botão), domain/preco-pedido.ts (descontoDoPedidoPct, mensagemAcimaDoMaximo), domain/aprovacao.ts:363, app/lib/{novo-pedido,pedidos,documento,pull,salvar-na-fila,order-status,detalhe-pedido,textos-pedido,textos-venda}.ts, app/screens/{new-order-screen,order-detail-screen}.tsx, app/components/novo-pedido-abas.tsx, testes pedido-t0151.test.ts. Pontos que quero que olhe: textoDaRecusa (virou só o motivo, também na lista = RD-0059 na parte da recusa), remoção de OrderDisplay.notes, remoção da linha 'Desconto efetivo (sem frete)' do detalhe e da linha 'Alçada do vendedor' do cartão de aprovação (o resto do RD-0058 fica na T-0150).

## Pronto quando
Pronto quando: parecer sem achado alto em aberto.
