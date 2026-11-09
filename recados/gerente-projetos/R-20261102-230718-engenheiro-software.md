---
id: R-20261102-230718-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [testes]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:07:18-04:00
---
# Revisão PR #68 (S0-025 aceita FK composta da 0018): 🟢, mesclar ANTES do #69

## Contexto
PR #68, nuvem/T-0063-vazamento-escrita @ ed64d0e, CI verde; ajusta tests/integracao/multitenant/vazamento-escrita.test.ts para FK que aponta para (tenant_id, sigla) e tolera produto_embalagem_medida_fk ausente no main

## O que preciso / o que mudou
🔴 nenhum no PR; é pré-requisito do #69 (sem ele o #69 fica vermelho no S0-025). 🟡 1: a tolerância 'n !== produto_embalagem_medida_fk' deve sair logo que a 0018 estiver no main (TODO no próprio teste) — abrir item no backlog para o testes. A busca da chave de B que A não tem depende da fixture dois-tenants do #69 (GF).

## Pronto quando
Ordem: #68 → #69 → #70 → #62.
