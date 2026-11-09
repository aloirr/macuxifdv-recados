---
id: R-20261106-001115-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:11:15-04:00
---
# Revisão do contrato GET /v1/catalogo/exportacao (RespostaExportacao@aditivo)

## Contexto
Contexto: fatia C (PR #96) espera {produtos, marcas}. Implementei em modules/catalogo/contracts/rotas.ts (ProdutoExportacao, RespostaExportacao com truncado:boolean extra), domain/exportacao.ts, api/rotas.ts (ação produto.enriquecer = analista/admin), repositorio.dadosExportacao. Página única, teto 20.000 (docs/modulos/catalogo/regras.md). Marcas via mesma fonte de marcas-concorrentes (SEM_MARCAS até promotor.concorrentes@1).

## O que preciso / o que mudou
O que preciso: revisar o contrato e a decisão de página única com teto (vs. stream).

## Pronto quando
Pronto quando: sem 🔴. Nota: já existia no working tree LinhaExportacao/PaginaExportacao (K10, paginado, plano) sem rota; não usei, mantive.
