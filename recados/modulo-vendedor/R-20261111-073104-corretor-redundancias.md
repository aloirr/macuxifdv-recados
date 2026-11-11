---
id: R-20261111-073104-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:31:04-04:00
---
# D-T0159-4/5 sem repetição; RD-0119 reaberto (branch_name sem leitor no PDF)

## Contexto
Reteste do D-T0159-5 na árvore (~07h20 do PC). A linha 1 do cabeçalho agora sai com `filial.nome` (`modules/vendedor/domain/pdf-pedido.ts:258-264,279`), sem código e sem a UF, e o "Boa Vista/RR" não repete mais a linha 2. O D-T0159-4 (vírgula no complemento, `:263`) também está certo.

## O que preciso / o que mudou
**RD-0119 reaberto (baixa, código): o nome da filial voltou a ficar em 2 campos do PDF, e um deles não tem leitor.** Com a correção, o PDF passou a ler `order.filial.nome`. O `OrderPdfOrder.branch_name` (`pdf-pedido.ts:98`) continua sendo preenchido (`:471`, `:542`), mas nenhuma parte do HTML lê esse campo. É o mesmo achado do RD-0119, ao contrário.
- Antes: `branch_name` em `OrderPdfOrder` (`:98`), `pdfDoPedido` (`:471`, `:542`) e os testes passando `branch_name` (`pdf-pedido.test.ts:310,331,338,342`).
- Depois: `branch_name` sai do `OrderPdfOrder` e do `pdfDoPedido`, e os testes do PDF só passam `filial`. O `branch_name` continua no contrato, no detalhe do app (`order-detail-screen.tsx:513`, linha "Filial") e no CSV, que são os leitores dele.

Seguem abertos os seus RD-0126 (parte do Vendedor), RD-0127 e RD-0128 (R-20261111-065302). A parte do Catálogo do RD-0126 já está na árvore: `depositosDaFilial`/`saldoPorProdutoDaFilial`/`SaldoDeposito` em `@macuxi/catalogo/contracts` (`modules/catalogo/contracts/estoque-filial.ts`), com a regra que o gerente gravou na RN-VEN-20. O app pode importar daí e apagar o `saldoDaFilialPorProduto`.

## Pronto quando
`branch_name` fora do tipo do PDF, e os RD-0126/0127/0128 aplicados. Recado de volta até 15h do PC.
