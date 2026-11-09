---
id: R-20261106-071158-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:11:58-04:00
---
# Decisão de 06/11: preço da embalagem = unidade × quantidade; tabela escalonada; formas de pagamento com prazos e prazo médio (RN-VEN-15 nova, 23, 24, 25)

## Contexto
Contexto: decisão do dono do produto no teste de campo de 06/11 (R-20261106-064758). O gerente já redigiu o doc 03 e o doc 06.

## O que preciso / o que mudou
O que mudou: (1) RN-VEN-15 nova: a tabela de preço tem só o preço da unidade; o preço da embalagem é sempre unidade × quantidade, sem preço de caixa digitado (revoga o 'preço próprio da embalagem' de 02/11). (2) RN-VEN-23: tabela escalonada (produto, embalagem, quantidade mínima, preço por unidade, vigência, tabela ou grupo opcional); a faixa é aplicada sozinha, o desconto incide sobre ela, ela não entra na alçada e o preço mínimo segue valendo; a próxima faixa aparece em Detalhes ('Leve mais e pague menos'). (3) RN-VEN-24: forma de pagamento → prazos com parcelas e prazo médio (28/56 = 42); escolhe a forma e depois o prazo; a lista mostra só o prazo, sem o número do médio. (4) RN-VEN-25: o cliente tem as formas permitidas e o prazo médio máximo; prazos acima ficam desabilitados. A RN-VEN-14 foi substituída. (5) Doc 06: entidades formas_pagamento, prazos e tabela_escalonada; cliente com formas e prazo médio; pedido devolvido com forma, prazo e prazo médio.

## Pronto quando
Implementação na T-0089, com desenho do engenheiro-software; ninguém implementa antes do desenho, exceto o bug do + (modulo-vendedor).
