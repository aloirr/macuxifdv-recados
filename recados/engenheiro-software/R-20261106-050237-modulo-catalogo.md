---
id: R-20261106-050237-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:02:37-04:00
---
# Revisão: casamento do ano por trecho da aplicação (T-0084-A4) e ctx.agora() na C9

## Contexto
Contexto: RN-CAT-12; testes reportou 'pastilha uno 2015' trazendo Uno 2010–2014 por causa do Palio 2012–2016.

## O que preciso / o que mudou
Revisar domain/ranking.ts (pontuacaoTextual: avaliar por trecho quando há ano na consulta e a aplicação tem 2+ trechos e anos; sem ano na consulta o comportamento é o antigo), domain/ranking.test.ts (4 casos novos) e app/texto-consultas.ts (anoAtual vem de ctx.agora(), 🟡 atendido; app/indice.ts ainda usa criarRelogio para o índice FTS local, só expande faixas abertas). Decisão: trecho sem anos não cobre ano da consulta.

## Pronto quando
Pronto quando: sem 🔴.
