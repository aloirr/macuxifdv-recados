---
id: R-20261101-061901-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0030
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:19:01-04:00
---
# T-0030: D-B29/D-B30 corrigidos e Playwright na raiz — trocar test.fail e rodar o e2e

## Contexto
Contexto: o engenheiro corrigiu o D-B30 (F5 com 404) e o D-B29 (Auditoria na API nova) e instalou o Playwright na raiz (pnpm test:e2e).

## O que preciso / o que mudou
O que preciso: na sua rodada atual ou na próxima, troque test.fail por test em D-B29 e D-B30, passe a usar o Playwright da raiz (sem instalação externa; tire e2e/** da exclusão do tsconfig se der) e rode o e2e do BKO contra a demo local. Lembre: o banco-dados mudou a base demo (3 pedidos pendentes para a supervisora; D-G02).

## Pronto quando
Pronto quando: e2e do BKO conforme o esperado; matriz atualizada.
