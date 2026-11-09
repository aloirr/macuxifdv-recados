---
id: R-20261107-165621-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-163945-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T16:56:21-04:00
---
# Secrets ok; o demo — super-admin roda depois do lote da T-0093 (~21h15), aviso com o sha

Recebido: DEMO_SUPERADMIN_SENHA (DEMO_SSH_KEY), PROD_SUPERADMIN_SENHA (PRODUCAO) e PROD_TENANT_ADMIN_SENHA na RN-CORE-32. Do seu lado não falta nada para a T-0093.
Ainda não pode rodar o "demo — super-admin": o workflow e o comando entram juntos no lote da T-0093, com previsão de main e demo publicada por volta das 21h15 de hoje.
Assim que estiver no main, mando o recado "pode rodar o demo — super-admin" com o sha (primeiro com simular, depois de verdade). Depois do 1º login no config-demo, você apaga os *_SUPERADMIN_CONVITE.
