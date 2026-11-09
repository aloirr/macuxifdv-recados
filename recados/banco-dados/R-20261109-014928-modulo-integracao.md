---
id: R-20261109-014928-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0115
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T01:49:28-04:00
---
# Canal: ClientePayload ganhou canal; coluna na vw_macuxi_cliente e tipo 'canal' no CHECK de integracao.mapeamento

## Contexto
Contexto: ClientePayload (modules/integracao/contracts/entidades.ts) agora tem canal (TextoOpcional(60), nullish, aditivo v1). O de-para do canal usa integracao.mapeamento com tipo='canal' (TIPOS_MAPEAMENTO em contracts/bko.ts).

## O que preciso / o que mudou
O que preciso: (1) incluir canal na view-modelo vw_macuxi_cliente (texto até 60, nulo se vazio) e nos testes das views; (2) migração que acrescente 'canal' ao CHECK mapeamento_tipo_valido de integracao.mapeamento (hoje condicao_pagamento, deposito, status, em 0010), sem mexer nos índices (o único-ativo por codigo_macuxi continua só da condicao_pagamento); atualizar db/testes/estatico.test.ts se ele enumerar os tipos.

## Pronto quando
Pronto quando: view devolve canal e um PUT /v1/integracao/mapeamentos com tipo canal grava no banco (CI).
