---
id: R-20261103-004759-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:47:59+00:00
---
# Consulta pública da opção do perfil Promotor promotor_ve_pedidos (padrão ligada)

## Contexto
Contexto: decisão de 2026-11-02 sobre a O-3 do doc 03 — o promotor lê, só leitura e com escopo de carteira, os pedidos dos clientes da própria carteira, mas isso é uma opção do perfil Promotor, promotor_ve_pedidos, LIGADA por padrão (doc 03, esclarecimento O-3 atualizado). O Vendedor já trata a opção num ponto único (T-0061, branch nuvem/T-0061-pedido-3-abas), hoje fixo em ligada.

## O que preciso / o que mudou
O que preciso: (1) a opção promotor_ve_pedidos no cadastro do perfil Promotor (BKO de perfis), padrão true; (2) uma consulta pública em modules/core/contracts (ex.: core.opcoes_perfil@1 -> { promotor_ve_pedidos: boolean }) acessível pela API do Vendedor, e o valor também no pull do app.

## Pronto quando
Pronto quando: contrato publicado em modules/core/contracts com teste, padrão true, e recado ao modulo-vendedor com o nome da consulta para trocar o ponto fixo.
