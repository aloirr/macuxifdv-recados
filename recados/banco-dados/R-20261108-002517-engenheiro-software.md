---
id: R-20261108-002517-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:25:17-04:00
---
# T-0113 B: catalogo.marca_concorrente com os mesmos ids de promotor.concorrente, FK da referência, Promotor só leitura (ADR 0034)

## Contexto
T-0113, decisão do dono R-20261107-173950 b: o cadastro de marcas concorrentes passa do Promotor para o Catálogo. ADR docs/decisoes/0034-marcas-concorrentes-no-catalogo.md (§4 é a sua parte) e desenho docs/desenho/T-0113.md §2 fatia B. Lote único com as fatias K (modulo-catalogo) e P (modulo-promotor); você vai primeiro.

## O que preciso
Migração (próximo número livre, hoje 0043):
1. `catalogo.marca_concorrente`:
   - colunas da regra 5 + `nome` (CHECK btrim e até 120) + `ativo`;
   - RLS e FORCE, `isolamento_tenant`, `select, insert, update` ao `macuxi_app`, gatilho `updated_at`;
   - índices: `(tenant_id, id)` único, `lower(nome)` único entre as vivas, `external_id` único entre as vivas, sync `(tenant_id, updated_at, id)`.
2. Cópia de TODAS as linhas de `promotor.concorrente`, inclusive as inativas e as apagadas, com id, tenant, nome, ativo, created_at, updated_at, deleted_at e external_id idênticos. É a única leitura entre schemas autorizada pela ADR 0034 §4.2. Conferência por tenant (contagem e ids), com raise se divergir.
3. `catalogo.produto_referencia`:
   - preencher `marca_nome` onde está nulo;
   - conferir que não há órfã (raise com a contagem);
   - FK `(tenant_id, marca_id) → catalogo.marca_concorrente (tenant_id, id)`.
4. Promotor: drop da FK `produto_concorrente_concorrente_fk`; revogar `insert, update` do `macuxi_app` em `promotor.concorrente` (a tabela fica só de leitura até a fase 2, não antes de 2026-12-08).
5. Down: devolver as linhas ao Promotor por id (insere e atualiza), as permissões e a FK do Promotor; tirar a FK da referência; apagar a tabela nova.
6. Drizzle em `modules/catalogo/db/nuvem.ts`, e a tabela local `marca_concorrente` no aparelho do Catálogo, se for sua.
7. Seeds:
   - demo: marcas de `db/seeds/demo/promotor.ts` vão para o seed do Catálogo com os MESMOS ids, e o Catálogo passa a rodar antes do Promotor;
   - fixture dois-tenants: por tenant, uma marca ativa, uma inativa e uma apagada.
8. Teste de banco (*.db.test.ts, no CI). Depois do up, conferir:
   - linhas idênticas campo a campo e contagem por tenant;
   - `marca_nome` preenchido;
   - FK nova presente e a do Promotor ausente;
   - insert do `macuxi_app` em `promotor.concorrente` falhando com 42501;
   - RLS entre tenants.
   Depois, ida e volta (down e up) sem perda.

## Pronto quando
Migração up/down, Drizzle, seeds e teste de banco verdes no CI. Recado ao modulo-catalogo e ao modulo-promotor (com cópia para mim) com os nomes exatos: tabela, colunas, índices e FK.
