---
id: R-20261111-214257-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-213829-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T21:42:57-04:00
---
# Produção: regra 'aprovo deploy vX.Y.Z' registrada; lista final de secrets (DBaaS, bucket, SMTP Brevo); preciso do seu aprovo no patch T-0086 (SMTP + producao-super-admin)

## Contexto
Respondo ao seu R-20261111-213829 (regra do deploy e andamento) e ao R-20261111-212210 (lista final de secrets). A lista foi conferida no workflow pelo engenheiro-software (R-20261111-205903) e já está no `docs/status/producao.md` §4.6.

## Regra do deploy registrada (opção 2)
- Está no doc 07 e no `docs/status/producao.md`.
- Nenhuma tag `v*` e nenhum run do "producao — publicar" sem o seu recado "aprovo deploy vX.Y.Z" para a versão exata. Cito o ID do seu recado na mensagem da tag.
- Tirei de lá a menção a Required reviewers.
- A opção 1 ficou anotada e não começou.

## O que falta você criar
**DBaaS `macuxi-prod-db`:**
- PostgreSQL 16, 2 vCPU e 8 GB, na **mesma VPC da VM**, com criptografia em repouso.
- Secrets: `PROD_PG_HOST` (IP privado), `PROD_PG_ADMIN_USUARIO` e `PROD_PG_ADMIN_SENHA`. A senha não pode ter `$`, aspas, `#` nem espaço.
- Opcional, mas recomendado: `PROD_PG_CA_CERT`, o PEM da CA.

**Bucket:**
- Se `macuxi-prod` não for aceito, use **`macuxifdv-prod`** e me avise. Eu peço a troca do nome fixo no `compose.yml` e no `conector-publicar.yml` pelo rito.
- Crie a chave de Object Storage com leitura e escrita nele. Secrets: `PROD_S3_KEY_ID` e `PROD_S3_SECRET`.
- **Aproveite e crie uma 2ª chave**, ou use a mesma, para o bucket de APK do BUILD PRONTO. São as 5 variáveis `MACUXI_APK_S3_*`.

**SMTP (Brevo), para o e-mail de 1º acesso:**
- Obrigatórios: `PROD_SMTP_HOST` = `smtp-relay.brevo.com`, `PROD_SMTP_USUARIO` (login SMTP do Brevo) e `PROD_SMTP_SENHA` (chave SMTP do Brevo).
- Opcionais: `PROD_SMTP_PORTA` (padrão 587), `PROD_SMTP_TLS` (padrão `starttls`) e `PROD_SMTP_REMETENTE` (ex.: `Macuxi FDV <nao-responda@macuxifdv.com.br>`, com o domínio validado no Brevo).

**Não crie:** `PROD_SUPERADMIN_CONVITE`. Ele foi substituído pelo `PROD_SUPERADMIN_SENHA`, que você já gravou. O `PROD_TENANT_ADMIN_SENHA` que você gravou fica só como plano B.

**Opcionais:** `PROD_PG_PORTA`, `PROD_SSH_KNOWN_HOSTS`, `PROD_ALERTA_WEBHOOK` e `MACUXI_RECADOS_TOKEN_SERVIDOR` (alerta do diagnóstico por recado).

## Preciso do seu "aprovo" (governança) para o 1º deploy funcionar
O patch `docs/desenho/T-0086-smtp-producao.patch` faz duas coisas:
1. grava os `PROD_SMTP_*` no `email.env` da VM, lido só pela api e pelo worker, fora do backup;
2. traz o workflow **`producao-super-admin.yml`**, que nunca chegou ao main. **Sem ele, ninguém entra no config. para criar a empresa.**

Responda **"aprovo patch T-0086 smtp e super-admin"** e eu aplico pelo rito, com CI, antes do seu "aprovo deploy".

## Pronto quando
Você me avisa "DBaaS e bucket ok" e responde ao "aprovo" do patch.
