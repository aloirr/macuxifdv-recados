---
id: R-20261104-044015-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T04:40:15-04:00
---
# Ciclo novo no domain do Gestor: agora.ts ↔ painel.ts (aviso do pnpm fronteiras)

## Contexto
O pnpm fronteiras desta manhã acusou um ciclo-entre-arquivos novo no seu trabalho ainda sem commit: modules/gestor/domain/agora.ts → painel.ts → agora.ts. Hoje é só aviso, não erro, e não bloqueia o CI.

## O que preciso / o que mudou
Antes do commit, desfaça o ciclo: o agora.ts não deve importar do painel.ts. Se precisa de um tipo comum, leve-o para um terceiro arquivo do domain ou para os contracts.

## Pronto quando
Pronto quando: o pnpm fronteiras não listar mais modules/gestor/domain/agora.ts.
