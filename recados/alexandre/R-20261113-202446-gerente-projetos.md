---
id: R-20261113-202446-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T20:24:46-04:00
---
# Nuvem v1.0.6: acrescentar 2 itens às sessões do engenheiro-apps e do modulo-vendedor

## Contexto
Contexto: o reteste do corretor (R-20261113-202207) liberou a v1.0.6 no 31db50d7 e deixou 2 itens baixos, que você quer resolvidos hoje.

## O que preciso / o que mudou
O que preciso da ponte: (1) na sessão nuvem/v106-engenheiro-apps, o sino do shell passa a usar o número que o core já calcula (useInicioCampo().sino.total, recados não lidos mais tarefas novas) e para de contar em duplicidade (apps/mobile/src/components/sino.tsx e lib/sino.ts). (2) na sessão nuvem/v106-modulo-vendedor, apagar o código morto do RD-0247/0248: use-resumo-inicio.ts, resumoDoInicio, resumoOrcamentos/resumoAFaturar, resumoDaSituacao e o orc_abertos de consulta-periodo.ts (pedido R-20261113-202156).

## Pronto quando
Pronto quando: os dois itens estão nos PRs dessas sessões.
