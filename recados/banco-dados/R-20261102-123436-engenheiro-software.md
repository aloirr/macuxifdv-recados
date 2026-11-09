---
id: R-20261102-123436-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:34:36-04:00
---
# T-0061 rev. 2: tabela core.medida, FKs de unidade e semente (RN-CORE-19); item do pedido sem coluna nova

## Contexto
Desenho T-0061 revisão 2 (`docs/desenho/T-0061.md` §1 e §6 item (e)–(h)) com as decisões R-20261102-111619 (medidas por tenant, RN-CORE-19, RN-VEN-15 ajustada) e R-20261102-094644 (custo/preço/desconto máximo, RN-CORE-18, RN-VEN-11). A 0013 já tem `core.produto.custo_cents/preco_venda_cents/desconto_maximo_pct`, `core.produto_unidade` e `pedido_item.unidade/fator/quantidade_base`. Frete: a 0013 já está no formato final (R-20261102-105040); `vendedor.cliente_frete` não é mais pedido.

## O que preciso / o que mudou
Mapeamento (decisão de arquitetura, para não duplicar dado): **medida da unidade = `core.produto.unidade`** (coluna existente) e **embalagem = `core.produto_unidade` com `fator` > 1**. NÃO criar `medida_unidade`, `embalagem_medida` nem `embalagem_qtd` no produto. **Item do pedido: nada novo** (`pedido_item.unidade` = sigla vendida, `fator` = quantidade da embalagem, `quantidade_base` = quantidade em unidades).

(e) Tabela nova `core.medida`: `id uuid pk, tenant_id, sigla text not null, descricao text not null, ativo boolean not null default true, created_at, updated_at, deleted_at, external_id`. Checks: `sigla ~ '^[A-Z]{1,4}$'`, `btrim(descricao) <> ''`. **Unique TOTAL** `medida_sigla_uk (tenant_id, sigla)` (medida nunca é apagada, só inativada — RN-CORE-19 "não apaga medida em uso" — e o unique total é o alvo da FK). Índice de sync `(tenant_id, updated_at, id)`, unique parcial de `external_id`, gatilho `updated_at`, RLS + force + policy `isolamento_tenant` + grant a `macuxi_app` como as outras do Core.
(f) FKs depois de semear: `core.produto (tenant_id, unidade)` → `core.medida (tenant_id, sigla)` e `core.produto_unidade (tenant_id, unidade)` → `core.medida (tenant_id, sigla)`. Se houver `produto.unidade` fora do formato (minúscula, espaço), normalize com `upper(btrim())` antes.
(g) Semente: as 11 iniciais — UN Unidade · CX Caixa · PCT Pacote · FD Fardo · LT Litro · BD Balde · TB Tambor · GL Galão · KG Quilograma · DZ Dúzia · DP Display — em todo tenant existente, mais as siglas já usadas em produto/produto_unidade que não estejam na lista (descrição = sigla); e em todo tenant novo (função chamada na criação do tenant ou gatilho em `plataforma.tenant`: escolha sua).
(h) Base demo: produtos em UN, CX, FD, LT e BD (com `produto_unidade` das embalagens), custo e preço coerentes (margem 20–40%) e 2 ou 3 produtos com `desconto_maximo_pct` próprio (5% e 25%).
Número: dentro da 0013 se ela ainda não foi ao `main`; senão a próxima livre depois das reservadas à nuvem (0014–0017). Combine com o gerente.
Parâmetros sem linha nova: o padrão do desconto máximo é o parâmetro do **Core** `produto.desconto_maximo_pct` (15, padrão no código) e o do frete é do Vendedor `frete.modalidade_padrao` (CIF).

## Pronto quando
Migração verde com up/down; fixture e demo com as medidas; FKs ativas; teste de banco: produto com sigla não cadastrada é recusado pela FK; medida não pode ser apagada (só `ativo = false`); dois tenants com a mesma sigla convivem. Responda com o número da migração e os nomes finais se mudar algo.
