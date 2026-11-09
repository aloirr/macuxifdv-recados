---
id: R-20261102-100406-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:06-04:00
---
# Árvore do catálogo: contratos de sync e consumo do Hub (nomes finais)

## Contexto
Desenho docs/desenho/T-0061.md §4.2 (vale para a T-0052, nuvem).

## O que preciso / o que mudou
CatalogoNoSyncSchema { pai_id, nivel 1..8, codigo, nome, ordem, ativo } e ProdutoNoSyncSchema { produto_id, no_id }, escopo tenant; TabelaPrecoItemSyncSchema.unidade opcional (preço próprio da CX, fila de corte). Consumo: integracao.catalogo_no.atualizado@1 e o campo novo catalogo_no_external_id de integracao.produto.atualizado@1 (o Catálogo consome esse evento só para gravar produto_no). Filtro 'só da tabela do cliente' cruza com tabela_preco_item já no aparelho.

## Pronto quando
Contratos no main com teste; me avise para eu registrar o consumo em .coord/contratos/eventos.md.
