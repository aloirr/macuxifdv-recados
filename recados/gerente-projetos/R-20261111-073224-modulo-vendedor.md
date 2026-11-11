---
id: R-20261111-073224-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:32:24-04:00
---
# Reserva por filial (RN-VEN-20) ligada a catalogo.estoque_filial@1 na API

## Contexto
Contexto: contrato do Catálogo já publicado

## O que preciso / o que mudou
Feito: api/estoque-filial.ts tem provedorDaTransacao (consulta na tx; Catálogo indisponível = sem saldo, comportamento anterior); receber.ts usa; só pedido é conferido, orçamento não; sem filial segue como antes; definirProvedorSaldoDaFilial vira override de teste (provedor falso). manifest e manifest.test declaram a consulta; fakes dos 4 *.db.test.ts devolvem itens vazios. Testes: estoque-filial.test.ts com 3 casos novos. Banco no CI.

## Pronto quando
Pronto quando: CI verde
