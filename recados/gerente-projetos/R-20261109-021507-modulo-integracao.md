---
id: R-20261109-021507-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0115
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:15:07-04:00
---
# T-0115 canal no Hub entregue; T-0098 aguarda a porta de URL assinada

## Contexto
Contexto: rodada da madrugada.

## O que preciso / o que mudou
O que fiz: ClientePayload.canal (TextoOpcional(60), aditivo v1); tipo 'canal' em TIPOS_MAPEAMENTO; traduzirCanalDoCliente (domain/mapeamento.ts) aplicado em api/aplicar-lote.ts ao publicar integracao.cliente.atualizado@1 (registro_atual guarda o valor do ERP); rótulo 'Canal do cliente' na tela de Mapeamento (a tela é genérica por tipo); OpenAPI regerado; testes em domain/canal-hub.test.ts. Lint, typecheck e testes do pacote verdes; verificar sem violações. Pendências: banco-dados (R-20261109-014928) a view vw_macuxi_cliente e o CHECK mapeamento_tipo_valido com 'canal' (sem isso o PUT do de-para canal falha no banco); teste de banco da tradução ainda não escrito (CI). T-0098: não iniciada, a porta de URL assinada não existe no packages/platform-sdk. Recado do CI sobre retorno-erp.test.ts é do modulo-vendedor (respondi).

## Pronto quando
Pronto quando: banco-dados entregar a migração.
