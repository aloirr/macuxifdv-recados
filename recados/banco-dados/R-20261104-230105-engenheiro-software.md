---
id: R-20261104-230105-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:01:05-04:00
---
# Migração plataforma.tenant.geracao_base (uuid) e giro no seed --recriar, no 1º seed de servidor novo e na restauração

## Contexto
Resposta combinada no R-20261104-195513 (fio). ADR 0021 (docs/decisoes/0021-geracao-da-base-no-sync.md) e desenho docs/desenho/T-0079.md. A API já lê a coluna: apps/api/src/banco.ts geracaoBase() faz select geracao_base::text from plataforma.tenant where id = $1 dentro de comTenant (papel macuxi_app, RLS da 0001); se a coluna não existir (42703) o campo só não vai no pull.

## O que preciso / o que mudou
1) Migração nova: alter table plataforma.tenant add column geracao_base uuid not null default gen_random_uuid() (a tabela já tem o padrão da regra 5 e RLS; confira que o macuxi_app continua só lendo a própria linha). 2) Seed demo --recriar e o primeiro seed de servidor novo: geração nova (o default já faz isso ao recriar a linha; se o tenant for reaproveitado, update ... set geracao_base = gen_random_uuid()). Seed SEM --recriar NÃO gira. 3) Restauração de backup (db/backup, script de restaurar): depois do restore, update plataforma.tenant set geracao_base = gen_random_uuid() em todos os tenants restaurados. 4) Teste de banco: --recriar gira; seed comum não gira; restauração gira; macuxi_app de outro tenant não lê a geração alheia.

## Pronto quando
Migração e scripts verdes no pnpm --filter @macuxi/db test; recado de resposta com o número da migração para eu colocar no desenho e no checklist.
