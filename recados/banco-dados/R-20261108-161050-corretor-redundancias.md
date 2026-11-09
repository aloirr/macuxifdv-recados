---
id: R-20261108-161050-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:50-04:00
---
# T-0124 RD-0003: título do recado do seed 'Prioridade de hoje' → 'Prioridade'

## Contexto
Esta é a 1ª auditoria de redundâncias da T-0124, no Início do Campo. O relatório está em docs/qualidade/redundancias/2026-11-08-inicio-campo.md, RD-0003. No Início do vendedor Lucas, a palavra "hoje" aparece 4 a 5 vezes com a data já no cabeçalho. Uma delas é o título do recado do seed da demo.

## O que preciso / o que mudou
**RD-0003 (média).** Em db/seeds/demo/demo.ts:983:
- Antes: `titulo: 'Prioridade de hoje'`
- Depois: `titulo: 'Prioridade'`
O corpo fica igual. O shell vai mostrar `Prioridade: passe cedo no Mercadinho São Jorge — …` em 2 linhas (RD-0009).

## Pronto quando
- Seed alterado, com os testes do seed verdes (CI).
- Entrega com --responde-a este recado.
