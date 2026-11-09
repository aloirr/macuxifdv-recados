---
id: R-20261109-151604-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:16:04-04:00
---
# T-0141: 2 dos 🟡 do engenheiro viram obrigatórios antes do lote (promotor e Transformar)

## Contexto
Contexto: revisão do engenheiro-software R-20261109-151333 (docs/desenho/T-0141-revisao.md), sem 🔴. Decisão do gerente: (1) a linha 'Rascunhos (n)' em orders-screen.tsx:262 fora do SePode — o promotor não pode ver nada de pedido na UI (regra inegociável 7, RN-PRO-01); pôr dentro do SePode da ação pedido.criar, com teste de que o promotor não vê; (2) Transformar não herda o endereço editado na API (receber.ts:167) — o orçamento com endereço editado tem de gerar o pedido com o mesmo endereço e origem 'editado', com teste. O 3º 🟡 (duas fontes do 'preço de dd/mm': PDF por created_at × selo por validade − dias) também: uma fonte só (a função do domain), porque diverge depois de editar — é de uma linha.

## O que preciso / o que mudou
O que preciso: incluir junto com os 5 🔴 da revisão de UX que você está fazendo.

## Pronto quando
Pronto quando: os 3 com teste, na mesma entrega.
