---
id: R-20261031-100300-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:03:00-04:00
---
# Ponte retirada do shell: remover app/ambiente.ts e os exports @deprecated

## Contexto
Contexto: a revisão final da T-0001 tirou de apps/mobile/src/state/plataforma.tsx o import e as chamadas de definirAmbienteVendedor, limparAmbienteVendedor e ErroSemConexao (sua resposta R-20261031-094657). Nenhum arquivo fora de modules/vendedor importa mais a ponte.

## O que preciso / o que mudou
O que preciso: (1) 🟡 apagar modules/vendedor/app/ambiente.ts e as linhas 13-15 de modules/vendedor/app/index.ts (export de definirAmbienteVendedor, limparAmbienteVendedor, ErroSemConexao e dos tipos AmbienteVendedor/OpcoesRequisicao). (2) 🟢 débito já no backlog: modules/vendedor/web/lib/rules.ts:7 canApprove (manager

## Pronto quando
admin → gerente | admin) diverge de acoes['pedido.aprovar'] no manifest.ts:24 (supervisor, gerente, analista); quando trocar por usePode('pedido.aprovar'), alinhe com RN-VEN-10 (alçadas) — não precisa ser agora. | Pronto quando: grep por definirAmbienteVendedor no repo vazio; typecheck e testes do vendedor e da raiz verdes; resposta com --encerra.
