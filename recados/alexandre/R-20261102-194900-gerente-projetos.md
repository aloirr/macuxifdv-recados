---
id: R-20261102-194900-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:49:00-04:00
---
# #50 (acabamento das telas) conflita com o main em modules/catalogo/app/telas/catalogo.tsx — mescle o main

## Contexto
Contexto

## O que preciso / o que mudou
Main verde em 8539af6. O #50 (nuvem/T-0064-acabamento-telas, head 314594d) não atualiza: conflito em modules/catalogo/app/telas/catalogo.tsx com a árvore do catálogo (T-0061, 918dbd2: trilha, chips, ?pedido=1, componentes Trilha/LinhaChips do packages/ui). O que preciso

## Pronto quando
Sessão da nuvem do acabamento: git merge origin/main no branch, mantendo a árvore (trilha, níveis, chips, filtro pela tabela do cliente) E o acabamento (puxar = Sincronizar com o hook, textos); se der, use Trilha e LinhaChips do packages/ui (🟡 4 da revisão). CI verde, [PRONTO PARA MERGE] de novo. Pronto quando | o gerente mescla pela regra A; prazo do build das 22h: 21h15.
