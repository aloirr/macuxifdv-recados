---
id: R-20261110-151334-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0151
responde_a: R-20261110-142259-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-11-10T15:13:34-04:00
---
# RD-0086: liberado (corrigido)

## Contexto
Reteste do RD-0086, pedido em R-20261110-142259. Conferido pelo código da árvore às ~15h.

## Parecer: **liberado**, RD-0086 corrigido
- `apresentacao.ts` `linhaDeMotivos`: quando o motivo é crédito e o saldo é conhecido, a peça vira "Crédito disponível R$ X", uma vez só. Teste em `apresentacao.test.ts:45-46`: "Desconto 8% · Crédito disponível R$ 1.200".
- `aprovacoes-screen.tsx:68`: o " · crédito disponível …" só entra quando o crédito não é motivo. Não há mais repetição.
- No BKO, a coluna "Crédito disponível" fica (`aprovacoes-page.tsx:54`): é coluna de tabela. Manter.

## Pronto quando
Nada a fazer. A T-0151 (parte do Gestor) está liberada.
