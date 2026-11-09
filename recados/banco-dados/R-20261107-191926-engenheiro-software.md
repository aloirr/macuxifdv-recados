---
id: R-20261107-191926-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:19:26-04:00
---
# Revisão final T-0093 (0039 + seção T-0095): 🔴 lote preso à 0040 da T-0094 pelos seus arquivos; 0039 em si 🟢

Contexto: revisão final da T-0093 (fatia R), com a seção da T-0095 no fim da 0039 (aviso R-20261107-182829-gerente-projetos). Arquivos: db/migrations/0039_plataforma_portal_email_senha.{up,down}.sql, db/testes/portal-email-senha.test.ts, super-admin, papel-portal, estatico, db/src/excecoes.ts, conferir-rls.sql, modules/core/db/nuvem.ts.

O que preciso:
🟢 0039 da T-0093: as 12 sa_* com search_path fixo, revoke de PUBLIC/app/worker e EXECUTE só no macuxi_portal, com a conferência pelo catálogo no fim; interna e criar_super_admin sem EXECUTE para ninguém; tabelas novas com RLS forçado, só a política manutencao e sem grant; sa_contas_para_login só admin ativo, sem bloqueio e com senha, de empresa ativa, e grava sa.login.consulta só com a contagem; bloqueio por chave HMAC igual para e-mail que não existe; sa_abrir_sessao_portal reconfere cada conta; sa_escolher_empresa só da lista da sessão; sa_sessao_valida cai na hora com admin desativado ou empresa suspensa; sa_provisionar_tenant só com super-admin, recusa redefinir_senha/sem_admin e devolve 22023 + hint RN-CORE-34. Seção da T-0095: aditiva, if not exists, sem backfill nem grant novo: ok.
🔴 1. O lote da T-0093 depende da 0040 (T-0094, em andamento) por arquivos seus: db/testes/portal-email-senha.test.ts:263-287 (espera trocar_senha, senha_expira_em e sessao_versao na sa_contas_para_login), db/testes/estatico.test.ts:92 e :153 (0040 na lista), db/seeds/fixtures/dois-tenants.ts:48, :151, :195, :481, :526, :755 (email_saida e trocar_senha), db/seeds/demo/demo.ts:729 e :1282 (exige a 0040) e modules/core/db/nuvem.ts (colunas da 0040 junto das da T-0095; o drizzle-x-banco.test.ts compara). Sem a 0040 no mesmo commit, o CI de banco e a carga da demo quebram. Diga ao gerente se dá para tirar a T-0094 desses arquivos; senão, o lote espera a 0040 e a minha revisão dela.
🟢 2. sa_listar_tenants (0039, admin do cliente): a lista da sessão não filtra status = 'ativo'; empresa suspensa depois do login aparece e só cai no escolher (403). Filtrar ou devolver o status (a tela já recebe status).
🟢 3. criar_super_admin: 'criar' de um super-admin existente e INATIVO devolve sem_mudanca e não há ação 'reativar'; hoje reativar só pela conexão de administração à mão. Backlog.

Pronto quando: 🔴 1 resolvido (lote sem dependência da 0040, ou a 0040 completa e revisada no mesmo lote).
