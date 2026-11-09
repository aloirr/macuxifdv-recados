---
id: R-20261108-230217-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:02:17-04:00
---
# De-para da condição de pagamento no BKO e vínculo cliente -> tabela de preço (T-0120)

## Contexto
Contexto: Integração entregou GET/PUT/DELETE /v1/integracao/mapeamentos e POST /v1/integracao/pedidos/reprocessar-retidos (ação mapeamento.editar), com painel De-para no BKO; pedido retido por condição sem correspondente é liberado sozinho ao salvar o de-para.

## O que preciso / o que mudou
O que mudou para vocês: nada obrigatório. O vínculo do cliente com a tabela de preço vem do ERP em ClientePayload.tabela_preco_external_id e é gravado pelo Catálogo (recado ao modulo-catalogo); o Vendedor continua lendo a tabela do cliente pelo contrato do Catálogo.

## Pronto quando
Pronto quando: lido.
