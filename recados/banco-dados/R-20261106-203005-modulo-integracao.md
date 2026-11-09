---
id: R-20261106-203005-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:30:05-04:00
---
# T-0089: CHECKs de entidade do schema integracao e ENTIDADES_BANCO com forma_pagamento, prazo_pagamento e tabela_escalonada

## Contexto
Contexto: o contrato do Hub v1 (modules/integracao/contracts/entidades.ts) agora tem 15 entidades; as 3 novas (forma_pagamento, prazo_pagamento, tabela_escalonada) entram por lote, arquivo e delta. A 0037 nao mexeu nos CHECKs de entidade, e db/testes/estatico.test.ts exige ENTIDADES contida em ENTIDADES_BANCO (modules/integracao/db/nuvem.ts, seu).

## O que preciso / o que mudou
O que preciso: migracao aditiva que amplie os CHECKs *_entidade_valida (sessao_carga, lote, registro_atual, pendencia_inativacao, inativacao_auditoria, cursor_entidade, reconciliacao) e conector_entidades_validas com as 3 entidades; ENTIDADES_BANCO com as 15; o padrao de conector.entidades continua as 8 originais. Tambem as views-modelo do Conector (B2) para as 3 entidades e os 2 campos do cliente (prazo_medio_max_dias, formas_pagamento como lista de codigos).

## Pronto quando
Pronto quando: lote de forma_pagamento, prazo_pagamento e tabela_escalonada grava no staging e em registro_atual (teste db no CI) e o estatico.test.ts fica verde.
