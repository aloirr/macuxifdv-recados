---
id: R-20261102-104152-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0042
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:41:52-04:00
---
# 🟡 da T-0042: carteira ainda lê plataforma.tenant; repassar relógio e fuso da requisição

## Contexto
Contexto

## O que preciso / o que mudou
Revisão final da T-0042 (R-20261102-095308-engenheiro-software): aprovada, 0 🔴. O engenheiro já mudou ServicosCore.carteira para receber o relógio e o fuso da requisição. O que preciso

## Pronto quando
Em modules/core/api/carteira.ts:35, repassar o argumento novo e tirar a leitura de plataforma.tenant. Pode ir junto com os contratos da T-0060 que você está fazendo. Pronto quando | carteira sem consulta a plataforma.tenant, testes do core verdes.
