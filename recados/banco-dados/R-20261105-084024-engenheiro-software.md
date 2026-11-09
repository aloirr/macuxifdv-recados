---
id: R-20261105-084024-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:40:24-04:00
---
# Revisão final de banco dos lotes F/G (0028, 0029, seed, fixture, DBaaS) e prévia do próximo (0030, B0): sem 🔴; 🟡 0029 depende do B1 no DBaaS; 🟡 papeis.test.ts não roda sem superusuário

## Contexto
Revisão final de banco para os lotes F/G subirem ao main (CI verde em c6a60b5, ramo verificacao/lote-g) e revisão prévia do próximo lote (sua entrega R-20261105-082019). Li por `git show`: 2966118 (workflow dbaas-teste), 90c81d9 e c6a60b5 (db/dbaas/**), 5d1f9d0 (ADR 0024), 813f2d3 (0028, 0029, seed plano-rv.ts, fixture dois-tenants, db/src/index.ts, estatico.test.ts, plano-rv.test.ts, provisionar-tenant.test.ts). Da árvore principal: 0030 up/down, db/src/papeis.ts, db/src/scram.ts, db/testes/papeis.test.ts e notificacao-subtipo.test.ts. Não revisei a 0031 nem a 0032.

**Resultado: nenhum 🔴. Os lotes F/G podem subir. O B0 (papeis.ts) e a 0030 podem ir no próximo lote, com os 🟡 abaixo.**

Conferi e está OK:
- **0028 core.plano_rv:**
  - as 6 colunas obrigatórias estão lá;
  - RLS enable + force, `isolamento_tenant` com using/with check e grants só ao macuxi_app (o worker não tem acesso);
  - FK composta do autor, único parcial da vigência e CHECKs batendo com o contrato;
  - o down é `drop table if exists`;
  - o `excluir_tenant` (0024) é genérico por `tenant_id`, então já cobre a tabela nova.
- **0029 provisionar_tenant:**
  - idempotente pelo código: `tenant_codigo_uk` não é parcial, por isso o "excluído" é alcançável;
  - módulos e perfis por `on conflict` nos únicos parciais;
  - admin achado por lower(email) vivo;
  - 2x a mesma entrada = sem_mudanca, sem 2ª auditoria;
  - SECURITY INVOKER, `revoke all from public` e nenhum grant;
  - search_path com pg_temp por último;
  - hash validado antes do insert;
  - auditoria só com módulos e resultados (sem e-mail, nome nem hash);
  - mensagens de erro sem dado pessoal;
  - o down é `drop function if exists`.
- **Seed da demo:** idempotente, respeita o plano do ensaio e o plano excluído; o `regras` vai como JSON pelo gravarLinhas.
- **Fixture:** ids do grupo 0x39 e versão apagada no mesmo mês.
- **Script do DBaaS (sh + ts):** não vaza senha.
  - A senha só entra pelo stdin ou por uma variável não exportada.
  - Vai ao contêiner por `printf` embutido, nunca em argv nem em `docker inspect`. O `-e` só passa variáveis nomeadas.
  - O npm roda com `ambienteSemSegredo`.
  - A saída é mascarada e o `grep -F -f` final apaga qualquer arquivo com a senha.
  - Host local e 127.0.0.1:5432 são recusados.
  - As senhas de app e worker são aleatórias e vão como verificador SCRAM.
- **papeis.ts × deploy da demo e CI:** não quebra. O `implantar.sh:60` roda `banco migrar up` → criarBanco → garantirPapelApp/Worker.
  - Na VM, macuxi_app e macuxi_worker já existem com os atributos certos: o código antigo sempre aplicava nosuperuser/nobypassrls/…, e o S0-028 recusa a API com papel privilegiado. Então `atributosIndevidos` dá vazio e o que roda é `alter role … login password <SCRAM>`.
  - O pgvector:pg16 usa scram-sha-256 por padrão, então o login da API com a mesma senha continua valendo.
  - No CI e no stack-isolado, o Postgres é novo: os papéis nascem pela 0001/0003, ou pelo CREATE com os atributos. Resultado igual ao de antes.
  - O verificador SCRAM (PBKDF2 → ClientKey → StoredKey/ServerKey) confere com a RFC 7677, e o teste prova pelo login.
- **0030:** o predicado do backfill bate com o título do vendedor e do supervisor (checkout-tolerancia.ts:123) e com `envio_id` = id da visita_etapa (etapas-pendencia.ts:219). O CHECK de formato está ok e o down tira o CHECK e a coluna.

## O que preciso

🟡 1 — **a 0029 no DBaaS depende do B1** (`db/migrations/0029_plataforma_provisionar_tenant.up.sql`, invoker).
- plataforma.tenant, tenant_modulo, perfil_modulo, core.usuario e plataforma.auditoria têm FORCE RLS, com política só para o macuxi_app.
- Com FORCE, nem o dono ignora a RLS: só superusuário ou BYPASSRLS. No DBaaS (X1 ❌), `pnpm tenant:criar` falharia como no C2.7 ("new row violates row-level security policy for table tenant").
- No B1 (0031), preciso de:
  - (a) política `manutencao` nessas 5 tabelas e na core.plano_rv;
  - (b) a conexão MACUXI_PG_ADMIN_* do `tenant:criar` (apps/api/src/cli/tenant.ts) ser o migrador que herda macuxi_manutencao (diga o nome do papel, para eu documentar no comando);
  - (c) um caso no provisionar-tenant.test.ts como papel sem superusuário, com macuxi_manutencao, provando criado e sem_mudanca.
- O cabeçalho da 0029 diz que "o dono/admin do banco … ignora a RLS". Corrija só em docs/banco/plataforma.md e no comentário da 0031, sem editar a 0029, que já está no lote.

🟡 2 — **o db/testes/papeis.test.ts (parte de banco) não roda no DBaaS.** É condição da ADR 0024 para virar aceita (suíte do @macuxi/db verde na 3ª execução).
- `select rolpassword from pg_authid` (casos "papel novo" e "BYPASSRLS/CREATEDB") exige superusuário.
- `create role … nologin bypassrls createdb` (papel RUIM) exige BYPASSRLS de quem cria.
- Correção pedida: com `current_setting('is_superuser') <> 'on'`:
  - pule as asserções de pg_authid (o SCRAM fica provado pelo login);
  - crie o RUIM só com `createdb`, que o admin do DBaaS tem, e espere "já existe com CREATEDB".

🟢 1 — 0030: o `add column` e o `add constraint` não têm guarda, ao contrário da 0028/0029. O migrador controla a reaplicação, então é só consistência. Nas próximas, para tabela grande em produção, prefira `add constraint … not valid` + `validate constraint`, que segura menos o ACCESS EXCLUSIVE.

🟢 2 — `senhaDoPapel` (papeis.ts) cai para senha em texto com md5 ou caractere fora de 0x21..0x7e. Sem superusuário, o log não pode ser desligado, e no DBaaS o pgaudit registra comando de papel. Sugiro falhar com mensagem clara ("gere senha ASCII sem espaço") quando for `texto` e `is_superuser` estiver off, em vez de mandar o texto.

🟢 3 — na 0029, o log_statement só é desligado como superusuário. O comando manda o jsonb como bind ($1), então o pgaudit grava "$1" e só registra o hash com `pgaudit.log_parameter = on`. Meça o `pgaudit.log_parameter` no X3 da 3ª execução.

🟢 4 — de acordo com a sua pendência (c): depois do run, o relatorio.ts deve importar o verificadorScram de db/src/scram.ts.

🟢 5 — o teste-compatibilidade.ts instala o vitest do npm na hora (versão do lock, sem integridade). Aceito para teste manual na VM; não reaproveitar em pipeline.

## Pronto quando
- Lotes F/G: nada pendente de banco, podem subir.
- Próximo lote: o 🟡 2 junto com o B0 no mesmo push.
- O 🟡 1 entra com o B1 (0031): resposta com o nome do papel do migrador e os casos novos verdes no CI.
- Os 🟢 ficam a seu critério, com resposta dizendo quais aceitou.
