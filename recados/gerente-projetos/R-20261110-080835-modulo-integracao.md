---
id: R-20261110-080835-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-064129-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-10T08:08:35-04:00
---
# T-0149 (integracao): filial no Hub v1, PedidoParaErp.filial, exigeConector 1.4.0 e Conector 1.4.0 empacotado

## Contexto
Contexto: Hub e Conector da filial (RN-CORE-39, ADR 0040), tudo aditivo na v1.

## O que preciso / o que mudou
Feito: (1) contracts: ENTIDADES 16 com filial (FilialPayload), evento integracao.filial.atualizado@1, soma de controle nula, filial_external_id opcional em cliente, preco, estoque e tabela_escalonada, PedidoParaErp.filial e PedidoAprovadoParaFila.filial = {codigo, external_id

## Pronto quando
null, nome?, padrao?}; OpenAPI e colecoes Postman/Insomnia regeradas. (2) domain: ordem de carga (filial antes de cliente/preco/estoque/escalonada, tambem no portal), referencia filial_external_id, repasse da filial em montarPedidoParaErp (pedido sem filial = mesmo payload e hash), exigeConector: filial padrao=false exige 1.4.0 (VERSAO_CONECTOR_FILIAL), a exigencia maior vence, pedido espera na fila e nao e recusado. (3) Conector 1.4.0 (apps/conector, versao e package.json): entidade filial na ORDEM_CARGA, :filial_codigo e :filial_external_id no cabecalho do pedido (nulos = filial padrao do ERP), exemplos SQL Server/Oracle lendo vw_macuxi_filial e filial_external_id; pacote gerado com scripts/empacotar.mjs (dist/conector.mjs). O 1.3.x NAO quebra: a lista de entidades vem so do conector.json local, o Hub aceita filial de qualquer Conector, entao filial entra ja no 1.4.0 sem risco para os instalados. (4) docs: hub-api.md sec. 20, conector.md, carga-arquivo.md, guia-api-hub.md. Testes: domain/filial.test.ts (9, citando RN-CORE-39/INT) e apps/conector/test/filial-pedido.test.ts (3); modulo integracao: 6 arquivos afetados 107/107 verdes + suite completa sem outra falha; Conector 331 verdes; tsc dos dois limpos; eslint limpo. | Pendencias: (a) banco-dados: CHECK de entidade/ENTIDADES_BANCO (modules/integracao/db/nuvem.ts), vw_macuxi_filial, coluna filial_external_id nas 4 views e filial_codigo/filial_external_id na entrada de pedidos (pedido R-20261110-074414-modulo-integracao); sem isso o teste de alinhamento com o banco e o ensaio de quinta nao fecham. (b) vendedor: publicar filial {id,codigo,external_id,nome,padrao} em vendedor.pedido.aprovado@1; hoje o snapshot ja a repassa, mas o tipo PedidoAprovadoEvento ainda nao a declara. (c) core: consumir integracao.filial.atualizado@1 (manifest ja publica). (d) NAO consegui rodar testes de banco (sem Docker): vale o CI. (e) observacao: o Conector 1.3.0 nao repassa frete/endereco_entrega/pagamento ao SQL do cabecalho (so os campos do cabecalho antigo); fora do escopo, mas vale conferir antes do ensaio. (f) caixa ainda tem recados antigos meus (T-0115, T-0098, T-0140, T-0141) nao tratados nesta rodada. (g) verificar acusa .vscode/settings.json sem dono (nao e meu). Falta passar por testes e corretor-redundancias.
