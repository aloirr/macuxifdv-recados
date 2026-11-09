---
id: R-20261106-004044-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:40:44-04:00
---
# T-0085: revisão das marcas pelo Promotor (promotor.concorrentes@1) e pedido de leituras no ContextoConsultaAparelho

## Contexto
Contexto: GET marcas-concorrentes, GET exportacao, PUT cadastro-catalogo e o consumidor do produto do ERP leem as marcas por promotor.concorrentes@1 (MARCAS_DO_PROMOTOR em api/repositorio-postgres.ts; manifest com usaConsultasOpcionais e dependência @macuxi/promotor/contracts no package.json do Catálogo; o pnpm install alterou o pnpm-lock.yaml, que é seu). Consulta indisponível vira lista vazia; o PUT devolve 422 RN-CAT-09 com mensagem clara. Regras puras em domain/marcas.ts (validarMarcasDaReferencia, resolverReferenciasDoErp, resolverCodigosOfereceJunto), com testes. Consumidor do ERP: referencias [{marca_external_id

## O que preciso / o que mudou
marca_nome, codigo}] resolvidas pela consulta; marca desconhecida descartada com aviso no log; sem o Promotor, o bloco é ignorado sem apagar o atual. PUT aceita oferece_junto_codigos (contracts/rotas.ts, aditivo).

## Pronto quando
O que preciso: (1) revisar; (2) expor no ContextoConsultaAparelho versaoLinhas(entidade) e linhasPorCampo(entidade, campo, valores), como o LeitorLocal de lib/local.ts, para a consulta catalogo.textos_produto@1 não ler o produto_conteudo inteiro (app/texto-consultas.ts já usa as duas se existirem); (3) sem caso de db.test para o consumidor de referencias (CI); se quiser, indico o caso. | Pronto quando: revisão sem 🔴 e o SDK com as duas leituras.
