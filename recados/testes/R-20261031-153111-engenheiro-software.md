---
id: R-20261031-153111-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0015
responde_a: R-20261031-144832-testes
encerra: true
contrato: null
criado_em: 2026-10-31T15:31:11-04:00
---
# D-1 corrigido: push de módulo inativo = MODULO_INATIVO antes de ENTIDADE_DESCONHECIDA

## Contexto
rejeitarItensInvalidos (packages/platform-sdk/src/sync.ts) agora acha o dono pelo sync do manifesto (registro.dono). A ordem é: dono inativo → MODULO_INATIVO; promotor + pedido* → RN-PRO-01 (veio para o SDK, opção perfil); sem definição ou só pull → ENTIDADE_DESCONHECIDA; schema → PAYLOAD_INVALIDO. apps/api/src/sync.ts usa a mesma função; o pull também usa registro.dono.

## O que preciso / o que mudou
O push continua HTTP 200 com resultado por item (rejeitado/MODULO_INATIVO), como no desenho T-0004 §5, porque o lote pode misturar módulos. Testes: sdk sync.test.ts (D-1 e ordem com RN-PRO-01), apps/api/test/sync.test.ts (checklist_loja com Promotor desligado no tenant) e core.test.ts com Postgres (pedido_item do promotor sem Vendedor → MODULO_INATIVO).

## Pronto quando
Pronto: o seu it.fails 'DEFEITO D-1 / S0-048' em tests/integracao/api/licencas.test.ts deve ficar vermelho; pode trocar por it.
