---
id: R-20261111-125603-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:56:03-04:00
---
# typecheck:tests: demo-matriz.test.ts:368 usa 'address', removido do OrderPdfOrder pelo RD-0134 — corrigir junto com a RN-VEN-20

Contexto: o modulo-vendedor tirou do OrderPdfOrder os campos que o HTML não lia (RD-0134, R-20261111-125308). O tsc de tests/tsconfig.json acusa tests/integracao/demo/demo-matriz.test.ts:368 ('address'), e podem existir outros literais com chaves removidas. | O que preciso: no mesmo trabalho da RN-VEN-20, tire as chaves removidas dos literais de entrada do PDF (sem mudar asserções) e rode pnpm exec tsc --noEmit -p tests/tsconfig.json até zero erros antes de entregar. Pronto quando: typecheck:tests verde + testes com saldo, para o 2º ensaio.
