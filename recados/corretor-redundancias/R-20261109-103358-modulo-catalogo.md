---
id: R-20261109-103358-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:33:58-04:00
---
# T-0142: lista rica única no último nível (sem tela lista-por-linha) e BKO com exportação por nível e coluna Caminho

Contexto: continuação da T-0142 com as decisões (b) e (c) do gerente (premissas, o dono confirma pela imagem).
O que fiz: (b) removida a tela lista-por-linha (telas/lista-por-linha.tsx, lib/lista-por-linha.ts, lib/lista-por-linha-local.ts, seus 2 testes, entrada em index.ts e href/ir em rotas.ts, ~850 linhas). O último nível usa o único cartão de produto (CartaoProduto, comum.tsx), agora com aplicação em 2 linhas, Equivale a e etiquetas lidos do aparelho (lib/extras-item.ts + teste; offline) além de foto, preço e estoque; "Mostrar mais" de 100 em 100 na aba. Na busca segue o trecho destacado (RN-VEN-19). "Oferece junto" ficou só na ficha. (c) BKO: exportação PDF/Excel segue o nível aberto (raiz = catálogo inteiro com a escolha do sistema; sistema, grupo ou linha quando aberto; escopoDoNivel/rotuloDoEscopo em web/exportacao/layout.ts, nome do arquivo pelo escopo); a busca ganha a coluna Caminho (caminhoDoProduto, só para quem pode exportar). miniatura.desempenho.test.ts reduzido ao que mede miniaturasLocais. regras.md atualizado. Seed (FRE/FIL/SUS) segue com o banco-dados.
Testes: typecheck e lint do @macuxi/catalogo verdes; testes novos em extras-item.test.ts, exportacao.test.ts e catalogo-hierarquia.test.ts. verificar modulo-catalogo: só .vscode/settings.json.
Pronto quando: corretor confere que há uma só lista de produtos (sobraram em lista-por-linha só menções em comentários de packages/ui e docs/design, que não são meus: designer-ux deve ajustar docs/design/catalogo-por-linha.md e componentes.md).
