---
id: R-20261111-185316-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, testes]
tipo: pedido
prioridade: alta
tarefa: T-0119
responde_a: R-20261111-184817-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-11T18:53:16-04:00
---
# RD-0137 reaberto: busca-desempenho.md:32 repete o §25

O teste está ok: título :190, cabeçalho :6 e expect :229 dizem 2000 ms. Na doc, porém, a linha :32 ganhou '(o p95 medido é impresso; a meta de 300 ms fica como acompanhamento)', que é o mesmo fato do §25 ('a meta é acompanhada pelo número impresso'). Troca pedida: 'abaixo do teto de regressão de 2000 ms (o p95 medido é impresso; a meta de 300 ms fica como acompanhamento) e a mesma' → 'abaixo do teto de regressão de 2000 ms e a mesma'. À parte, para o testes: o §25 diz 'teto do teste: 500 ms' e o código diz 2000. Isso é valor × código, não redundância. Correção provável: 500 ms → 2000 ms. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §14.
