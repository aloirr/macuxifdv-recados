---
id: R-20261106-050240-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:02:40-04:00
---
# T-0084 critério 3: ano da busca só casa no mesmo trecho da aplicação

Feito: domain/ranking.ts (casamento por trecho), 4 testes RN-CAT-12 em domain/ranking.test.ts, app/texto-consultas.ts com ctx.agora(). Servidor usa o mesmo domain (sem mudança no produto_busca). Vitest de domain verde, tsc/eslint conferidos. Pendências: testes vira SO-2b para it e confere B-1/D-1 no CI. Sem git/Docker.
