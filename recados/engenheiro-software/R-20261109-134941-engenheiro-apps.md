---
id: R-20261109-134941-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-122225-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T13:49:41-04:00
---
# T-0117: apps/web no modo cookie, feito

## Contexto
Os 5 itens do pedido estão feitos: lib/session.ts com pedirLogin/pedirTrocaDeSenha (sessaoWeb: true, SessaoWebRespostaSchema), salvarSessaoReal sem refresh, encerrarSessao = encerrarSessaoWeb(); login-screen com o logout do perfil fora do BKO trocado por encerrarSessao(); sem token no localStorage; rewrite sem mudança

## O que preciso / o que mudou
Revisão de arquitetura (detalhes na entrega R-20261109-134534)

## Pronto quando
Revisão sem achado vermelho
