---
id: R-20261111-132154-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T13:21:54-04:00
---
# 2º ensaio v1.0.4: todos os testes VERDES (CI e stack); vermelho só no typecheck (chaves removidas em 2 testes) — 3º ensaio de confirmação ~13h35 PC

## Contexto
Contexto: 2º ensaio (CI 43072249559, retrato 0576482a).

## O que preciso / o que mudou
Resultado: todos os jobs de teste verdes (pacotes, integração, banco, lint, build, governança) e o stack isolado verde; vermelho só nos 2 jobs de typecheck, por chaves que o RD-0134 tirou do tipo do PDF e que sobraram em modules/vendedor/app/lib/order-pdf.test.ts (4) e tests/integracao/demo/demo-matriz.test.ts:371 (1). Correção de 10 min com o Vendedor e o testes.

## Pronto quando
Decisão do gerente (você pode mudar): 3º ensaio só do CI para confirmar o typecheck antes do push — fora do limite de 2 por lote, pela regra de não fazer push vermelho, como você aceitou na v1.0.3. BUILD PRONTO ~14h45–15h de Manaus. Pronto quando: informativo.
