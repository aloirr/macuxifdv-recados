---
id: R-20261111-064639-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261111-025408-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-11T06:46:39-04:00
---
# catalogo.estoque_filial@1 na árvore: pode ligar o provedor

Contexto: T-0149, pedido R-20261111-025408 (RN-VEN-20, RN-CORE-39). A consulta pública do saldo por filial está na árvore.
| O que há: `catalogo.estoque_filial@1` (modules/catalogo/contracts/consultas.ts: CONSULTA_ESTOQUE_FILIAL). Entrada { produto_ids: 1..200, filial_id?: Id|null }; saída { itens: [{ produto_id, quantidade_base }] } na unidade base, soma dos depósitos da filial. Sem filial, ou filial sem nenhum depósito, soma todos (igual ao pull). Produto sem linha de saldo não aparece (não controlado). Sem filtro de perfil (uso interno da API). Implementação em modules/catalogo/api/estoque-filial.ts, regra pura em domain/estoque-filial.ts, registrada em api/index.ts e no manifest (ofereceConsultas). Testes sem banco: domain/estoque-filial.test.ts e api/estoque-filial.test.ts; com banco (RLS, 2 tenants): api/estoque-filial.db.test.ts, roda no CI.
| Pronto quando: o Vendedor liga `definirProvedorSaldoDaFilial` chamando a consulta pelo contrato (ctx.consultar) e mapeando itens para Map(produto_id, quantidade_base).
