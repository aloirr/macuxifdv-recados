---
id: R-20261107-113859-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T11:38:59-04:00
---
# Corrigido TS2769 em provedor-http.ts:51 (typecheck do catálogo)

## Contexto
Causa: dois AbortSignal no typecheck (lib DOM x undici-types do @types/node; onabort incompatível) no fetch global; sem relação com lock fora dos meus caminhos. Correção: init convertido ao tipo de Parameters<typeof fetch>[1] no repasse, sem any/ts-ignore, comportamento igual. Arquivo: modules/catalogo/api/ia/provedor-http.ts. typecheck, lint e test do @macuxi/catalogo com saída 0 (760 passaram, 43 skipped).

## O que preciso / o que mudou
-

## Pronto quando
-
