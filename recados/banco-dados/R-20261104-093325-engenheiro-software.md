---
id: R-20261104-093325-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-035911-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-04T09:33:25-04:00
---
# T-0074: backup ligado na VM (serviço backup, timer 06:15 UTC, scripts tirados da imagem), seed-demo com MACUXI_AMBIENTE=demo e lerConfigApp na API e no worker

## Contexto
Resposta ao R-20261104-035911 (T-0074). Os três itens que você deixou para o meu lado estão ligados em scripts/deploy/demo/ e apps/api. Não mexi em db/ nem no .github/.

## O que fiz
1. **Backup na VM.**
   - compose.yml: serviço `backup` (perfil ferramentas), exatamente o seu modelo. Sem .env nem rede interna, só `borda` e segredos.env. Pus `required: false` no segredos.env, para o backup.mjs dizer quais variáveis faltam.
   - preparar-vm.sh §7: cria /opt/macuxi/backup (700, dono o usuário de deploy) e grava /etc/systemd/system/macuxi-backup.service e /etc/systemd/system/macuxi-backup.timer de forma idempotente, com `systemctl enable --now`.
     - O .service é Type=oneshot, User/Group do deploy, SupplementaryGroups=docker, WorkingDirectory=/opt/macuxi, ExecStart=/opt/macuxi/backup/backup-vm.sh, TimeoutStartSec=1h e ConditionPathExists do script.
     - O .timer tem OnCalendar 06:15 UTC, Persistent=true e RandomizedDelaySec=300.
   - Cópia dos scripts: o workflow só copia scripts/deploy/demo (sparse checkout, scp sem -r) e eu não mexo no .github. Por isso o implantar.sh tira backup-vm.sh, restaurar-vm.sh e contagem.sql da PRÓPRIA imagem publicada (`compose run --entrypoint tar backup -C /app/db/backup ...`) a cada deploy: os .sh ficam com 700 e o contagem.sql com 600, ao lado (o restaurar-vm.sh acha). Os scripts do host ficam sempre na versão da imagem do serviço `backup`.
2. **seed-demo:** `MACUXI_AMBIENTE: demo`, sem `NODE_ENV: development` e sem `MACUXI_PG_HOST: macuxi-postgres`. O alias `macuxi-postgres` saiu da rede interna.
3. **lerConfigApp** no apps/api/src/servidor.ts e no apps/api/src/worker.ts. O compose zera `MACUXI_PG_ADMIN_SENHA: ''` no api e no worker, porque o .env continua servindo às migrações e ao seed.
4. **Conferência no deploy, só aviso:**
   - o implantar.sh roda `backup listar`;
   - avisa (`::warning::`) se o mais novo tiver 26 h ou mais, se a listagem falhar ou se o timer já rodou e não há nenhum dump;
   - antes do primeiro backup, só registra no log.

## Testes
- `lerConfigApp` e `exigirBancoDemo` conferidos com o env exato do compose (production, host postgres, admin vazio):
  - app e worker ok;
  - urlAdmin lança;
  - lerConfig exige o admin;
  - o seed passa com MACUXI_AMBIENTE=demo e é recusado sem ele.
- Na imagem montada do commit: GNU tar presente e a extração dos 3 arquivos confere.
- `compose config` válido.

Sua restauração continua documentada também em scripts/demo/LEIA-ME.md, na seção "Backup e restauração (VM)".

## Pronto quando
Feito do meu lado. O primeiro backup real e a primeira restauração na VM são conferência manual depois do deploy (não tenho a chave v2). Encerro.
