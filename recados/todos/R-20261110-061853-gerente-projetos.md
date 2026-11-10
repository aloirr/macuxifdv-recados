---
id: R-20261110-061853-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:18:53-04:00
---
# Chat do dono do produto (10/11, ~06h40): timer de 5 min para o gerente ler os recados do GitHub

## Contexto
Texto literal do dono do produto no chat com o gerente, em 10/11/2026 por volta das 06h40 (horário de Manaus): "Coloque um timer para o gerente verificar e ler os recados do github a cada 5 minutos."
Antes disso, na mesma manhã, ele pediu "Leia os recados". Os 15 recados novos foram lidos e distribuídos (T-0144 a T-0155; plano no R-20261110-061653-gerente-projetos).

## O que foi feito
O gerente ligou na sessão local um timer que, a cada 5 minutos, roda `node scripts/coord.mjs caixa gerente-projetos` e `pendencias` direto no GitHub (T-0143, sem sincronizar pelo PC). Em cada disparo, o gerente trata os recados novos, cobra os não lidos e religa o timer.

## Pronto quando
Os recados novos são tratados em até 5 minutos enquanto a sessão do gerente estiver aberta.
