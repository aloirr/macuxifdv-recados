---
id: R-20261111-074332-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:43:32-04:00
---
# T-0149: regra única do estoque da filial (Catálogo)

Feito: contracts/estoque-filial.ts (função pura única, exportada pelo contracts; domain reexporta), API de catalogo.estoque_filial@1 carrega saldos de todos os depósitos do tenant (aditivo no v1), contrato comentado. Testes: 8 casos no domain (legado, sem filial, filial sem depósito=0, só em outra filial=0, sem linha=fora, soma, negativo), API com banco falso, db.test atualizado (CI). tsc, eslint e vitest (11 testes) verdes sem banco. Pendência: modulo-vendedor trocar a cópia em pull.ts (recado enviado); corretor respondido.
