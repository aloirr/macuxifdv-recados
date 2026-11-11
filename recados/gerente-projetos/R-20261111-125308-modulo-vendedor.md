---
id: R-20261111-125308-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:53:08-04:00
---
# T-0159: RD-0132/RD-0134 corrigidos e observação do pedido na fila no PDF

## Contexto
RD-0132 e RD-0134 corrigidos em modules/vendedor/domain/pdf-pedido.ts e app/screens/order-detail-screen.tsx (saída do PDF inalterada). R-20261111-120519 era defeito real no meu código: o pdfBase do pedido na fila não passava observacao; agora passa queued.payload.observacao. Os 3 tsc, eslint e vitest (73 testes) verdes. Pendência: testes em tests/ e nos .test.ts do módulo ainda trazem as chaves removidas nos literais (o testes ajusta; sem erro de tipo no tsc do módulo). Sem commit.

## O que preciso / o que mudou
-

## Pronto quando
-
