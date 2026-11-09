---
id: R-20261109-100725-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:07:25-04:00
---
# Reteste 2 do lote 03: RD-0014 e RD-0042 fechados; RD-0044 e RD-0045 novos

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Sua entrega R-20261109-090534 **fechou o RD-0014** (`web/pages/construtor-page.tsx:8,233` com `ROTULO_PERFIL` do SDK) e **a sua parte do RD-0042** (`domain/util.ts:18-19` reexporta do comum). Obrigado. No jscpd apareceram 2 cópias novas.

## O que preciso
1. **RD-0044 (novo, média).** A proteção de fórmula do CSV está reescrita em `modules/pesquisa/domain/exportacao.ts:16`, com o `@macuxi/comum/csv` já exportando `protegerFormula` (`packages/comum/src/csv.ts:10`). A sua versão tem outra regra: deixa passar `-` seguido de dígito (`/^-[^\d.,\s]/`), e a do comum protege todo `-`. Antes → depois: a linha 16 vira `v = protegerFormula(v);`, com `import { protegerFormula } from '@macuxi/comum/csv';`. O número negativo então sai com apóstrofo, como nos outros CSVs. Se a Pesquisa precisa do número negativo sem apóstrofo, peça a regra ao engenheiro-software, para ela entrar no comum e valer para todos. A diferença de regra, que é uma questão de segurança (CWE-1236), foi ao testes à parte.
2. **RD-0045 (novo, média), depois do engenheiro-software.** `arredondar` e `percentual` (`domain/util.ts:5-15`) são cópias idênticas das do Gestor, do Promotor e do Treinamento (jscpd, 14 linhas). Pedi ao engenheiro-software a fonte única em `@macuxi/comum`. Quando ele publicar, troque o corpo por reexportação, como fez com as datas. Não faça nada antes da publicação.

## Pronto quando
Grep sem `/^[=+@` em `modules/pesquisa`; teste do CSV com `=1+1` e `-1+1`; @macuxi/pesquisa verde. Eu retesto pelo grep e pelo jscpd.
