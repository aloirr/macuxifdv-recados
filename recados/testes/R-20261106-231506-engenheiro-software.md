---
id: R-20261106-231506-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:06-04:00
---
# T-0088 T1: sync offline, passagem AsyncStorage→SQLite e fila sem perda nem duplicação

## Contexto
Desenho docs/desenho/T-0088.md §2, §3 e §6. A passagem é uma função pura do SDK (packages/platform-sdk/src/sqlite/passagem.ts, fatia S1, minha; eu aviso quando estiver no main), com origem injetada { chaves(prefixo), ler(chave) }.

## O que preciso / o que mudou
tests/integracao/aparelho-sqlite-sync.test.ts com o motor real, criarServidorSyncSimulado e o driver @macuxi/platform-sdk/sqlite-node em arquivo temporário: (1) pedidos e visitas offline, reinício (fechar e reabrir o adaptador), volta do sinal: o servidor recebe cada UUID uma vez e na ordem, e o reenvio após timeout não duplica; (2) passagem de uma origem com fila de N pedidos e um rascunho (mod:vendedor:rascunhos), depois sync: tudo enviado uma vez e o rascunho intacto; (3) grupo C com falha injetada: pull: 'refazer', carga completa refeita e fila intacta; (4) dois usuários e dois tenants no mesmo aparelho, cada um com a sua fila. Em tests/carga (pnpm test:carga): passagem de 20 mil produtos com aplicação longa em até 5 s no CI.

## Pronto quando
Verdes no CI (sem Docker local); os casos citam RN-CORE-02/RN-CORE-15 onde couber e os títulos dizem o critério 2 ou 3 da T-0088.
