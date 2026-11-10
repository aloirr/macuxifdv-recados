---
id: R-20261110-064112-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:41:12-04:00
---
# T-0149 filial (1º da fila): migração core/catálogo/vendedor, provisionar_tenant, SQLite, views do Conector e seed com 2 filiais

## Contexto
T-0149 (filial, RN-CORE-39, decisão R-20261110-062236-alexandre). Desenho: `docs/desenho/T-0149.md` (§2 regra, §3 banco) e ADR 0040 (`docs/decisoes/0040-filial-no-core-preco-e-estoque-por-filial.md`). Você é o **primeiro da fila**: sem a migração, catálogo, core e vendedor não sobem.

## O que preciso (desenho §3)
1. **Core**: `core.filial` (codigo único vivo, nome, cidade/uf nulas no banco, `padrao` com único parcial por tenant, check `not padrao or ativo`, colunas comuns, RLS); `core.cliente.filial_id not null` com FK composta e **gatilho que põe a padrão quando vier nula**; índice `(tenant_id, filial_id)`.
2. **Nascimento**: `plataforma.provisionar_tenant` cria a padrão (código `0001`, nome `Filial padrão`), idempotente; a migração cria a padrão nos tenants existentes e preenche `cliente.filial_id`.
3. **Catálogo**: `deposito.filial_id not null` e `tabela_preco_item.filial_id not null` (backfill = padrão); o único vivo do item passa a incluir `filial_id`; índice `(tenant_id, tabela_preco_id, filial_id)`; `tabela_escalonada.filial_id` nula (= todas).
4. **Vendedor**: `pedido.filial_id` (sem FK) + `pedido.filial jsonb` (retrato, check objeto) + índice `(tenant_id, filial_id)`.
5. **SQLite do aparelho** (§3.4): `core_filial`, `core_cliente.filial_id`, `catalogo_deposito.filial_id`, `catalogo_tabela_preco_item.filial_id` com índice `(tabela_preco_id, filial_id, produto_id)`, `catalogo_tabela_escalonada.filial_id`, retrato no `vendedor_pedido`.
6. **Views do Conector** (§3.5): `vw_macuxi_filial` nova; `filial_external_id` em cliente, preço (chave `filial:tabela:produto:início`), estoque e escalonada; `filial_codigo`/`filial_external_id` na entrada de pedidos.
7. **Seed da demo**: 2 filiais (Manaus 0001 padrão, Boa Vista 0002), clientes nas duas, preços de Boa Vista cerca de 5% acima, estoques diferentes e um produto sem saldo em Boa Vista. `dois-tenants` com `core.filial`.
8. Docs `docs/banco/{core,catalogo,vendedor,aparelho-sqlite}.md`.

## Pronto quando
Migração up/down, testes estáticos e de banco no CI (`stack-isolado.yml`) verdes, seed com 2 filiais, e recado `entrega` com os nomes finais das colunas para os módulos.
