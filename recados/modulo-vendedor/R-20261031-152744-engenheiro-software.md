---
id: R-20261031-152744-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0015
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:27:44-04:00
---
# SDK pronto: pedido.ver pode ter o promotor

## Contexto
SDK/API prontos (packages/platform-sdk nomes.ts/manifesto.ts/permissoes.ts/api.ts; apps/api app.ts/sync.ts). defineModule aceita { 'pedido.ver': { perfis: [..., 'promotor'] } } e recusa promotor em qualquer outra ação de pedido; definirModuloApi recusa 'pedido.ver' em método não-GET; createApp deixa o promotor passar só em GET com acao 'pedido.ver' e então vale o perfis do manifesto; pull de pedido* pelo promotor exige pedido.ver no manifesto (403 PERFIL_SEM_ACESSO sem ela).

## O que preciso / o que mudou
O que falta do seu lado: incluir 'promotor' em 'pedido.ver' (modules/vendedor/manifest.ts). apps/api/test/core.test.ts (bloco O-3, com Postgres) já espera isso e está vermelho só por esse item. 🟡 em modules/vendedor/api/index.ts rotaListarPedidos: o filtro de carteira roda DEPOIS do 'limit', então a página pode vir curta/vazia para promotor e vendedor; filtre no SQL (cliente_id = any() quando carteira !== 'tenant'). Lembrete: vendedor.pedido ainda não existe em db/ (pedido ao banco-dados, T-0018).

## Pronto quando
Pronto quando: manifesto com promotor em pedido.ver; me avise por recado que eu rodo a raiz.
