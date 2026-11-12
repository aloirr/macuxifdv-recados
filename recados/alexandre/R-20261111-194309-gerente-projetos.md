---
id: R-20261111-194309-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-200839-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T19:43:09-04:00
---
# Produção: comece pela chave SSH, depois VM e DBaaS na mesma VPC (etapas 1 a 3, passo a passo); a lista final de secrets e o SMTP chegam em ~40 min

## Contexto
Resposta ao seu R-20261111-200839: "por onde devo começar?". A ordem segue o `docs/status/producao.md` §4. Você me avisa a cada etapa concluída e eu mando a seguinte. Em paralelo, o engenheiro-software confere no workflow a lista final de secrets e os nomes do SMTP (Brevo), com entrega em ~40 min.

## Comece por aqui, na ordem

**Etapa 1. Chave SSH só da produção (no seu PC, 2 min)**
- No PowerShell: `ssh-keygen -t ed25519 -C "macuxi-prod-deploy" -f $HOME\.ssh\macuxi-prod-deploy`. Use uma senha vazia, porque o deploy roda sozinho no GitHub.
- Saem dois arquivos:
  - `macuxi-prod-deploy.pub` (pública): vai para a VM na etapa 2;
  - `macuxi-prod-deploy` (privada): vai **só** para o secret `PROD_SSH_KEY` na etapa 6. Não mande essa chave a ninguém e não a coloque no repositório.

**Etapa 2. VM `macuxi-prod-se1` (console da Magalu)**
- Ubuntu 24.04, região br-se1, disco de 40 GB ou mais.
- Crie numa **VPC nova** (por exemplo `macuxi-prod`). O banco da etapa 3 tem de ficar na **mesma VPC**.
- Grupo de segurança **só com a porta 22**. O túnel da Cloudflare é conexão de saída, então nenhuma outra porta abre.
- Chave SSH: cole o conteúdo do `macuxi-prod-deploy.pub`. Usuário: `ubuntu`.
- Anote o **IP público** da VM. Ele vai para o secret `PROD_HOST`.

**Etapa 3. Banco `macuxi-prod-db` (DBaaS)**
- PostgreSQL 16, 2 vCPU e 8 GB, na **mesma VPC** da VM, com criptografia em repouso.
- Anote o **IP privado**, o **usuário admin** e a **senha**.
- Se o console oferecer o certificado da CA, baixe o PEM. Ele vai para o secret opcional `PROD_PG_CA_CERT`, que é o recomendado.
- Não crie banco nem papel: o 1º deploy faz isso.

Quando terminar as etapas 1 a 3, mande "etapas 1-3 ok" no chat ou por recado. Aí eu mando as etapas 4 a 6: bucket, túnel na Cloudflare, environment `PRODUCAO` e a lista final de secrets, já com o SMTP e o `PROD_SUPERADMIN_SENHA`.

## ERPs
Confirmados para os modelos prontos: TOTVS Protheus, TOTVS WinThor, SAP Business One, Sankhya e Senior. Abro a tarefa e os modelos entram na esteira depois da v1.0.4.

## Pronto quando
Seu aviso "etapas 1-3 ok".
