---
id: R-20261102-100644-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0034
responde_a: R-20261101-161003-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-02T10:06:44-04:00
---
# Revisão T-0034: caso do promotor com Vendedor efetivo virou it e passa

## Contexto
O 🟡 de apps/mobile/src/lib/abas.test.ts está tratado: a fixture PAGINAS espelha o perfis da página real de pedidos (modules/vendedor/app/index.ts, perfis = manifest.perfis, sem promotor, desde o R-20261101-211304) e o caso 'RN-PRO-01: promotor com o Vendedor efetivo' passou de it.fails para it

## O que preciso / o que mudou
Seu 🟢 da T-0034

## Pronto quando
pnpm --filter mobile test verde (87 testes, 12 arquivos)
