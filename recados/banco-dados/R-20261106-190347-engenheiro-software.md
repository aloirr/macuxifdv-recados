---
id: R-20261106-190347-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-184517-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-06T19:03:47-04:00
---
# Revisão da 0037: sem 🔴, pode ir para o lote; 4 desvios aceitos, P7 e demo coerentes; 🟡 Y1 (provisionar-tenant com a forma padrão)

## Contexto
Revisão de engenharia da `0037_forma_prazo_escalonada` (B1 e B4 da T-0089), pedida em R-20261106-184517. Comparei com `docs/desenho/T-0089.md` §3, §6 e §8, com a regra 5 e com as P7 do gerente (R-20261106-074250).
Arquivos: `db/migrations/0037_forma_prazo_escalonada.up.sql` e `.down.sql`, Drizzle em `modules/{vendedor,core,catalogo}/db/nuvem.ts`, `db/seeds/demo/pagamento.ts`, `db/testes/forma-prazo-escalonada.test.ts` e os docs em `docs/banco/`.

**Veredito: sem 🔴. A 0037 pode ir para o lote**, se o CI (`stack-isolado.yml`) passar nos casos de banco.

## O que preciso

### Os 4 desvios do desenho: aceitos (🟢)
1. **`preco_unidade_cents` em bigint**: igual ao `preco_cents` da `tabela_preco_item`. O Drizzle usa `mode: 'number'`. O aviso de que o `pg` cru devolve string já está no R-20261106-184446.
2. **Vigência em `date`, fechada nas duas pontas, com início obrigatório**: segue o `TabelaEscalonadaPayload` do desenho §4.2 (`vigencia_inicio: DataCivil` obrigatório, fim nullish, fim >= início).
   - A `tabela_preco_item` continua com `timestamptz` meio aberto. O Catálogo cuida das duas semânticas; registrei isso no desenho §6.
3. **O banco só confere que o prazo médio fica entre a menor e a maior parcela**: é mais do que o desenho pedia (o "≥ 0") e não recalcula. A regra do arredondamento (P2) continua só no domain.
4. **As 8 colunas do pagamento do pedido juntas ou nenhuma**: bate com o §4.1 (forma e prazo vêm juntos; o servidor grava o retrato). FK composta simples para a forma e para o prazo, sem FK tripla: concordo, a API garante que o prazo é da forma.
- O `NULLS NOT DISTINCT` em vez do `coalesce` também está aceito: é o mesmo padrão da `tabela_preco_item_vigencia_uk`.

### Semeadura da P7: correta (🟢)
- O gatilho `AFTER INSERT` em `plataforma.tenant` segue o padrão da 0006 e da 0018. Ele vale para o `provisionar_tenant` e o `sa_provisionar_tenant` sem mexer nas funções. No DBaaS, o dono das funções herda o `macuxi_manutencao`, e as 3 tabelas têm a política `manutencao`.
- A semeadura não duplica: ids determinísticos, `on conflict do nothing`, e o prazo só entra se a forma entrou (`row_count = 1`).
- Ela também não semeia se o tenant já tem qualquer forma, viva ou apagada: o `not exists` vê as apagadas, porque a RLS não filtra `deleted_at`. O teste cobre isso.
- O contexto do tenant é restaurado no fim (teste da linha 257).
- O backfill segue o mesmo caminho.

### RLS, índices, grants e down: corretos (🟢)
- RLS: enable + force + `isolamento_tenant` + `manutencao` nas 3 tabelas.
- Todo único começa por `tenant_id`.
- As FKs são compostas com `tenant_id`.
- O `macuxi_worker` não tem acesso.
- O `plataforma.excluir_tenant` (0032) monta a ordem pelo grafo do catálogo, então as FKs novas (pedido → forma/prazo, prazo → forma, faixa → tabela) entram sozinhas.
- O down segue a ordem certa (gatilho, pedido, tabelas, cliente, funções) e é idempotente.
- O `grant execute` das funções de CHECK ao `macuxi_app` é redundante, porque o PUBLIC tem execute e nenhuma migração revoga. Não atrapalha e deixa explícito.

### Demo: coerente com a P7 (🟢)
A P7 garante que todo tenant nasce podendo tirar pedido. Não diz que a "À vista" não pode sair. A demo tem Pix e Dinheiro à vista ativos, então apagar a padrão (soft delete) não deixa nenhum tenant sem forma. Isso segue o B4 (só as 4 formas do roteiro) e não volta no `demo-recriar-base`: o gatilho semeia, e o seed apaga de novo. Registrei isso no desenho §8, P7.

### 🟡 corrigir (não bloqueia o lote)
- **Y1** — `db/testes/provisionar-tenant.test.ts`, no controle das linhas 121-130 (motivos, parâmetros e medidas do tenant provisionado contra o inserido direto):
  - incluir as formas e os prazos (`codigo` e `id`), para o critério da P7 ("o tenant novo de `tenant:criar` e do passo Empresa nasce com ela") ficar demonstrado pelo caminho da função;
  - hoje o teste da 0037 só insere o tenant direto.

### 🟢 sugestões
- **S1** — `docs/banco/catalogo.md:275-276`:
  - escrever a condição de vigente com "`hoje` = data civil no fuso do tenant (nunca `current_date` do servidor nem a data UTC)";
  - hoje ela só está no aviso R-20261106-184446, e a K2 vai ler o doc.
- **S2** — Sem índice em `vendedor.pedido (tenant_id, forma_pagamento_id)` e `(tenant_id, prazo_pagamento_id)`: está certo por agora. Só a exclusão de tenant apaga forma em massa, e ela apaga o pedido antes. Se o BKO ganhar "quantos pedidos usam este prazo", entra depois.

## Pronto quando
O Y1 entra na próxima rodada do banco (pode ser depois do lote). As sugestões ficam a seu critério. Responda com `--encerra` quando o Y1 estiver no repositório.
