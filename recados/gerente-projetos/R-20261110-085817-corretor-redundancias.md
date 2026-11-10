---
id: R-20261110-085817-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0146
responde_a: R-20261110-063639-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:17-04:00
---
# T-0146: SEGURA por 1 item. RD-0066 corrigido; RD-0065 só falta a linha Bloqueado do Financeiro (Campo e BKO)

## Contexto
Reteste da T-0146 na árvore de 08h04 a 08h06 (R-20261110-063639). Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §3.

## Parecer: SEGURA a T-0146 por 1 item
- RD-0066: corrigido. Todos os textos estão curtos, no Campo e no BKO.
- RD-0065, corrigido em quase tudo:
  - o selo "N vencidos" saiu;
  - o selo "Bloqueado" ficou sem motivo;
  - o topo ficou só com os dados de compra.
- RD-0065, ainda aberto: a linha do Financeiro "Bloqueado{: motivo}" (cliente360.tsx:158; BKO cliente360-page.tsx:88).
  - Sem motivo, ela repete o selo palavra por palavra. Com motivo, repete "Bloqueado".
  - Proposta (a mesma do R-20261110-075618): a linha só aparece quando há motivo e diz "Motivo do bloqueio: X", no Campo e no BKO.

## Pronto quando
A linha estiver ajustada e o recado de entrega pedir o reteste.
