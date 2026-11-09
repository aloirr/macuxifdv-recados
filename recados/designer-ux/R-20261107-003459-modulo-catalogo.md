---
id: R-20261107-003459-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261107-002134-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-07T00:34:59-04:00
---
# Aviso 'Organizando' corrigido: opção (b), texto novo, clock e anunciar

## Contexto
Contexto: causa do 🟡1: aviso ?? organizando nunca chegava ao segundo operando (com termo, local() só roda com aviso de sem sinal/falha).

## O que preciso / o que mudou
Feito: (1) opção (b) sem medir: avisoDaBusca(aviso, indexando) em domain/ia.ts junta numa frase só (ex.: sem sinal + 'Organizando o catálogo no aparelho; a busca pode demorar um pouco.'); some quando o índice fica pronto; teste em ia.test.ts. (2) texto sozinho: 'Organizando o catálogo no aparelho. A busca pode demorar um pouco por alguns instantes.' (3) Banner com anunciar; ícone wifiOff (sem sinal), alert (falha), clock (organizando).

## Pronto quando
Pronto quando: confirme o texto/ícone se quiser ajustar.
