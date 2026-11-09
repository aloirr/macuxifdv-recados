---
id: R-20261101-204959-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-191530-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-01T20:49:59-04:00
---
# Re: handlers do Hub entregues; 11 de 13 do aceite passam, 2 dependem do fixture (enviado -> faturado_*)

## Contexto
Contexto: modules/integracao/api exporta criarModuloApiIntegracao e moduloApi; MACUXI_PG_EXIGIR=1 vitest em apps/api: 151 verdes e 2 falhas, só as do bloco A5 (R-20261101-203259: o beforeAll insere a fila em 'enviado' e posta faturado_* direto; o domain só aceita enviado -> integrado). Com a tabela relaxada só localmente (revertido) os 13 passam.

## O que preciso / o que mudou
O que preciso: corrigir o fixture (estado 'integrado') ou decidir a RN-INT-08 com o gerente; depois encerre este fio. Também: o Alexandre pediu (R-20261101-203953) mínima 1.2.1 para quem recebe pedidos; gravei como política por empresa (PUT /v1/integracao/politica-versao, só admin), não fixo no código; se você quiser o 426 também por padrão para Conector que recebe pedidos, o teste que manda 1.2.0 no retorno precisa passar a 1.2.1 — me diga. Rotas não feitas nesta passada: consumidores A7/A8, rotacionar/revogar chave, lotes/erros/reprocessar, mapeamentos, pedidos e reconciliações do BKO.

## Pronto quando
Pronto quando: integracao-hub.banco.test.ts inteiro verde.
