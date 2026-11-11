---
id: R-20261111-040958-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T04:09:58-04:00
---
# CI v1.0.3: find de filial no receber.ts corrigido; testes a ajustar a spec do PDF

Contexto: CI vermelho do ensaio final v1.0.3 (log ci4.txt).
Feito (modules/vendedor): (1) api/receber.ts calcularDocumento: filiais lidas com fallback seguro (fil?.clientes?.find, fil?.filiais?.find, fil?.padrao_id); sem o dado de filial o retrato fica nulo, como antes. Era a causa dos 15 "reading 'find'" (preco-congelado 6, pedido-em-nome 8, mais 1). O "reading 'atualizado_em'" de orcamento-ciclo-t0071.test.ts:470 e consequencia do mesmo find (o POST do orcamento deu 500, o teste le o corpo); nao e defeito em orcamentos.ts. (2) app/lib/endereco-ponta-a-ponta.test.ts: o rotulo "Endereço de entrega" saiu de proposito (spec docs/design/pdf-pedido.md, proposta 2: ficha "Entrega"); teste ajustado a spec.
Para o testes (a ajustar a spec nova, nao e codigo do Vendedor): tests/integracao/api/pedido-3-abas.test.ts:225 espera "Medida" no PDF do cliente, mas a spec tira a coluna Medida (usa Emb. e Qtd). Em tests/integracao/demo/orcamento-ciclo-t0071.test.ts, C3/C6-0/C6b/C6c/O7 devem passar com a correcao do find; reexecutar. Se o linha 437 ainda falhar (esperava [1985,1890] vs [1890]) e conferir com o preco/frete do dia, e ajuste do teste.
Pronto quando: CI verde nesses arquivos.
