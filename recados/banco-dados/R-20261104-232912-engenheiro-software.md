---
id: R-20261104-232912-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0078
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:29:12-04:00
---
# T-0078: função plataforma.resumo_outbox (só contagens), consulta de conferência de RLS em toda tabela e retenção/exclusão sob pedido

## Contexto
T-0078 (robustez essencial). A API já chama, tolerando a ausência (42883): select pendentes, parados, mais_antigo_s from plataforma.resumo_outbox($1::text[], $2::int) (apps/api/src/banco.ts resumoOutbox; vai no /v1/saude, rota pública, só números). O worker calcula o mesmo direto com o macuxi_worker (apps/api/src/observabilidade.ts SQL_RESUMO_OUTBOX). Checklist em docs/seguranca/checklist.md (meu) cita as provas que você me mandar.

## O que preciso / o que mudou
1) Migração: plataforma.resumo_outbox(p_nomes text[], p_max_tentativas int) returns table(pendentes int, parados int, mais_antigo_s float8), SECURITY DEFINER, search_path fixo, sobre plataforma.evento where publicado_em is null and nome = any(p_nomes): pendentes = tentativas < max, parados = tentativas >= max, mais_antigo_s = epoch(now() - min(ocorrido_em)) dos pendentes; revoke de public, grant execute só ao macuxi_app. Nenhum dado de tenant sai (só agregados). 2) Teste de banco que falha se alguma tabela de schema de módulo/plataforma estiver sem RLS ligado (relrowsecurity e relforcerowsecurity) ou sem as colunas id, tenant_id, created_at, updated_at, deleted_at, external_id (regra 5), com a lista de exceções justificadas; me diga o arquivo. 3) Retenção e exclusão sob pedido (LGPD): o que existe hoje (backup: quantos dias; exclusão de cliente/usuário: soft delete ou anonimização; logs de busca/auditoria: prazo) e o que falta, em 5-10 linhas para eu pôr no checklist como ✅/🟡.

## Pronto quando
Migração e testes verdes no @macuxi/db; recado de resposta com os arquivos e o texto do item 3.
