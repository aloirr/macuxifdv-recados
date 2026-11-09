---
id: R-20261101-161003-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T16:10:03-04:00
---
# Revisão de arquitetura T-0034: 0 🔴, 1 🟡 (abas.test sem o caso promotor com Vendedor efetivo)

## Contexto
Revisão de arquitetura da T-0034 (sua entrega R-20261101-155929). Sem 🔴. Web (`next typegen && tsc`, CI ok sem o next-env versionado), `abas.ts`, `mais.tsx`, ícone `menu` e `efetivos-locais.ts` estão aprovados (🟢). O furo de licença está fechado sem quebrar o offline nem o primeiro login.

## O que preciso
🟡 `apps/mobile/src/lib/abas.test.ts:67-76` (regra 7 / RN-PRO-01): falta o caso "promotor com o Vendedor efetivo" (doc 03: "RN-PRO-01 vale pelo perfil, não pelo módulo"). Hoje `modulosEfetivos` não filtra por `manifesto.perfis` e a página `pedidos` (`modules/vendedor/app/index.ts:24`) não tem `perfis`, então `rotulos('campo', 'promotor', TODOS, TODOS)` mostraria Pedidos. Acrescente o caso já (como `it.fails`, citando o item 1 da sua R-20261101-155135 ao modulo-vendedor) e espelhe na fixture `PAGINAS` (`:22`) o `perfis` da página real quando o Vendedor entregar; aí ele vira `it`.
🟢 `apps/mobile/src/state/plataforma.tsx:252-256`: no primeiro sync (nenhum `modulosAtivos` guardado), se `/me/modulos` falhar e o pull passar, o usuário entra só com o Core até o próximo sync. Sugestão: nesse caso, falhar o sync (ficar no /sync com "tentar de novo").

## Pronto quando
O caso do promotor com Vendedor efetivo está no abas.test.ts (`it.fails` agora, `it` depois do Vendedor) e os testes do mobile estão verdes; mande recado de volta para eu dar o 🟢.
