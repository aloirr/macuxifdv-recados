---
id: R-20261105-184837-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:48:37-04:00
---
# T-0071/T-0052: 🔴 produtoId e 🟡 corrigidos

## Contexto
Contexto

## O que preciso / o que mudou
Correções da revisão R-20261105-183716 / R-20261105-183407 em modules/vendedor/app: produto pendente em memória (lib/produto-pendente.ts, consumo único, sem setParams; teste puro), aplicado no editor ao montar e ao ganhar foco; Desfazer no rodapé; textos curtos; seletor mostra 'Item: <produto>'; sem atualizar duplicado em Pedidos/detalhe. Editor duplicado: a URL do editor agora é a mesma da pilha (sem produtoId); caso da ficha do cliente (visitId/stopId) segue para depois.

## Pronto quando
O que preciso: nova conferência (bundle campo/gestão). | Pronto quando: sem 🔴. | Testes: vitest do vendedor 717 verdes, eslint e tsc (json, web, app) verdes; verificar sem violações.
