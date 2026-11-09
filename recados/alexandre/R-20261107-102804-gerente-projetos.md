---
id: R-20261107-102804-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0091
responde_a: R-20261107-103434-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T10:28:04-04:00
---
# Status 11h (07/11): main em 638faa69 (seus recados e lidos dentro); portal na demo pronto do nosso lado; PRs da nuvem sem marca

## Contexto
Contexto: bloco das 8h20 às 11h.

## O que preciso / o que mudou
Subiu ao main (d27f7903 → 638faa69, CI verde no commit exato): T-0090, os 5 🟡 de UX de Pedidos, com reconferência sem 🔴. T-0092 completa: GET /integracao/v1/openapi.json público (cache 1h, ETag, 60/min por IP), lock com ajv/ajv-formats/tsx, chave do Conector corrigida para mxc_ nos docs, §15 do hub-api.md, revisão final sem 🔴. T-0089 B2: as views-modelo do Conector (db/conector/views-modelo.sql), que nunca tinham sido feitas, revisadas sem 🔴. Os scripts do portal na demo. E os seus 60 arquivos (recados de 04/11 a 07/11 e o lidos na versão do disco), no commit 638faa69 com 'Agente: alexandre'. Exceção: o guardião barrou o R-20261106-225242, por considerá-lo mexido nesta sessão; esse você commita. Em CI agora: d0201f7a, com o portal (🟡 e 🟢 das revisões de UX e de segurança, botão do openapi.json, config-demo reconhecido, link de convite da demo para o bko-demo) e o seu lidos de novo.

## Pronto quando
Portal na demo, o que você faz, na ordem: (1) no seu PC, openssl rand -base64 48, ou no PowerShell [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48)); guarde a linha no cofre e não mande a ninguém. (2) GitHub → Settings → Environments → DEMO_SSH_KEY → Add environment secret, nome exato DEMO_SUPERADMIN_CONVITE. (3) Ok nos dois diffs de governança: docs/desenho/T-0091-demo-portal.diff (o demo-publicar lê o secret e grava na VM com modo 600) e docs/desenho/T-0091-stack-isolado.diff (já corrigido: a sonda agora é um login falso que só passa com 401; qualquer 503 reprova). Eu aplico com o seu trailer. (4) Cloudflare → túnel macuxi-demo-nuvem → Public Hostname: config-demo, macuxifdv.com.br, HTTP bko:3100. Não use config.demo, que o certificado grátis não cobre. (5) Eu aviso, e você roda Actions → demo — publicar. (6) https://config-demo.macuxifdv.com.br → Primeiro acesso, com o convite e o TOTP. Texto completo do engenheiro-software no R-20261107-100925. Depois do 1º acesso, pode apagar o secret. | PRs da nuvem (#95, #96, #97): travados há mais de 2 h sem a marca PRONTO. Pedi às 7h50 e lembrei às 10h. As sessões fizeram commits às 9h20 com CI verde sobre o main, mas não marcaram. Agora o main andou para 638faa69: #96 e #95 fazem merge limpo, mas precisam puxar o main de novo; o #97 voltou a ter conflito no modules/integracao/api/index.ts por causa da T-0092. Comentei de novo nos três. Motivo provável: as sessões estão paradas esperando alguém. Recomendação: você reabre as três sessões. Ou então autoriza uma exceção à regra A para estes três PRs: eu faço o merge quando o head incluir o main atual e o ci-ok estiver verde, mesmo sem a marca. | Ciência: o engenheiro-software escreveu a ADR 0030 como aceita. Ela abre uma exceção à ADR 0006 para que um módulo publique documento sem login (o openapi.json), só GET, com cache e limite por IP. Se discordar, eu reverto. | Build único de preview (R-20261107-092152): está no quadro e está esperando os 3 PRs e o atalho Ver por linha. Nenhum build intermediário. | Docs: o docs/produto já estava atualizado no status das 8h20; nada novo no Projeto. | O que preciso de você: 1. os passos do portal na demo acima; 2. ok nos dois diffs; 3. decidir sobre os PRs (reabrir as sessões ou a exceção); 4. commitar o seu R-20261106-225242; 5. os resultados do teste dos APKs, quando tiver. | Pronto quando: você ler. O próximo status sai até as 14h.
