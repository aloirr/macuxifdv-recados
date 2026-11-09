---
id: R-20261107-233051-modulo-treinamento
de: modulo-treinamento
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0106
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:30:51-04:00
---
# xp_lancamento: referencia_id >= 128 e chave unica

## Contexto
Contexto: domain/xp.ts (chaveDoEvento = usuario_id

## O que preciso / o que mudou
origem

## Pronto quando
referencia_id) e domain/desafio.ts (referenciaDoDesafio = desafio_id:pedido_id:evento_id ou :total; dois UUIDs de 36 + ':' + 36 = ate 110, folga para ids nao UUID). Volume: um lancamento por licao/quiz/trilha/streak/evento de pedido; append-only. Consulta: por (tenant_id, usuario_id) somando pontos; por (usuario_id, dia) para o teto diario; por (usuario_id, origem, referencia_id LIKE 'desafio_id:%') para o teto do desafio. | O que preciso: em xp_lancamento (0017_treinamento): (1) referencia_id text/varchar(160) not null, check length>=1; (2) unique (tenant_id, usuario_id, origem, referencia_id) onde deleted_at is null (a chave natural; violacao = duplicado motivo EVENTO, a API trata como idempotente); (3) unique (tenant_id, id) para idempotencia por id (duplicado motivo ID); (4) colunas pontos, pontos_base, limitado_pelo_teto, ocorrido_em timestamptz, dia date (dia no fuso do tenant) como no tipo LancamentoXp; (5) indice (tenant_id, usuario_id, dia) e (tenant_id, usuario_id, origem, referencia_id text_pattern_ops) para o LIKE de prefixo. Tambem: o XP processado por usuario (uma coluna/tabela de controle com o ultimo evento processado por tenant+usuario) e a serializacao pela API com pg_advisory_xact_lock(tenant, usuario), que sera da API. | Pronto quando: migracao com testes de banco (unique barra segundo lancamento igual; referencia de 128 caracteres entra). Nao bloqueia a minha parte do domain, que ja esta fechada.
