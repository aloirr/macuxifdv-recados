---
id: R-20261104-093518-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T09:35:18-04:00
---
# T-0074: backup diário ligado na VM (timer 06:15 UTC, serviço backup, aviso de 26 h no deploy), seed-demo com MACUXI_AMBIENTE=demo e lerConfigApp; stack isolado incompleto pelo Docker lento

## Contexto
T-0074: a parte de deploy do backup que o banco-dados deixou para mim (R-20261104-035911, já respondido e encerrado no R-20261104-093325). Ela entra no mesmo push do cbc3de0 (db/backup e lerConfigApp). Nada no .github: a mudança antiga do ci.yml continua fora.

## O que fiz
- **scripts/deploy/demo/compose.yml:**
  - serviço `backup` (perfil ferramentas, imagem macuxi-api, `node db/backup/backup.mjs`), só com segredos.env e a rede borda, sem o .env e sem a rede interna;
  - seed-demo com `MACUXI_AMBIENTE: demo`, sem `NODE_ENV: development` e sem o host `macuxi-postgres`;
  - alias `macuxi-postgres` removido;
  - api e worker com `MACUXI_PG_ADMIN_SENHA: ''`.
- **apps/api/src/servidor.ts e worker.ts:** `lerConfig` trocado por `lerConfigApp`.
- **scripts/deploy/demo/preparar-vm.sh §7:**
  - /opt/macuxi/backup e as unidades macuxi-backup.service/.timer (06:15 UTC, Persistent=true, até 5 min aleatórios), idempotentes;
  - falha do systemd vira aviso, não derruba o deploy.
- **scripts/deploy/demo/implantar.sh**, no fim, só com aviso (nunca falha):
  - copia backup-vm.sh, restaurar-vm.sh e contagem.sql da própria imagem para /opt/macuxi/backup. O workflow só copia scripts/deploy/demo, e por isso eu não mexi no .github;
  - lista backups/ e avisa com `::warning::` se o dump mais novo tiver 26 h ou mais, se a listagem falhar ou se o timer já rodou sem gerar dump.
- **Docs:** ADR 0020 (§5 e consequências: seed, lerConfigApp, backup), docs/desenho/T-0074.md, e o passo a passo de backup e restauração na VM em scripts/demo/LEIA-ME.md.

## Testes
- Verdes:
  - typecheck do api;
  - eslint de servidor.ts e worker.ts;
  - `bash -n` nos 3 scripts;
  - `docker compose config` válido;
  - cálculo da idade do backup testado com 4 casos (vazio, lixo, 25 h e 73 h) sob `set -euo pipefail`;
  - lerConfigApp e exigirBancoDemo com o env exato do compose (production, host postgres, admin vazio): app e worker ok, urlAdmin lança, lerConfig exige o admin, seed aceito com MACUXI_AMBIENTE=demo e recusado sem ele;
  - na imagem montada deste commit: GNU tar presente e a extração dos 3 arquivos confere.
  - `verificar engenheiro-software` OK.
- **Ficou INCOMPLETO:** o stack isolado de ponta a ponta (migrar, seed, api no ar, backup no S3 falso). O Docker Desktop do PC estava sobrecarregado: criar contêiner levava de 5 a 20 min, e o `migrar up` estourou o tempo 2 vezes. Não reiniciei o Docker para não derrubar o 5432 e o 5434 de quem está usando. O stack de teste foi removido (macuxi-t0074: contêineres, volumes, rede e imagem).

## Risco para o deploy que está verde
- O seed-demo só roda com `--recriar-base` ou no 1º deploy, e a VM já tem a marca `.base-demo-carregada`.
- O ponto que roda em todo deploy é a API e o worker com lerConfigApp e o admin vazio. A lógica foi conferida acima. Se falhar, o `implantar.sh` fica vermelho no `up --wait`.
- Backup e timer só geram aviso.

## Pendências
- Sugiro rodar o "demo — recriar base demo" uma vez depois do push, para provar o seed com MACUXI_AMBIENTE=demo na VM.
- Conferência manual na VM (dono do produto ou quem tiver a chave v2):
  - `/opt/macuxi/backup/backup-vm.sh` e `backup listar` (o primeiro backup);
  - `restaurar-vm.sh ultimo` (a restauração ao lado);
  - `systemctl list-timers macuxi-backup.timer`.
- Repetir o stack isolado quando o Docker do PC estiver folgado, se você quiser a prova local antes do push.
