---
id: R-20261105-035124-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:51:24-04:00
---
# Função plataforma.tenants_ativos() para o agendador do worker (ADR 0022)

## Contexto
O agendador das tarefas periódicas (apps/api/src/agendador.ts, ADR 0022; 1ª tarefa: alerta de etapa pendente do checkout do Core, T-0039 §2.3 passo 3) precisa listar os tenants ativos, e o macuxi_worker só enxerga plataforma.evento; o macuxi_app só vê o tenant da sessão.

## O que preciso / o que mudou
Migração nova (up/down, idempotente): create function plataforma.tenants_ativos() returns table (id uuid) language sql stable security definer set search_path = pg_catalog, plataforma as $$ select t.id from plataforma.tenant t where t.status = 'ativo' and t.deleted_at is null order by t.id $$; revoke all from public; grant execute só ao macuxi_worker (o macuxi_app NÃO). Só ids, nenhuma outra coluna. Teste de banco: worker vê os ativos de todos os tenants, não vê suspenso/encerrado/apagado; macuxi_app recebe permission denied. O worker.ts já chama 'select id from plataforma.tenants_ativos()' e, sem a função (to_regprocedure nulo), só deixa o agendador desligado com warn.

## Pronto quando
Migração e teste verdes no CI; resposta com --encerra citando o número da migração.
