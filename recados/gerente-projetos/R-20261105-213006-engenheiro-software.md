---
id: R-20261105-213006-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:30:06-04:00
---
# T-0084/T-0085 passo 1: desenho, contratos aditivos e ADR 0027 (marcas concorrentes no Core); ordem e lotes

## Contexto
Entrega do passo 1 das T-0084 e T-0085: o desenho curto e os contratos. Todos os contratos são aditivos, e só uma ADR é nova.

**Arquivos (todos meus):**
- `docs/desenho/T-0084.md`;
- `docs/desenho/T-0085.md`;
- `docs/decisoes/0027-marcas-concorrentes-no-core.md` (proposta) e a linha no `docs/decisoes/README.md`;
- `.coord/contratos/modulos.md`: 3 consultas novas e 4 linhas de entidades e campos;
- `.coord/contratos/eventos.md`: aditivos em `integracao.produto.atualizado@1` e `vendedor.pedido.aprovado@1`.

Só mexi em markdown, então não há código a passar por lint, typecheck ou testes. O `verificar engenheiro-software` deu OK, sem violação.

## O que foi decidido
1. **Onde ficam os dados:**
   - **aplicação:** na coluna que já existe, `catalogo.produto_conteudo.aplicacoes` (é o `applications` do contrato). Nada muda no Core.
   - **hierarquia sistema › grupo › linha:** já existe; é a árvore `catalogo_no` (T-0061), reaproveitada.
   - **oferece junto:** `produto_relacao` com tipo complementar, no máximo 5.
   - **referência cruzada:** tabela nova `catalogo.produto_referencia`, com até 3 por produto.
2. **`expandirAplicacao`** fica no domain do Catálogo. O desenho tem a tabela de casos: Uno 2012 sim, 2015 não, Gol 2014 sim, "1.0/1.4" e "G5/G6" nunca, as cinco formas de faixa, faixa aberta, invertida, mais de 40 anos e lista com "/".
   - O ano da consulta vira filtro só quando a aplicação tem ano. Assim, o tenant sem aplicação fica igual.
   - O que casa pelo nome vem antes do que casa só pela aplicação (`so_aplicacao`).
   - A linha "Serve em" sai pelo `trechoServeEm`: até 90 caracteres, termos marcados e `inclui_ano`.
3. **Índices:**
   - servidor: `produto_busca.aplicacao` com peso C;
   - aparelho: FTS v3 com `aplicacao` (peso 2) e `referencias` (peso 8). O SDK reindexa sozinho;
   - `PESO_CAMPO.aplicacao` vem de `peso_aplicacao`.
4. **Código do concorrente:** usa o `codigoCompacto` que já existe, mais n-gramas de até 3 palavras. Assim "cb 3401" acha "CB3401" e o contrário.
5. **ADR 0027:** as marcas concorrentes vão para o **Core**, copiadas de `promotor.concorrente` com os mesmos ids. O motivo é a licença: o Core está sempre ativo, e o tenant de autopeças sem Promotor também precisa das marcas. A ADR 0025 proíbe o contorno.
6. **Retrato no pedido:** `retratoAplicacao` no domain do Vendedor. A API corta de novo, mas não troca o texto pelo cadastro: o retrato é o que o cliente viu.

## O que preciso de você
1. **De acordo na ADR 0027**, que ainda está proposta.
2. **Ficha da T-0085:** incluir **modulo-core** (K1–K3) e acrescentar o lote 2 do **modulo-promotor**. Os dois receberam pedido.
3. **Doc 06 (seu):** os campos que estão em C1, C10–C14 (T-0084) e K11 (T-0085).
   - Atenção: no ERP, a marca da referência vai como `marca_external_id` ou `marca_nome`, **não** `marca_id`. O ERP não conhece os UUIDs do Macuxi (RN-INT-04).
4. **Doc 03:** acrescentar à RN-CAT-09 a frase "oferece junto: até 5 produtos" (premissa P4). O erro sai com o código `RN-CAT-09`.
5. **Confirmar com o Alexandre:**
   - P1: a v1 não cria marca pelo ERP; marca desconhecida vira aviso;
   - P2: "Excel" é CSV para o Excel, porque `.xlsx` pede uma ADR de dependência;
   - P3: a referência cruzada não entra no retrato do pedido.

## Ordem e lote previsto
- **Lote 1, em paralelo agora:**
  - banco-dados: migração 0033, aparelho v3 e seed;
  - modulo-core: contrato das marcas;
  - modulo-catalogo, modulo-vendedor e modulo-integracao: contracts e domain, com os testes;
  - designer-ux: especificação.
- **Lote 2, depois da 0033 e dos contracts:**
  - API e app do Catálogo (busca, ficha, aba por linha, BKO, exportação e consumidor do ERP);
  - Vendedor (seletor, caixa, retrato e PDFs);
  - Hub (corte, avisos e marca);
  - Promotor (lê do Core);
  - página do BKO do Core.
- **Lote 3:**
  - revisão das telas pelo designer-ux e pelo engenheiro-apps, que também mede a reindexação v3 e o p95 com 20 mil produtos;
  - testes dos critérios;
  - minha revisão final.

**Recados enviados:** R-20261105-212656 (banco-dados), 212719 (catalogo), 212739 (vendedor), 212754 (integracao), 212827 (core), 212831 (promotor), 212836 (designer-ux), 212839 (engenheiro-apps) e 212843 (aviso a todos).

## Pendências
- **No servidor**, o ano dentro de faixa só vale depois do comando `catalogo reindexar` do modulo-catalogo. No aparelho já sai certo.
- **Na minha caixa** ficam os itens antigos que exigem ação (28, de T-0005 a T-0074). Não tratei nesta rodada, porque a prioridade era este desenho.

## Pronto quando
De acordo na ADR 0027, a ficha da T-0085 com modulo-core e modulo-promotor, e o doc 06 atualizado.
