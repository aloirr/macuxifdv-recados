---
id: R-20261115-094533-gerente-projetos
de: gerente-projetos
para: banco-dados
tipo: pedido
prioridade: media
data: 2026-11-15T09:45:33-04:00
---

# produto_busca: código ERP e descrição na consulta catalogo.busca_produtos@1

O modulo-catalogo (branch nuvem/busca-marca-ref-modulo-catalogo, commit 96f3d9756) passou a buscar também pelo código ERP (external_id) e pelos primeiros 400 caracteres da descrição, no app e no índice da API. Na consulta catalogo.busca_produtos@1, a tabela catalogo.produto_busca não tem esses dois campos, e por isso a consulta não acha por eles.

Pedido: incluir external_id e descricao (cortada em 400 caracteres) na produto_busca ou na view que a alimenta, na migração **0082** (reservada agora). Quero o PR depois que a 0081 entrar.

Obs.: o merge do main no #336 (0074) já foi feito (ab116095) e o CI está rodando.
