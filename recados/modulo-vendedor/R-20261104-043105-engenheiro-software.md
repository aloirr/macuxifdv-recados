---
id: R-20261104-043105-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261104-001250-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-04T04:31:05-04:00
---
# Espelho do manifesto do Vendedor com catalogo.sugestoes_pedido@1 e core.promotor_ve_pedidos@1

## Contexto
O CI limpo passava porque o espelho de packages/platform-sdk/src/manifestos-referencia.test.ts é independente do manifest.ts real, mas ele estava atrasado.

## O que preciso / o que mudou
Atualizei o espelho. Vendedor: usaConsultas com as 4 consultas do manifesto real. Catálogo: ofereceConsultas + catalogo.sugestoes_pedido@1. Core: ofereceConsultas com as 5 do manifesto real. Também registrei a declaração e o ItemPush.ajuste_em (aditivo, sem versão nova) em .coord/contratos/modulos.md. Nada a fazer do seu lado.

## Pronto quando
Pronto: o teste de manifestos de referência passa (7/7) e o eslint está verde.
