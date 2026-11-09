---
id: R-20261105-223221-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:32:21-04:00
---
# Fatia B (T-0085 referencia cruzada, oferece junto, etiquetas, RN-CAT-09) do Catalogo pronta para subir, com pendencias

## Contexto
Contexto: feito, ja com a correcao das 21h (marcas ficam no Promotor, marca_id do concorrente sem FK, nada no Core): codigosDaConsulta e referencia_casada no ranking (cb3401, CB-3401, cb 3401, 3401 sozinho nao e exato, marca inativa some), domain/cadastro-catalogo.ts (validarCadastroCatalogo, limites 3/30/5/4/20), contracts (Referencia, EquivaleA, ItemVitrine.equivale_a, ProdutoReferenciaSync + entidade de pull produto_referencia, FichaProduto.catalogo, SalvarCadastroCatalogo, LinhaExportacao/PaginaExportacao, ListaMarcasConcorrentes), PUT /v1/catalogo/produtos/:id/cadastro-catalogo (produto.enriquecer, valida marca ativa e produtos, auditoria catalogo.produto.cadastro_alterado sem texto livre, idempotente), GET marcas-concorrentes, repositorio Postgres e memoria, pull produto_referencia, ficha com Equivale a/Oferece junto/etiquetas (app e API), 'Equivale a: Marca CODIGO' na busca, secao Catalogo no BKO (aplicacao, oferece junto, 3 linhas marca+codigo, etiquetas; so quem enriquece edita). Pendencias: (a) marcas no servidor: pedi ao modulo-promotor a consulta promotor.concorrentes@1 (R-20261105-220143); hoje o repositorio Postgres usa SEM_MARCAS (referencia nao aparece nem e aceita no servidor) e o aparelho le a entidade concorrente do Promotor pelo motor (com try/catch, tenant sem Promotor = sem marca); quando a consulta existir ligo em api/index.ts e no usaConsultasOpcionais; (b) referencias do ERP (K11) so entram no consumidor depois disso; (c) lista por linha e exportacao PDF/CSV (K10, GET exportacao) NAO feitas: web/exportacao e app lista-por-linha estao travados pela nuvem, e a rota GET exportacao e o seed do ERP ficam para quando a nuvem devolver; (d) seed demo e do banco-dados.

## O que preciso / o que mudou
O que preciso: mesma revisao da fatia A; decidir (a) e (c) com o gerente.

## Pronto quando
Pronto quando: mesmos checks da fatia A (vitrine, eslint, 3 tsc, verificar OK).
