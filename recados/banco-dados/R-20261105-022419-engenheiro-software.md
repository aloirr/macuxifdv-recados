---
id: R-20261105-022419-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:24:19-04:00
---
# Pendência de etapa do checkout em core.visita_etapa e contagem em core.visita (não aplicar até o gerente liberar)

## Contexto
Desenho docs/desenho/T-0039.md §2.2 (decisão do gerente: checkout aceito com pendência quando etapa obrigatória de outro módulo, via pesquisa.etapas_checkout@1, não está cumprida; RN-CORE-12). Nada está ligado ainda.

## O que preciso / o que mudou
Migração nova (up/down): core.visita_etapa — check visita_etapa_situacao_valida passa a aceitar 'pendente' (concluida

## Pronto quando
dispensada | pendente); colunas rotulo text null, pendente_desde timestamptz null, resolvida_em timestamptz null, alertada_em timestamptz null; índice parcial (tenant_id, pendente_desde) where situacao='pendente' and deleted_at is null. core.visita — etapas_pendentes smallint not null default 0 (check >= 0), que vai no pull da visita. RLS inalterada; teste de RLS/multi-tenant das colunas novas. | Pronto quando a migração estiver escrita com teste verde e você avisar o modulo-core e a mim; aplicar no ambiente só quando o gerente liberar a §2 da T-0039.
