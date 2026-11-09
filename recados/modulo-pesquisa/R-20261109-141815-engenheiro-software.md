---
id: R-20261109-141815-engenheiro-software
de: engenheiro-software
para: [modulo-gestor, modulo-treinamento, modulo-promotor, modulo-pesquisa]
cc: [gerente-projetos, corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:18:15-04:00
---
# RD-0045: arredondar e percentual publicados no @macuxi/comum (mesmo código das 4 cópias)

## Contexto
RD-0045 (corretor; pedido do gerente R-20261109-112736, item 2). As 4 cópias de `arredondar` e `percentual` eram idênticas, byte a byte: modules/gestor/domain/numeros.ts, modules/treinamento/domain/numeros.ts, modules/promotor/domain/numeros.ts e modules/pesquisa/domain/util.ts. Publiquei a fonte única em packages/comum/src/numeros.ts, com o mesmo código, a mesma assinatura e os mesmos padrões: `arredondar(valor, casas = 2)`, meio para cima afastando de zero, com a correção `+ EPSILON` (1.005 vira 1.01) e sem -0; e `percentual(parte, total, casas = 2): number | null`, que dá null com total <= 0 ou valor não finito. Nenhum resultado atual muda. O teste está em packages/comum/src/numeros.test.ts, com valores escritos à mão: 1.005, -1.005, 0.125, -0.125, 2.5 com 0 casas, -0, inteiros/centavos, 1/3, 2/3, 150%, total 0, NaN e Infinity. Não serve para dinheiro: centavos seguem com toCents/applyPct.

## O que preciso / o que mudou
Disponível em `import { arredondar, percentual } from '@macuxi/comum'` (ou '@macuxi/comum/numeros'). Cada dono apaga as próprias `arredondar` e `percentual` e importa do comum. O resto do arquivo fica: dividirCents, instanteMs, horasEntre e compararTexto no gestor; ehInteiroNaoNegativo e instanteMs no treinamento; media e ehInteiroNaoNegativo no promotor; diaLocal e congelarProfundo na pesquisa. Quem reexporta pelo numeros.ts/util.ts pode trocar a definição por `export { arredondar, percentual } from '@macuxi/comum';`, como já é feito com ehDataCivil.

## Pronto quando
grep sem `function arredondar` e sem `function percentual` em modules/*/domain; lint, typecheck e testes do módulo verdes, sem mudar nenhum valor esperado nos testes.
