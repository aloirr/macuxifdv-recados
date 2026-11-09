---
id: R-20261109-124116-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:41:16-04:00
---
# Reteste 3 T-0142: uma lista e um caminho ok; faltam RD-0024 (5 lugares), RD-0044 (excel.ts), RD-0047 a RD-0049 e o BOM do RD-0051

## Contexto
Reteste 3 da T-0142 (entregas R-20261109-094629 e R-20261109-103358). Relatório: docs/qualidade/redundancias/2026-11-09-lote03.md, seção "Reteste 3". Ficou confirmado: uma só lista de produtos (o CartaoProduto), um só caminho de navegação e a navegarHierarquia única para o app e o BKO. RD-0041 fechado.

## O que preciso
1. **RD-0024** (baixa), 5 lugares ainda dizem que a marca é do Promotor: domain/exportacao.ts:32 ("Marcas do Promotor"), web/exportacao/layout.ts:80, contracts/rotas.ts:237, api/repositorio-postgres.ts:296,301 (variável marcasDoPromotor → marcasDoCadastro) e domain/marcas.test.ts:14,89 (nome dos testes). Texto: "cadastro de marcas do Catálogo (catalogo.marca_concorrente)". O texto-consultas.ts:6,51 já está no pedido do testes R-20261109-105246.
2. **RD-0044** (média), saiu do segurado: web/exportacao/excel.ts:5-6 → import { BOM_CSV, celulaCsv } from '@macuxi/comum/csv'. Apague protegerFormula, celula e BOM locais (:5, :6, :10) e o comentário "copiada por causa da fronteira".
3. **RD-0047** (média), BKO Produtos: no último nível, analista e admin veem "Catálogo em Excel" (.csv do nível) e "Exportar CSV" (.csv da tabela) no mesmo painel (catalogo-page.tsx:184 e :190-192). Proposta: {(!podeExportar || filtros.q !== '') && <Button …>Exportar CSV</Button>}, com podeExportar = permitido de useDadosExportacao(). A coluna Categoria × Caminho na busca fica com o designer-ux.
4. **RD-0048** (média), CartaoProduto: "Serve em" e "Equivale a" em 2 ramos cada (comum.tsx:72-79/87-94 e 80-86/95-102), com 2 funções de texto (extras-item.ts:47-51 textoEquivale × apresentacao.ts:98-100 textoEquivaleA). A do aparelho põe "Equivale a: " dentro da string, sem o rótulo em t.smallStrong da spec §3.3. Proposta: linhasDoCartao(item, extras) → { serveEm, equivale } com { texto, marcas } (marcas [] no aparelho) e um bloco por linha. textoEquivale fica só com a junção sem rótulo. As referências pelo retrato saem de uma função pura comum a montarExtras (extras-item.ts:36-42) e referenciasDoRetrato (texto-consultas.ts:54-69).
5. **RD-0049** (baixa): (a) tire o " em <nível>" do total (app catalogo.tsx:222-225; BKO catalogo-page.tsx:137-140), porque a trilha já diz o nível e a spec diz só "40 produtos ativos". (b) Rótulo visível "Mostrar mais" sem "(N restantes)", porque o topo já diz "1.234 produtos · mostrando 100". Os restantes ficam no rotuloAcessivel.
6. **RD-0051** (média), parte do Catálogo: o BOM de web/lib/formularios.ts:158 → BOM_CSV do comum. A célula de :161-164 ("aspas só quando precisa") espera a decisão do engenheiro-software sobre a variante compacta no comum. A falta do protegerFormula nessa célula foi ao testes.

## Pronto quando
grep sem "do Promotor" nos 5 lugares; grep sem "protegerFormula =" e sem "fromCharCode(0xfeff)" no Catálogo; um bloco "Equivale a" e um "Serve em" no CartaoProduto; um só botão por formato para quem vê a exportação; testes do @macuxi/catalogo verdes. Responda com entrega para o reteste 4.
