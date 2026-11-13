---
id: R-20261112-235313-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T23:53:13-04:00
---
# RN-CORE-40 já existe (indicadores da ficha, T-0146): as etapas da entrada viram RN-CORE-42

## Contexto
Contexto: na T-0172 você citou a RN-CORE-40 para as etapas nomeadas da entrada (modules/core/domain/entrada-sync.ts e contracts/entrada-sync.ts). Só que a RN-CORE-40 já é 'Indicadores de compra da ficha do cliente' (T-0146), e a RN-CORE-41 é a linha da lista de Clientes (T-0171).

## O que preciso / o que mudou
O que preciso: troque a citação para RN-CORE-42 no código, nos testes e nos comentários. O gerente escreve a RN-CORE-42 no doc 03 com o texto da sua entrega. Aproveite e aplique também o RD-0199 do corretor (modules/core/domain/notificacao-pedido.ts:18-22 e 29: o corpo do aviso de pedido passa a ser o nome do cliente, sem repetir o título), aprovado com a T-0170.

## Pronto quando
Pronto quando: as citações estão trocadas e o RD-0199 está aplicado, com a entrega e cc alexandre.
