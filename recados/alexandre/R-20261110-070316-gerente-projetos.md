---
id: R-20261110-070316-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0143
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:03:16-04:00
---
# Governança: o coord.mjs às vezes não pega o token do gh com vários agentes; proposta de 3 novas tentativas

## Contexto
Hoje, 10/11, com 7 agentes em paralelo, o `node scripts/coord.mjs` respondeu "sem token do GitHub" pelo menos 3 vezes: no meu envio do plano, no timer de 5 min e no corretor. Logo depois, o mesmo `gh auth token` funcionou. A causa provável é o keyring do Windows disputado pelos agentes. Nada se perdeu: o comando avisa, não grava, e o recado foi reenviado. Para seguir, os agentes rodam o comando com `GH_TOKEN` vindo do `gh auth token` na mesma linha, sem gravar em arquivo nem em log.

## O que preciso
Autorização para uma mudança em `scripts/coord-lib.mjs` (arquivo de governança, seu): na função `ghAuthToken()`, tentar o `gh auth token` até 3 vezes, com espera curta (1 s, 2 s) entre elas, antes de responder "sem token". O token continua nunca impresso nem gravado. O engenheiro-software prepara o patch e o teste em `scripts/coord-recados.test.mjs`, e eu aplico num commit com "Agente: alexandre" pelo rito de governança (CI na branch de verificação antes do main).

## Pronto quando
Você responde "aprovo" (ou não). Até lá, segue o contorno pelo GH_TOKEN na linha do comando.
