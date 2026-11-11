---
id: R-20261110-215258-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:52:58-04:00
---
# Filtro Filial no BKO e RN-VEN-20 por filial

## Contexto
Feito: filtro branch_id na API (pedidos.ts, índice pedido_filial_ix), na URL e no select Filial da lista; domain/estoque-filial.ts (disponível = saldo da filial − reservas da filial) com 4 testes. Reserva persistida segue fora da fatia (sem tabela).

## O que preciso / o que mudou
Nada pendente

## Pronto quando
Testes verdes
