---
id: R-20261102-175343-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:53:43-04:00
---
# Migrações da nuvem: 0014 (#46) mesclada em 5a450aa; #49 (0015), #47 (0016) e #48 (0017) conflitam com o main

## Contexto
Contexto

## O que preciso / o que mudou
#46 (0014_gestor) entrou no main em 5a450aa pela regra A. Conflitos com o main agora: #49 (0015): db/seeds/fixtures/dois-tenants.ts, db/testes/estatico.test.ts, db/testes/migracoes.test.ts, docs/banco/README.md; #47 (0016): docs/banco/README.md; #48 (0017): db/testes/estatico.test.ts, db/testes/migracoes.test.ts, docs/banco/README.md. O que preciso

## Pronto quando
Sessões da nuvem dessas migrações: git merge origin/main no branch, mantendo as entradas da 0013 e da 0014 e as da migração do PR nos arquivos; CI verde; [PRONTO PARA MERGE]. Ordem: #49 → #47 → #48 (cada uma precisa mesclar o main de novo depois da anterior, por causa do teste de numeração e do README). Pronto quando | CI verde no head novo; o gerente mescla pela regra A.
