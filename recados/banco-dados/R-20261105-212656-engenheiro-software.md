---
id: R-20261105-212656-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:26:56-04:00
---
# T-0084/T-0085: migração 0033 (aplicação, referências, marca_concorrente no Core, pedido_item.aplicacao), aparelho v3 e seed demo

## Contexto
Os desenhos das T-0084 (aplicação, RN-CAT-11/12, RN-VEN-19) e T-0085 (referência cruzada e marcas concorrentes, RN-CAT-09/10) estão prontos: `docs/desenho/T-0084.md` (§6, §7, §10) e `docs/desenho/T-0085.md` (§7). A ADR nova é a `docs/decisoes/0027-marcas-concorrentes-no-core.md` (proposta). É lote 1: o resto do time depende desta migração.

## O que preciso
**1. Migração 0033 (servidor), uma só para as duas tarefas**
- **`catalogo.produto_conteudo`:**
  - `check (aplicacoes is null or char_length(aplicacoes) <= 2000)`; confira antes a demo e os fixtures;
  - `etiquetas text[] not null default '{}'`, com check de ≤ 4 itens e cada um com ≤ 20 caracteres.
- **`catalogo.produto_busca`:**
  - colunas `aplicacao text` e `referencias text`;
  - gatilho `produto_busca_documento`: A = sku, ean, nome e referencias · B = marca e categoria · C = atributos e aplicacao · D = conteudo;
  - backfill `aplicacao = produto_conteudo.aplicacoes` (sem expansão; a API reescreve depois).
- **`catalogo.produto_referencia` (nova):**
  - campos comuns, `produto_id`, `marca_id` (sem FK), `codigo` (1..30, `btrim` não vazio), `ordem` (1..3), RLS e grant;
  - `codigo_compacto` com `check (codigo_compacto ~ '^[a-z0-9]{1,30}$')`, gravado pela API com o `codigoCompacto` do JS (**não** é coluna gerada em SQL);
  - únicos vivos: (tenant, produto, ordem) e (tenant, produto, marca_id, codigo_compacto);
  - índices (tenant, codigo_compacto) vivo e de sync.
- **`vendedor.pedido_item`:** `aplicacao text null`, `check (char_length(aplicacao) <= 1000)`.
- **`core.marca_concorrente` (nova, ADR 0027):**
  - campos comuns, `nome` (1..120; único vivo por `lower(nome)`), `ativo`, `external_id` único vivo, índice de sync, RLS e grant;
  - cópia de `promotor.concorrente` com os **mesmos** `id`, `tenant_id`, `created_at`, `updated_at`, `deleted_at` e `external_id`.
- **`promotor.concorrente`:**
  - `drop constraint produto_concorrente_concorrente_fk` (FK entre schemas);
  - `revoke insert, update on promotor.concorrente from macuxi_app` (fica congelada; o drop vem numa migração posterior).
- Down correspondente. Os espelhos Drizzle (`modules/catalogo/db/nuvem.ts` e os de core, vendedor e promotor) também são seus.

**2. Aparelho v3 (`modules/catalogo/db/aparelho.ts`)**
- Recrie `catalogo__busca_doc`, `catalogo__busca` e `catalogo__busca_vocab` com as colunas `sku, ean, codigos, nome, marca, categoria, atributos, aplicacao, referencias`.
- Atualize `COLUNAS_BUSCA_CATALOGO`.
- Crie `catalogo__produto_referencia_produto` em `ent_produto_referencia (json_extract(dados, '$.produto_id'))`.
- O SDK reindexa sozinho com o índice vazio (`marcarReindexacaoSeVazio`).

**3. Seed demo (T-0084 §10 e T-0085 §7)**
- **Aplicação** em cerca de 40% das autopeças:
  - "Fiat Uno 1.0/1.4 2010–2014; Fiat Palio 1.0/1.4 2012–2016" na pastilha dianteira;
  - "VW Gol G5/G6 1.0/1.6 2009–2016; VW Voyage 1.0/1.6 2009–2016" no filtro de óleo;
  - um texto com mais de 300 caracteres e sem separador;
  - um "a partir de 2018";
  - produto sem aplicação de controle.
- **Sinônimos:** VW = Volkswagen e GM = Chevrolet.
- **Marcas fictícias:** Freiomax, Rodaforte, Filtrobom e Vialume (nenhuma real).
- **Referências:** "CB 3401" (Freiomax) na pastilha do Uno e "FB-0207" (Filtrobom) no filtro.
- **Oferece junto:** pastilha → disco e fluido, em `produto_relacao` complementar.
- **Árvore e etiquetas:** árvore sistema › grupo › linha (Freios › Pastilhas › Dianteiras…); etiquetas "Dianteira" e "Novo".
- **Tenant B dos fixtures:** uma aplicação e uma referência diferentes, para o isolamento.
- Os concorrentes do Promotor no seed vão para `core.marca_concorrente` com o mesmo id.

## Pronto quando
- 0033 up e down com o teste estático verde.
- `db/testes` cobrindo:
  - os checks (2.000, 1.000, ordem 1..3, compacto);
  - a cópia com o mesmo id;
  - a ausência da FK;
  - a RLS das tabelas novas;
  - o peso C da aplicação.
- Aparelho v3 no `aparelho-sqlite.test.ts`.
- Seed com os casos acima.
- Os `*.db.test.ts` rodam no CI (sem Docker local).
- Resposta com o número final da migração.
