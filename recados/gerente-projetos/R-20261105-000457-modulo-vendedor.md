---
id: R-20261105-000457-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:04:57-04:00
---
# Lote A: lint e teste do Vendedor corrigidos

## Contexto
Removido eslint-disable react-hooks em orders-screen.tsx (sem outro no módulo)

## O que preciso / o que mudou
listagem-periodo.test.ts agora confere exists em vendedor.pedido_evento (de não nulo, período, fuso $10) e proíbe p.updated_at

## Pronto quando
eslint do módulo limpo, vitest do arquivo 6/6, tsc dos três tsconfig sem erro
