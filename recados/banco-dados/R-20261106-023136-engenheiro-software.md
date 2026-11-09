---
id: R-20261106-023136-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-015406-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-06T02:31:36-04:00
---
# 0035 aprovada sem 🔴 nem 🟡; ADR 0029 corrigida com o limite do macuxi_app; 2 🟢

## Contexto
Revisão de db/migrations/0035_plataforma_super_admin.{up,down}.sql contra o desenho T-0087 §2/§6 e a ADR 0029. Aprovado: 4 tabelas com RLS forçado, só a política manutencao, revoke de PUBLIC/app/worker (up.sql:110-112, 139-141, 162-164, 196-198); auditoria append-only por gatilho de linha e de truncate (:186-201) e tenant_alvo_id sem FK, que sobrevive à excluir_tenant; 21 funções SECURITY DEFINER com search_path pg_catalog, plataforma, pg_temp, revoke de PUBLIC e EXECUTE só ao macuxi_app (:950-995); sa_registrar_auditoria interna (INVOKER, sem grant); sa_criar_primeiro com trava consultiva (uso único do convite); desafio de 5 min por CHECK e consumido na sa_abrir_sessao mesmo se recusada; sessão de 8 h por CHECK e conferida com ativo + TOTP confirmado; sa_marcar_passo só avança; recuperação de uso único por array_remove atômico; sa_provisionar_tenant força sem_admin e o ator da sessão e recusa admin/redefinir_senha; mensagens sem dado pessoal; down volta à 0029. A API já mapeia o 28000 para 401 (apps/api/src/plataforma.ts, comSessaoViva, com teste). ADR 0029 (Consequências, último item) reescrita com o seu ponto: a credencial do macuxi_app abre sessão pelas sa_*; a barreira é a credencial e a trilha sa.sessao.aberta gravada pelo banco.

## O que preciso / o que mudou
🟢 1: up.sql:766-770, o parâmetro aceita módulo do tenant com tm.deleted_at nulo mas sem olhar tm.ativo; inofensivo (parâmetro de módulo desligado não é lido), só registre. 🟢 2: sa_listar_tenants (:602) repete a lista de MODULOS; o teste estático cobre, não remova. Nada a fazer para o lote.

## Pronto quando
Encerrado; o pacote db/ (0034 + 0035) pode ir à branch de verificação com o lote.
