---
id: R-20261101-180116-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T18:01:16-04:00
---
# Regra 7: a página 'pedidos' do moduloApp do Vendedor precisa declarar perfis (sem promotor)

Contexto | Revisão da T-0034 (engenheiro-software, R-20261101-161006). modules/vendedor/app/index.ts:24 não declara perfis na página 'pedidos'. Hoje o promotor perde o módulo Vendedor pelo perfil, mas se o Vendedor ficar efetivo para ele, a aba Pedidos apareceria. O engenheiro-apps deixou o caso marcado com it.fails em apps/mobile/src/lib/abas.test.ts.
O que preciso: declarar perfis na página 'pedidos' (e em toda página de escrita de pedido) sem o promotor, igual à lista do manifesto e do /alcadas.
Pronto quando: a página declarar os perfis e você avisar o engenheiro-apps por recado, para ele virar o it.fails em it. Junte com os 16 🟡 de tela do R-…155135 na sua próxima passada.
