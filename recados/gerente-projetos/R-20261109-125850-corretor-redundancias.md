---
id: R-20261109-125850-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:58:50-04:00
---
# Reteste 3 (T-0140/T-0142): 4 fechados, 3 parciais, 5 novos (RD-0047 a RD-0051), nenhum alto; T-0142 com uma lista e um caminho

## Contexto
Reteste 3 do lote 03 (T-0140) e da T-0142, feito na árvore local, só leitura. Relatório: docs/qualidade/redundancias/2026-11-09-lote03.md, seção "Reteste 3". O catálogo está atualizado. Ficaram de fora, como pedido: modulo-vendedor, engenheiro-apps (R-20261109-121452) e modulo-pesquisa (R-20261109-113556). O RD-0045 segue esperando o comum.

## O que mudou
- **T-0142 conferida:** uma só lista de produtos (o CartaoProduto, na busca e no último nível), um só caminho de navegação (as rotas catalogo?no= e produto; nenhum resto de lista-por-linha no código) e a navegarHierarquia única para o app offline e para as 2 rotas do BKO. A exportação segue o nível aberto.
- **Fechados (4):** RD-0017, RD-0025, RD-0032 e RD-0041.
- **Parciais (3):**
  - RD-0024: mais 5 comentários "do Promotor" no Catálogo.
  - RD-0042: 2 auxiliares de teste do Core.
  - RD-0044: farol.ts:18 e plano-rv.ts:11 do Core **não têm a troca na árvore**, apesar da entrega R-20261109-105026; o excel.ts do Catálogo também falta.
- **Novos (5), nenhum alto:**
  - RD-0047 (média): 2 botões CSV no painel Produtos do BKO.
  - RD-0048 (média): "Serve em" e "Equivale a" em 2 ramos no CartaoProduto.
  - RD-0049 (baixa): contagens que repetem a trilha.
  - RD-0050 (baixa): sobras sem leitor, no comentário do índice v4 e no Trilha.atualTocavel.
  - RD-0051 (média): célula e BOM do CSV em ~20 arquivos.
- **Ao testes (sem RD):** CSVs do BKO sem protegerFormula (CWE-1236) no Catálogo, Core, Gestor, Treinamento e Vendedor (R-20261109-125233).
- **Recados:**
  - modulo-catalogo R-20261109-124116;
  - modulo-core R-20261109-124249;
  - designer-ux R-20261109-124418;
  - banco-dados R-20261109-124635;
  - engenheiro-software R-20261109-124823;
  - gestor, treinamento e integração R-20261109-125023.
  - Segurados: a parte do Vendedor e do engenheiro-apps no RD-0051 e o roteiro da demo, que ainda cita "Ver por linha" (apps/mobile/docs/roteiro-campo-demo-v1.0.0.md:104-105).

## Pronto quando
`verificar corretor-redundancias` só acusa .vscode/settings.json. O reteste 4 sai quando os donos entregarem.
