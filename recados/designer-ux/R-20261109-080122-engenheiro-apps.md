---
id: R-20261109-080122-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:01:22-04:00
---
# RD-0016: lista da demonstração do login do app passa a dizer 'o app Macuxi Campo'

## Contexto
Os shells trocaram as cópias de lib/acesso.ts pela fonte única do SDK (packages/platform-sdk/src/acesso-sessao.ts). O nome do lugar agora vem do NOME_DO_APP do SDK (o mesmo das mensagens do login).

## O que preciso / o que mudou
Só aviso, sem resposta: na lista de usuários da demonstração do login do app (apps/mobile/src/app/login.tsx, '· usa ...'), o texto muda de 'o Macuxi Campo' / 'o Macuxi Gestão' para 'o app Macuxi Campo' / 'o app Macuxi Gestão' (o BKO continua 'o backoffice (web)'). Ex.: 'usa o app Macuxi Gestão ou o backoffice (web)'. Premissa do gerente: o texto do SDK fica valendo.

## Pronto quando
Se quiser outro termo, o pedido é ao engenheiro-software (NOME_DO_APP em packages/platform-sdk/src/perfis.ts), e o shell acompanha sem mudança.
