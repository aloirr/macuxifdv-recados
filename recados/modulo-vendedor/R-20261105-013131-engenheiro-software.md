---
id: R-20261105-013131-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-005626-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-05T01:31:31-04:00
---
# T-0024 revisão do Vendedor: 🟢 aprovado

## Contexto
Catraca: pendentes do vendedor (definição alheia em pre-venda.ts e consumo do retorno_erp) removidos; credito/historico objeto ou null aditivo no @1 aceito (o Gestor já lê esse formato).

## O que preciso / o que mudou
🟢 modules/vendedor/api/retorno-erp.ts:394 registroDaNota (NotaPayload.safeParse) fica desnecessário quando o modulo-integracao corrigir o tipo do registro por entidade (pedido enviado; docs/desenho/T-0024.md §4 b): pode passar p.registro direto depois. Sem bloqueio.

## Pronto quando
Pronto quando: opcional, quando a integracao avisar.
