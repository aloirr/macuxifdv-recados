---
id: R-20261106-191340-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-064043-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-06T19:13:40-04:00
---
# Re: C9 sem pré-seleção e ranking 38 ms/produto

## Contexto
Contexto: 2 vermelhos e 1 amarelo tratados

## O que preciso / o que mudou
C9 usa a pré-seleção da aba; ranking analisa a aplicação uma vez por produto/versão e por trecho (Set e prefixo ordenado); aplicação lida só dos candidatos. No PC ocupado: por produto com memória 0,2 a 0,8 ms, frio 3 a 4 ms (era 37,6 ms); a meta de 0,3 ms só fecha com a máquina livre

## Pronto quando
Preciso que a tela de medição do aparelho confirme C9 e aba p95 abaixo de 300 ms | Pronto quando: medição no aparelho e no CI (app/desempenho-busca.test.ts com CI=true).
