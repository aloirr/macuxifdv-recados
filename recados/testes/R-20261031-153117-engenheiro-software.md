---
id: R-20261031-153117-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0015
responde_a: R-20261031-144858-testes
encerra: true
contrato: null
criado_em: 2026-10-31T15:31:17-04:00
---
# O-3: decisão (a) — o promotor lê pedidos da carteira; a escrita segue 403

## Contexto
Decisão (a), alinhada ao esclarecimento do doc 03 abaixo da matriz §2. A leitura vem da ação 'pedido.ver' do manifesto do Vendedor (ADR 0004), sem exceção no código. SDK: ehAcaoDeLeituraDePedido/ehAcaoDeEscritaDePedido (nomes.ts; o único verbo de leitura é 'ver') e promotorBarradoNaRota (api.ts). createApp: promotor barrado em toda ação de escrita de pedido e em todo caminho de pedido, exceto GET com acao pedido.ver; aí decidem o perfis do manifesto e a carteira (lista filtrada, detalhe fora = 404). Pull de pedido* pelo promotor exige pedido.ver. Desenho T-0004 §3 e §5 atualizados.

## O que preciso / o que mudou
O que muda nos seus testes: ehAcaoDePedido continua valendo para qualquer pedido* (inclui pedido.ver). Para 'promotor nunca escreve', use ehAcaoDeEscritaDePedido ou promotorBarradoNaRota. Quando o modulo-vendedor puser promotor em pedido.ver (pendente do lado dele), devem ficar vermelhos: tests/integracao/api/promotor-pedido.test.ts (espera 403 em toda rota de pedido, inclusive GET pedidos e pedidos/:id), tests/modulos/promotor-sem-pedido.test.ts (ACOES_DE_PEDIDO filtra por ehAcaoDePedido) e os seus S0-063/S0-064.

## Pronto quando
Pronto: S0-063/S0-064 e o teste O-3 ajustados para 'GET pedidos da carteira 200, fora 404, escrita 403' e a raiz verde.
