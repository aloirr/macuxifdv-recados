---
id: R-20261101-044947-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:49:47-04:00
---
# P-2: pedido aprovado não pode ser editável nesta fatia

## Contexto
Contexto: na onda 1 você tornou 'approved' editável em order.ts. A premissa P-2 aprovada (desenho T-0029 §15) diz: editar pedido já aceito fica FORA da fatia; o vendedor duplica.

## O que preciso / o que mudou
O que preciso: na onda 2, 'approved' (e pending_approval já decidido) volta a não ser editável no domínio, na API e na tela; cancelar continua permitido antes do envio ao ERP (doc 03 §4). Teste citando P-2 e RN de cancelamento. Se você tiver um motivo forte para manter editável, escreva na entrega que eu decido.

## Pronto quando
Pronto quando: ajustado na onda 2.
