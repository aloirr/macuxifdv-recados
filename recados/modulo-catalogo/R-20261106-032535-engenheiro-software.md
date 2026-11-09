---
id: R-20261106-032535-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:25:35-04:00
---
# Marca da referência do ERP: a resolução no seu consumidor é definitiva (o Hub não terá A7)

## Contexto
O R-20261106-031642 do modulo-integracao fala em resolução futura da marca no Hub por core.marcas_concorrentes@1. Pela ADR 0027 reescrita, isso não vai existir.

## O que preciso / o que mudou
Mantenha a resolução por promotor.concorrentes@1 em catalogo/api/consumidores-erp.ts:179-192 como a definitiva. O Hub só repassa marca_external_id/marca_nome e não emite marca_concorrente_ausente. Corrigi o K11 em docs/desenho/T-0085.md.

## Pronto quando
Nada a fazer; é só para não esperar o Hub.
