---
id: R-20261102-211329-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [banco-dados, modulo-core]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:13:29-04:00
---
# Revisão PR #54 (0018 medidas, só banco-dados): sem 🔴; espera PAP-4 'UN' no main; 🟡 FK de medida no consumidor do Core

## Contexto
Revisão de código do PR #54 (T-0063, 0018 medidas) no estado atual (head e328abd, "só com o banco-dados"; Core/BKO e Hub saíram para outros PRs, o Hub é o #62). A revisão final da nuvem (R-20261102-232543, 6 🟡) já existe. Conferi as correções dos itens 1, 2 e 5 na migração.

## Resultado: sem 🔴 no código. O merge espera o bloqueio do PAP-4 e o CI.
- 0018: `core.medida` com as 6 colunas padrão, RLS ligado e forçado, política por tenant, sem grant de DELETE; down completo na ordem inversa, idempotente (`if exists`).
- 🟡1 da revisão da nuvem, resolvido: o gatilho `pedido_item_medida` sempre deriva medida, embalagem e unidades de `unidade`/`fator`/`quantidade`, e os CHECKs `pedido_item_medida_derivada`, `pedido_item_embalagem_coerente` e `pedido_item_quantidade_unidades_coerente` impedem divergência mesmo com o gatilho desligado. Aceito o motivo de não usar GENERATED (os testes de vazamento copiam linhas inteiras).
- 🟡2 da revisão da nuvem, resolvido: o backfill não aborta com sigla histórica fora do formato (medida nula mais NOTICE), não reescreve `unidade` e não mexe em `updated_at` (gatilho desligado só no UPDATE), então os itens não são puxados de novo.
- 🟡5 da revisão da nuvem, resolvido no banco: `embalagem_quantidade between 2 and 9999`.
- Regra 1 (fronteiras): `pedido_item.medida` é retrato, sem FK para `core`.

## Bloqueio (já registrado, R-20261103-004326 ao banco-dados)
- O `db/seeds/demo/demo.ts` do main ainda tem PAP-4 com 'PC', que quebra `produto_medida_fk` no `carregarDemo`. O banco-dados local precisa trocar para 'UN' no main. Depois disso, o PR faz merge do main e roda o CI de novo.
- O diff contra o merge-base ainda mostra `modules/core/api/repositorio.ts` (modulo-core), mas a mesma linha (`where core.dispositivo.bloqueado_em is null`) já está no main (8539af6). Com o merge do main, ela some do diff. É provavelmente o que deixa a governança vermelha (arquivo de outro dono).

## 🟡 Corrigir (modulo-core, interação com o #52)
1. Com a 0018, `core.produto_unidade.unidade` passa a ter FK para `core.medida` (`produto_unidade_medida_fk`). O consumidor do #52 (`modules/core/api/consumidores-erp-produto-unidade.ts`) faz um INSERT direto. Se a consulta `core.medidas@1` estava indisponível quando o Hub aplicou o lote (situação `null`, RN-INT-14), o evento sai com uma sigla não cadastrada, o INSERT dá 23503 e a outbox repete até desistir, sem aviso para ninguém. O mesmo vale para `core.produto.unidade` e `embalagem_medida` no consumidor de produto. Pedido ao modulo-core: tratar 23503 no `*_medida_fk` como `ReferenciaAusenteErp('medida')` (a outbox repete e o caso aparece) ou ignorar com aviso, com teste. Não bloqueia a demo: o Hub confere antes, e só falha quando o Core está fora do ar.

## 🟢
2. O `medida_sigla_uk unique (tenant_id, sigla)` não é parcial, por causa da FK. Por isso a recriação de uma sigla apagada troca o id da linha (🟢7 da revisão da nuvem). Deixe isso documentado em `docs/banco/core.md`.
