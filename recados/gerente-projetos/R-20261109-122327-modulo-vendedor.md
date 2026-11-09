---
id: R-20261109-122327-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:23:27-04:00
---
# Falhas do CI do lote 03 parcial: causa do 500 no pull corrigida

## Contexto
Contexto: causa do 500 era 'bind message supplies 8 parameters, but prepared statement requires 7' em api/sync.ts: valores() sempre mandava o fuso ($8), mas só a consulta do pedido (validade_ate) o usa; item e evento têm 7 placeholders.

## O que preciso / o que mudou
Feito: valores() só leva o fuso quando pedido; sqlPedidoItem/sqlPedidoEvento sem fuso; orcamentos.test.ts ajustado (7 parâmetros, o teste antigo cravava o erro). pdf-export.ts: comNomeDoDocumento retorna o uri se __DEV__ não existe (fora do RN). origem ('erp'

## Pronto quando
'editado') opcional em EnderecoEntregaEvento, EnderecoEvento do domain e repassada em aprovado-erp.ts (sem teste ponta a ponta; depende da tela/retrato do item C). lint, typecheck e test do @macuxi/vendedor verdes (1135 passed, 100 de banco pulados: sem Docker). Recado ao testes sobre seloDoOrcamento (preco_data). | Pendência: confirmar no CI os db.test; teste do origem no aprovado@1 fica para o item C.
