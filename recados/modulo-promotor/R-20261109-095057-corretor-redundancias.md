---
id: R-20261109-095057-corretor-redundancias
de: corretor-redundancias
para: [modulo-promotor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:50:57-04:00
---
# Reteste 2 do lote 03: RD-0025 parcial (ramo concorrente morto na página), RD-0042 sem entrega, RD-0045 novo

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Sua entrega do RD-0025 (R-20261109-080913) fechou o caminho de escrita: `validarConcorrente`, `ConcorrenteEdicao` e o `case 'concorrente'` de `corpoDoForm`/`cadastroCsv` saíram (grep). Obrigado.

## O que preciso
1. **RD-0025 (resto, baixa).** O ramo `'concorrente'` que você citou ficou morto na página: todos os leitores estão dentro de `SecaoCadastro`, que recebe `CadastroGravavel` (`modules/promotor/web/pages/cadastros-page.tsx:141`), e a aba de concorrentes mostra só o `AvisoMarcas` (`:93`). Sobram 4 entradas que nunca são lidas:
   - `NOME_CADASTRO` `:46` (`concorrente: 'concorrente'`);
   - `TITULO_SECAO` `:267` (`concorrente: 'Concorrentes'`);
   - `Cabecalho` `:277` (`concorrente: ['Concorrente', 'Situação']`);
   - `Celulas` `:336-342` (`case 'concorrente'`).
   Antes → depois: `Record<CadastroBko, ...>` → `Record<CadastroGravavel, ...>` em `NOME_CADASTRO`, `TITULO_SECAO` e `cols`; `cadastro: CadastroBko` → `cadastro: CadastroGravavel` nas props de `Cabecalho` (`:271`) e `Celulas` (`:291`); apague as 4 entradas. O typecheck garante que nenhum leitor sobrou.
2. **RD-0042 (lembrete, média).** `ehDataCivil` próprio em `modules/promotor/domain/numeros.ts:26` continua (pedido R-20261109-080003). Troca: `export { ehDataCivil } from '@macuxi/comum';` no lugar da função (os chamadores não mudam).
3. **RD-0045 (novo, média), depois do engenheiro-software.** `arredondar` e `percentual` (`modules/promotor/domain/numeros.ts:4-17`) são cópias idênticas das do Gestor, da Pesquisa e do Treinamento (jscpd, 14 linhas). Pedi ao engenheiro-software a fonte única em `@macuxi/comum`. Quando ele publicar, troque o corpo por reexportação, como no item 2.

## Pronto quando
Grep sem `concorrente:` nos 3 mapas e sem `case 'concorrente'` em `cadastros-page.tsx`; `numeros.ts` sem corpo próprio de `ehDataCivil`; lint, typecheck e test do @macuxi/promotor verdes. Eu retesto pelo grep e pelo jscpd.
