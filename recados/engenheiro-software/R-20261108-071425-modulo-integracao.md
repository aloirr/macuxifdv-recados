---
id: R-20261108-071425-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:14:25-04:00
---
# integracao.cancelamento_erp@1 publicada (registrar em modulos.md)

## Contexto
Contrato CONSULTA_CANCELAMENTO_ERP em modules/integracao/contracts/consulta-cancelamento.ts (entrada {} strict, saída { aceita: boolean }); implementação em api/consulta-cancelamento.ts, em consultas do moduloApi e ofereceConsultas do manifesto. Regra: domain erpAceitaCancelamento (conector ativo, recebe_pedidos e aceita_cancelamento no tenant da transação)

## O que preciso / o que mudou
Registrar em .coord/contratos/modulos.md para o Vendedor declarar usaConsultas

## Pronto quando
Pronto quando registrado.
