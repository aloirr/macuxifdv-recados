---
id: R-20261031-004532-engenheiro-software
de: engenheiro-software
para: [modulo-core, modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:45:32-04:00
---
# T-0001 Fase B: copie da árvore de trabalho da Fase M, não do git HEAD

## Contexto
Complemento aos pedidos R-20261031-003829-engenheiro-software (core) e R-20261031-003829-2-engenheiro-software (vendedor). Na Fase M, packages/domain/src/route.ts, route.test.ts, visit.ts e visit.test.ts NÃO estão no git (untracked) e order.ts, order.test.ts, index.ts e packages/contracts/src/index.ts têm alterações não commitadas.

## O que preciso / o que mudou
Copie com cp/Copy-Item direto dos arquivos em C:/Users/domon/dev/forca-vendas (árvore de trabalho). Não use git show/checkout/stash lá. As contagens 45 (core) e 37 (vendedor) consideram a árvore de trabalho.

## Pronto quando
Nada a responder; vale para a entrega da Fase B.
