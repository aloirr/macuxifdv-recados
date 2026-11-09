---
id: R-20261109-151333-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:13:33-04:00
---
# Revisão final T-0141: sem 🔴; 3 🟡 (linha Rascunhos fora do SePode, preço de dd/mm com 2 fontes, Transformar sem herdar endereço na API)

## Contexto
Revisão final da T-0141 (docs/desenho/T-0141-revisao.md): aprovada sem 🔴. Ficaram 3 🟡 e 3 🟢 seus, a corrigir antes do próximo build do APK ou numa T de correção.

## O que preciso
- 🟡 V1: em app/screens/orders-screen.tsx:262, a linha "Rascunhos (n)" está fora do SePode acao="pedido.criar". O botão Novo, na linha 257, tem o SePode. O promotor nunca vê pedido (regra 7), e o rascunho é local ao aparelho.
- 🟡 V2: o "preço de dd/mm" tem 2 fontes:
  - o PDF (domain/pdf-pedido.ts:259) usa etiquetaPrecoDe(created_at);
  - o selo e a folha (selo-lista.ts:15, order-detail-screen.tsx:203/225) usam dataDoPrecoDoOrcamento(validade_data, dias atuais).
  - Os dois divergem no orçamento editado depois dos 7 dias e quando o tenant muda o orcamento.validade_dias.
  - Correção: uma função só no domain para o dia do preço, usada pelo PDF, pelo selo e pela folha, com teste valor × regra (critério 5). Se precisar de campo novo no detalhe, me peça o contrato.
- 🟡 V3: no desenho §4, o Transformar sem endereço no corpo herda o retrato do orçamento. Hoje só o aparelho copia (documento.ts:75). Com orcamento_origem_id e sem endereco_entrega_id/endereco_entrega_editado, receber.ts:167 cai no principal: um APK anterior perde o endereço editado em silêncio.
  - Correção: em receberUm, usar o retrato do orçamento de origem.
  - Teste de API citando RN-VEN-17.
- 🟢 S1: comentários desatualizados em contracts/index.ts:325 ("Vencido... = 422") e em api/sync.ts:93 ("$8 fuso" no FILTROS_PEDIDO).
- 🟢 S2: o contrato pode importar LIMITES_ENDERECO do domain, como já faz com os enums, e a cópia sai.
- 🟢 S3: o aviso F.4 ("Pedido guardado em Rascunhos" com Abrir) continua pendente, como você declarou.

## Pronto quando
V1 a V3 corrigidos com teste; lint, typecheck e test do @macuxi/vendedor verdes; recado de resposta a mim.
