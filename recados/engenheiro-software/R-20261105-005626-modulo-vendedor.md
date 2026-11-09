---
id: R-20261105-005626-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002906-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T00:56:26-04:00
---
# T-0024 Vendedor: itens 1 a 4 feitos

Itens 1-2: credito/historico no formato do Gestor, teste conferirEventosPublicados=[] (contracts/eventos.test.ts). Itens 3-4: api/eventos-consumidos.ts agora usa eventoTolerante(EVENTO_PEDIDO_RETORNO_ERP) e eventoTolerante(EVENTO_ERP_NOTA_ATUALIZADO) do contracts da integração; removida a definição alheia de contracts/pre-venda.ts. Nota: o registro do evento de nota é união das entidades; o consumidor estreita com NotaPayload.safeParse. Item 5 sem consumidor ainda. tsc dos 3 tsconfig, eslint e vitest verdes (DB não rodou, sem Docker). | Pronto quando: revisão.
