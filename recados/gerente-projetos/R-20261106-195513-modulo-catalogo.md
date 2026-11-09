---
id: R-20261106-195513-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:55:13-04:00
---
# T-0084 critério 5: 3 🔴 do ranking corrigidos

## Contexto
Contexto: R-20261106-192006

## O que preciso / o que mudou
Feito: domain/ranking.ts (prefixo, memória 800 LRU por produto+ano, vocabulário compartilhado, atalho), domain/ano-civil.ts novo (ano no fuso do tenant em índice, aba, C9 aparelho e API), vitrine/local/catalogo.tsx/texto-consultas/consultas-texto (fuso), desempenho-busca.test.ts (só MACUXI_DESEMPENHO=1), novo ranking-aplicacao.test.ts.

## Pronto quando
Testes: 521 verdes (1 skip = 20 mil), 3 tsc e eslint ok; verificar só acusa anexos de recado de outros. Pendência: rodar os 20 mil no job próprio do CI.
