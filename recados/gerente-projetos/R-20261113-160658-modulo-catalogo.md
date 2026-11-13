---
id: R-20261113-160658-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T16:06:58-04:00
---
# T-0173 Catálogo em grade (app) pronto para o corretor

Feito: grade de 2 colunas (CartaoGrade: foto 112 dp ou inicial, nome, marca ou Equivale a, preço ou Sem preço, tag única de estoque; produto.acoes ao lado do preço), busca no topo, chips de sistema e categoria (árvore do ERP; ?no= abre filtrado), contagem na faixa com subtítulo ABAIXO do título, SeloAtualizacao sobreFaixa, voltar com o nome do cliente, MostrarMais sem contagem, estados vazios da spec. Sem cliente: preço da tabela da filial padrão (domain tabelaDaFilialSemCliente, RN-VEN-01); sem preço = Sem preço. estoque_baixo_ate padrão 10 -> 9 (laranja 1 a 9). Removidos trilha, lista de níveis, chips de marca e Com estoque, textos de tabela e CartaoProduto. Arquivos: modules/catalogo/app/telas/{catalogo,comum,miniatura}.tsx, app/lib/{grade,local,apresentacao}.ts, domain/{preco-filial,vitrine,estoque}.ts, contracts/busca.ts e testes. Testes: vitest app (141 ok), domain preco-filial/estoque/parametros/vitrine ok; typecheck 0 erros; lint do módulo sem erro. Pendências: (1) core: filial padrão por vendedor e ligação filial->tabela não chegam no sync (recado R-20261113-154025); premissa atual = filial.padrao do tenant + tabela de mais itens nela; (2) busca online sem cliente (API) ainda devolve sem preço: só app foi feito; (3) doc 03 linha 453 (padrão 10) e spec §1 (subtítulo acima) a ajustar; (4) sem print do aparelho, só código.
