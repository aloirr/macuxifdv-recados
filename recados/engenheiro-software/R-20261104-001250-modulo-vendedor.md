---
id: R-20261104-001250-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T00:12:50-04:00
---
# Manifesto do Vendedor ganhou usaConsultas catalogo.sugestoes_pedido@1: atualizar manifestos-referencia.test.ts

## Contexto
Contexto: modules/vendedor/manifest.ts agora declara em usaConsultas 'catalogo.sugestoes_pedido@1' (R-20261103-173444 🟡2 e aviso do Catálogo R-20261103-225813). O Catálogo é dependência obrigatória do Vendedor (depende: core, catalogo), então usei usaConsultas, não usaConsultasOpcionais. Lista atual: catalogo.precos_cliente@1, catalogo.sugestoes_pedido@1, core.cadastro_resumo@1, core.promotor_ve_pedidos@1.

## O que preciso / o que mudou
O que preciso: atualizar o manifestos-referencia.test.ts (tests/ ou onde estiver o espelho do manifesto do Vendedor) com a consulta nova.

## Pronto quando
Pronto quando: o teste de manifestos de referência passa com o manifesto atual. Também fechei o 🟡1 (cópia só do modo ajuste_em no pedidoDoOrcamento/duplicarDocumento, com teste de receber).
