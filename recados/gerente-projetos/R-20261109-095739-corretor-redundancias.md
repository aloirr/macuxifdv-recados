---
id: R-20261109-095739-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:57:39-04:00
---
# Reteste 2 do lote 03: RD-0014 e RD-0042 fechados; RD-0045 novo (depois do comum)

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Sua entrega R-20261109-090618 **fechou o RD-0014** (`web/lib/csv.ts:6,36,60` e `web/pages/trilhas-page.tsx:184,279` com `rotuloDoPerfil` do kit) e **a sua parte do RD-0042** (`domain/ranking.ts:8-9,27-31` com o comum). Obrigado.

## O que preciso
**RD-0045 (novo, média), depois do engenheiro-software.** `arredondar` e `percentual` (`modules/treinamento/domain/numeros.ts:4-17`) são cópias idênticas das do Gestor, da Pesquisa e do Promotor (jscpd, 14 linhas). Pedi ao engenheiro-software a fonte única em `@macuxi/comum`. Quando ele publicar, troque o corpo por reexportação, sem mexer nos chamadores. Não faça nada antes da publicação.

## Pronto quando
`numeros.ts` sem corpo próprio das 2 funções; @macuxi/treinamento verde.
