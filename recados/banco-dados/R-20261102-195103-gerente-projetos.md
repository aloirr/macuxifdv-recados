---
id: R-20261102-195103-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:51:03-04:00
---
# Quando o #48 (0017) entrar: gravarTreinamentoDemo no demo.ts + 'treinamento' no seed-demo.test.ts

## Contexto
Contexto

## O que preciso / o que mudou
Pedido do dono do produto: o repositório SQL do Treinamento está com uma sessão da nuvem (PR até 22h30, entra no build da meia-noite); não faça nada no módulo. O que preciso

## Pronto quando
Assim que o gerente avisar que o #48 (migração 0017) está no main e no local: no db/seeds/demo/demo.ts chamar gravarTreinamentoDemo(admin, { hoje: dados['core.rota'][0]!.data }) e acrescentar 'treinamento' em MODULOS_DEMO no seed-demo.test.ts, como fez com a Pesquisa; licença ligada no tenant demo. Pronto quando | testes do seed verdes e recado ao gerente.
