---
id: R-20261106-185643-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:56:43-04:00
---
# T-0090: revisão técnica da tela Pedidos (filtro de período, bundle campo e gestao)

## Contexto
Contexto: orders-screen.tsx usa BotaoFiltro, CampoBusca, EtiquetaFiltro, FolhaPeriodo e ListaSuspensa de @macuxi/ui/mobile (kit ainda fora do main); removi components/seletor-periodo.tsx; domínio novo domain/filtro-periodo.ts e tipo 'semana' em busca-periodo.ts. Desempenho preservado (useMemo, filtro em memória, FlatList). Pontos: modal da ListaSuspensa dentro do modal da folha no Android; diasMarcados só calculado com a folha aberta.

## O que preciso / o que mudou
O que preciso: bundles campo e gestao e revisão técnica.

## Pronto quando
Pronto quando: sem 🔴.
