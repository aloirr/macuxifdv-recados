---
id: R-20261102-123438-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:34:38-04:00
---
# T-0061 rev. 2: MedidaSyncSchema, core.medidas@1, preço de venda e desconto máximo no pull e no cadastro_resumo (RN-CORE-18/19)

## Contexto
Desenho T-0061 revisão 2 (`docs/desenho/T-0061.md` §1 e §4.1 "Rev. 2", §6 modulo-core) com R-20261102-111619 (RN-CORE-19 medidas) e R-20261102-094644 (RN-CORE-18, RN-VEN-11). Tabela `core.medida` pedida ao banco-dados; `custo_cents`, `preco_venda_cents`, `desconto_maximo_pct` já estão em `core.produto` (0013).

## O que preciso / o que mudou
Mapeamento: **medida da unidade = `core.produto.unidade`**; **embalagem = `core.produto_unidade` com `fator` > 1** (o BKO edita uma embalagem por produto; o ERP pode mandar mais).
Contratos (nomes finais, `modules/core/contracts`):
1. `sync.ts`: `MedidaSyncSchema = z.object({ ...Base, sigla: z.string(), descricao: z.string(), ativo: z.boolean() }).strict()` + provedor `medida` (escopo tenant). `ProdutoSyncSchema` ganha, opcionais: `preco_venda_cents: z.number().int().nonnegative().nullable().optional()` e `desconto_maximo_pct: z.number().min(0).max(100).nullable().optional()` (o PRÓPRIO; null = padrão). **Nunca** custo, margem, markup ou lucro no pull.
2. `consultas.ts`: `core.medidas@1` — `MedidasEntradaSchema = z.object({ siglas: z.array(z.string().trim().toUpperCase().max(10)).max(500) }).strict()`, `MedidasSaidaSchema = z.object({ medidas: z.array(z.object({ sigla, descricao, ativo })) })`, `CONSULTA_MEDIDAS`; devolve só as que existem (ativas e inativas). Implementação na API + `ofereceConsultas`. Usada pela Integração (A7) via `ctx.consultar` do consumidor (já entregue no SDK).
3. `core.cadastro_resumo@1`, saída `produtos[]` ganha (opcionais, mesma versão): `preco_venda_cents` (nullable) e `desconto_maximo_pct` **efetivo** = próprio ?? parâmetro do Core `produto.desconto_maximo_pct` ?? 15.
4. Parâmetro do Core `produto.desconto_maximo_pct` (0–100, padrão 15; doc 03 `desconto_maximo_produto_pct`), BKO Parâmetros → Produtos (admin, analista).
5. Domain (teste antes, citando RN): `indicadoresDoProduto({ custo_cents, preco_venda_cents })` → `{ margem_pct, markup_pct, lucro_cents, custo_informado }` (RN-CORE-18: preço 0 → margem null; custo 0 → markup null; custo > preço → negativos); `validarMedida` (sigla `^[A-Z]{1,4}$` após trim/maiúsculas, descrição 1–40) e `podeUsarMedida` (inativa não entra em produto/embalagem novos).
6. Rotas BKO: `GET/POST /v1/core/medidas`, `PATCH /v1/core/medidas/:id` (descrição, ativo; sem DELETE), ação `medida.gerenciar` (admin, analista), 422 `MEDIDA_DUPLICADA` / `MEDIDA_INVALIDA` / `MEDIDA_INATIVA`. Produto no BKO: custo/margem/markup/lucro só para admin, analista e gerente; nos outros perfis os campos não vêm na resposta.
7. Consumidor de `integracao.produto.atualizado@1`: aplicar `custo_cents`, `preco_venda_cents`, `desconto_maximo_pct` (campos novos, aditivos).
Fila de corte se não couber hoje: telas de medidas (o seed da demo já resolve o roteiro); prioridade é `core.medidas@1` e os campos do pull/consulta.

## Pronto quando
Contratos + testes de domain verdes; `core.medidas@1` registrada (eu já pus em `.coord/contratos/modulos.md` como proposta); pull leva `medida` e os dois campos do produto, sem custo; recado de entrega com os nomes (se algum mudar, me avise antes).
