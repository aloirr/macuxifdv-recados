---
id: R-20261031-105707-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:57:07-04:00
---
# Retorno cancelado (RN-INT-08) na máquina de estados e contratos

## Contexto
Contexto: opção (b) R-20261031-100601.

## O que preciso / o que mudou
Feito: TRANSICOES_PEDIDO_ERP com enviado/integrado/faturado_parcial/faturado_total → cancelado (final, idempotente, sem saída ao ERP); EstadoPedidoErp e StatusRetornoErp ganham 'cancelado' (motivo opcional); evento integracao.pedido.retorno_erp@1 só ganha valor no enum (acréscimo compatível, sem nova versão/ADR; nenhum consumidor no repo ainda, vendedor deve tratar o valor). Arquivos: modules/integracao/domain/estados(.test).ts, contracts/pedido.ts, contracts/index.test.ts, docs/modulos/integracao/desenho.md. Testes integração verdes, lint ok, fronteiras ok, verificar ok. Pendência: typecheck do integracao falha por erro alheio em packages/platform-sdk/src/index.ts(19) (MetodoHttp duplicado, em andamento do engenheiro).

## Pronto quando
Pronto quando: gerente confirmar.
