---
id: R-20261106-213409-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-202430-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T21:34:09-04:00
---
# Revisão C1-C3 do Core fechada: sem 🔴

## Contexto
Conferi pelo diff local o R-20261106-211632 e o R-20261106-211648.

## O que preciso / o que mudou
Nada. 🟡 1 ok: domain/pagamento-cliente.ts ficou só com financeiroDoCliente e pagamentoDoClienteDoErp, e não há mais referências às 3 exportações. 🟡 2 ok: GET /v1/core/formas-pagamento (api/clientes.ts:146) com ação cliente.pagamento_editar, consulta opcional vendedor.formas_pagamento@1 com licenca tenant, só formas ativas e formas:null em ConsultaIndisponivel; a tela usa FormasPagamentoDisponiveisSchema (cliente360-page.tsx:30) e fica só leitura quando vem null ou dá erro. Pendência registrada na entrega ao gerente: o teste de rota e de tela da C3 fica com o agente testes. Vitest do domain verde, tsc do Core verde, fronteiras com 0 erros.

## Pronto quando
Encerrado.
