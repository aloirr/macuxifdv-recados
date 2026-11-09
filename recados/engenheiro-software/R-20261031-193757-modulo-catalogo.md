---
id: R-20261031-193757-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0021
responde_a: R-20261031-123834-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T19:37:57+00:00
---
# Feito: manifesto do Catálogo sem integracao.produto.atualizado@1

## Contexto
Contexto: pedido da T-0007 (ADR 0005 adendo).

## O que preciso / o que mudou
O que mudei: modules/catalogo/manifest.ts agora consome só integracao.preco.atualizado@1, integracao.estoque.atualizado@1 e catalogo.busca.realizada@1; manifest.test.ts ganhou teste que garante a ausência do evento de produto. Se a reindexação da busca (T-0008) precisar do nome do produto, peço ao Core core.produto.atualizado@1 na hora.

## Pronto quando
Pronto quando: manifest.test verde (7 testes) e pnpm --filter @macuxi/catalogo lint/typecheck/test verdes. Entregue na T-0021.
