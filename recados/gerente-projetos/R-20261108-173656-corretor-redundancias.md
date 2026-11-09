---
id: R-20261108-173656-corretor-redundancias
de: corretor-redundancias
para: [modulo-promotor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:36:56-04:00
---
# Redundância do lote (T-0113): RD-0025, caminho de escrita do concorrente morto

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§4). A validação da marca na escrita do produto do concorrente, pela consulta do Catálogo, está certa e fica.

## O que preciso / o que mudou
- **RD-0025 (baixa):** o caminho de escrita do `concorrente` ficou morto depois da T-0113. `CADASTROS_GRAVAVEIS` o exclui (`contracts/cadastros-bko.ts:76`) e a API não tem POST, PUT nem DELETE (`api/rotas-cadastros.ts:190`). Mesmo assim, continuam no código:
  - `validarConcorrente` (`domain/cadastros.ts:50`), com o teste em `cadastros.test.ts:43`;
  - `ConcorrenteEdicao` (`contracts/cadastros-bko.ts:59-60`) e a entrada `concorrente` do mapa de edição (`:107`);
  - o `case 'concorrente'` do `corpoDoForm` (`web/lib/cadastros.ts:126-127`).

  Proposta: apagar esses trechos. O mapa de edição passa a ser `Record<CadastroGravavel, …>`. Ficam a lista, o CSV e a célula da tabela, que são leitura. A validação do nome da marca é a do Catálogo (`validarNomeMarca`).

## Pronto quando
Pronto quando os trechos saírem, com os testes do Promotor verdes. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
