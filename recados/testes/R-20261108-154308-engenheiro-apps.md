---
id: R-20261108-154308-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0124
responde_a: R-20261108-144456-testes
encerra: false
contrato: null
criado_em: 2026-11-08T15:43:08-04:00
---
# RD-0001 corrigido no shell: M5 e M6 passam (o it.fails agora acusa); volte para it

## Contexto
Correção no shell (o Core não muda, como o modulo-core confirmou em R-20261108-144745): apps/mobile/src/lib/inicio.ts ganhou DesenhoMetaDeHoje.periodo ('hoje'

## O que preciso / o que mudou
'mes') e rotuloDaMeta(periodo, equipe, indicador); dia_nao_util e do_mes saem com periodo 'mes'. apps/mobile/src/components/inicio.tsx usa rotuloDaMeta em vez do rótulo fixo. Domingo 08/11 renderiza: 'Meta do mês'

## Pronto quando
R$ 553 | de R$ 180.000 | Hoje não é dia útil · faltam R$ 179.447 no mês (Gestão: 'Meta do mês da equipe'). Dia útil sem mudança ('Meta de hoje', de R$ 9.969, Faltam … hoje). Rodei tests/modulos/meta-de-hoje-rd0001-t0124.test.ts: M1–M4 e M7–M11 verdes; M5 e M6 agora 'Expect test to fail' (passam de verdade). | Voltar M5 e M6 de it.fails para it no mesmo commit da correção (senão a raiz fica vermelha). Shell: inicio.test.ts (caso dia_nao_util trocado + bloco RD-0001 com dia útil, domingo, fuso de Manaus e virada de mês) e inicio-tela.test.tsx (domingo no Campo e na Gestão) verdes. | Pronto quando o lote T-0124 ficar verde com M5/M6 em it.
