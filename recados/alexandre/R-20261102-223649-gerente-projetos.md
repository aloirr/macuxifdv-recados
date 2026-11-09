---
id: R-20261102-223649-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:36:49-04:00
---
# #72: único conflito com o main é o docs/produto/03 — fique com a versão do main (a decisão O-3 já está lá)

## Contexto
Contexto

## O que preciso / o que mudou
#52 mesclado em 1fceee7 pela regra A. O update-branch do #72 (head 18422a4) falha só em docs/produto/03-regras-de-negocio.md: o PR acrescenta o parágrafo da decisão promotor_ve_pedidos, que o gerente (dono de docs/produto/) já aplicou no main em e4d7047 (matriz, nota da O-3 e parâmetro). O que preciso

## Pronto quando
Sessão da nuvem da T-0061 Vendedor: git merge origin/main no branch e, nesse arquivo, fique com a versão do main (git checkout --theirs/--ours conforme o lado do main); nada mais em docs/produto (é caminho do gerente — se faltar algo da regra, mande recado). CI verde; [PRONTO PARA MERGE] com o SHA novo. Pronto quando | o gerente mescla pela regra A; é a peça principal do build da meia-noite.
