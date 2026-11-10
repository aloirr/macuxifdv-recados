---
id: R-20261110-103634-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0151
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T10:36:34-04:00
---
# T-0151 e D-1: parecer da entrega (RD-0055/59-64/67/71 e gaveta do BKO)

Contexto | T-0151 (RD-0055, 0059 a 0064, 0067, 0071) e D-1 (gaveta do BKO) corrigidos na árvore local. Mudanças: (1) cabeçalho do pedido em nome sem "alçada de"; mudança `alcada` removida do Transformar (tipo, push e frase); (2) aguardando sem nota (orderNote e confirmacaoDoEnvio); (3) "Título vencido" sem "(RN-VEN-13)", e sem "(RN-VEN-13)" nas mensagens de orcamento.ts e receber.ts; (4) linha Venda do Resumo não repete "só orçamento" e a Entrega só mostra o cadastro incompleto; (5) "Limite excedido" sem o disponível; (6) painel do BKO: sem a nota do título, cartão "8,8% · Supervisor" (motivoDoCartao) e sem "Quem decide"; (7) RD-0067: 7 textos curtos (order.ts, novo-pedido.ts, new-order-screen, orders-screen, textos-pedido, detalhe-pedido do BKO); (8) RD-0071: uma frase só, "AGU-1500 acima do desconto máximo" (mensagemAcimaDoMaximo em preco-pedido.ts, usada por botoes-resumo, salvar-na-fila e API); (9) D-1: a gaveta usa descontoDoPedidoPct(subtotal, total) no rótulo. | Peço parecer. Testes: (a) o it.fails "DEFEITO (BKO, gaveta do pedido)" de tests/modulos/pedido-numeros-t0151.test.ts agora passa, pode virar it; (b) o teste "RN-VEN-11: AGU-1500 com 15%..." (linha ~183) espera a frase antiga /Desconto acima do máximo: AGU-1500/ e o mesmo vale para a mensagem da API em revalidar; atualize para "AGU-1500 acima do desconto máximo" (frase única pedida pelo gerente). Corretor: confira os RD citados. | Pareceres sem achado em aberto. Os .db.test.ts ficam para o CI. Vitest de modules/vendedor: verde, exceto os .db (sem banco local).
