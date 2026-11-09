---
id: R-20261108-111548-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T11:15:48-04:00
---
# T-0119 pronta para revisão: busca com 20 mil produtos (retrato por tenant + índice de pré-seleção), sem migração

## Contexto
T-0119 / D-T0107b: GET /v1/catalogo/busca com 20 mil produtos levava ~5 s isolada (p95 15-20 s). Meta p95 < 300 ms.

## Causa
Não era plano de consulta: preço e estoque já usam índice (tabela_preco_item_vigencia_uk, estoque_saldo_produto_ix). A rota lia e ranqueava o catálogo inteiro a cada pedido: repo.produtos() (155 consultas, ~0,7 s), preço e estoque de TODOS os ativos (40 mil linhas), itemDaVitrine + docDeBusca + rankear dos 20 mil (~4 s de CPU no Node, que também enfileirava as outras rotas da instância).

## Correção (só módulo catalogo)
- domain/indice-busca.ts (novo, função pura): índice invertido termo -> produtos (nome, código, marca, categoria, atributos, aplicação com anos expandidos, referências) e candidatosDaBusca: superconjunto exato dos produtos que podem pontuar (exato, prefixo, digitação, sinônimos, SKU/EAN/referência) + maxVendas do universo completo (a nota não muda). rankear e buscarProdutos ganharam o opcional maxVendas. Sem texto/código, com preço, estoque, "só vendáveis" ou nota semântica, ou catálogo < 2000: lista inteira, como antes.
- api/repositorio-postgres.ts + repositorio.ts: produtosEmCache (opcional na interface): retrato por tenant, 60 s, descartado nas gravações do Catálogo (cadastro, destaque, conteúdo, marca), renovação em voo único. Preço e estoque nunca entram no retrato.
- api/rotas.ts (busca): usa o retrato, o vocabulário em cache (WeakMap), os candidatos e lê preço/estoque só deles.
- docs/modulos/catalogo/busca-desempenho.md.

## Testes
- domain/indice-busca.test.ts: 30 consultas (typos, sinônimo, SKU, EAN, referência CB-xxxx, aplicação com ano) = mesmos itens, ordem, total e notas com e sem pré-seleção (passou local, 36 testes).
- api/busca-volume.db.test.ts (só CI, 20 mil produtos): EXPLAIN de preço e estoque sem Seq Scan; 2º pedido sem consulta de produto; gravação descarta o retrato; p95 do caminho da busca < 300 ms; igualdade com o ranking da lista inteira. NÃO rodou aqui (sem Docker): o critério é o CI.
- tsc (3 projetos do catálogo) e eslint dos arquivos tocados: verdes. verificar modulo-catalogo: sem violações.

## Pedido ao banco-dados
Nenhum: não há DDL nem migração nova (0046/0047 já usadas por outros). Se o EXPLAIN do CI mostrar Seq Scan, mando o pedido de índice com o plano.

## Medida esperada
Busca típica: ~10-60 ms de CPU com o retrato quente (índice + ranking de centenas de candidatos + 2 consultas indexadas de preço/estoque). A primeira busca após 60 s ou gravação paga ~0,7 s de leitura + construção do índice (conhecido, documentado). Falta confirmar na carga T-0107 (MACUXI_CARGA_MEDIR=1, PR #110), que mede por HTTP.

## Pronto quando
Revisão do engenheiro-software sem vermelho e CI verde, incluindo o db.test novo. Observação: marca e categoria dos produtos vêm vazias do cadastro do Core nesta rota (cadastroDoCore as zera); não mexi, fica como achado separado. Ao testes: R-20261108-124417-2-testes pode rodar o ensaio completo quando isto estiver no main.
