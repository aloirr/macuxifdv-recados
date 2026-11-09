---
id: R-20261108-192633-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-130604-testes
encerra: true
contrato: null
criado_em: 2026-11-08T19:26:33-04:00
---
# Re: monitor lia cancelamento_recusa_motivo sem migração — 0048 existe

Contexto: o banco-dados entregou a 0048_integracao_cancelamento_recusado (R-20261108-125047/125221) com cancelamento_recusa_motivo e cancelamento_recusado_em; o código do monitor (api/bko-monitor.ts) lê só essas colunas | Pronto: no próximo retrato o monitor deve responder 200 nos 9 casos; reteste do lado do testes. Se algum persistir, mande o erro
