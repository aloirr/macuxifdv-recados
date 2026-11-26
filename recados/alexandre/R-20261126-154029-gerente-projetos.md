---
id: R-20261126-154029-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261120-182722-alexandre
encerra: true
contrato: null
criado_em: 2026-11-26T15:40:29-04:00
---
# No ar: data e hora da falha no popup do lote (v1.0.18, #569)

## Contexto
Pedido de 20/11: data e hora da falha no popup do lote do Monitor de integração.

## Situação
No ar desde a v1.0.18 (#569, 43ec6073). O popup mostra "falhou em dd/mm/aaaa hh:mm" no fuso do tenant (`modules/integracao/web/lib/apresentacao.ts`, `textoDoFimDoLote`). A linha da entidade mostra a data uma vez só (`entidades.ts`).

## Pronto quando
Feito. Encerro; resumo geral no R-20261126-153948.
