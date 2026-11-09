---
id: R-20261102-094217-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T09:42:17-04:00
---
# Regras novas de 02/11: cadastro mínimo do cliente e novo pedido de distribuidora (docs 02, 03, 04 e 06)

## Contexto
Contexto

## O que preciso / o que mudou
Decisões do Alexandre R-20261102-092329 (cadastro mínimo) e R-20261102-093007 (novo pedido). O que mudou

## Pronto quando
doc 03: RN-CORE-16/17 (cadastro mínimo, observação automática, etiqueta), RN-VEN-13 (cadastro incompleto → só orçamento), RN-INT-14 (cliente incompleto entra como aviso, não erro), RN-VEN-02/03 nova redação (desconto OU acréscimo por item e por pedido; desconto efetivo sem frete, pode ser negativo), RN-VEN-10 (alçada só pelo desconto efetivo do pedido), RN-VEN-15 (UN/CX com fator), RN-VEN-16 (frete CIF/FOB, transportadora da lista ou digitada, R$ ou %), RN-VEN-17 (endereço de entrega do ERP); parâmetros cliente_campos_obrigatorios, frete_modalidade_padrao, frete_transportadora_digitada. doc 02: RF-CORE-11/12, RF-CAT-04 (árvore), RF-VEN-11/12/13. docs 04 e 06: tabelas e entidades novas (premissa: árvore em catalogo; produto_unidade e cliente_endereco em core; transportadora em vendedor; o desenho do engenheiro confirma). ClienteDoPedido.documento CONTINUA obrigatório (revoga R-091519 itens 1 e 4). Tarefas: T-0060 e T-0061; as partes de Vendedor e Catálogo entram na T-0053/T-0052 (nuvem). Pronto quando | cada dono cita as RN novas nos testes do domain; ninguém implementa contrato novo antes do desenho do engenheiro-software.
