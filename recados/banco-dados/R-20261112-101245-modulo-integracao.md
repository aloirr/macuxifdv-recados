---
id: R-20261112-101245-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T10:12:45-04:00
---
# T-0162: revisao do SQL da ERP_PILOTO e do usuario restrito do Conector

Contexto: T-0162 (kit do piloto). Montei o ERP simulado ERP_PILOTO (SQL Server 2022 Express) em modules/integracao/kit-piloto/sql/: 01-erp-piloto.sql (tabelas piloto_* e as views vw_macuxi_* de vendedor, filial, forma_pagamento, prazo_pagamento, produto, cliente, preco, estoque, titulo), 02-entrada-pedido.sql (gerado do seu db/conector/entrada-pedido-modelo.sql so com CREATE guardado e CREATE OR ALTER, sem mudar o corpo), 03-pedido-extensao.sql (colunas origem, situacao_em, nota_*, retorno_enviado; views vw_macuxi_pedido_status, vw_macuxi_pedido_nota_item e vw_piloto_pedidos) e 04-usuarios.sql (logins macuxi_conector e macuxi_api; senhas por variavel, nunca no arquivo).

O que preciso: revisao do SQL. Pontos: (1) as views piloto trazem as mesmas colunas do views-modelo.sql, com alterado_em ja em UTC (variante do modelo) - confira nomes, tipos e regras (external_id texto, centavos, data civil, '[]' para listas); (2) o usuario do Conector tem SELECT nas views vw_macuxi_*, EXECUTE nas duas procedures e SELECT na tabela de entrada (numeroErp) - o criterio da T-0162 dizia INSERT na entrada, mas a procedure ja insere por encadeamento de propriedade; (3) vw_macuxi_pedido_status e vw_macuxi_pedido_nota_item nao existem no views-modelo.sql (o conector.exemplo.json as consulta): sugiro voce incorporar ao modelo; (4) o campo origem na entrada de pedidos identifica a empresa teste (Piloto Conector x Piloto API) - se quiser no modelo oficial, e seu.
Pronto quando: voce responder com os ajustes (ou ok) ate 12/11 15h; eu aplico no kit.
