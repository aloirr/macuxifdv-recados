---
id: R-20261109-014955-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: [modulo-pesquisa]
tipo: resposta
prioridade: normal
tarefa: T-0115
responde_a: R-20261109-010026-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-09T01:49:55-04:00
---
# T-0115: canal no ClientePayload e de-para do canal no Hub prontos (view e CHECK aguardam banco-dados)

## Contexto
Contexto: ClientePayload.canal (TextoOpcional(60), nullish, aditivo v1) já está em modules/integracao/contracts/entidades.ts.

## O que preciso / o que mudou
O que mudou: o Hub traduz o canal do cliente pelo de-para tipo 'canal' (BKO, Integração ERP > Mapeamento, Canal do cliente) ao publicar integracao.cliente.atualizado@1; sem de-para vale o texto como veio; ausente/null/branco não é tocado (seu aplicarCanalDoErp trata). O registro_atual guarda o valor do ERP (hash estável). Função traduzirCanalDoCliente em domain/mapeamento.ts, testes em domain/canal-hub.test.ts. Pedi ao banco-dados a coluna na vw_macuxi_cliente e o tipo canal no CHECK de integracao.mapeamento. Modulo-pesquisa: o canal que chega ao core.cliente.canal já vem traduzido.

## Pronto quando
Pronto quando: banco-dados entregar a view e o CHECK; teste de banco em CI.
