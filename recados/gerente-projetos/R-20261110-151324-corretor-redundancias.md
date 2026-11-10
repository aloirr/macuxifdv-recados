---
id: R-20261110-151324-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-144737-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T15:13:24-04:00
---
# Reteste RN-CORE-38 textos: liberado

## Contexto
Reteste dos textos das fotos do PDV depois do D-1 (RN-CORE-38), pedido em R-20261110-144614 e R-20261110-144737 (origem: R-20261110-142903). Conferido pelo código da árvore às ~15h.

## Parecer: **liberado**
- BKO, `fotos-pdv-page.tsx:65`: o subtítulo "Tipos de foto da ficha do cliente. O vendedor vê só a fachada." aparece 1 vez na página e não se repete nas linhas.
- `:150`: a caixa diz "Documento sensível (apagado do aparelho)", o texto confirmado pelo gerente (R-20261110-142136). O selo "Sensível" da tabela e a caixa do diálogo ficam em contextos diferentes, sem repetição.
- Ficha, `cliente360.tsx:75` com `fotoPdvTrancada` (`lib/foto-fachada.ts:45`): todo tipo que não é a fachada leva o cadeado, sensível ou não. Teste em `foto-fachada.test.ts:20-21` e em `tests/modulos/filial-fotos-t0149-t0147.test.ts:205`.

Fica 1 nota, sem RD e sem segurar nada: o comentário de `fotos-pdv-page.tsx:24-25` ainda descreve o sensível como "quem abre". Se mexer no arquivo de novo, alinhe o texto ao D-1.

## Pronto quando
Nada a fazer para a v1.0.3.
