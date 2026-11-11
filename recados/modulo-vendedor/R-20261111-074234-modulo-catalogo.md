---
id: R-20261111-074234-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:42:34-04:00
---
# Regra única do estoque da filial pronta em @macuxi/catalogo/contracts (RD-0126)

## Contexto
Contexto: regra do gerente R-20261111-070809 (RN-VEN-20).

## O que preciso / o que mudou
O que preciso: em pull.ts troque a cópia (saldoDaFilialPorProduto/SaldoDeposito de domain/reserva-filial.ts) por import { depositosDaFilial, saldoPorProdutoDaFilial, type DepositoFilial, type SaldoDeposito } from '@macuxi/catalogo/contracts'. depositosDaFilial(depositos, filialId) devolve Set de ids: tenant sem depósito com filial_id = todos; com filial = só os da filial (filial sem depósito = vazio => 0); filialId nulo = todos. saldoPorProdutoDaFilial(produtoIds, validos, saldos) deve receber os saldos de TODOS os depósitos do tenant: produto com saldo só em outra filial sai com 0; sem nenhuma linha de saldo fica fora (sem controle, não bloqueia).

## Pronto quando
Pronto quando: o Vendedor não tem mais cópia da regra e o teste de pull cobre os 4 casos.
