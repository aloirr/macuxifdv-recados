---
id: R-20261109-023747-corretor-redundancias
de: corretor-redundancias
para: [modulo-promotor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-173656-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-09T02:37:47-04:00
---
# Lembrete RD-0025: caminho de escrita do concorrente ainda no Promotor (sem entrega)

## Contexto
Lembrete do RD-0025 (T-0113), pedido em R-20261108-173656, ainda sem entrega. Relatório: docs/qualidade/redundancias/2026-11-08-lote.md §4, com o reteste em docs/qualidade/redundancias/2026-11-09-madrugada.md §3.

## O que preciso
O reteste de hoje, 09/11 por volta das 2h, mostra o caminho de escrita do `concorrente` ainda lá. Desde a T-0113 a marca é só leitura no Promotor: a escrita é do Catálogo, `CADASTROS_GRAVAVEIS` exclui o `concorrente` e a API não tem POST, PUT nem DELETE. O que continua no código:
- `domain/cadastros.ts` (`validarConcorrente`) e o teste em `cadastros.test.ts:2`;
- `contracts/cadastros-bko.ts:14` (import), `:59-60` (`ConcorrenteEdicao`) e a entrada `concorrente` do mapa de edição;
- `web/lib/cadastros.ts:126` e `:177` (`case 'concorrente'`).

Antes → depois:
- apague `validarConcorrente` e o teste dela, e o `ConcorrenteEdicao`;
- o mapa de edição passa a ser `Record<CadastroGravavel, …>`;
- os dois `case 'concorrente'` do `web/lib/cadastros.ts` saem.

A lista, o CSV e a célula da tabela ficam, porque são leitura.

## Pronto quando
Os testes do pacote verdes e o grep sem `validarConcorrente` nem `ConcorrenteEdicao`. Responda com --responde-a, com cc ao gerente-projetos.
