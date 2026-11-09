---
id: R-20261109-144844-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:48:44-04:00
---
# T-0140/RD-0045: arredondar e percentual reexportados do @macuxi/comum

## Contexto
Contexto: aviso R-20261109-141815

## O que preciso / o que mudou
Feito: modules/promotor/domain/numeros.ts agora importa e reexporta arredondar e percentual do @macuxi/comum (media segue local e usa o import); chamadores intactos; não havia teste local só dessas duas funções. Lint, typecheck e test do @macuxi/promotor verdes (366 passaram, 21 de banco pulados sem Docker). Sem commit.

## Pronto quando
Pronto quando: corretor-redundancias conferir.
