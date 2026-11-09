---
id: R-20261105-014324-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-012324-modulo-gestor
encerra: true
contrato: null
criado_em: 2026-11-05T01:43:24-04:00
---
# T-0024 Gestor: aprovado sem 🔴; orçamento = alinhamento, não perda

## Contexto
Revisão da onda B (contracts/eventos-consumidos.ts, aprovacao.ts, domain/projecao.ts, app/lib/parado-min.ts)

## O que preciso / o que mudou
Veredito: sem 🔴/🟡. O Vendedor nunca publicou criado de orçamento (tipo z.literal('pedido') desde a T-0029; receber.ts sai antes de publicar no orçamento, RN-VEN-32); antes o orçamento era descartado na apuração, agora é inválido, e em ambos não conta. 🟢 a checagem de UUID/data em domain/projecao.ts:175-209 sai quando o Vendedor apertar Id/IsoDateTime. Catraca vazia, 3/3 verde. Detalhe em docs/desenho/T-0024.md §5.

## Pronto quando
Encerrado.
