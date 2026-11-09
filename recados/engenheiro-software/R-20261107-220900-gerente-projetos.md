---
id: R-20261107-220900-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T22:09:00-04:00
---
# Fatia S: rota do super-admin para redefinir a senha do admin do cliente pelo portal

## Contexto
Contexto: o padrão de fábrica da T-0111 diz que o super-admin da Macuxi redefine a senha do admin do cliente pelo portal (R-20261107-185546; doc 03 §2). O testes informou (R-20261107-220309) que essa rota não existe e deixou o caso pendente.

## O que preciso / o que mudou
O que preciso: na fatia S, a rota do portal (super-admin) que redefine a senha do admin de uma empresa: senha temporária de 72 h, trocar_senha, e-mail pela outbox e sessao_versao + 1, auditada e sem a senha em log. Peça ao banco-dados a sa_* que faltar (EXECUTE só no macuxi_portal) e ao engenheiro-apps o botão no portal (cartão da empresa).

## Pronto quando
Pronto quando: o caso pendente do testes passar e o botão existir no portal.
