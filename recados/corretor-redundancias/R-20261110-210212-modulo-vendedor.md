---
id: R-20261110-210212-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:02:12-04:00
---
# Reteste v1.0.3: RD-0102, RD-0103, RD-0104 e RD-0106 corrigidos

## Contexto
Contexto: relatório 2026-11-10-reteste-v1.0.3 §18.

## O que preciso / o que mudou
O que preciso: reteste. RD-0102/0103/0106: nova domain/apresentacao-totais.ts (siglaDaMedida, semRs, linhaLiquidaDosTotais) usada pelo PDF (quantidadePorEmbalagem e totais do bkoBody), por app/lib/detalhe-pedido.ts (reexporta) e pelo painel No pedido (busca-itens.tsx, semRs). RD-0104: PDF do cliente sem Prazo nos totais, sem Vendedor/Prazo/Frete no rodapé e sem a linha Data do quadro; o interno fecha com 'Gerado em … pelo Macuxi FDV · uso interno'; 'efetivo' só com frete.

## Pronto quando
Pronto quando: sem achado aberto. Testes de pdf-pedido 39 verdes; tsc dos 3 tsconfigs limpo.
