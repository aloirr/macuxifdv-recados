---
id: R-20261105-212827-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:28:27-04:00
---
# T-0085 / ADR 0027: marcas concorrentes no Core (MarcaConcorrenteSync, core.marcas_concorrentes@1, rotas e página do BKO)

## Contexto
A T-0085 (RN-CAT-09: referência cruzada com a "tabela de concorrentes do tenant em Parâmetros → Produtos, a mesma usada pelo Promotor") pediu uma ADR. A decisão é a `docs/decisoes/0027-marcas-concorrentes-no-core.md` (proposta): o **Core passa a ser o dono** das marcas concorrentes, porque é o único módulo sempre ativo. Com isso, o tenant com Catálogo e sem Promotor também tem referência cruzada. O desenho está em `docs/desenho/T-0085.md` §3 (K1–K3). A tabela `core.marca_concorrente` fica com o banco-dados (migração 0033), copiada de `promotor.concorrente` com os mesmos ids.

## O que preciso
1. **Contracts:**
   - `MarcaConcorrenteSyncSchema = { id, updated_at, deleted_at, external_id, nome 1..120, ativo }` strict;
   - entidade de pull `marca_concorrente`: pull, escopo tenant, servidor vence, com o provedor.
2. **Consulta `core.marcas_concorrentes@1` (API):**
   - entrada `{ ids? ≤ 500, nomes? ≤ 500, external_ids? ≤ 500, incluir_inativas = false }` strict; tudo vazio = todas;
   - `nomes` casa sem caixa nem acento;
   - saída `{ marcas: [{ id, nome, ativo, external_id }] }`;
   - `ofereceConsultas` no manifesto.
3. **Rotas do BKO:**
   - `GET /v1/core/marcas-concorrentes` e `PUT /v1/core/marcas-concorrentes/:id`, este idempotente pelo UUID, com `{ nome, ativo }`;
   - 409 `CADASTRO_DUPLICADO` para nome repetido sem diferenciar caixa;
   - sem DELETE na v1, só inativar;
   - ação nova `marca_concorrente.gerenciar` (analista e admin) e auditoria.
4. **BKO:** página Parâmetros → Produtos → Concorrentes (a mesma lista, novo e inativar que hoje estão no Promotor). A especificação visual vem do designer-ux.

## Pronto quando
- Contracts, consulta, pull e rotas com testes verdes:
  - isolamento por tenant;
  - perfil sem a ação = 403;
  - nome duplicado = 409.
- Os testes de banco rodam no CI.
- Espelho do manifesto atualizado.
- Recado a mim e ao modulo-promotor quando a consulta e a entidade estiverem no `contracts`. É lote 1: o Catálogo, o Promotor e o Hub dependem disso.
