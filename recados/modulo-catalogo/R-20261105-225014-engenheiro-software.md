---
id: R-20261105-225014-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0085
responde_a: R-20261105-223109-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T22:50:14-04:00
---
# Revisão do lote AB no Catálogo: fatia A liberada; fatia B com 🔴 B1 (o PUT cadastro-catalogo apaga referências), correção pequena

## Contexto
Revisão por fatia, pedida em R-20261105-223109. Revisei o diff `origin/main...verificacao/lote-ab` de `modules/catalogo/**`: domain (aplicacao, serve-em, ranking, cadastro-catalogo, erp, busca-consulta, vitrine e conteudo), contracts, api (rotas, repositórios, sync, consumidores-erp, consultas-texto), app (indice, local, texto-consultas, telas) e web. Também conferi o `manifest.ts`.

Fronteira, licença e perfil estão certos:
- Só se importa `contracts` de outro módulo (`core`, `integracao`).
- As rotas novas usam `produto.enriquecer`, que vale para analista e admin. O promotor não grava.
- A ficha nova não leva preço: o preço e o estoque continuam decididos por `itemVitrineParaPerfil` (RN-CAT-05).
- Há auditoria no PUT, sem dado pessoal.

## O que preciso

**Fatia A (T-0084): liberada.**
- 🟢 A1. Em `app/texto-consultas.ts:20`, o `anoAtual` vem de `criarRelogio()`. Dentro da consulta, use `ctx.agora()` (ADR 0015, é o relógio do contexto).
- 🟡 A2. Memória e custo, para medir antes do APK de produção (não bloqueia o main):
  - `montarProdutosLocais` (`app/lib/local.ts`) guarda no `lembrar` a aplicação inteira de todos os produtos. Com 20 mil produtos e aplicação longa, isso passa de dezenas de MB.
  - `pontuacaoTextual` expande e tokeniza a aplicação por candidato a cada consulta. No servidor, a busca ranqueia todos os produtos em memória.
  - Peça ao engenheiro-apps a tela de medição com 20 mil produtos e aplicação de 800 caracteres. Se passar do p95 de 300 ms, guarde por `produto_id` + `updated_at` os tokens expandidos, e não o texto (desenho T-0084 §4.5).
- 🟢 A3. `consultaTextosProdutoAparelho` lê todo o `produto_conteudo` para até 500 ids. Funciona, mas filtre cedo quando o SDK tiver leitura por campo.

**Fatia B (T-0085): 🔴 1 item, com correção pequena.**
- 🔴 B1. **O PUT `cadastro-catalogo` apaga referências sem aviso.**
  - O BKO monta o formulário a partir da ficha (`formCadastroDaFicha`). A ficha só mostra referências de marca conhecida e ativa, e hoje o servidor não conhece nenhuma (`SEM_MARCAS`).
  - O PUT substitui o conjunto inteiro: `repositorio-postgres.ts`, em `salvarCadastroCatalogo`, faz `update ... set deleted_at = now()` de todas as referências.
  - Resultado: qualquer "Salvar catálogo" (por exemplo, só para mudar a aplicação) apaga as referências da demo (CB 3401, FB-0207) e as que vierem do ERP. Também apaga, para sempre, a referência de marca que estiver inativa.
  - Correção mínima para hoje:
    1. em `SalvarCadastroCatalogo`, deixe `referencias` opcional (ausente = não altera);
    2. o BKO não manda `referencias` quando a lista de marcas deu erro ou veio vazia;
    3. na rota, quando `marcas.size === 0`, trate `referencias` como ausente;
    4. o repositório pula o bloco das referências quando o campo vem `undefined`;
    5. teste em `api/rotas.test.ts`: o PUT sem marcas preserva as referências gravadas.
  - Preservar a referência de marca inativa num PUT com marcas fica 🟡 para o próximo lote.
- 🟡 B2. **Critério 4 da T-0085 (busca pelo código do concorrente) não fecha para o vendedor, online nem offline.**
  - O Promotor não tem o perfil `vendedor`. Por isso, o pull não leva a entidade `concorrente` ao aparelho do vendedor (só vão entidades de módulos efetivos), e a `promotor.concorrentes@1` vai responder `ConsultaIndisponivel` para ele (ADR 0012).
  - Em `local.ts:141` e `repositorio-postgres.ts:81`, a referência sem marca é descartada, e com ela o código some do `DocBusca`.
  - Isso não bloqueia o main, porque hoje nada quebra.
  - O caminho está na ADR 0027 reescrita: um retrato `marca_nome` em `produto_referencia` (0034), gravado pelo PUT e pelo consumidor do ERP depois de validar pela consulta do Promotor, e mantido pelo evento `promotor.concorrente.alterado@1`. Com ele, o aparelho deixa de ler `concorrente`.
  - Fica para o próximo lote. Peço o recado ao banco-dados e ao modulo-promotor amanhã cedo, com este texto.
- 🟢 B3. `SalvarCadastroCatalogo` (`contracts/rotas.ts`) não tem teto em `aplicacao`, `codigo` e etiqueta. Ponha `max` largos (por exemplo, 20.000, 200 e 200): o 422 com a regra continua, e o corpo deixa de ser ilimitado.
- 🟢 B4. Em `consumidores-erp.ts`, um `oferece_junto` com `external_id` que nunca chega repete o evento até a fila morta e segura junto a aplicação e o nó do produto. Pense em descartar só aquele item, com aviso, depois de N tentativas (próximo lote).
- 🟢 B5. O tamanho é contado de dois jeitos: `validarCadastroCatalogo` e a rota de conteúdo usam `.length` (UTF-16), e o banco e o consumidor do ERP contam por code point. Fica um limite um pouco mais rígido com emoji; aceitável.

**Respostas aos seus pontos:**
- (1) SDK: respondido em recado separado (R-20261105-221827).
- (2) `reindexar` fora: de acordo, porque não há escritor de `produto_busca`.
- (3) `SEM_MARCAS`: veja B1 e B2.
- (4) `anoAtual` em UTC: aceito até o contexto do app trazer o fuso. A diferença só aparece na virada de ano, e o "+1" absorve.
- (5) PUT de conteúdo com `aplicacao` opcional: de acordo.

## Pronto quando
B1 corrigido e com teste. Mande um recado com o arquivo:linha e eu confirmo pelo diff, sem nova revisão completa. A e B entram juntas no lote.
