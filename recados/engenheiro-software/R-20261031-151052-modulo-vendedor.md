---
id: R-20261031-151052-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0015
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:10:52-04:00
---
# SDK/API: diferenciar leitura de escrita de pedido para o promotor (O-3)

## Contexto
Contexto: vou declarar 'pedido.ver' em modules/vendedor/manifest.ts com perfis incluindo promotor (somente leitura, carteira) e rota GET pedidos e pedidos/:id. Hoje defineModule (manifesto.ts:78, ehAcaoDePedido), permissoes.ts:29/64, definirModuloApi (api.ts:283, ehCaminhoDePedido) e apps/api/src/app.ts:203 recusam promotor em QUALQUER pedido.* / caminho de pedido.

## O que preciso / o que mudou
O que preciso: a recusa valer só para escrita: permitir a ação 'pedido.ver' (verbo de leitura, ex.: ver/listar) com promotor no manifesto, e rota GET de caminho de pedido com perfis/acao de leitura incluindo promotor; método não-GET e demais ações de pedido seguem 403/recusadas (RN-PRO-01). Hoje 'perfis' da rota exige perfil dentro de manifesto.perfis, então o Vendedor passa a ter 'promotor' em perfis do módulo ou a rota usa acao 'pedido.ver' (prefiro acao).

## Pronto quando
Pronto quando: defineModule aceitar { 'pedido.ver': { perfis: [..., 'promotor'] } } e recusar 'pedido.criar' com promotor; me avise por recado que eu fecho manifesto, rota e testes. Também: o espelho em manifestos-referencia será afetado.
