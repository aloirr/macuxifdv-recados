---
id: R-20261107-173315-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T17:33:15-04:00
---
# T-0093 fatia S entregue: API do portal com admin do cliente, CLI super-admin, deploy sem convite; tudo verde (sem Docker)

## Contexto
T-0093 fatia S (engenheiro-software), desenho docs/desenho/T-0093.md §4, §6, §7 e §12 (novo: o que foi feito). Entra no main no MESMO lote das fatias B (banco-dados, 0039) e C (modulo-core): a API chama as sa_* da 0039 e o `autenticarPortal` do Core.

## O que fiz
1. **API** (`apps/api/src/app.ts`, `apps/api/src/plataforma.ts`):
   - `autenticarPortal` do Core no lugar do `autenticarSuperAdmin` (transição: se só o antigo existir, vale como super-admin);
   - rotas de módulo com `superAdmin: 'aceita'`: o admin do cliente entra como o usuário `admin` REAL da empresa escolhida (licença do perfil, ação/perfil do manifesto e carteira do Core; sem `ctx.superAdmin`); cabeçalho `x-macuxi-tenant` de outra empresa = 403 `EMPRESA_NAO_PERMITIDA`; sem empresa escolhida = 409 `EMPRESA_NAO_ESCOLHIDA`; sem cabeçalho = 400; `'exige'` = 403;
   - `GET /v1/plataforma/empresas` para os dois tipos (a função filtra); `POST` só super-admin (403 `PERFIL_SEM_ACESSO` para o cliente, antes do banco);
   - passo Empresa com o admin inicial (RN-CORE-34): RN-CORE-32 do Core (422 `RN-CORE-32` com `detalhes.faltas` e `campo`), e-mail normalizado pelo Core, só o hash argon2id (`@macuxi/db`, o do tenant:criar) ao banco; nunca manda `sem_admin` nem `redefinir_senha` (a 0039 recusa); resposta `admin: criado|existente|null`; empresa nova sem admin = 422 `RN-CORE-34` quando o banco recusar com 22023 + hint `RN-CORE-34` (banco-dados, R-20261107-165801);
   - auditoria `sa.requisicao` com `ator_tipo`, `super_admin_id` e `usuario_id` (também nas recusadas).
2. **CLI** `apps/api/src/cli/super-admin.ts` + scripts `super-admin` (apps/api e raiz): `pnpm super-admin <criar|redefinir|desativar> --email ... [--nome] [--simular] [--confirmar <email>]`; senha só por `MACUXI_SUPERADMIN_SENHA` (apagada do ambiente logo no início, também no desativar e em erro de uso) ou digitada com eco desligado; `--senha`/`--password`/`--*hash*` recusados sem repetir o valor; RN-CORE-32 do Core e hash argon2id do `@macuxi/db`; chama `plataforma.criar_super_admin` pela conexão de administração; saída = 1 linha JSON com o e-mail mascarado; `nao_encontrado` = saída 1.
3. **Deploy**: serviço `super-admin` (perfil `ferramentas`) em `scripts/deploy/demo/compose.yml` (.env, rede interna) e `scripts/deploy/producao/compose.yml` (.env + banco.env + admin.env); convite fora do `implantar.sh` da demo, do `env.modelo` e dos comentários (o `preparar-vm.sh` continua gerando a `MACUXI_CHAVE_TOTP`, sem uso, para o stack-isolado não mudar); `banco-dbaas.sh` passo 6 com as 12 sa_* da 0039, a interna nova e a conferência de que `criar_super_admin` não executa como app/worker/portal.
4. **Testes**: `apps/api/test/super-admin.test.ts` (admin do cliente: usuário real, licença do perfil, pedido.criar 403, outra empresa 403, sem empresa 409, 'exige' 403, POST empresas 403, auditoria com ator_tipo; passo Empresa: só hash ao banco, RN-CORE-32 com faltas, RN-CORE-34 pelo hint), `cli-super-admin.test.ts` (novo), `cli-tenant.test.ts` (senha com especial), `funcoes-sa.ts`/`funcoes-sa.test.ts` (listas da 0039; migrações aplicadas em ordem com drops e revokes), `portal.banco.test.ts` (CI: tabelas novas ilegíveis pelo portal; criar_super_admin 42501 para app e portal).
5. **Desenho** §7: passo a passo para aplicar o `T-0093-workflows.diff` e **alinhar a árvore local ao main** depois (git diff --stat origin/main -- .github/workflows vazio; senão git checkout origin/main -- .github/workflows). Environments e secrets do diff conferidos com o recado do dono do produto (R-20261107-163525): DEMO_SSH_KEY + DEMO_SUPERADMIN_SENHA, PRODUCAO + PROD_SUPERADMIN_SENHA.

## Verificação
- platform-sdk: eslint 0, tsc 0, vitest 631/631.
- apps/api: tsc 0; eslint 0 nos arquivos tocados; vitest 257 passed, 64 skipped (os *.banco.test.ts, que rodam no CI); os 4 arquivos tocados 63/63.
- Typecheck conferido de novo depois da última mudança em AcessoPortalAutenticado, com o Core da fatia C e o web da W em andamento: api 0, web 0, @macuxi/core 0 (api + web + mobile).
- `git apply --check docs/desenho/T-0093-workflows.diff` limpo; `bash -n` nos 4 scripts de deploy; `node scripts/coord.mjs verificar engenheiro-software` sem violações. Sem Docker.

## Pendências
- **banco-dados**: recusa RN-CORE-34 na `sa_provisionar_tenant` FEITA (R-20261107-165801, teste de banco no CI); a API já traduz em 422.
- **eu, depois de C e W**: remover do SDK os schemas antigos (§5), `SENHA_SUPER_ADMIN_MIN`, `autenticarSuperAdmin` e a transição no `app.ts`; revisão final (R).
- `*.banco.test.ts` e o stack isolado só no CI (sem Docker).

## Para o dono do produto (o gerente repassa)
Estado pelos recados de 16h35 e 16h39 do dono (R-20261107-163525 e R-20261107-163945):
1. Ok no `docs/desenho/T-0093-workflows.diff`: DADO. O gerente aplica com o trailer do dono, no mesmo lote de B, C e S ou depois, e alinha a árvore local ao main (desenho §7, passos 1 a 3).
2. Secrets `DEMO_SUPERADMIN_SENHA` (environment DEMO_SSH_KEY) e `PROD_SUPERADMIN_SENHA` (environment PRODUCAO) na RN-CORE-32: CRIADOS (nomes e environments batem com o diff).
3. `PROD_TENANT_ADMIN_SENHA` com caractere especial (o `tenant:criar` passa a recusar sem ele, RN-CORE-32): CONFERIDO por ele.
4. FALTA: com o lote no main, CI verde e demo publicada, o gerente avisa "pode rodar o demo — super-admin" com o sha; ele roda simulando e depois de verdade (ação criar, o e-mail dele), entra no config-demo só com e-mail e senha (critério 8) e só então apaga `DEMO_SUPERADMIN_CONVITE` e `PROD_SUPERADMIN_CONVITE`.
