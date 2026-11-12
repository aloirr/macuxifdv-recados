---
id: R-20261112-151051-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:10:51-04:00
---
# T-0168: roteiro e testes de critério do limite de desconto (tabela de 21 casos)

## Contexto
T-0168, RN-VEN-11a (limite de desconto por item e por pedido, v1.0.5). Desenho: `docs/desenho/T-0168.md`, com a tabela de 21 casos em §3.1 (inclui o exemplo da RN: alçada 5%, limite 8%). Ordem: banco-dados → modulo-core → modulo-vendedor → modulo-gestor → você.

## O que preciso
- Roteiro dos critérios 1–7 da tarefa sobre a tabela §3.1 (Campo, Gestão em nome e BKO aba Parâmetros), com valor × regra.
- Padrão para usuário antigo (migração) e para APK/servidor sem os campos (caso 17).
- Recusa da API `desconto_pedido_acima_limite` (422) no envio e no Transformar; orçamento sem trava (caso 16, inclusive o item acima do máximo).
- `*.db.test.ts` das constraints no CI.

## Pronto quando
Roteiro e testes de critério entregues ao gerente. Estimativa: 2 h, depois das entregas dos módulos.
