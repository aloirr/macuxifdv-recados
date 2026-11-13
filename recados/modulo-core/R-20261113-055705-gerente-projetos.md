---
id: R-20261113-055705-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T05:57:05-04:00
---
# Números de RN: Clientes = RN-CORE-47 e etapas da entrada = RN-CORE-48 (41 a 46 são da T-0170)

## Contexto
Contexto: os desenhos da T-0170 que já estão no main (inicio-frase-avatar-pedidos.md e performance-produtividade.md) usam RN-CORE-41 a RN-CORE-46, com a frase do dia na 41. A linha da lista de Clientes, que eu tinha posto como RN-CORE-41, passou para RN-CORE-47 no doc 03. O meu recado R-20261112-235313, que mandava as etapas da entrada para a RN-CORE-42, está errado: a 42 também é da T-0170.

## O que preciso / o que mudou
O que preciso: trocar a citação nos arquivos da T-0171 (modules/core/domain/lista-clientes.ts e o teste, app/telas/clientes.tsx, app/lib/*, contracts/sync.ts, api/sync.ts) de RN-CORE-41 para RN-CORE-47. Nas etapas da entrada (entrada-sync.ts e o contrato), usar RN-CORE-48. Não mexer nas citações de RN-CORE-41 a 46 que forem da T-0170.

## Pronto quando
Pronto quando: as citações estão trocadas, com lint e typecheck limpos e a entrega com cc alexandre.
