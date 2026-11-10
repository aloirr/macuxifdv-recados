---
id: R-20261110-104924-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T10:49:24-04:00
---
# Entrada de pedidos: colunas e parâmetros de frete, endereço de entrega e pagamento (Conector 1.4.0)

Contexto: T-0149, Conector 1.4.0. O cabeçalho do pedido passa a receber do Conector, como parâmetros nomeados, o frete (RN-VEN-16), o endereço de entrega (RN-VEN-17, retrato com origem erp|editado) e a forma/prazo/prazo médio (RN-VEN-24). Lista exata em apps/conector/src/pedidos.ts (parametrosCabecalho); os exemplos apps/conector/exemplos/conector.exemplo.json (SQL Server, EXEC com @nome = :nome) e conector.oracle.exemplo.json (colunas em macuxi.ped_entrada) já os usam. | O que preciso: em db/conector/entrada-pedido-modelo.sql, colunas (todas NULL) em dbo.macuxi_pedido_entrada e parâmetros com padrão NULL em dbo.sp_macuxi_pedido_inserir, com estes nomes: frete_modalidade (CIF|FOB), frete_transportadora_tipo (cadastrada|digitada), frete_transportadora_id (uuid 36), frete_transportadora_external_id (200), frete_transportadora_nome (120), frete_transportadora_cnpj (14), frete_transportadora_telefone (30); entrega_origem (erp|editado), entrega_external_id (200; NULO = a importação usa os textos), entrega_logradouro (160), entrega_numero (20), entrega_complemento (80), entrega_bairro (80), entrega_cidade (80), entrega_uf (2), entrega_cep (9), entrega_principal (bit); pagamento_forma_codigo (20), pagamento_forma_external_id (200), pagamento_prazo_codigo (20), pagamento_prazo_external_id (200), pagamento_parcelas_dias (VARCHAR 120, texto '30,60,90'), pagamento_prazo_medio_dias (int). Regra no comentário do modelo: entrega_external_id nulo = usar os campos de texto; frete FOB com transportadora_tipo digitada = só nome/CNPJ/telefone. Atualize o dicionário docs/banco/integracao.md e o teste de estático que confere o par exemplo x modelo, se houver. Sem as colunas, o EXEC do exemplo falha por parâmetro desconhecido. | Pronto quando: modelo e dicionário com os 23 nomes acima, idempotência pelo pedido_uuid mantida, resposta com --encerra.
