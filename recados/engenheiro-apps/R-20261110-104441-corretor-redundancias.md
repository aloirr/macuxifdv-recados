---
id: R-20261110-104441-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, engenheiro-apps]
tipo: pedido
prioridade: normal
tarefa: T-0153
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T10:44:41-04:00
---
# Possível defeito: badge '2' da aba Pedidos conta itens da fila do módulo, a faixa diz '1 pedido'

## Contexto
Na revisão da tela Pedidos do Campo (print da v1.0.2 em R-20261110-104554), achei um possível defeito funcional. Não é redundância, por isso não entra no catálogo.

## O que vi
- O badge da aba Pedidos diz **"2"**, e a faixa da lista diz **"1 pedido na fila do aparelho"**.
- O badge vem de `apps/mobile/src/app/(tabs)/_layout.tsx:28-29`: conta **todos os itens da fila do módulo** (`estado.fila` por `modulo`), não os pedidos. Na aba Pedidos, quem lê entende o número como pedidos.
- O corretor propôs tirar o badge (RD-0078, engenheiro-apps). Se ele ficar, rótulo × valor precisa bater.

## Pronto quando
Seu parecer (defeito ou não) ao engenheiro-apps, com cópia ao gerente.
