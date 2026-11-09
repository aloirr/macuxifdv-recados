---
id: R-20261105-061434-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:14:34-04:00
---
# Stack isolado do d40267d no GitHub Actions (stack-isolado.yml) pronto para o branch de verificação

## Contexto
Decisão do dono do produto (R-20261105-053835, item 2): sem Docker no PC; o stack isolado do d40267d (backup no deploy) roda no GitHub Actions. Ele autorizou o workflow novo em .github/.

## O que fiz
1. `.github/workflows/stack-isolado.yml` ("stack isolado (demo)"): gatilhos push em `verificacao/**`, PR (os dois só se tocar `scripts/deploy/**`, `db/backup/**` ou o próprio workflow) e manual. O manual só aparece depois que o arquivo estiver no main (regra do GitHub), então o **1º run sai do push do branch de verificação**. `permissions: contents: read`, sem environment e sem secret: não acessa VM, Magalu nem Cloudflare.
2. No runner (ubuntu-24.04), com os scripts reais e sem mudar nenhum: preparar-vm.sh 2x (.env gerado no job e mascarado, idempotência, timer macuxi-backup.timer ativo); imagem da API do commit num registro LOCAL (localhost:5000); segredos de TESTE gerados no job; implantar.sh (migrações, seed demo com MACUXI_AMBIENTE=demo, up --wait, /v1/saude, sonda S3, scripts do backup tirados da imagem, "nenhum ainda"); api/worker parados + retrato contagem.sql; backup pela unidade do systemd (backup-vm.sh); restaurar-vm.sh ao lado com contagem.sql IDÊNTICA ao retrato; restaurar-vm.sh --trocar e /v1/saude; implantar.sh de novo (sem seed, "backup de 0 h"). Qualquer ::warning:: do implantar reprova.
3. `scripts/deploy/stack-isolado/compose.ci.yml` (sobreposição via COMPOSE_FILE; nunca vai à VM, o publicar só copia scripts/deploy/demo/*): S3 falso no lugar do Object Storage, host da Magalu → 127.0.0.1 nos contêineres, cloudflared desligado. `scripts/deploy/stack-isolado/s3-falso.mjs`: S3 em Node puro que recalcula a SigV4 de forma independente.
4. `docs/desenho/T-0074.md`: linha na tabela de arquivos + seção "Stack isolado no CI" (passos, o que não cobre, como ler o resultado).

## Arquivos que vão juntos (commit de governança por causa do .github: trailer do dono do produto, citando R-20261105-053835)
- novos: `.github/workflows/stack-isolado.yml`, `scripts/deploy/stack-isolado/compose.ci.yml`, `scripts/deploy/stack-isolado/s3-falso.mjs`
- do d40267d (não commitados no working tree): `scripts/deploy/demo/{compose.yml,implantar.sh,preparar-vm.sh}`, `scripts/demo/LEIA-ME.md`, `docs/desenho/T-0074.md` (este também com a seção nova)
- NÃO entra: `apps/web/Dockerfile` (mudança do engenheiro-apps, fora do d40267d).

## Testes / validação
- Sem Docker, o workflow não roda no PC. Validei: YAML do workflow e dos dois compose (parser yaml, chaves únicas), `bash -n` nos 12 blocos run e nos 5 .sh, eslint e `node --check` no s3-falso.mjs. actionlint não está instalado.
- s3-falso.mjs testado de verdade no PC contra os DOIS clientes: `db/backup/backup.mjs` (enviar 3x, listar com paginação, baixar com sha256 conferido, podar --simular) e a sonda da API (`apps/api/src/sonda-armazenamento.ts`: gravar/ler/remover); segredo errado dá 403 SignatureDoesNotMatch.
- `node scripts/coord.mjs verificar engenheiro-software`: OK, sem violação.

## Como ler o resultado
Cada etapa é um passo com nome; o vermelho para no passo com uma linha ::error:: (também em Annotations). O resumo do run traz a última linha de cada etapa e o total da contagem; o artefato `stack-isolado-<run_id>` (7 dias) tem os logs, `contagem-antes.txt`, `contagem-restaurado.txt` e os logs de api/worker/postgres/s3-falso. Verde = d40267d pode subir.

## Riscos (o 1º run pode pedir ajuste no próprio workflow)
O preparar-vm.sh no runner instala fail2ban e openssh-server, reescreve /etc/docker/daemon.json e reinicia o Docker (por isso o registro local sobe depois dele). Se algum passo do runner divergir da VM, o ajuste é no workflow, não nos scripts da demo. Não cobre: endpoint/estilo reais da Magalu, túnel, BKO e o disparo às 06:15 do timer.
