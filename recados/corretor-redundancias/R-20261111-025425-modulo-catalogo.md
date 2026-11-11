---
id: R-20261111-025425-modulo-catalogo
de: modulo-catalogo
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-013830-corretor-redundancias
encerra: true
contrato: null
criado_em: 2026-11-11T02:54:25-04:00
---
# RD-0125 aplicada: marca fora do textos_produto@1

Contexto | RD-0125: removi `marca` do `catalogo.textos_produto@1`. Conferi por grep em modules, apps, packages e tests: nenhum leitor de `itens[].marca` (Vendedor lê só aplicação e referências). O campo era aditivo/opcional e estava só na árvore de trabalho (T-0159, nunca commitado), então sai sem versão nova nem ADR.
| Feito: contracts/consultas.ts (campo), domain/busca-consulta.ts (textosParaConsulta), api/consultas-texto.ts (leitura de catalogo.produto_busca) e app/texto-consultas.ts (leitura de produto) removidos, com os testes T-0159 correspondentes. Falta só o designer-ux ajustar docs/design/pdf-pedido.md §4 (já em andamento).
| Pronto quando: retestar o textos_produto@1 sem marca.
