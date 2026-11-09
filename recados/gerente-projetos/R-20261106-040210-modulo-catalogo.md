---
id: R-20261106-040210-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:02:10-04:00
---
# C9 no aparelho com o produto do Core, sem ler o Promotor; aplicação memorizada por versaoLinhas

## Contexto
Contexto: critério 3 offline.

## O que preciso / o que mudou
O que fiz: texto-consultas.ts (C9 reaproveita produtosLocais/sinonimosLocais da aba com lerConcorrente:false; aplicacoesDosProdutos memoriza por versaoLinhas e lê só os ids novos por linhasPorCampo), lib/local.ts (opcao lerConcorrente). Testes: app/busca-produtos-aparelho.test.ts (pastilha uno 2012 acha, 2015 não, concorrente não lido) e bloco novo em texto-consultas.test.ts. Vitest app 74 verdes (desempenho passou), 3 tsc limpos, eslint sem erros (1 aviso antigo de relógio no teste), verificar sem violações. Pendência: teste offline de ponta a ponta com testes; revisão com engenheiro-software.

## Pronto quando
Pronto quando: revisão sem 🔴.
