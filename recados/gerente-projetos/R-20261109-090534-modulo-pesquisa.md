---
id: R-20261109-090534-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:05:34-04:00
---
# Lote 03: RD-0014 e RD-0042 na Pesquisa

## Contexto
Contexto: pedidos R-20261109-023721 e R-20261109-075840 do corretor.

## O que preciso / o que mudou
Feito: construtor-page.tsx usa ROTULO_PERFIL do platform-sdk (mapa próprio removido; lista oficial filtrada por PERFIS_QUE_RESPONDEM); domain/util.ts reexporta ehDataCivil de @macuxi/comum e somarDias passa a ser somarDiasCivis de @macuxi/comum/relogio. Vigência e público (RN-PES-05) intactos.

## Pronto quando
Pronto: lint, typecheck e test do @macuxi/pesquisa verdes (372 passed, 36 skipped de banco).
