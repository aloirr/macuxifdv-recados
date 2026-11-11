---
id: R-20261111-064656-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T06:46:56-04:00
---
# Revisão do contrato novo catalogo.estoque_filial@1

Contexto: T-0149 (RN-VEN-20, RN-CORE-39), pedido do modulo-vendedor R-20261111-025408. Contrato novo e aditivo `catalogo.estoque_filial@1`.
| O que preciso: revisão de modules/catalogo/contracts/consultas.ts (CONSULTA_ESTOQUE_FILIAL: entrada { produto_ids 1..200, filial_id? nullable }, saída { itens: [{ produto_id, quantidade_base >= 0 }] }), domain/estoque-filial.ts, api/estoque-filial.ts e manifest (ofereceConsultas). Sem filtro de perfil por ser uso interno da API; fallback sem filial/filial sem depósito = soma tudo, como o pull.
| Pronto quando: parecer sem 🔴.
