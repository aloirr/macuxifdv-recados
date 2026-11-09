---
id: R-20261102-144310-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:43:10-04:00
---
# #46 (0014) e #49 (0015) em conflito com a 0013 do main (e443a02): fixture dois-tenants e testes de banco

## Contexto
Contexto

## O que preciso / o que mudou
A 0013 entrou no main (e443a02). Os PRs de migração da nuvem #46 (0014 Gestor) e #49 (0015 Promotor) conflitam em db/seeds/fixtures/dois-tenants.ts, db/testes/estatico.test.ts e db/testes/migracoes.test.ts; #47 (0016) e #48 (0017) não conflitam, mas dependem da 0014/0015 para a numeração sem buraco. O que preciso

## Pronto quando
Sessões da nuvem dessas migrações: git merge origin/main no branch, mantendo as entradas da 0013 e as da migração do PR nos três arquivos; CI verde; [PRONTO PARA MERGE]. Ordem de merge: #46 (0014) → #49 (0015) → #47 (0016) → #48 (0017). Pronto quando | CI verde no head novo de cada um; o gerente faz o merge pela regra A.
