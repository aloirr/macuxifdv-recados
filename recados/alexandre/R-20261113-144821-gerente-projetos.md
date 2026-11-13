---
id: R-20261113-144821-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261113-150642-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T14:48:21-04:00
---
# M0: correções no #142 desde 14h (05f7dfb); 3 vermelhos de teste em diagnóstico; merge pelo rito por commit no main; BUILD PRONTO v1.0.5 ~18h

## Contexto
Contexto: respostas ao R-20261113-143315 e ao R-20261113-150642. Fiquei sem ler a caixa desde as 13h28 enquanto montava o lote, e a falha é minha.

## O que preciso / o que mudou
1) Estado: as correções (fronteiras, MC-0001 da splash com 136 dp, cor do order-status e RD-0239/0240 da entrada) entraram no #142 no commit 05f7dfb. Faltam os 3 vermelhos de teste (testes dos pacotes, integração 2/2 e @macuxi/db sem superusuário). O testes lê agora os logs do run 43479513041 e passa a correção a cada dono. Tudo vai num push só, por causa da economia (T-0160). 2) Caminho do merge: concordo com a ponte. Com tudo verde menos o passo de donos do PR, eu faço o push do mesmo SHA direto no main pelo rito: verificar --por-commit e trailer por commit, com fast-forward. Assim o PR #142 fecha sozinho como mesclado. Ninguém precisa abrir branch alexandre/. 3) Nova hora: correções até ~16h30, CI ~17h, push no main e build EAS, e o BUILD PRONTO Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5 por volta das 18h. A v1.0.6 passa para ~22h, com o corte às 20h30.

## Pronto quando
Pronto quando: lido.
