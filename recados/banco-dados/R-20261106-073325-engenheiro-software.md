---
id: R-20261106-073325-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:25-04:00
---
# T-0089 B1/B2/B4: migrações 0037-0039 (forma e prazo, cliente, escalonada), views do Conector e base demo

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md`; o banco fica no §6 e a base demo no §7, B4. Regras: RN-VEN-15 (nova), 23, 24 e 25 (a 14 foi substituída). Todos os contratos são aditivos, e nada da condição antiga é apagado nem convertido (§2).

## O que preciso
**B1. Migrações:**
- **0037 `vendedor_forma_prazo`:**
  - `vendedor.forma_pagamento` (codigo único no tenant entre as vivas, nome, ativo, ordem);
  - `vendedor.prazo_pagamento`:
    - FK `(tenant_id, forma_pagamento_id)`;
    - codigo único no tenant;
    - descricao;
    - `parcelas_dias int[]` com check de 1 a 24 itens, de 0 a 365;
    - `prazo_medio_dias int` com check ≥ 0 (gravado pela API ou pelo consumidor; o banco não recalcula);
    - ativo e ordem;
  - em `vendedor.pedido`: `forma_pagamento_id` e `prazo_pagamento_id` (FKs no schema), `forma_pagamento_codigo`, `forma_pagamento_nome`, `prazo_codigo`, `prazo_descricao`, `prazo_parcelas_dias int[]` e `prazo_medio_dias`, todos nulos;
  - o parâmetro `titulo_vencido_dias` = 5 do Vendedor, se os parâmetros forem semeados por migração.
- **0038 `core_cliente_pagamento`:** `core.cliente.prazo_medio_max_dias int null` (check de 0 a 365) e `formas_pagamento text[] null` (códigos das formas, sem FK; regra 1).
- **0039 `catalogo_tabela_escalonada`:**
  - `produto_id` sem FK;
  - `medida text null` (nulo = unidade base);
  - `quantidade_minima int > 0`;
  - `preco_unidade_cents int > 0` (preço da unidade base);
  - vigência (`vigencia_inicio`, `vigencia_fim` nulo, com check de fim ≥ início);
  - `tabela_preco_id` nulo, com FK `(tenant_id, tabela_preco_id)` no schema;
  - ativo;
  - único em `(tenant, produto, coalesce(medida,''), quantidade_minima, coalesce(tabela_preco_id), vigencia_inicio)` entre as vivas.
- Todas com a base da regra 5, RLS forçado, `_sync_ix`, `_external_uk` e o `down`.

**B2. Views do Conector** para `forma_pagamento`, `prazo_pagamento` e `tabela_escalonada`, e os 2 campos novos do cliente.

**B4. Base demo:**
- Pix e Dinheiro à vista ([0]); Cartão 30 e 30/60; Boleto 28, 28/56 e 30/60/90.
- Prazo médio 45 na maioria dos clientes e 30 em um, para aparecer prazo desabilitado.
- 3 faixas escalonadas (ex.: um produto com 10 FD, 20 FD e 50 UN).
- Um cliente com título vencido há mais de 5 dias.
- As 4 condições antigas continuam, para o APK antigo.

## Pronto quando
- As migrações têm `up` e `down` com teste estático e de RLS (no CI).
- O `seed-demo.test.ts` cobre os números do B4.
- As views têm teste.
- O Drizzle de cada módulo fica com o dono do módulo; mande o recado ao dono quando a migração entrar.
