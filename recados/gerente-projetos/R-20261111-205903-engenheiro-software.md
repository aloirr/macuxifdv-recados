---
id: R-20261111-205903-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0086
responde_a: R-20261111-200839-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T20:59:03-04:00
---
# T-0086/T-0157: secrets finais do PRODUCAO, nomes SMTP (Brevo) e patch docs/desenho/T-0086-smtp-producao.patch

## Contexto
Resposta ao R-20261111-200839-alexandre (itens 4.2 e 4.3): secrets finais do environment PRODUCAO e SMTP da produção pelo Brevo. Não mexi na v1.0.4. Nenhum valor de segredo aqui.

## O que fiz
1. **SMTP na produção**, em caminhos meus, com teste:
   - `scripts/deploy/producao/compose.yml`: novo `email.env` (opcional), lido **só pela api e pelo worker**. O backup e as ferramentas não recebem a senha SMTP; por isso ela não vai no `segredos.env`.
   - `scripts/deploy/producao/env.modelo`: bloco `email.env` com os 6 nomes (antes estavam comentados como "pendente").
   - `scripts/deploy/producao/preparar-vm.sh`: o `email.env` entra no acerto de dono e modo 600.
   - Teste novo `scripts/ci/producao-email.test.mjs` (5/5; `node --test scripts/ci/*.test.mjs` 35/35; eslint limpo). Ele confere `config.ts` da API × env.modelo × compose × preparar-vm × workflow (ou o patch, até o rito).
2. **Patch de governança** `docs/desenho/T-0086-smtp-producao.patch`. `git apply --check` passa contra o HEAD (4d121d89). Ele faz três coisas:
   - o `producao-publicar.yml` confere os `PROD_SMTP_*` antes do SSH e grava o `email.env`. Sem `PROD_SMTP_HOST`, o arquivo fica vazio e o e-mail desligado;
   - o `producao-publicar.yml` deixa de ler o `PROD_SUPERADMIN_CONVITE` (ADR 0031);
   - cria o `producao-super-admin.yml`, a parte da produção do `docs/desenho/T-0093-workflows.diff`, **que nunca foi aplicado**. Sem ele, o `PROD_SUPERADMIN_SENHA` não tem uso e ninguém entra no `config.` para criar a empresa.
   - O patch e os 3 arquivos de `scripts/deploy/producao` + o teste vão no mesmo commit.

## Tabela final — environment PRODUCAO
| Secret | Obrigatório | Valor |
|---|---|---|
| `PROD_SSH_KEY` | sim | chave privada OpenSSH inteira, só da produção |
| `PROD_HOST` | sim | IP público da VM `macuxi-prod-se1` |
| `PROD_USER` | sim | `ubuntu` |
| `PROD_PG_HOST` | sim | IP privado do DBaaS `macuxi-prod-db` |
| `PROD_PG_ADMIN_USUARIO` | sim | usuário admin do DBaaS (minúsculas, dígitos e `_`) |
| `PROD_PG_ADMIN_SENHA` | sim | senha do admin. Use uma senha **sem `$`, aspas, `#` nem espaço**: o `admin.env` é gravado sem aspas e o compose interpola `$` |
| `PROD_S3_KEY_ID` | sim | ID da chave do Object Storage do bucket `macuxi-prod` |
| `PROD_S3_SECRET` | sim | segredo dessa chave |
| `PROD_CLOUDFLARE_TUNNEL_TOKEN` | sim | token do túnel `macuxi-prod` |
| `PROD_SUPERADMIN_SENHA` | sim, para entrar no `config.` | senha do seu super-admin (RN-CORE-32: 8 ou mais, com letra, número e caractere especial). Usada só pelo workflow `producao — super-admin`; troque ou apague depois de criar |
| `PROD_SMTP_HOST` | sim, para o e-mail | `smtp-relay.brevo.com` |
| `PROD_SMTP_USUARIO` | sim, com o HOST | login SMTP do Brevo (SMTP & API → SMTP, formato `...@smtp-brevo.com`) |
| `PROD_SMTP_SENHA` | sim, com o HOST | **chave SMTP** do Brevo (não é a API key). Sem aspas simples |
| `PROD_SMTP_REMETENTE` | não | padrão `Macuxi FDV <nao-responda@macuxifdv.com.br>`. O remetente ou o domínio precisa estar validado no Brevo (SPF/DKIM no DNS da Cloudflare) |
| `PROD_SMTP_PORTA` | não | padrão `587` |
| `PROD_SMTP_TLS` | não | padrão `starttls`; `tls` só com a porta 465 |
| `PROD_PG_PORTA` | não | padrão 5432 |
| `PROD_PG_CA_CERT` | não, recomendado | PEM da CA do DBaaS: o TLS passa a `verify-full` |
| `PROD_SSH_KNOWN_HOSTS` | não | linha `ssh-ed25519` da VM. Sem ela, vale a 1ª conexão |
| `PROD_ALERTA_WEBHOOK` | não | tópico ntfy.sh ou webhook Slack/Discord |
| `MACUXI_RECADOS_TOKEN_SERVIDOR` | não | T-0158/ADR 0043: token fine-grained só do `aloirr/macuxifdv-recados`, Contents read/write. Liga o recado automático do diagnóstico. O nome não tem `PROD_`; no environment, vale sobre o do repositório |
| `PROD_TENANT_ADMIN_SENHA` | não (plano B) | só para o `producao — criar tenant`. A empresa agora nasce no `config.`, no passo Empresa, pelo super-admin (RN-CORE-34) |
| ~~`PROD_SUPERADMIN_CONVITE`~~ | **não criar** | removido (ADR 0031). Se já existir, apague |

Ordem do 1º uso: tag `v*` → aprovar o `producao — publicar` → `producao — super-admin` (simular, depois de verdade) → entrar em `config.macuxifdv.com.br` → criar a empresa.

## Nomes SMTP
O secret `PROD_SMTP_X` vira `MACUXI_SMTP_X`, que é o que `apps/api/src/email/config.ts` lê. Os nomes são HOST, PORTA, TLS, USUARIO, SENHA e REMETENTE. Nenhuma variável nova.

## Pendências e alertas
- **Bloqueante: árvore local defasada.** No `C:\macuxifdv`, o working tree de `.github/workflows/demo-publicar.yml`, `.github/workflows/producao-publicar.yml`, `scripts/coord-lib.mjs`, `scripts/coord-recados.test.mjs` e `scripts/coord.mjs` **desfaz o commit 4d121d89 (T-0158)**. Commitar como está apaga o T-0158. Por isso o patch não aplica no working tree, só no HEAD. Antes de aplicar o patch, confira se não há trabalho seu nesses arquivos e restaure-os do HEAD (`git checkout HEAD -- <arquivos>`). Os `apps/api/src/*` modificados não conferi.
- A parte da demo do `T-0093-workflows.diff` (`demo-publicar` sem convite e o novo `demo-super-admin.yml`) não aplica mais por causa do T-0158. Refaço quando você pedir.
- `verificar engenheiro-software`: a única violação é `.vscode/settings.json` (sem dono), que não é minha.

## Pronto quando
Você aplica o patch com o "aprovo" do Alexandre e publica a tabela no `docs/status/producao.md` §4.6.
