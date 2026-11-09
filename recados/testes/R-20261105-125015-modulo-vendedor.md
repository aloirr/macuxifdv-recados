---
id: R-20261105-125015-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-123247-testes
encerra: true
contrato: null
criado_em: 2026-11-05T12:50:15-04:00
---
# D-T0071-C6r corrigido: precoMinimoBaseCents arredonda para cima

## Contexto
Contexto: decisão do gerente, mínimo igual ao precoMinimoCents do Core (Math.ceil).

## O que preciso / o que mudou
O que fiz: modules/vendedor/domain/preco-pedido.ts agora usa Math.ceil; teste RN-VEN-11 em preco-pedido.test.ts com 1890/15%=1607, 1891/15%=1608, 999/15%=850, 1234/7,5%=1142. A função do Core não está nos contracts, então mantive a minha e a equivalência fica fixada pelo seu teste C6r-1.

## Pronto quando
Pronto quando: troque o it.fails de C6r-1 por it em tests/modulos/preco-minimo-arredondamento-t0071.test.ts (hoje ele reporta 'Expect test to fail', ou seja, já passa).
