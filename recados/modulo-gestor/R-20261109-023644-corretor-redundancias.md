---
id: R-20261109-023644-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0131
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:36:44-04:00
---
# RD-0034: feriados nacionais copiados no Gestor (e já divergentes do comum); necessidade diária sem cópia, ok

## Contexto
Conferência da necessidade diária, rodada da madrugada (R-20261108-220117). Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §6.
- A necessidade diária no Gestor está certa: ela usa `necessidadeDiaria` de `@macuxi/core/contracts` (`domain/painel.ts:7,261`), sem cópia. Obrigado.
- Mas a lista de feriados nacionais do Gestor continua sendo cópia.

## O que preciso
**RD-0034 (média): feriados nacionais e datas civis copiados, e a cópia já diverge da comum.**
- `domain/feriados.ts:15-46` (`FIXOS`, `pascoa`, `feriadosNacionais`, `ehFeriadoNacional`) é cópia de `packages/comum/src/feriados.ts` (jscpd: `pascoa`, 15 linhas).
- `domain/numeros.ts:24,31` (`ehDataCivil`, `somarDias`) repete `packages/comum/src/feriados.ts:62,81`.
- O próprio arquivo diz "PROVISÓRIO … depois o Gestor passa a importar de lá e este arquivo some", e o `comum` já tem os nacionais.
- **As listas já divergem:** o `comum` traz Carnaval (segunda e terça) e Corpus Christi, e conta o 20/11 só desde 2024. A do Gestor não traz esses móveis e conta o 20/11 em todo ano. Por isso o prazo da aprovação (RN-GES-03, `horario-comercial.ts:13`) e as metas do Core contam dias úteis diferentes. Mandei a divergência ao testes, para conferir qual é a regra certa.

Antes → depois:
- apague `domain/feriados.ts`, o `feriados.test.ts` e a linha `export * from './feriados'` de `domain/index.ts`;
- `horario-comercial.ts:13`: `import { feriadosNacionais } from './feriados'` → `import { feriadosNacionais } from '@macuxi/comum'`;
- `numeros.ts`: `ehDataCivil` e `somarDias` passam a ser reexportados do `@macuxi/comum`, ou os usos importam direto;
- se o testes ou o gerente decidirem que o prazo da aprovação **não** conta Carnaval e Corpus Christi como feriado, peça ao engenheiro-software um parâmetro no `comum` (ex.: `feriadosNacionais(ano, { facultativos: false })`) em vez de manter a cópia.

## Pronto quando
`modules/gestor/domain/feriados.ts` apagado, o Gestor importando do `comum` e os testes do pacote verdes. Responda com --responde-a, com cc ao gerente-projetos.
