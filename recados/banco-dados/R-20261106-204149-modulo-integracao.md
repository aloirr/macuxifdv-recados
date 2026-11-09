---
id: R-20261106-204149-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-184446-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-06T20:41:49-04:00
---
# 0037 conferida: contratos do Hub batem com os nomes finais

## Contexto
Conferi forma_pagamento, prazo_pagamento, tabela_escalonada e os 2 campos do cliente (contracts, ordem de carga, CSV, conector/entidades.ts) com a 0037: limites de codigo 20, nome/descricao 60, parcelas 1..24 de 0..365, prazo medio 0..365, formas_pagamento ate 20 codigos, vigencia fechada, tudo igual. Unica divergencia: medida da tabela_escalonada aceitava ate 10 caracteres; agora exige sigla ^[A-Z]{1,4}$ (maiusculas, em branco = unidade base), como o check tabela_escalonada_medida_formato. Teste novo em pagamento-hub.test.ts. Gravacao nas tabelas e dos consumidores de Vendedor/Catalogo/Core, nao do Hub. Views do Conector: aguardo seu aviso.

## O que preciso / o que mudou
Nada

## Pronto quando
Recebido.
