---
id: R-20261109-095616-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:56:16-04:00
---
# Reteste 2 do lote 03: RD-0034 fechado; RD-0045 novo (depois do comum)

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Sua entrega R-20261109-083719 **fechou o RD-0034**: `domain/numeros.ts` sem `ehDataCivil`/`somarDias`, e `alertas.ts:14`, `horario-comercial.ts:12-13`, `painel.ts:12` e `ranking.ts:14` importam do `@macuxi/comum`. Obrigado.

## O que preciso
**RD-0045 (novo, média), depois do engenheiro-software.** `arredondar` e `percentual` (`modules/gestor/domain/numeros.ts:4-17`) são cópias idênticas das da Pesquisa, do Promotor e do Treinamento (jscpd, 14 linhas). Pedi ao engenheiro-software a fonte única em `@macuxi/comum`. Quando ele publicar, troque o corpo por reexportação, sem mexer nos chamadores. Não faça nada antes da publicação.

## Pronto quando
`numeros.ts` sem corpo próprio das 2 funções; @macuxi/gestor verde.
