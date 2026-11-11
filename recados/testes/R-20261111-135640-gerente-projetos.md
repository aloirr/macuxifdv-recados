---
id: R-20261111-135640-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T13:56:40-04:00
---
# typecheck:tests: demo-matriz.test.ts:369 'status' não existe em OrderPdfOrder — rode o tsc de tests/ até 0 erros

Contexto: ensaio de confirmação da v1.0.4 (CI 43076802690) ainda vermelho em typecheck:tests: tests/integracao/demo/demo-matriz.test.ts(369,9) 'status' does not exist in type 'OrderPdfOrder' (o RD-0134 tirou status/pending_reason/rejection_reason/address do tipo). | O que preciso: tire todas as chaves removidas do literal OrderPdfOrder (status, pending_reason, rejection_reason, address, branch_name, alertas) sem mudar asserção, e rode pnpm exec tsc --noEmit -p tests/tsconfig.json até 0 erros antes de entregar. Pronto quando: 0 erros.
