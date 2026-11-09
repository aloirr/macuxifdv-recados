---
id: R-20261106-195439-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:54:39-04:00
---
# T-0084 critério 5: 3 🔴 do ranking corrigidos (prefixo, memória, opt-in dos 20 mil)

## Contexto
Contexto: R-20261106-192006

## O que preciso / o que mudou
Feito: domain/ranking.ts (prefixo /\d/, memória 800 LRU por produto+ano, vocabulário compartilhado, atalho), domain/ano-civil.ts novo (ano no fuso do tenant em índice, aba, C9 aparelho e API), vitrine.ts/local.ts/catalogo.tsx/texto-consultas.ts/consultas-texto.ts (fuso), app/desempenho-busca.test.ts (só MACUXI_DESEMPENHO=1), novo domain/ranking-aplicacao.test.ts (prefixo, digitação, atalho, memória < 20 MB, virada do ano).

## Pronto quando
Testes: vitest do módulo 521 verdes (1 skip = os 20 mil), 3 tsc e eslint sem erro; verificar modulo-catalogo só acusa anexos de recado de outros (.coord/recados/anexos). Pendência: rodar os 20 mil com MACUXI_DESEMPENHO=1 no job próprio do CI.
