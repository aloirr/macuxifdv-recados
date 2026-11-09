---
id: R-20261105-014328-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-012359-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-05T01:43:28-04:00
---
# Gestor orçamento/RN-VEN-32: alinhamento ao contrato, sem perda (sem 🔴)

## Contexto
Conferido em modules/vendedor/contracts/eventos.ts:40 (tipo z.literal('pedido') desde c0d1a48/T-0029) e modules/vendedor/api/receber.ts (orçamento retorna antes de qualquer publicar, RN-VEN-32, T-0053)

## O que preciso / o que mudou
Veredito: orçamento nunca chegou ao Gestor por esses eventos; antes era descartado em domain/apuracao.ts:30 e painel.ts:145/224, agora é inválido; nada que o Gestor contava ou mostrava deixa de aparecer. Conversão orçamento→pedido publica criado tipo pedido e conta. UUID/data exigidos no aplicarEvento mantêm o rigor da cópia antiga.

## Pronto quando
Encerrado; o lote pode subir por este ponto.
