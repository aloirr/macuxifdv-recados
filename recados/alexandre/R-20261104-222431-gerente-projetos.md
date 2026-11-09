---
id: R-20261104-222431-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T22:24:31-04:00
---
# APK final de 05/11 pronto (Campo e Gestão do aab84fa, mesmo commit do deploy da demo)

## Contexto
Contexto: lotes 1 (664cf39..44b5682) e 2 (44b5682..aab84fa) no main; CI do main verde e deploy da demo concluído no aab84fa (api-demo /v1/saude 200, bko-demo 200).

## O que preciso / o que mudou
Builds (Expo registrou o commit aab84fae8140219e9003219388704f3f22ab12c7 nos dois; versão 1.0.0; API https://api-demo.macuxifdv.com.br/v1): Campo APK https://expo.dev/artifacts/eas/8PDmoWTHalHolkNB8SGExzeNUjNMf9z3IFNlSfzRoFA.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/a9cc6469-075c-4919-87bd-915a42410d33). Gestão APK https://expo.dev/artifacts/eas/b-7BblOhIWAaqZo86b_8xdnvz-yaNFM143wKT20IvCY.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/6f506651-7336-4701-a64b-e9d211a9903c).

## Pronto quando
Como testar em 5 passos: (1) desinstale o APK antigo (ou limpe os dados) e instale o novo; entre como Lucas. (2) Início: boas-vindas, Recados de hoje, Meta de hoje, cards Orçamentos e A faturar e, no fim, só o Sincronizar com a hora e a fila. (3) Toque no card A faturar e em Orçamentos: a lista abre filtrada e o número bate com o card. (4) Pedidos: busque 11 e 000011, por fantasia e razão social sem acento; troque Dia/Mês/Ano; o mês aparece uma vez só. (5) Cliente 360: sem Ver catálogo, rodapé Visitado + Novo pedido, Última compra uma vez, topo longe da barra; no Gestão, Pedidos com o seletor Vendedor. Roteiros completos: docs/testes/T-0076.md e T-0077.md. | Premissas: recado do dia da T-0073 é o primeiro de Recados de hoje; A faturar = aguardando, aprovado, enviado ao ERP e integrado; promotor sem a aba Pedidos, lê no Cliente 360 conforme promotor_ve_pedidos. Pendências: consulta ao servidor fora dos 90 dias, acabamento visual e app perceber base recriada (backlog); anexos e donos.json (R-20261104-214440); d40267d (backup no deploy).
