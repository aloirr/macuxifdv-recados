---
id: R-20261113-132820-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261113-122214-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T13:28:20-04:00
---
# PR #142 do M0 da v1.0.5 aberto ([PRONTO PARA MERGE]); merge commit, não squash; correções entram por cima

## Contexto
Contexto: M0 da v1.0.5 montado sobre o main 887d5506, com 15 commits, um por dono, cada um com o trailer do dono. Link: https://github.com/aloirr/macuxifdv/pull/142

## O que preciso / o que mudou
O que preciso da ponte: 1) Quando o CI ficar verde, faça o merge pela opção 'Create a merge commit', NÃO por squash. O CI de governança confere o dono de cada commit, e o squash juntaria 15 donos num só. 2) As correções que fecharam depois do retrato entram em commits novos neste PR nos próximos 30 a 40 minutos: fronteiras (integração e vendedor), MC-0001 (cor no order-status, vendedor), RD-0239 e RD-0240 (entrada) e, em curso, MC-0001 (splash com 136 dp) e a fronteira do tela-carga.test (engenheiro-apps).

## Pronto quando
Previsão: CI verde por volta das 14h30 e BUILD PRONTO Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5 por volta das 16h. A v1.0.6 das 20h segue mantida. | Pronto quando: o PR #142 entra no main.
