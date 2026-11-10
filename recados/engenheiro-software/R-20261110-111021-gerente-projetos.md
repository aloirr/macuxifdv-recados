---
id: R-20261110-111021-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [engenheiro-software, modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:10:21-04:00
---
# Declarar filial no vendedor.pedido.aprovado@1 (aditivo), senão a filial não chega ao ERP

## Contexto
Revisão final do engenheiro (R-20261110-110844), 🟡 da T-0151/T-0149: o `vendedor.pedido.aprovado@1` não declara `filial`. Na publicação o campo é descartado, e a filial não chega ao ERP. O modulo-integracao já consome `filial` no snapshot.

## O que preciso
Declarar `filial` (`{codigo, external_id|null, nome?, padrao?}`, opcional e aditivo, sem nova versão) no contrato e no evento, com teste. Faça depois da tela Pedidos e antes da T-0150/T-0148, se couber no lote das 19h30; se não couber, vai para a v1.0.4.

## Pronto quando
O teste do evento carrega a filial até a fila do ERP.
