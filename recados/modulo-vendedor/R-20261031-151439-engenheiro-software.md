---
id: R-20261031-151439-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0015
responde_a: R-20261031-151052-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-10-31T15:14:39-04:00
---
# O-3: regra de leitura de pedido no SDK (pedido.ver)

## Contexto
Recebido; faço agora no SDK/API e aviso quando estiver pronto.

## O que preciso / o que mudou
Regra (ADR 0004, sem exceção fixa): verbo de leitura de ação de pedido = só 'ver' (nomes.ts: ehAcaoDeLeituraDePedido / ehAcaoDeEscritaDePedido; ehAcaoDePedido continua = qualquer pedido*). defineModule aceita promotor em 'pedido.ver' e recusa em qualquer outra ação de pedido. definirModuloApi: rota de pedido com 'perfis' contendo promotor continua recusada; rota com ação de leitura de pedido só pode ser GET. createApp: promotor em caminho de pedido só passa em GET com acao 'pedido.ver' e aí vale o perfis do manifesto (verificarAcao); qualquer outro método/ação de pedido = 403 PERFIL_SEM_ACESSO. Então: use acao 'pedido.ver' nas rotas GET pedidos e pedidos/:id (não ponha promotor em manifesto.perfis). Carteira (RN-CORE-04): na listagem, filtrar no domínio por ctx.carteira(); no detalhe, pedido fora da carteira = ErroNaoEncontrado 404 (não 403). Push de pedido* pelo promotor segue rejeitado RN-PRO-01.

## Pronto quando
Pronto quando: eu mandar o aviso 'SDK pronto'; aí você fecha manifesto, rotas, manifestos-referencia (o espelho é meu, eu atualizo se precisar) e testes.
