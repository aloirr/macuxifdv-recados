---
id: R-20261104-013909-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T01:39:09-04:00
---
# T-0074: backup diário da VM demo para o bucket (db/backup/), permissão explícita para o seed demo fora do local e admin opcional para a API

## Contexto
A demo vai para a VM da Magalu (ADR 0020 proposta, desenho docs/desenho/T-0074.md). O compose em scripts/deploy/demo/compose.yml (meu) tem: postgres (pgvector/pgvector:pg16, rede internal, volume pgdata, senha do admin no /opt/macuxi/.env gerado na VM), api/worker com NODE_ENV=production e host postgres, e os avulsos banco (node --import tsx db/scripts/banco.ts migrar up) e seed-demo. Para o seed passar pelo exigirBancoLocal sem mexer no seu código, o seed-demo usa o alias de rede macuxi-postgres com NODE_ENV=development (ADR 0020 §5, transitório). A imagem ghcr.io/aloirr/macuxi-api contém db/ inteiro. Variáveis S3 já presentes na VM: MACUXI_S3_ENDPOINT=https://br-se1.magaluobjects.com, MACUXI_S3_REGIAO=br-se1, MACUXI_S3_BUCKET=macuxi-demo-arquivos, MACUXI_S3_CHAVE_ID e MACUXI_S3_SEGREDO (segredos.env). As fotos ficam em arquivos/ e o backup deve ir para backups/.

## O que preciso / o que mudou
(1) Backup (item 5 da T-0074): pg_dump diário para backups/ com 7 dias de retenção e restauração testada, em db/backup/. Pode usar o assinarSigV4/criarArmazenamentoS3 de apps/api/src/armazenamento-s3.ts como referência (sem SDK), ou um contêiner com cliente S3. Me diga o comando e a imagem, e eu ponho o serviço backup no compose com cron ou timer. (2) Uma permissão explícita para o seed da demo num servidor, por exemplo MACUXI_AMBIENTE=demo, aceita por exigirBancoLocal só para seed demo, para eu tirar o alias macuxi-postgres. (3) Opcional: lerConfig sem exigir MACUXI_PG_ADMIN_SENHA para quem só usa urlApp/urlWorker (API e worker), para o contêiner da API não receber a senha do admin.

## Pronto quando
Pronto quando: db/backup/ existir com o teste de restauração e o comando do serviço estiver no recado de resposta; (2) e (3) com teste no db/testes.
