---
id: R-20261110-082134-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:21:34-04:00
---
# T-0151 entregue (modulo-vendedor): alçada só ao salvar, máximo do produto, preço salvo, defeitos de UN/%

## Contexto
Contexto: R-20261110-062238-alexandre. Sem commit/push.

## O que preciso / o que mudou
Feito: (1) pedido corrigido/editado mantém os preços salvos (editar e corrigir, pedido ou orçamento), sem a faixa 'Preços atualizados...' (avisoDaEdicao, use-vendedor.ts); (2) alçada só na pergunta 'Desconto acima da sua alçada. Enviar para aprovação?' (Enviar para aprovação / Voltar) ao salvar pedido e no Transformar; sai do Resumo (faixa), do texto sob o botão, do rótulo 'para aprovação', da folha de saída, da folha do Transformar, das notes da fila e da linha 'Alçada do vendedor' do detalhe (domain/botoes-resumo.ts: perguntaDaAlcada/PERGUNTA_DA_ALCADA); (3) item acima do máximo do produto bloqueia Salvar e enviar e Transformar, só orçamento, motivo 'AGU-1500 acima do desconto máximo' (motivoDoMaximo, calcularPedido.acima_do_maximo); API recusa preco_abaixo_minimo; (4) recusa curta 'Desconto acima do máximo: AGU-1500' (mensagemAcimaDoMaximo; textoDaRecusa sem 'Não foi aceito' nem 'Corrija e salve de novo', RD-0057/RD-0059 parte da recusa); (5) defeitos: unit_label sempre na exibição (FD), rótulo 'Desconto X%' do detalhe e do PDF sai dos centavos (descontoDoPedidoPct, 10,1% e não 15,0%), totais iguais Resumo x fila x PDF testados com 5 itens; app deixava enviar acima do máximo porque o sync do produto não leva preço de venda e desconto máximo.

## Pronto quando
Testes: pedido-t0151.test.ts (novo, 11), botoes-resumo, pdf-pedido, detalhe-pedido, salvar-na-fila, revalidar-novo-pedido, textos-*; typecheck e lint do módulo verdes; suíte 1209 ok e 1 falha de tempo (lista-desempenho <100ms, estoura com a máquina ocupada, não ligada à tarefa). Arquivos principais em modules/vendedor/{domain,app/lib,app/screens,app/components,app/state} e docs/modulos/vendedor/pedido-e-aprovacao.md. | Pendências/premissas: (a) o travamento OFFLINE do máximo depende de preco_venda_cents e desconto_maximo_pct no ProdutoSyncSchema: pedido ao modulo-core (R-20261110-071153, cc banco-dados e engenheiro-software); sem isso a API recusa (422) e o pedido cai em 'Corrigir pedido'; (b) correção de pedido recusado: preços salvos vêm da exibição guardada na fila e o servidor reprecifica pela tabela na data created_offline_at do aparelho (mesmo dia, sem divergência); (c) alinhamento do Gestão: recado R-20261110-071058 ao modulo-gestor; (d) meta: p08 faturado parcial continua contando o total (R-20261110-060422 ao banco-dados); (e) parecer pedido ao corretor-redundancias (R-20261110-074810) e ao testes (R-20261110-074839); restam do RD-0058 a T-0150 (detalhe em tabela) e do .vscode a violação do verificar, que não é minha. T-0150 e T-0148 aguardam a imagem aprovada do designer-ux.
