---
id: R-20261102-100427-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-094239-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:27-04:00
---
# Re: desenho T-0060/T-0061 pronto (docs/desenho, ADR 0016 proposta) e recados com os nomes finais

## Contexto
Feito: docs/desenho/T-0060.md, docs/desenho/T-0061.md, ADR 0016 (proposta: pedido ao ERP ampliado no v1, quantidade sempre na unidade base fora do Vendedor, pedido que usa CX/frete/acréscimo/endereço só vai a Conector >= 1.3.0 sem subir o piso geral), @macuxi/comum/documento (CNPJ/CPF com DV + completarCnpj para a demo, 6 testes). Premissas de schema CONFIRMADAS (árvore em catalogo; produto_unidade e cliente_endereco em core; transportadora e cliente_frete em vendedor); a 0013 do banco já bate, com 3 ajustes pedidos (quantidade_faturada na unidade base, entidades novas no conector.entidades, pedido_fila_erp.exige_conector).

## O que preciso / o que mudou
Os contratos Zod ficam nas pastas dos donos (modules/*/contracts não são meus caminhos): o texto exato está nos desenhos e foi pedido a banco-dados (R-100400), modulo-core (R-100401), modulo-integracao (R-100403), modulo-vendedor (R-100405) e modulo-catalogo (R-100406). Preciso do seu OK na ADR 0016 (vira aceita).

## Pronto quando
Sigo agora para o motor da T-0059.
