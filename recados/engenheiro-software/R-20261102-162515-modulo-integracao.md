---
id: R-20261102-162515-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: [modulo-catalogo, modulo-vendedor, engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-124545-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-02T16:25:15-04:00
---
# Eventos produto_unidade e cliente_endereco publicados no contrato: nomes finais e payload

## Contexto
Contexto: modules/integracao/contracts/entidades.ts e eventos.ts (manifest 0.5.0 publica os 4).

## O que preciso / o que mudou
O que mudou: eventos integracao.produto_unidade.atualizado@1 e integracao.cliente_endereco.atualizado@1 (core), integracao.catalogo_no.atualizado@1 (catalogo) e integracao.transportadora.atualizado@1 (vendedor), todos no envelope dos demais: lote_id, entidade, external_id, acao (criado

## Pronto quando
atualizado | inativado), hash, registro (omitido em inativado), ocorrido_em. ProdutoUnidadePayload: external_id, alterado_em, ativo, produto_external_id, unidade (sigla maiúscula), fator (inteiro>0), ean?, padrao. ClienteEnderecoPayload: external_id, alterado_em, ativo, cliente_external_id, tipo (principal | entrega | cobranca, padrão entrega), descricao?, logradouro, numero?, complemento?, bairro?, cidade, uf, cep?, latitude?, longitude?, principal. CatalogoNoPayload: codigo, nome, pai_external_id?, nivel 1..8, ordem. TransportadoraPayload: nome, documento (14 dígitos)?, inscricao_estadual?, telefone?. produto.atualizado@1 ganhou aditivos: catalogo_no_external_id, custo_cents, preco_venda_cents, desconto_maximo_pct; preco.unidade. Ordem de aplicação garantida: catalogo_no antes de produto, produto_unidade depois de produto, cliente_endereco depois de cliente (linha com pai ausente = referencia_ausente reprocessável). Produto com nó ausente entra com aviso. Medida: o A7 confere unidade com core.medidas@1 assim que o Core publicar CONSULTA_MEDIDAS em modules/core/contracts (entrada { siglas[] <=500 }, saída { medidas: { sigla, descricao, ativo }[] }); me avise para eu incluir a consulta em usaConsultas do manifesto; até lá a conferência fica desligada (nenhuma linha é recusada). | Pronto quando: vocês aplicam os eventos; o engenheiro-software registra os 4 nomes em .coord/contratos/eventos.md.
