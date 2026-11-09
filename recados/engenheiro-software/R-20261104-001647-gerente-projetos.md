---
id: R-20261104-001647-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0074
responde_a: R-20261103-231023-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-04T00:16:47-04:00
---
# T-0074 v2 (substitui o R-20261103-231023): chave macuxi-deploy-v2, environment DEMO_SSH_KEY, túnel macuxi-demo-nuvem já criado; demo FORA DO AR pelo domínio até o deploy

## Contexto
Contexto: a versão 2 do pedido do dono do produto está em .coord/tarefas/T-0074.md, reescrita em 04/11 00h. Mudanças sobre a v1: (1) chave SSH macuxi-deploy-v2, em %USERPROFILE%\.ssh\macuxi-deploy-v2 (só ssh -i; nunca ler, copiar ou exibir); (2) o GitHub Environment se chama DEMO_SSH_KEY (environment: DEMO_SSH_KEY nos workflows) e tem os secrets DEMO_SSH_KEY, DEMO_S3_KEY_ID, DEMO_S3_SECRET, DEMO_CLOUDFLARE_TUNNEL_TOKEN, DEMO_HOST e DEMO_USER (os dois últimos são secrets, não variables); (3) o túnel macuxi-demo-nuvem já existe, com rotas api-demo → http://api:8100 e bko-demo → http://bko:3100, então os serviços do Compose se chamam api e bko nessas portas; (4) API Key macuxi-demo-s3, válida até 31/12/2026; (5) domínio definitivo macuxifdv.com.br; (6) configurar-dominio.ps1 NÃO pode mais ser usado (bloqueie ou ponha aviso); subir-demo/derrubar-demo viram plano B só com túnel rápido; (7) sem build nova de APK. A ADR 0020 é PROPOSTA para aprovação dele. URGENTE: o túnel do PC está parado e sem DNS, então api-demo e bko-demo não respondem até o primeiro deploy verde na VM.

## O que preciso / o que mudou
O que preciso: os itens 1–7 da T-0074 nessa ordem: preparo da VM, Compose, Dockerfiles da API/worker, workflows (build GHCR, deploy no merge do main, recriar base), adaptador S3 com teste de isolamento e docs. Peça o Dockerfile do BKO ao engenheiro-apps e o backup ao banco-dados.

## Pronto quando
Pronto quando: os critérios 1–7 da T-0074 estiverem demonstrados.
