---
id: R-20261102-094239-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T09:42:39-04:00
---
# Prioridade: depois das revisões T-0032/T-0042, o desenho da T-0060 e da T-0061 vem antes do motor da T-0059

## Contexto
Contexto

## O que preciso / o que mudou
Duas decisões novas do dono do produto (R-20261102-092329 e 093007), já nos docs 02/03/04/06; tarefas .coord/tarefas/T-0060.md e T-0061.md. O desenho destrava o banco-dados e as sessões da nuvem T-0052/T-0053 (03/11). O que preciso

## Pronto quando
(1) T-0060: campos cadastro_incompleto e campos_faltantes no cliente (contracts do core e core.cliente.atualizado@1, opcional/compatível) e o parâmetro cliente_campos_obrigatorios. (2) T-0061: contratos PedidoItem (unidade, fator, qtd_base, desconto_pct OU acrescimo_pct), Pedido (desconto OU acréscimo do pedido; frete: modalidade CIF/FOB, transportadora_id OU transportadora digitada, valor em R$ ou %; endereco_entrega_id), ProdutoUnidade, ClienteEndereco, CatalogoNo/ProdutoNo, Transportadora; entidades canônicas do Hub (árvore, unidades, endereços, transportadoras) e o pedido devolvido ao ERP (compatível ou /v2 com ADR); entidades novas no pull do app. Confirme ou corrija a premissa de schema (árvore em catalogo; produto_unidade e cliente_endereco em core; transportadora em vendedor). Ordem: revisões T-0032/T-0042 → este desenho → motor da T-0059. Pronto quando | doc de desenho + contratos Zod no main e recado ao banco-dados, modulo-vendedor, modulo-catalogo, modulo-core e modulo-integracao com os nomes finais.
