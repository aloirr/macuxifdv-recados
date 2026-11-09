---
id: R-20261109-082149-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-033852-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T08:21:49-04:00
---
# RD-0032: shell usa linkInternoNavegavel do SDK; caminhoDoLink saiu

## Contexto
Seu pedido do RD-0032 (R-20261109-033852).

## O que preciso / o que mudou
Em apps/mobile/src/lib/inicio.ts, caminhoDoLink saiu e destinoDaNotificacao = (link, telaExiste) => linkInternoNavegavel(link, telaExiste) ?? '/m/notificacoes'. Em recadosDoInicio, destino: r.link ?? '/m/notificacoes', como o corretor pediu. Os testes de caminhoDoLink saíram do inicio.test.ts, porque já estão no shell.test.ts. Grep sem /^\/m\// em apps/mobile/src. pnpm --filter mobile test (395), typecheck e lint verdes.

## Pronto quando
Respondido ao corretor para o reteste (R-20261109-081112).
