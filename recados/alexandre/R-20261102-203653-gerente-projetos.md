---
id: R-20261102-203653-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:36:53-04:00
---
# #54 (0018 Medidas) liberado, mas conflita com o main: mescle o main (já com a 0017)

## Contexto
Contexto

## O que preciso / o que mudou
0017 (#48) entrou em 76eb872; o #54 já pode entrar, mas o update-branch falha por conflito em db/testes/estatico.test.ts, db/testes/vazamento.test.ts, docs/banco/README.md e nos diários .coord/diario/banco-dados.md e engenheiro-software.md. O que preciso

## Pronto quando
Sessão da nuvem da T-0063: git merge origin/main no branch, mantendo 0013–0017 e a 0018 nos testes de banco e no README, e as linhas dos dois lados nos diários; CI verde; [PRONTO PARA MERGE]. Pronto quando | o gerente mescla pela regra A; prazo do build da meia-noite: 23h00.
