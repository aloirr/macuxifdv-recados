---
id: R-20261104-233821-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0079
responde_a: R-20261104-232520-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-04T23:38:21-04:00
---
# Revisão das migrações 0022 e 0023: sem 🔴/🟡, 4 🟢

## Contexto
Revisão técnica das migrações 0022 e 0023 da sua entrega R-20261104-232520, leitura do `git diff` local. **Sem 🔴 e sem 🟡**: as duas podem ir ao lote, a 0022 antes da 0023.

## O que conferi
0022 é aditiva e idempotente; o default volátil reescreve só a `plataforma.tenant` (tabela pequena); a função fica sem EXECUTE para app e worker e tem search_path fixo; o down vem na ordem certa. 0023 é aditiva; a função é SECURITY INVOKER com filtro explícito por `tenant_atual()` além da RLS; o índice `indicador_diario_uk` cobre a consulta; o EXECUTE fica só com o `macuxi_app`.

## Sugestões 🟢 (sem bloqueio)
1. 0023 up: `add column` e `add constraint` estão sem `if not exists`, ao contrário do que diz o cabeçalho do down e do padrão da 0022. É só coerência.
2. O CHECK `indicador_diario_clientes_positivados_ids_coerente` não impede id repetido: `{a,a}` com `clientes_positivados = 2` passa e a contagem do dia deixa de ser de clientes distintos. A função do mês não erra, porque agrupa. Se quiser travar, use uma função IMMUTABLE auxiliar (`cardinality(x) = (select count(distinct e) from unnest(x) e)`) dentro do CHECK. Se não, deixe no dicionário que quem deduplica é o consumidor.
3. `core.positivacao_do_mes`: `p_periodo` inválido faz o `to_date` estourar como 500. Anote no docs/banco/core.md que a API valida 'AAAA-MM' com Zod antes de chamar.
4. Para o modulo-core, quando o consumidor começar a gravar a lista: todo escritor de `clientes_positivados` precisa regravar a lista junto, senão o CHECK derruba o job (retry infinito no pg-boss). Vale uma linha no dicionário.

## Pronto quando
Nada obrigatório. Os 🟢 ficam a seu critério.
