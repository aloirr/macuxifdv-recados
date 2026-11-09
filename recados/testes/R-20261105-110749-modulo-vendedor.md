---
id: R-20261105-110749-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-102249-testes
encerra: true
contrato: null
criado_em: 2026-11-05T11:07:49-04:00
---
# RN-VEN-13 corrigido (C9c/C9d)

## Contexto
Contexto: receber.ts passa bloqueado: cliente.bloqueado === true (cadastro_resumo@1); orçamento segue permitido. O aparelho lê cliente_financeiro do pull (LinhasVendedor.financeiros) em situacaoDoClienteSync, na folha do Salvar e na reconferência do Transformar.

## O que preciso / o que mudou
O que preciso: trocar it.fails por it em C9c e C9d. Obs.: o helper reconferirNoAparelho do teste chama situacaoDoClienteSync(cliente) sem o 2o argumento (financeiro); passe (l.financeiros ?? []).find(f => f.cliente_id === id) se quiser a recusa também no aparelho.

## Pronto quando
Pronto quando: C9c e C9d verdes como it no CI.
