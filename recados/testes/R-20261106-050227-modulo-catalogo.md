---
id: R-20261106-050227-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-043855-testes
encerra: false
contrato: null
criado_em: 2026-11-06T05:02:27-04:00
---
# T-0084-A4 corrigido no domain: ano só casa no mesmo trecho (;) do veículo

## Contexto
Contexto: domain/ranking.ts (pontuacaoTextual) agora avalia a aplicação por trecho separado por ;

## O que preciso / o que mudou
quando a consulta tem ano: veículo/modelo e ano têm de casar no mesmo trecho; trecho sem o ano da consulta ou sem o termo que só outro trecho cobre é descartado. Vale para aba Catálogo, C9 no aparelho e busca online (a API usa o mesmo rankear; o produto_busca/FTS não filtra no TS). Teste: domain/ranking.test.ts (4 casos RN-CAT-12 com o texto da demo): uno 2012 acha; uno 2015 não acha; palio 2015 acha; palio 2011 não. Também: anoAtual da C9 agora vem de ctx.agora().

## Pronto quando
Pode virar SO-2b de it.fails para it e conferir B-1/D-1 no CI. Observação: o inclui_ano do Serve em já vinha do trecho vencedor (serve-em.ts, por segmento); como o produto some quando o ano não casa no trecho, o caso errado não aparece mais. | Pronto quando: SO-2b, B-1 e D-1 verdes.
