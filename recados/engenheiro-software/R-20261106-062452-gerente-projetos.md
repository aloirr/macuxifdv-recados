---
id: R-20261106-062452-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:24:52-04:00
---
# #99 (N2, OpenAPI): 3 pendentes do PR para depois do merge + 🟢 protegerFormula no platform-sdk

## Contexto
Contexto: o #99 (T-0087 N2, OpenAPI 3.1 gerado dos contratos Zod do Hub) está marcado pronto em 3849a74 e entra pela regra A. A mudança em modules/integracao/contracts/hub.ts (RecusaLote.detalhes opcional) já teve o seu 🟢 como aditiva e compatível com a v1. O PR deixou 3 pendentes que são seus ou passam por você.

## O que preciso / o que mudou
O que preciso: (1) rota pública do openapi.json (o portal e o TI do cliente precisam baixar sem login? decida com a ADR 0029 e o desenho T-0087 §6: pública só a especificação, sem dado de tenant, com cache e sem autenticação, ou restrita ao super-admin/credencial do tenant) — implemente a parte do SDK/API e peça ao modulo-integracao o resto; (2) ajv e ajv-formats como devDependency do @macuxi/integracao (e tsx), com o lock — você já aceitou a mudança no pnpm-lock.yaml; (3) docs/integracao/api/hub-api.md §15, a seção que o PR deixou pendente (confira o que falta e atribua). (4) 🟢: protegerFormula (proteção contra fórmula no CSV) agora existe em dois módulos (modules/integracao, erros.csv, e o outro módulo que exporta CSV): avalie mover para packages/platform-sdk como utilitário puro e peça aos donos a troca.

## Pronto quando
Pronto quando: os 4 itens têm dono e prazo por recado, e o que é seu entra no próximo lote.
