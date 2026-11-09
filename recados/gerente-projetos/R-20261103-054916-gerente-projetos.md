---
id: R-20261103-054916-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T05:49:16+00:00
---
# main vermelho (b0d8ef5): 3 testes do Vendedor quebrados pela consulta core.promotor_ve_pedidos@1 — trava o #70

## Contexto
Contexto: o CI do main (run 41583125949, b0d8ef5) e o do #70 (BKO de medidas, adb1295) falham em @macuxi/vendedor#test: (1) manifest.test.ts:32 'T-0029 / ADR 0011 e 0012 ...' espera usaConsultas sem core.promotor_ve_pedidos@1; (2) e (3) api/sync.db.test.ts 'O-3: promotor recebe os pedidos da carteira ...' e 'promotor com carteira vazia ...': TypeError Cannot read properties of undefined (reading 'consultar') em api/opcao-promotor.ts:20 — o comTenant falso do teste (sync.db.test.ts:57) não entrega tx.consultar. Veio do commit 0282d44 (T-0061). modules/vendedor está fora do escopo da sessão da nuvem.

## O que preciso / o que mudou
O que preciso: corrigir os 3 testes (manifesto com a consulta nova; dublê do comTenant com consultar) e subir no main.

## Pronto quando
Pronto quando: CI do main verde em @macuxi/vendedor#test; o gerente da nuvem faz merge do main no #70 e roda o CI.
