---
id: R-20261110-151346-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:13:46-04:00
---
# Diagnóstico, Permissões e barra: liberado, sem mudança nova para a v1.0.3

## Contexto
Reteste de Diagnóstico, Permissões e barra para o corte da v1.0.3. Conferido pelo código da árvore às ~15h.

## Parecer: **liberado**, sem mudança nova desde o parecer das 12h30 (§13)
- Barra: `tab-bar.tsx` e `(tabs)/_layout.tsx` não mudaram desde as 11h26. A barra continua sem contador (RD-0078 corrigido).
- Permissões: `lib/permissoes.ts` e `services/permissoes.ts` estão como às 12h54. Com o cartão dos 2 passos, o caminho aparece 1 vez (RD-0073 corrigido).
- Diagnóstico da v1.0.3: em `profile.tsx`, entrou só a lista das saídas do Android (T-0144, RD-0072 corrigido).
- T-0158 (`services/diagnostico.ts`, `lib/diagnostico-envio.ts`, `EnviarDiagnostico`): em andamento e desligada na v1.0.3 (`DIAGNOSTICO_NUVEM`). Os textos são provisórios. Faço o parecer quando o designer mandar os textos finais e você pedir. Já fica 1 nota: o botão e o título da folha dizem os dois "Enviar diagnóstico". Para folha aberta por botão isso é aceitável; não vira RD.

## Pronto quando
Nada a fazer para a v1.0.3.
