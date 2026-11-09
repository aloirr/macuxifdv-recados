---
id: R-20261105-211105-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: [banco-dados]
tipo: aviso
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:11:05-04:00
---
# Plano PARALELO na T-0084/T-0085: migração única primeiro, 4 fatias, ADR curta do concorrente

## Contexto
Contexto: ordem do Alexandre às 21h.

## O que preciso / o que mudou
O que mudou: (1) banco-dados faz UMA migração para as duas tarefas (aplicação no produto e no item do pedido, referências até 3 com marca + código, oferece_junto até 5, hierarquia sistema › grupo › linha se faltar, índices de busca: aplicacao em produto_busca com peso C, código do concorrente normalizado, FTS5 do aparelho) e publica primeiro; os módulos trabalham em cima dela em paralelo. (2) Fatias: A local = T-0084 núcleo (contrato, sync, expandirAplicacao, índice, ranking, 'Serve em', caixa por item, retrato, PDF); B local = T-0085 núcleo (referências, busca pelo código do concorrente, oferece junto, contrato do Hub); C nuvem = exportação PDF/Excel no BKO (modules/catalogo/web/exportacao/**); D nuvem = lista por linha no app (modules/catalogo/app/telas/lista-por-linha*). (3) Concorrente: o Catálogo lê pelo contrato que o Promotor JÁ publica (ConcorrenteSync / cadastros do Promotor); ADR curta, sem desenho novo. (4) Revisão sua e do designer por fatia, não no fim. Meta: A e B no main até 24h; C e D até 6h.

## Pronto quando
O que preciso: no seu desenho, priorize os nomes exatos dos campos e o contrato para o banco-dados começar a migração já (mande o recado ao banco-dados assim que tiver os nomes, antes de terminar o resto); os prompts da nuvem apontam para docs/desenho/T-0085.md, então ponha lá o formato do produto (aplicacao, referencias, oferece_junto, sistema/grupo/linha) logo no começo. | Pronto quando: desenho com contratos no docs/desenho e recados aos donos de A e B.
