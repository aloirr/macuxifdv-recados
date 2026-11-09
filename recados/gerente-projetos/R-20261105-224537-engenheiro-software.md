---
id: R-20261105-224537-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:45:37-04:00
---
# T-0086 entregue em 3 partes: compose+roteiro, workflow (governança separada), alertas+backup

## Contexto
T-0086: produção na Magalu, entregue em três partes. Nenhum recurso foi criado, nenhuma conta foi acessada, nenhum segredo foi lido. Não rodei Docker, install nem commit. ADR 0028 (proposta) e desenho/roteiro em `docs/desenho/T-0086.md`.

## Parte 1: compose e roteiro (meus caminhos, commit normal)
- `scripts/deploy/producao/compose.yml`:
  - serviços api, worker, bko e cloudflared; ferramentas banco, tenant, pgcliente e backup;
  - sem Postgres; TLS com o DBaaS (`PGSSLMODE`; verify-full com a CA opcional);
  - `config.` e `bko.` vão para o mesmo bko:3100;
  - pool total de 16 conexões.
- `scripts/deploy/producao/env.modelo`: só os nomes, por arquivo da VM.
- `scripts/deploy/producao/preparar-vm.sh`: idempotente, padrão da demo. Acrescenta as faixas do Docker em 192.168.200.0/21 (as padrão 172.x colidem com a VPC; o DBaaS de teste era 172.18.3.212) e o `.env` gerado na VM, sem o admin.
- `scripts/deploy/producao/banco-dbaas.sh` (primeiro deploy e todo deploy, idempotente):
  - confere a rota, o TLS e o admin (CREATEDB/CREATEROLE);
  - cria o banco e a extensão `vector`;
  - roda `migrar up` (papéis pelo B0, 0031 de manutenção);
  - confere os papéis, a herança do manutencao e o `conferir-rls.sql` = 0.
- `scripts/deploy/producao/implantar.sh`: imagem por digest, conferência pelo `/v1/saude` (banco ok + versão da tag) e pelo BKO `/login`, **volta atrás automática** (código 3).
- `docs/decisoes/0028-producao-magalu.md` + linha no `docs/decisoes/README.md`.
- `docs/desenho/T-0086.md`: §4 (Alexandre às 8h, com a **lista exata de secrets**), §5 (gerente: tag, aprovação, conferência, tenant) e §6 (voltar atrás). **Pedido:** copiar §4–§6 para o `docs/status/producao.md`, que é seu caminho; não consigo escrever lá.

## Parte 2: workflow (GOVERNANÇA, commit separado com o trailer `Agente: alexandre`)
- `.github/workflows/producao-publicar.yml` (autorizado na mensagem de 05/11 21h50):
  - dispara só com tag `v*`;
  - `conferir` exige três coisas: a tag num commit do main, um CI verde de push e a `macuxi-api:<sha>` no GHCR. A imagem segue **por digest**;
  - `bko` monta a `macuxi-bko-prod` do mesmo commit (a origem fica gravada no next build);
  - `deploy` usa o environment `PRODUCAO` e espera a aprovação. Ele entra por SSH, roda o `preparar-vm.sh`, grava os segredos pelo stdin em arquivos 600, roda o `implantar.sh` (migrações pelo plano B e conferência; volta atrás se falhar) e confere api., bko. e config.;
  - nenhum `set -x`.
- Outros arquivos de governança, todos em `.github/`, também com o trailer. **Confirme se a autorização de 21h50 cobre estes, ou peça ao Alexandre**, porque a mensagem cita só o "publicar":
  - `.github/workflows/producao-tenant.yml`: `tenant:criar` na produção (critério 7), manual e com aprovação; a senha vem do secret `PROD_TENANT_ADMIN_SENHA` pelo stdin;
  - `.github/workflows/producao-ensaio-restauracao.yml`: ensaio de restauração (critério 4), manual e com aprovação;
  - `.github/workflows/stack-isolado.yml`: job novo `stack-producao` (item 7). Usa um Postgres 16 de teste no lugar do DBaaS, com TLS obrigatório (verify-full com a CA do job) e admin sem superusuário. Faz:
    - o 1º e o 2º deploy;
    - a imagem quebrada com volta atrás;
    - o alerta pelo timer;
    - o `tenant:criar`;
    - o backup e o ensaio quando os scripts do banco-dados existirem.

## Parte 3: alertas e backup
- O alerta está **instalado pelo deploy**: timer `macuxi-alerta.timer` a cada 5 min, na produção (`preparar-vm.sh` §8) e também na demo (`scripts/deploy/demo/preparar-vm.sh` §8). Isso responde o R-20261105-213451-testes, caminho (a). O `alerta-saude.sh` ganhou o `MACUXI_ALERTA_NOME`. O teste do testes (3/3) segue verde aqui.
- Backup: o timer `macuxi-backup.timer` (06:15 UTC) e o serviço `backup` estão prontos, com o bucket `macuxi-prod`, `backups/` e 30 dias. O `implantar.sh` copia os scripts da imagem. **Os scripts são do banco-dados:** `backup-dbaas.sh` (`pg_dump --enable-row-security` pelo pgcliente) e `ensaio-restauracao.sh`, pedidos no R-20261105-224337-engenheiro-software. Até chegarem, o deploy só avisa, e o timer é pulado sem erro.
- Engenheiro-apps: origens bko./config. no BKO e o perfil EAS production (R-20261105-224349-engenheiro-software).

## Testes
- `bash -n` nos 5 scripts; YAML dos 4 workflows e do compose validado pelo parser (`yaml`); `alerta-saude-t0078.test.ts` 3/3; `scripts/ci/*.test.mjs` 30/30; `coord verificar engenheiro-software` OK.
- O lint do JS não muda: só mexi em bash, YAML e md. Não há `actionlint` nem `shellcheck` instalados, e não instalei.
- **O `stack-producao` ainda NÃO rodou:** precisa de um push num branch `verificacao/**`. É o critério real. Peço que o rode antes de 8h e me mande o link se ficar vermelho.

## Pendências e premissas
- **TLS:** sem `PROD_PG_CA_CERT`, a conexão é cifrada, mas não confere o certificado. O deploy avisa. O `verify-full` depende de a Magalu fornecer a CA e de o certificado trazer o IP no SAN.
- **Imagem:** a tag precisa apontar para um commit cujo "demo — publicar" rodou verde, porque é ele que publica a `macuxi-api:<sha>`.
- **Environment PRODUCAO:** "Prevent self-review" desligado, porque a tag sai da mesma conta `aloirr`, e regra de tag `v*`.
- **JWT e pepper do Hub** são gerados na VM. Se a VM for perdida, os usuários entram de novo e as chaves do Conector são reemitidas (registrado na ADR 0028).
- **Migração não é desfeita** na volta atrás (as migrações são aditivas, ADR 0024 item 6).
- **Recados antigos** na minha caixa (T-0014, T-0041, T-0051 a T-0058, lockfile...): não tratei nesta rodada. A T-0086 tem prioridade.

## Pronto quando
A Parte 1 está commitada e a Parte 2 está commitada com o trailer. O `stack-isolado` (os jobs `stack` e `stack-producao`) está verde no branch de verificação. O `docs/status/producao.md` está criado a partir do §4–§6.
