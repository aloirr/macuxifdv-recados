---
id: R-20261105-212719-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:27:19-04:00
---
# T-0084/T-0085: contracts, expandirAplicacao/trechoServeEm, ranking com aplicação e referências, consultas textos_produto@1 e busca_produtos@1

## Contexto
Os desenhos estão em `docs/desenho/T-0084.md` (aplicação e busca, RN-CAT-11/12) e `docs/desenho/T-0085.md` (referência cruzada, oferece junto, etiquetas e exportação; RF-CAT-09, RN-CAT-09/10). A ADR 0027 (proposta) põe as marcas concorrentes no Core: `core.marcas_concorrentes@1` e a entidade `marca_concorrente`. O Catálogo é o maior dono das duas tarefas.

## O que preciso
**Lote 1 — contracts e domain, testes antes, citando a RN**
1. **Contracts:**
   - T-0084: C3 (`ProdutoConteudoSyncSchema.aplicacao?`), C4 (`peso_aplicacao` 0..1 = 0,5 e `aplicacao_max_cadastro` 100..2000 = 2000), C5 (`ConteudoProduto.aplicacao`), C6 e C7 (`ItemVitrine.serve_em`, `TrechoBusca`);
   - consultas novas `catalogo.textos_produto@1` (C8) e `catalogo.busca_produtos@1` (C9), com a implementação na API e no aparelho;
   - T-0085: K4–K10 e K13 (`produto_referencia`, `Referencia`, `EquivaleA`, `ItemVitrine.equivale_a`, `FichaProduto.catalogo`, `SalvarCadastroCatalogo` + `PUT produtos/:id/cadastro-catalogo`, `GET exportacao`);
   - `etiquetas?` no `ProdutoConteudoSyncSchema`.
2. **`domain/aplicacao.ts`:** `expandirAplicacao` (T-0084 §3, com a tabela de casos) e `trechoServeEm` (§5).
3. **`domain/ranking.ts`** (T-0084 §4 e T-0085 §2):
   - `DocBusca.aplicacao` e `referencias`;
   - `PESO_CAMPO.aplicacao` = `peso_aplicacao`;
   - ano da consulta como filtro só quando a aplicação tem ano;
   - `so_aplicacao` na ordenação;
   - `codigosDaConsulta` (n-gramas compactos) e `referencia_casada`;
   - `rankear` com `anoAtual` obrigatório.
4. **`domain/cadastro-catalogo.ts`:** `validarCadastroCatalogo` (T-0085 §4).
5. **Garantia de critério 4:** `relevancia-demo.test.ts` igual com `aplicacao: ''`.

**Lote 2 — API e app**
1. **Busca e índice:**
   - provedores do pull (`aplicacoes → aplicacao`, `produto_referencia`);
   - `app/indice.ts`: pesos `aplicacao: 2` e `referencias: 8`; fontes `produto_conteudo` e `produto_referencia`; `codigos` com as referências compactas;
   - `produto_busca`: `aplicacao = textoIndice`, `referencias` e `conteudo` sem a aplicação;
   - comando `catalogo reindexar`;
   - busca do servidor e local com `serve_em` e `equivale_a`, com o achado exato por `codigo_compacto` (servidor) e pela coluna `codigos` (FTS).
2. **Consumidor de `integracao.produto.atualizado@1`:**
   - aplicação: corta de novo se o parâmetro for menor;
   - referências: marca por `core.marcas_concorrentes@1`; a desconhecida fica de fora;
   - oferece junto: substitui os complementares; produto ausente lança `ReferenciaAusenteErp`;
   - etiquetas.
3. **Telas e BKO:**
   - ficha com a seção Catálogo;
   - lista por linha na aba Catálogo (a árvore `catalogo_no` já existente: sistema › grupo › linha);
   - seção Catálogo no BKO com auditoria;
   - exportação PDF (HTML + impressão) e CSV para o Excel.
4. **Intérprete e manifesto:**
   - o intérprete por regras e o prompt do LLM mantêm modelo, motor e ano no `text` (§8);
   - manifesto com `usaConsultas` + `core.marcas_concorrentes@1` e `ofereceConsultas` com as duas consultas novas.

## Pronto quando
- Lote 1:
  - contracts e domain com testes verdes, incluindo os casos da ficha: "pastilha uno 2012", "2015", "gol 2014", "1.0/1.4", "G5/G6", "cb3401" e os limites 3 / 30 / 5;
  - lint e typecheck verdes;
  - recado ao modulo-vendedor e a mim quando C8 e C9 estiverem no `contracts`.
- Lote 2:
  - critérios 3, 4, 5 e 8 da T-0084 e 4, 6, 7 e 8 da T-0085 demonstrados;
  - entrega ao gerente.
