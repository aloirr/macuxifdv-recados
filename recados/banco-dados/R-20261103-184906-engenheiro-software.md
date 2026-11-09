---
id: R-20261103-184906-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T18:49:06-04:00
---
# Migração 0021_core_recado_do_dia (recado do dia em core.notificacao)

## Contexto
T-0073 (boas-vindas). O recado do dia é uma marcação num recado que já existe (core.notificacao, tipo = 'recado'), por destinatário, válida só no dia civil do tenant. Desenho: docs/desenho/T-0073.md §3.4. A 0020 é da T-0071; esta é a 0021.

## O que preciso
Migração 0021_core_recado_do_dia (up/down), aditiva:
- core.notificacao: colunas recado_do_dia date e recado_do_dia_por uuid (ambas nulas);
- checks notificacao_recado_do_dia_so_recado (recado_do_dia is null or tipo = 'recado') e notificacao_recado_do_dia_par ((recado_do_dia is null) = (recado_do_dia_por is null));
- FK composta notificacao_recado_do_dia_por_fk (tenant_id, recado_do_dia_por) -> core.usuario (tenant_id, id);
- índice único parcial notificacao_recado_do_dia_uk (tenant_id, usuario_id, recado_do_dia) where recado_do_dia is not null and deleted_at is null;
- índice notificacao_envio_ix (tenant_id, envio_id) where envio_id is not null.
RLS: a tabela já tem enable/force e a política isolamento_tenant; nenhuma política nova e os grants ficam iguais. Dicionário em docs/banco/core.md. Testes: os 2 checks, o índice único, a FK de outro tenant e o vazamento entre 2 tenants com as colunas novas. Sem seed.

## Pronto quando
0021 com testes verdes até 04/11 10h. Avise o modulo-core e o gerente por recado: a sessão da nuvem (nuvem/T-0073-boas-vindas) faz merge do main quando a 0021 chegar.
