---
id: R-20261108-011925-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T01:19:25-04:00
---
# T-0094 fatia S (com T-0111): e-mail pela outbox, PERFIL_SEM_BKO, perfis pela 0041, RN-CORE-35 e redefinir senha do admin pelo portal

## Contexto
Fatia S da T-0094 (com o item da T-0111), retomada depois da 2ª queda, sem refazer o que estava pronto. Os itens 1 (export do motor no index do SDK, com o do e-mail) e 2 (definirModuloApi aceita as chaves da plataforma no Core, R-20261107-215501) já estavam feitos; o .txt da T-0111 não existe mais.

## O que preciso / o que mudou
O que foi feito:
1. E-mail (desenho §10; ADR 0032 §6):
   - porta `ServicoEmail` no SDK (`packages/platform-sdk/src/email/porta.ts`) com `MensagemEmailSchema` e `criarServicoEmailMemoria`;
   - modelos com os textos do design (`docs/design/ciclo-de-senha.md` §8): "Seu acesso ao Macuxi" e "Sua nova senha do Macuxi", com onde entrar, validade e motivo;
   - API (`apps/api/src/email/servico.ts`): `enfileirar(db, m)` faz um `insert ... on conflict (tenant_id, chave_idempotencia) do nothing` em `plataforma.email_saida` pela conexão da transação do tenant;
   - a carga vai cifrada (AES-256-GCM, AAD `id|tenant|modelo`), com chave HKDF-SHA256 do `MACUXI_JWT_SEGREDO` (`info macuxi.email_saida.v1`). Não existe mais `MACUXI_EMAIL_CHAVE`;
   - despachante (`apps/api/src/email/despachante.ts`) no worker, papel `macuxi_worker`: uma linha por transação com `for update skip locked`; envio zera a carga; 8 tentativas com espera crescente; vencido, 5xx ou cifra inválida = falha final com a carga zerada;
   - aproveita o SMTP, o MIME, os modelos e o adaptador de arquivo do #104 (`MACUXI_EMAIL_ARQUIVO_DIR`). O pg-boss saiu (`fila.ts` apagado);
   - sem `MACUXI_SMTP_HOST` nem `MACUXI_EMAIL_ARQUIVO_DIR`, o e-mail fica desligado (`disponivel() = false`);
   - `ctx.email` chega às rotas de módulo e às públicas (opção `email` do `createApp`; o `servidor.ts` monta pela configuração);
   - `src/**/*.test.ts` entram no `vitest.config.ts` da API, então rodam no CI. Há teste da porta 465 com TLS implícito, com certificado de teste: entrega com AUTH, e CA desconhecida dá `EMAIL_TLS_INDISPONIVEL` antes de qualquer comando.
2. Perfis e log:
   - `PERFIS_DO_APP.web` sem o supervisor;
   - 403 `PERFIL_SEM_BKO` no `app.ts`, na ordem 401 → licença → superfície → RN-PRO-01 → ação → Zod;
   - redação do pino com `senha_atual`, `senha_nova`, `para` e `dados.senha/login`.
3. Perfis lidos por requisição de `plataforma.perfis_do_usuario` (0041) em `licencas.ts`. Os módulos passam a ser a união dos perfis.
4. `combinarPerfis` pela RN-CORE-35: união nas ações; BKO e portal pela regra mais restritiva. A RN-PRO-01 vale só se todos os perfis forem promotor. Registrado na ADR 0033 §6.
5. Rotas do super-admin no `apps/api/src/plataforma.ts`, com os contratos no SDK:
   - `GET /v1/plataforma/empresas/:tenant_id/admins`;
   - `POST /v1/plataforma/empresas/:tenant_id/admins/:usuario_id/redefinir-senha`, que usa as `sa_*` da 0042 do banco-dados;
   - `SA_PORTAL` com 14 em `funcoes-sa.ts` e no `banco-dbaas.sh`.
6. Extras:
   - `ContextoShell.perfis` (pedido do engenheiro-apps);
   - `vendedor.pedido.cancelado@1` no `eventos.md` (T-0114);
   - ADR 0032 e desenho `T-0094-email.md` atualizados;
   - `env.modelo` com os nomes `MACUXI_SMTP_*`.

Testes:
- platform-sdk: lint 0, typecheck 0, test 0 (48 arquivos, 695+ casos);
- apps/api: lint 0 (só avisos antigos de hora-fixa em arquivos de outros testes), typecheck 0, test 0 (337 passaram; os de banco pulam no PC);
- arquivos novos: `apps/api/src/email/despachante.test.ts`, `apps/api/test/fatia-s-t0094.test.ts` e os casos novos em `super-admin.test.ts`, `log-seguro.test.ts`, `permissoes-perfil.test.ts` e `shell.test.ts`;
- `node scripts/coord.mjs verificar engenheiro-software`: OK.

Pendências:
- (a) modulo-core: reexportar `gerarSenhaTemporaria` em `@macuxi/core/api` (R-20261108-002257). Até lá a API lê o nome de forma tolerante e, sem ele, o redefinir do portal falha fechado (500, nada muda). Quando o export chegar, trocar pelo import nomeado.
- (b) engenheiro-apps: o botão no portal (R-20261108-005744).
- (c) modulo-core: perfis no `GET /v1/me/modulos`, para os shells (R-20261108-005753).
- (d) testes: virar o CS-09 e o MP-05 (nomes no R-20261108-005709).
- (e) A demo fica com o e-mail desligado até haver SMTP: o BKO mostra a senha e a Equipe por CSV recusa.
- (f) Secrets `PROD_SMTP_*` e o passo no `producao-publicar.yml`, quando o dono do produto criar os secrets.
- (g) Testes de banco (0040/0041/0042, `banco.test.ts` com os perfis, `portal.banco.test.ts`) só no CI, no lote com B, C, S, W e T.

## Pronto quando
Revisão final (R) depois que C, W e T fecharem; o lote sobe com a 0039–0042 juntas.
