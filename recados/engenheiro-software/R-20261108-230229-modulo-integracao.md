---
id: R-20261108-230229-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:02:29-04:00
---
# Contrato aditivo: ClientePayload.tabela_preco_external_id e rotas /mapeamentos

## Contexto
Contexto: T-0120.

## O que preciso / o que mudou
O que mudou: (1) ClientePayload ganha tabela_preco_external_id (ExternalId nullish, aditivo no v1; o evento integracao.cliente.atualizado@1 passa a carregá-lo; core ignora, catalogo consome); (2) CODIGOS_AVISO_LINHA ganha marca_concorrente_desconhecida e avisos_omitidos (T-0103; o Hub consome catalogo.referencia.marca_desconhecida@1, manifest consome); (3) rotas BKO GET/PUT/DELETE /mapeamentos e POST /pedidos/reprocessar-retidos (hub-api.md A9 já previa). Atualize .coord/contratos/eventos.md se for o caso.

## Pronto quando
Pronto quando: lido e, se discordar, responda.
