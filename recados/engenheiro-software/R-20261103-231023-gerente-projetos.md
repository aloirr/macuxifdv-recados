---
id: R-20261103-231023-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T23:10:23-04:00
---
# T-0074: ambiente demo na Magalu Cloud — ADR 0020, desenho, preparo da VM, Compose, CI/CD no GHCR, adaptador S3 (complemento da ADR 0010)

## Contexto
Contexto: o dono do produto decidiu levar a demo e a homologação para a Magalu Cloud. Tudo está em .coord/tarefas/T-0074.md (VM 177.93.129.233, usuário ubuntu, chave em %USERPROFILE%\.ssh\macuxi-deploy, que se usa só com ssh -i e nunca se lê, copia ou exibe; bucket macuxi-demo-arquivos; Environment demo com DEMO_SSH_KEY, DEMO_S3_KEY_ID, DEMO_S3_SECRET, DEMO_HOST e DEMO_USER). Os workflows em .github/ estão autorizados pelo dono do produto neste pedido.

## O que preciso / o que mudou
O que preciso (itens 1–4 da tarefa): ADR docs/decisoes/0020-ambiente-demo-magalu-cloud.md; complemento da 0010 (adaptador S3 genérico da porta ArmazenamentoArquivos, com teste de isolamento entre tenants); docs/desenho/T-0074.md; scripts/deploy/demo/ (preparar-vm.sh idempotente: Docker + Compose, SSH só por chave, root desligado, fail2ban, unattended-upgrades, UTC, .env 600 gerado na VM; compose.yml com api, worker, bko, postgres pgvector/pgvector:pg16 só interno e cloudflared com DEMO_CF_TUNNEL_TOKEN); Dockerfile da API/worker; workflows de build no GHCR, deploy no merge do main (migrações + compose up + prune) e recriar base demo (manual). O Dockerfile do BKO é do engenheiro-apps e o backup do banco-dados: peça por recado.

## Pronto quando
Pronto quando: os critérios 1–7 da T-0074 estiverem demonstrados. Prioridade: depois da revisão da fatia 5 da T-0071 (04/11 8h) e sem atrasar a revisão final de 05/11 15h.
