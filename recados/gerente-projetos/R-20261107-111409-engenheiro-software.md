---
id: R-20261107-111409-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0089
responde_a: R-20261107-105144-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-07T11:14:09-04:00
---
# Revisão T-0089 I2: 1 🔴 (desempate do cursor sem colação binária nos exemplos perde linhas), 2 🟡, resto 🟢

## Contexto
Revisão final da fatia I2 da T-0089 (pedido R-20261107-105144), feita no working tree. Lint, typecheck e testes verdes: @macuxi/integracao com 698 testes aprovados e 55 pulados; @macuxi/conector com 259 aprovados e 11 pulados.

Pergunta do gerente: "o cursor dos exemplos usa external_id" perde alterações?
- **O cursor em si está certo.** Os exemplos usam o par (alterado_em, external_id) em keyset: `WHERE alterado_em > :c OR (alterado_em = :c AND external_id > :id) ORDER BY alterado_em, external_id`. É o que o Conector espera: sincronizador.ts:99-104, compararCursor em mapeamento.ts:362, e no Hub `cursor_external_id COLLATE "C"` (hub-api.md:165). O alterado_em manda; o external_id só desempata.
- **O defeito está no desempate:** a ordem do external_id não é binária. Ver o 🔴 abaixo.

## O que preciso / o que mudou

### 🔴 1 — Desempate do cursor sem colação binária: o exemplo leva a uma carga que perde alterações
**Onde:** apps/conector/exemplos/conector.exemplo.json, nas 15 consultas (linhas 50, 69, 96, 116, 138, 169, 222, 249, 308, 346, 378, 413, 436, 462 e 505).

**Por que perde dado:**
- As views-modelo fazem `CAST(... AS VARCHAR(200))` e `CONCAT(id, ':', ...)`. Por isso o external_id herda a colação padrão do banco do ERP, que é CI_AS na grande maioria dos SQL Server.
- O Conector descarta como "repetida" toda linha cujo par seja ≤ cursor de leitura na ordem ordinal do JS (mapeamento.ts:319).
- Quando o banco ordena diferente do JS no desempate, uma linha que o SQL devolve depois do cursor é ignorada em silêncio.

**Exemplo concreto com as chaves do próprio modelo** (produto_unidade, `CONCAT(id_produto, ':', unidade)`):
- Na colação Windows, `'12:UN' < '123:UN'`, porque a pontuação vem antes dos dígitos.
- No JS/BIN2, `'123:UN' < '12:UN'`, porque ':' (0x3A) é maior que '3'.
- Com um `UPDATE` em massa no mesmo milissegundo, que é a rotina de tabela de preço e de estoque, e mais de 5000 linhas, o empate cruza a página. A página seguinte volta `'123:UN'` (ou `'B2'` depois de `'a1'` em CI), o Conector a conta como repetida, e ela só volta quando for alterada de novo.
- Na carga completa, a linha some da sessão e pode ser inativada.

**O próprio cabeçalho de db/conector/views-modelo.sql (linhas 56-65) já manda usar a colação binária.** O exemplo não segue.

**O que trocar, exatamente:**
- **SQL Server**, nas 15 consultas, trocar
  `AND external_id > :cursor_external_id) ORDER BY alterado_em, external_id`
  por
  `AND external_id COLLATE Latin1_General_BIN2 > :cursor_external_id) ORDER BY alterado_em, external_id COLLATE Latin1_General_BIN2`
- **Oracle**, em apps/conector/exemplos/conector.oracle.exemplo.json, nas linhas 30, 63, 82, 104 e 135, trocar
  `AND external_id > :cursor_external_id) ORDER BY alterado_em, external_id`
  por
  `AND NLSSORT(external_id, 'NLS_SORT=BINARY') > NLSSORT(:cursor_external_id, 'NLS_SORT=BINARY')) ORDER BY alterado_em, NLSSORT(external_id, 'NLS_SORT=BINARY')`
  - Motivo: no Oracle o `>` segue o NLS_COMP, que é BINARY, mas o ORDER BY segue o NLS_SORT, que vira WEST_EUROPEAN em sessão BRAZILIAN PORTUGUESE. Aí a ordem diverge dentro do próprio banco.
- **Teste:** em apps/conector/test/exemplos-views-modelo.test.ts, acrescentar um caso que garanta o desempate binário em todas as consultas:
  - no SQL Server, `external_id COLLATE Latin1_General_BIN2 > :cursor_external_id` e `ORDER BY alterado_em, external_id COLLATE Latin1_General_BIN2`;
  - no Oracle, `NLSSORT(`.

### 🟡 1 — Defesa no Conector (backlog, não bloqueia esta fatia)
Hoje uma colação errada perde linha **em silêncio**. Sugestões:
- **(a)** `conector testar` (comandos.ts:322) confere se a amostra volta na mesma ordem do compararCursor. Se não voltar, avisa "colação não binária no external_id".
- **(b)** Ao achar uma linha "repetida" com o mesmo alterado_em do cursor e um external_id diferente, o Conector registra um aviso `ordem_divergente` no log e no status, em vez de só contar.

### 🟡 2 — Snippet exato no conector.md
docs/modulos/integracao/conector.md:192 diz "colação binária/ordinal ou chave numérica", mas não mostra o SQL. Pôr o snippet dos dois dialetos (o mesmo do cabeçalho das views-modelo).
- No §T-0089, a frase "os exemplos já leem essas views" passa a valer só depois do 🔴 1.

### 🟢 Pontos sem ressalva
- **Reconciliação:** em tabela_escalonada usa `NULL AS soma`, mas o cabeçalho das views-modelo sugere somar `preco_unidade_cents`. Alinhar um dos dois.
- **Exemplo Oracle:** é parcial; o cliente vem sem vendedor e sem endereço. Vale uma linha no conector.md dizendo que ele só mostra o dialeto.
- **pagamento-hub.test.ts:173-182:** o teste de fila (aprovado → criar → /pedidos/pendentes com `condicao_pagamento_erp` e `pagamento`) está bom. O `as unknown as Parameters<...>` poderia virar uma fábrica tipada de `PedidoNaFila`.
- **conector.md, premissa da v1** (NULL não limpa; `'[]'` limpa as formas; 365 = sem teto; pelo portal e pela API, null limpa): alinhado à regra 8 das views-modelo e à premissa do gerente.
- **mxk_ → mxc_** em chave.test.ts e em contracts/index.test.ts: alinhado a api/chave.ts:22 e a hub-api.md:65.
- **Mapeamento 1 para 1 e ORDEM_CARGA:** os testes cobrem bem (exemplos-views-modelo.test.ts e config.test.ts).

## Pronto quando
- As 20 consultas (15 do SQL Server e 5 do Oracle) usam o desempate binário.
- O teste do desempate está em exemplos-views-modelo.test.ts.
- O teste do @macuxi/conector está verde.
- Depois disso, a revisão fica sem 🔴. Os 🟡 podem ir para o backlog, com o aval do gerente.
