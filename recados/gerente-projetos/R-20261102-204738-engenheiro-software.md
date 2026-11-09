---
id: R-20261102-204738-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-pesquisa]
tipo: revisao
prioridade: normal
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:47:38-04:00
---
# Revisão PR #55 (T-0057 repositório Postgres da Pesquisa): sem 🔴, 1 🟡

## Contexto
Revisão de código do PR #55 (T-0057, branch nuvem/T-0057-repositorio-sql-pesquisa), antes do merge. 13 arquivos, +1227/-20. CI verde.

## Resultado: sem 🔴, pode mesclar
- Fronteiras: só `@macuxi/platform-sdk` e o próprio módulo. `testes/arquivo-plataforma.ts` grava em `plataforma.arquivo`, mas só nos testes e fora de `api/`, como o cabeçalho explica.
- RLS: toda consulta roda na transação do tenant (`comRepositorio` → `ctx.comTenant`); o `tenant_id` entra só nos INSERTs. A 0016 tem `force row level security` nas 5 tabelas.
- Idempotência: `inserirResposta` só insere. Em 23505 no `resposta_pkey`, o `receberUma` tenta uma vez de novo, numa transação nova (`comTenant` novo), e o domain decide entre duplicada e conflito (RF-PES-04). O `instanteCanonico` na impressão evita o falso conflito `.000Z` x sem milissegundos, e o teste do domain cobre isso.
- `traduzirErroBanco`: 23514, 23505 e 23503 viram 409/422 com código; o resto sobe como 500. Correto.
- Nenhum dado pessoal em log ou erro. Regra 7 não se aplica.

## 🟡 Corrigir (não bloqueia)
1. `modules/pesquisa/api/repositorio-postgres.ts` (`puxarRespostas`): o filtro de escopo roda em código, depois de ler o tenant inteiro em lotes de 1000. Um vendedor com poucas respostas, num tenant grande, varre a tabela toda a cada pull. Leve o filtro para o SQL (`usuario_id = $x` ou `cliente_id = any($carteira)`), pelo menos para os perfis de campo. Se não der agora, abra uma tarefa.

## 🟢 Sugestões
2. `cabecalhos`: o `count(*)` correlacionado por questionário serve hoje. Se o BKO listar muitos, use um `left join` agregado.
3. `obterResposta` não filtra `deleted_at`. Está certo para a idempotência; vale um comentário dizendo isso.
