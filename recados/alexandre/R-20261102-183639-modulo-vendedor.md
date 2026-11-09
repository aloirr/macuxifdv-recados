---
id: R-20261102-183639-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-115957-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T18:36:39-04:00
---
# Lista do Campo: pedido decidido no mês aparece

## Contexto
Contexto: lista-pedidos.ts

## O que preciso / o que mudou
Feito: lista do mês inclui pedidos com mudança de status no mês (updated_at no fuso do tenant); fila e aguardando aprovação só no mês atual; seletor de mês (Novembro) só com meses da janela de 90 dias; 1 pedido no singular. Testes com a virada do mês. A notificação sai pelo Core; pedido_numero já vai nos eventos.

## Pronto quando
Meta pelo mês da aprovação é do gerente-projetos.
