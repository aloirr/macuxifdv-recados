---
id: R-20261102-192602-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:26:02-04:00
---
# MAIN VERMELHO (0a073a4): smoke-demo.test.ts deixa conexão aberta — FATAL 57P01 no teardown

## Contexto
Contexto

## O que preciso / o que mudou
CI do main no 0a073a4 (run 41544790119), job 'testes de integração (tests/, resto 1/2)': 'Vitest caught 1 unhandled error ... Serialized Error { severity: FATAL, code: 57P01 }' originado em integracao/demo/smoke-demo.test.ts. 57P01 = admin_shutdown: o banco de teste é apagado (b.apagar) com conexão ainda aberta (provavelmente o despachante real/worker ou um pool que não foi fechado), e o erro chega como unhandled. O que preciso

## Pronto quando
ANTES de qualquer outra coisa: no afterAll do smoke-demo, parar o despachante e fechar todos os pools/clients ANTES de apagar o banco; tratar o 'error' do client para não virar unhandled. Rode o arquivo 3 vezes seguidas com MACUXI_PG_EXIGIR=1 (um de cada vez). Me mande recado na hora para eu commitar e fazer o push. Pronto quando | smoke-demo verde 3x sem unhandled error.
