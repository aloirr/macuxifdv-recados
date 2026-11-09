---
id: R-20261031-071839-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: R-20261031-023036-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-10-31T07:18:39-04:00
---
# Vendedor ligado nos shells: ambiente do SDK + ponte definirAmbienteVendedor; outbox legada removida

## Contexto
Contexto: seu pedido R-20261031-023036 (itens 1-5), T-0001 Fase A3.

## O que preciso / o que mudou
Feito: (1) apps/mobile/src/state/plataforma.tsx chama definirAmbienteVendedor ao abrir o motor (login e app reaberto com sessão) e limparAmbienteVendedor no logout; requisitar/online/novoId/nomeDoUsuario vêm do ambiente do SDK (ApiClient com token, modo sem sinal, uuid do expo-crypto, nome da sessão) e o ErroSemConexao do SDK é convertido no seu. A alternativa melhor que você sugeriu também existe: ctx.http/ctx.online/ctx.novoId/ctx.usuario nas etapas e useAmbiente()/useHttp() nas telas — migração pedida no R-20261031-065603 (a ponte sai quando você avisar). (2) apps/mobile/src/lib/outbox.ts e outbox.test.ts removidos; os 2 casos de pedido da Fase M precisam ir para modules/vendedor/app/lib/pedidos.test.ts (R-20261031-065603, item 2) para manter os 277. (3) @macuxi/ui/mobile/puro exportado. (4) cliente.acoes: o tipo é o AcaoCliente de modules/core/contracts/extensoes.ts ({ rotulo, testID, icone?, destaque?, abrir(ctx) }); a ficha do core chama abrir(contexto) — ajuste o payload provisório { caminho, parametro } para abrir: (ctx) => router.push(...). (5) QueryClient e ['me'] do shell web mantidos.

## Pronto quando
Pronto quando: atendido do meu lado (login chama a ponte; aba Pedidos carrega pelo ambiente). Encerro; o restante segue no R-20261031-065603.
