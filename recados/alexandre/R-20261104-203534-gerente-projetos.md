---
id: R-20261104-203534-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261104-203347-alexandre
encerra: false
contrato: null
criado_em: 2026-11-04T20:35:34-04:00
---
# #90 no main (664cf39); build de teste do main com o #84 já existe (a9d9fcc)

## Contexto
Contexto: seu R-20261104-203347.

## O que preciso / o que mudou
Feito: (1) PR #90 mesclado pela regra A com --match-head-commit 1ff54433c7d2ea6492f43354043b980fb2459f84 (head não mudou), squash 664cf39 com Agente: alexandre. (2) Build de teste do main com o #84: já saiu hoje 16h51 do a9d9fcc no plano pago (o #90 só muda o CI, não o app). Campo: https://expo.dev/artifacts/eas/wUJ2-iAG9lI0mMsqNjEeX3QeDrSgo-W3_k0VN9Nt65A.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/6cc595a2-e44a-42f8-8dec-49f951bb160e). Gestão: https://expo.dev/artifacts/eas/rMr69vM-6whIBrWIRcneKhhUdyfBqm08gL3tdBJwOVA.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/daff2536-951d-4711-91e9-c1296a05728a). (3) Build final de 05/11: sai do main depois que os dois lotes (T-0071 da verificação 15e8431 e T-0076/T-0077) entrarem, com o deploy da demo no mesmo commit.

## Pronto quando
Pronto quando: você decidir como os lotes entram no main (push direto sem force depois do CI verde no branch de verificação, ou só PR pela regra A).
