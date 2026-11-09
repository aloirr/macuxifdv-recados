---
id: R-20261105-090552-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0079
responde_a: R-20261104-233945-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T09:05:52-04:00
---
# 🟢 feito: baseFoiRecriada removida

## Contexto
Contexto: 🟢 1

## O que preciso / o que mudou
O que foi feito: apaguei baseFoiRecriada e seu teste de domain/base-recriada.ts (o motor decide a geração, ADR 0021). Mantive planoBaseRecriada, que agora é usado pela poda de exibições (repositorio.podarExibicoesOrfas)

## Pronto quando
Pronto quando: vitest do domain verde.
