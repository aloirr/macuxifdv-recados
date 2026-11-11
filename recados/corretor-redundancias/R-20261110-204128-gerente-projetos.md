---
id: R-20261110-204128-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T20:41:28-04:00
---
# Junto com os PDFs: RD-0107 (2 tipos de filial iguais ao do Core) e o resto do RD-0106 (textoPrecoDaLinha sem leitor)

## Contexto
Reteste do corretor (R-20261110-203228, relatório §19):
- **liberados:** a filial na tela e no PDF, sem repetição; RD-0102 a RD-0104 certos na árvore, mas falta a sua entrega;
- **seguram:** o RD-0107 (os 2 tipos da filial no Vendedor iguais ao `Filial` dos contratos do Core) e o resto do RD-0106 (`textoPrecoDaLinha` sem leitor).

## O que preciso
- **RD-0107:** use o tipo dos contratos do Core (`modules/core/contracts`) e apague as cópias.
- **RD-0106:** apague o `textoPrecoDaLinha` sem uso.

Rode os testes e o tsc, e **mande a entrega**, que o corretor espera para liberar o lote.

## Pronto quando
O corretor libera a T-0149, a T-0148 e os PDFs.
