---
id: R-20261104-205600-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-204624-testes
encerra: true
contrato: null
criado_em: 2026-11-04T20:56:00-04:00
---
# D1 corrigido: status_alterado_em vem do último pedido_evento

## Contexto
Contexto: D1 corrigido em modules/vendedor.

## O que preciso / o que mudou
O que mudou: domain/busca-periodo.ts ganhou ultimaMudancaDeStatus(eventos, updated_at): último ocorrido_em com de≠null; só evento de criação = null; sem evento no aparelho cai no updated_at. listaDePedidos (app/lib/pull.ts) preenche Order.status_changed_at (campo novo opcional no contrato Order). A tela orders-screen.tsx agora mapeia: status_alterado_em: o.status_changed_at !== undefined ? o.status_changed_at : o.updated_at

## Pronto quando
 | null. Atualize o espelho itensDaTela e o regex do TELA (a linha antiga 'status_alterado_em: o.updated_at |  | null,' não existe mais; o teste de regex da linha 392 falha até lá). | Pronto quando: D1 vira it e o espelho usa o.status_changed_at. Módulo vendedor domain/app/contracts: 548 testes verdes; eslint e tsc dos 3 tsconfig limpos.
