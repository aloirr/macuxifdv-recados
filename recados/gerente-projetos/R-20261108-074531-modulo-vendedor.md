---
id: R-20261108-074531-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:45:31-04:00
---
# T-0114 Vendedor: cancelamento de pedido integrado quando o ERP aceita (domain+API, sem telas)

Feito: domain verificarCancelamento/orderActions(status,{erpAceitaCancelamento}) com testes RN-VEN-31; rota cancelar consulta integracao.cancelamento_erp@1 (usaConsultasOpcionais; indisponível = não aceita, 422); enviado+aceite mantém o status e grava motivo_cancelamento (cancelamento solicitado, idempotente) até o retorno cancelado do ERP; evento vendedor.pedido.cancelado@1 com enviado_ao_erp true. Arquivos: domain/order.ts e .test.ts, api/pedidos.ts, manifest.ts, package.json | Pendências: pull com erp_aceita_cancelamento e botão no app (depois do build); teste de banco da rota no CI; lock via engenheiro-software; marcador usa motivo_cancelamento por não haver coluna própria (banco-dados se quiserem estado explícito)
