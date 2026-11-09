---
id: R-20261104-014118-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T01:41:18-04:00
---
# T-0074 entregas (a)+(b)+(c): ADR 0020, preparo da VM, compose, Dockerfile da API, workflows GHCR/deploy/recriar e adaptador S3 com teste de isolamento

## Contexto
T-0074 v2, entregas (a), (b) e (c) juntas, porque ficaram prontas na mesma passada. **Caminho do primeiro deploy: o WORKFLOW, depois do seu push.** A chave macuxi-deploy-v2 não está no PC (bloqueio R-20261104-002743): em C:\Users\domon\.ssh só há a v1, que não usei. Por isso o workflow roda o preparar-vm.sh na VM antes do compose. Nada foi feito na VM ainda.

**(a) ADR, scripts e compose**
- docs/decisoes/0020-ambiente-demo-magalu-cloud.md (PROPOSTA) e complemento no fim da docs/decisoes/0010-fotos-e-arquivos-enviados-pelo-aparelho.md
- docs/desenho/T-0074.md
- scripts/deploy/demo/preparar-vm.sh, que é idempotente e:
  - instala Docker e Compose do repositório oficial;
  - grava o sshd_config.d/00-macuxi.conf (sem senha, sem root), mas antes confere o authorized_keys, valida com sshd -t e desfaz se falhar; aplica com reload;
  - liga o fail2ban na jail sshd;
  - liga o unattended-upgrades, com reboot às 07:30 UTC se pedido;
  - põe o fuso em UTC e roda o log do Docker;
  - gera o /opt/macuxi/.env 600 com openssl rand, sem nunca imprimir nem regenerar.
- scripts/deploy/demo/compose.yml:
  - postgres pgvector/pgvector:pg16, só na rede internal, com volume;
  - api na 8100, com NODE_ENV=production e trust proxy uniquelocal;
  - worker;
  - bko na 3100, no perfil "bko", que sobe quando houver imagem;
  - cloudflared com o tunel.env;
  - avulsos "banco" e "seed-demo".
- scripts/deploy/demo/implantar.sh: pull, migrar up, seed só no 1º deploy, up -d --wait, curl em /v1/saude e /login, prune.
- apps/api/Dockerfile (a imagem serve à API, ao worker, às migrações e ao seed; roda com tsx, sem build) e .dockerignore na raiz.
- scripts/demo/configurar-dominio.ps1 BLOQUEADO: sai com código 3, a menos que receba -EuSeiQueTiraAVmDoAr, que só o teste simulado passa (o teste foi ajustado). O subir-demo.ps1 agora usa sempre o túnel rápido, e o scripts/demo/LEIA-ME.md foi reescrito (nuvem + plano B). A demo local que está rodando não foi tocada.

**(b) Workflows**
- .github/workflows/demo-publicar.yml:
  - dispara por workflow_run, quando o CI fica verde num push ao main, ou manualmente;
  - publica no GHCR com o GITHUB_TOKEN as imagens ghcr.io/aloirr/macuxi-api e, se existir apps/web/Dockerfile, macuxi-bko, com as tags sha e main;
  - deploy com environment DEMO_SSH_KEY: scp, preparar-vm, segredos via stdin do ssh, docker login na VM, implantar.sh, logout e curl pelo domínio.
- .github/workflows/demo-recriar-base.yml: manual, com confirmação RECRIAR; roda o seed-demo --recriar.
- Nenhum secret entra em linha de comando nem em log.

**(c) Adaptador S3**
- apps/api/src/armazenamento-s3.ts: SigV4 com fetch e node:crypto, SEM SDK e sem pnpm install; a assinatura confere com o vetor público da AWS. Escolhido por MACUXI_ARQUIVOS_DRIVER=s3 e MACUXI_S3_*, com falha fechada.
- apps/api/src/servidor.ts escolhe o adaptador pelo ambiente; o disco continua o padrão em dev e no CI.
- apps/api/src/arquivos.ts exporta CHAVE_ARQUIVO_RE.
- Testes: apps/api/test/armazenamento-s3.test.ts (10), apps/api/test/arquivos-s3.banco.test.ts (4, isolamento entre tenants RN-CORE-05 com Postgres real e S3 falso que confere a assinatura) e o apoio apps/api/test/s3-falso.ts.

## O que preciso
1. **Commit e push.** O commit com .github/workflows/** precisa do trailer "Agente: alexandre", senão a guarda brechas-governanca do CI fica vermelha e o deploy não dispara. O dono do produto autorizou os workflows no pedido v2. Se preferir, separe em dois commits: um "Agente: engenheiro-software" sem .github e um "Agente: alexandre" só com os workflows.
2. Depois do push e do CI verde, o "demo — publicar" roda sozinho. Se o CI do main ficar vermelho por outro motivo, rode "demo — publicar" na mão (Actions → Run workflow, ou gh workflow run "demo — publicar").
3. Pendências:
   - BKO: Dockerfile pedido ao engenheiro-apps (R-20261104-003224). Sem ele, só a api-demo volta; a bko-demo continua fora;
   - backup e seed com permissão explícita: pedidos ao banco-dados (R-20261104-013909);
   - endpoint S3 da Magalu (https://br-se1.magaluobjects.com, por caminho) é premissa ainda não conferida online.

## Pronto quando
Testes: api tsc ok; eslint dos arquivos ok; vitest de armazenamento-s3, arquivos-s3.banco, arquivos e arquivos.banco: 29/29 verdes (Postgres de testes na 5434). docker compose config ok. bash -n ok. coord verificar engenheiro-software sem violação. A imagem local (docker build) passou do pnpm install (~15 min no PC) e está exportando; aviso se a subida dela falhar. A entrega vale quando o "demo — publicar" ficar verde e https://api-demo.macuxifdv.com.br/v1/saude responder.
