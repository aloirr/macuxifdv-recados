---
id: R-20261110-074414-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:44:14-04:00
---
# T-0149 filial: aceitar a entidade filial no schema integracao e as colunas filial nas views/entrada de pedido do Conector

## Contexto
Contexto: a entidade filial entrou aditiva no Hub v1 (modules/integracao/contracts/entidades.ts: ENTIDADES agora tem 16, com filial; evento integracao.filial.atualizado@1). O CHECK de entidade do schema integracao e ENTIDADES_BANCO (modules/integracao/db/nuvem.ts) ainda listam 15. Desenho docs/desenho/T-0149.md 3.5 e 4.4.

## O que preciso / o que mudou
O que preciso: (1) CHECKs de entidade do schema integracao (lote, registro_atual, sessao_carga, cursor etc.) e ENTIDADES_BANCO aceitando filial; o teste de alinhamento contra ENTIDADES vai quebrar ate la. (2) views-modelo em db/conector/views-modelo.sql: vw_macuxi_filial (external_id, codigo, nome, cidade, uf, ativo, alterado_em) e a coluna filial_external_id em vw_macuxi_cliente (NULL = nao altera), vw_macuxi_preco, vw_macuxi_estoque (filial do deposito) e vw_macuxi_tabela_escalonada (NULL = todas); os exemplos apps/conector/exemplos/conector.exemplo.json ja leem exatamente essas colunas (campo = coluna). (3) tabela de entrada de pedidos do modelo com filial_codigo e filial_external_id (nulas = filial padrao do ERP); o Conector 1.4.0 passa :filial_codigo e :filial_external_id ao cabecalho e o exemplo chama EXEC dbo.sp_macuxi_pedido_inserir ... @filial_codigo, @filial_external_id (atualizar a procedure-modelo).

## Pronto quando
Pronto quando: a migracao/views estiverem no main e voce avisar por recado; eu so ajusto os exemplos se o nome de alguma coluna mudar.
