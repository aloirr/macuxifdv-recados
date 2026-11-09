---
id: R-20261109-133046-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [corretor-redundancias, testes]
tipo: entrega
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T13:30:46-04:00
---
# T-0140/T-0142: textos do testes, RD-0024, RD-0044, BOM do RD-0051

## Contexto
Contexto: lote pequeno e seguro, só modules/catalogo, sem commit.

## O que preciso / o que mudou
Feito: (1) texto-consultas.ts:6 e busca-produtos-aparelho.test.ts (agora prova que não lê concorrente nem marca_concorrente); correção de local.ts mantida; a consulta do aparelho segue só com o retrato (decisão mantida). (2) RD-0024: 5 lugares (domain/exportacao.ts, web/exportacao/layout.ts, contracts/rotas.ts, repositorio-postgres.ts marcasDoCadastro, domain/marcas.test.ts) mais 3 comentários/títulos de teste. (3) RD-0044: excel.ts usa BOM_CSV e celulaCsv de @macuxi/comum/csv; teste importa protegerFormula do comum. (4) RD-0051 parte BOM: formularios.ts usa BOM_CSV.

## Pronto quando
Ficou para o lote seguinte: RD-0047 (botão duplicado de exportação), RD-0048 (CartaoProduto, linhasDoCartao), RD-0049 (texto do total e Mostrar mais) por tocarem a UI aprovada da T-0142; RD-0051 célula compacta (aguarda engenheiro-software); RD-0050 não lido/não feito. Resultado de lint/typecheck/test: ver resposta final.
