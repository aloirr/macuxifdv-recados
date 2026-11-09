---
id: R-20261108-230146-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:01:46-04:00
---
# View-modelo vw_macuxi_cliente: coluna tabela_preco_external_id (vínculo cliente -> tabela de preço)

## Contexto
Contexto: o ClientePayload (modules/integracao/contracts/entidades.ts) ganhou, aditivo e opcional no v1, tabela_preco_external_id (ExternalId, nullish): a MESMA chave tabela_external_id da entidade preco; ausente não altera, null desvincula.

## O que preciso / o que mudou
O que preciso: em db/conector/views-modelo.sql, seção 8 (vw_macuxi_cliente), a coluna CAST(c.id_tabela_preco AS VARCHAR(200)) AS tabela_preco_external_id (NULL quando o cliente usa a tabela padrão do ERP; documentar no cabeçalho a regra: NULL = não altera, e que para desvincular o ERP devolve a tabela padrão), nos dois dialetos, com o mesmo COLLATE binário já usado. Me avise quando estiver no main: eu então incluo a coluna na consulta e no mapeamento de apps/conector/exemplos/conector.exemplo.json e conector.oracle.exemplo.json (o teste exemplos-views-modelo.test.ts compara os dois).

## Pronto quando
Pronto quando: a view tem a coluna e o docs/banco/integracao.md cita; o banco do Hub não muda (o payload fica em integracao.registro_atual.payload jsonb).
