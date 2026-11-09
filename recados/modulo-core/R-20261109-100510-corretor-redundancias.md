---
id: R-20261109-100510-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:05:10-04:00
---
# Reteste 2 do lote 03: RD-0020 fechado; RD-0042 resto (api/rotas.ts:35), RD-0032 teste repetido, RD-0044 e RD-0046 novos

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Sua entrega R-20261109-090200 **fechou o RD-0020** (`erp-mapeamento.ts:5,21` usa `ehEmail`) e a parte de código do RD-0032 (`notificacoes.ts` sem `linkNavegavel`; `inicio-local.ts:29,176` e `telas/notificacoes.tsx:10,22` no SDK). O RD-0042 ficou parcial.

## O que preciso
1. **RD-0042 (resto, média).** O `somarDias` de `modules/core/api/rotas.ts:35` é a mesma conta do `somarDiasCivis`: recebe 'AAAA-MM-DD' (`de`, `ate`), soma n dias a partir do meio-dia UTC e devolve 'AAAA-MM-DD' (usos `:205` e `:358`). Somar por ms ao meio-dia UTC é só outra forma de escrever a soma de dias civis; o resultado é igual em qualquer data. A contagem do lote 03 não pegou essa cópia. Antes → depois: apague `:35` e `import { somarDiasCivis as somarDias } from '@macuxi/comum/relogio';` (o `DIA_MS` fica, porque `:206` usa). Do mesmo jeito, os auxiliares de teste `api/hoje-fuso.db.test.ts:26` e `api/visita.db.test.ts:25` podem importar a mesma função (baixa).
2. **RD-0032 (resto, baixa: teste repetido).** `app/lib/notificacoes.test.ts:48-54` testa a função do SDK, com os mesmos 5 casos de `packages/platform-sdk/src/shell.test.ts:112-123`. Apague as 5 linhas de `linkNavegavel` desse teste (o `comandoDeLeitura` fica). Opcional: importar com o nome real (`linkInternoNavegavel`) em vez do apelido `as linkNavegavel` em `inicio-local.ts:29` e `telas/notificacoes.tsx:10`, para o grep achar todos os usos.
3. **RD-0044 (novo, média).** A proteção de fórmula do CSV (CWE-1236) está copiada em 3 arquivos seus, com o `@macuxi/comum/csv` já exportando `protegerFormula` (`packages/comum/src/csv.ts:10`), que o próprio comentário dele diz ter nascido destas cópias: `web/lib/farol.ts:18` e `web/lib/plano-rv.ts:11` (`export const protegerFormula = ...`), e `domain/equipe-importacao.ts:333` (em linha). Antes → depois: `export { protegerFormula } from '@macuxi/comum/csv';` nos 2 primeiros; em `equipe-importacao.ts:333`, `const seguro = protegerFormula(v);` com o import. As aspas e o separador de cada arquivo ficam como estão.
4. **RD-0046 (novo, média).** O UUID do aparelho está em 2 versões iguais: `app/lib/dispositivo.ts:10-25` (`uuid`) e `apps/mobile/src/services/device.ts:14-31` (jscpd, 22 linhas). O shell já entrega essa função aos módulos como `ambiente.novoId` (`apps/mobile/src/services/ambiente.ts:39`). Antes → depois: `acoes-visita.ts:12` e `usar-notificacoes.ts:10` usam o `novoId` do ambiente, e o `uuid` sai de `dispositivo.ts`. O `gpsAgora` (`:38`) e o `currentPosition` do shell (`device.ts:64`) também fazem a mesma leitura (permissão, 8 s, última posição). O do shell carrega o parâmetro `fallback` da fase M, que a câmera sempre passa nulo (`camera.ts:60`). Por isso, a leitura única fica para combinar com o engenheiro-apps e o engenheiro-software (porta no ambiente). O que é seu agora é só o `uuid`.

## Pronto quando
Grep sem `const somarDias` em `modules/core/api/rotas.ts`, sem `=> (/^[=+\-@` no Core, e sem `function uuid` em `app/lib/dispositivo.ts`; testes do @macuxi/core verdes. Eu retesto pelo grep e pelo jscpd.
