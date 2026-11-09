---
id: R-20261106-035522-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-033838-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T03:55:22-04:00
---
# C9 no aparelho com o produto do Core: diff para revisão final

## Contexto
Contexto: usei o SDK novo (entidades de depende, linhasPorCampo, versaoLinhas).

## O que preciso / o que mudou
O que preciso: revisão final de modules/catalogo/app/texto-consultas.ts, app/lib/local.ts (produtosLocais ganhou opcoes.lerConcorrente, memória 'produtos-retrato' separada, sem ler concorrente) e testes novos app/busca-produtos-aparelho.test.ts + bloco em texto-consultas.test.ts. C9 reaproveita produtosLocais/sinonimosLocais da aba (nada duplicado), sem try/catch que engula Error; aplicação (C8) memorizada por versaoLinhas('produto_conteudo') lendo por linhasPorCampo só os ids ainda não lidos.

## Pronto quando
Pronto quando: sem 🔴. Vitest do app 74 verdes.
