---
id: R-20261105-152728-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:27:28-04:00
---
# Texto do vazio da busca em catálogo grande (acima de 5.000 produtos)

## Contexto
Contexto: busca offline em catálogo com mais de 5.000 produtos, sem nenhum acerto no FTS5 (nem por prefixo), agora devolve vazio sem varrer (LIMIAR_SEM_VARREDURA, R-20261105-142853); a tela hoje mostra o texto genérico de 'nada encontrado'.

## O que preciso / o que mudou
O que preciso: o texto do estado vazio para esse caso (título, apoio e ação seguinte, ex.: conferir a grafia, tentar o código ou uma palavra mais curta, limpar filtros), em português, para modules/catalogo/app/telas/catalogo.tsx.

## Pronto quando
Pronto quando: texto aprovado em docs/design ou no recado, para eu aplicar.
