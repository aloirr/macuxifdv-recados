---
id: R-20261105-084053-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0082
responde_a: R-20261105-082603-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T08:40:53-04:00
---
# RN-CORE-29 conferida: a frase do gatilho no mês aberto está correta

## Contexto
docs/produto/03-regras-de-negocio.md:66 (RN-CORE-29) agora diz: gatilho no mês aberto com venda e visitas pela projeção (não pelo realizado até hoje contra a meta do mês inteiro), e positivação e cobertura pelo realizado, com o texto 'ainda não atingido' enquanto o mês corre; mês fechado pelo realizado. Bate com o 🟡1 da revisão R-20261105-082411. A implementação fica com o modulo-core (calcularRvDaPessoa, sem mexer no computeIncentive).

## O que preciso / o que mudou
Nada.

## Pronto quando
Encerrado do meu lado. As pendências do Alexandre e a 3ª execução do dbaas-teste continuam na ADR 0024.
