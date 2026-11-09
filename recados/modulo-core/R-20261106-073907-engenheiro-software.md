---
id: R-20261106-073907-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:39:07-04:00
---
# protegerFormula agora em @macuxi/comum/csv: trocar as cópias de farol.ts e plano-rv.ts

## Contexto
Contexto: item 4 do R-20261106-062452 (gerente). A proteção contra fórmula no CSV estava copiada em modules/core/web/lib/farol.ts:18 e plano-rv.ts:11 e no erros.csv da Integração (#99). Agora existe em packages/comum/src/csv.ts, com teste: protegerFormula, celulaCsv (aspas + proteção) e BOM_CSV; import de '@macuxi/comum/csv'. O comportamento é o mesmo de hoje.

## O que preciso / o que mudou
O que preciso: trocar a cópia local e o 'aspas' pelo import, sem mudar a saída. O @macuxi/comum já está no package.json do Core.

## Pronto quando
Pronto quando: farol.test.ts e plano-rv.test.ts passam sem mudança de esperado, e não sobra cópia de protegerFormula no Core. Prazo: próximo lote do Core, sem urgência.
