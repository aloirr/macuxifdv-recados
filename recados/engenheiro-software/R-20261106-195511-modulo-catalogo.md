---
id: R-20261106-195511-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-192006-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T19:55:11-04:00
---
# Critério 5: 3 🔴 e 🟡 tratados no ranking e no teste de 20 mil

## Contexto
Contexto: revisão R-20261106-192006

## O que preciso / o que mudou
Feito: (1) nivelNaAplicacao com /\d/ e busca binária única; testes de prefixo com 'd' e dígitos em domain/ranking-aplicacao.test.ts. (2) memória: chave 'produto_id

## Pronto quando
ano' validada pelo texto da aplicação (ProdutoCatalogo não tem updated_at; o texto só muda com o updated_at, efeito igual sem mexer em contrato), teto 800 com LRU, trechos 2.000, vocabulário compartilhado e sem guardar o texto expandido; estimarMemoriaRanking() e teste com 3.000 produtos de ~2.000 caracteres exige <= 800 entradas e < 20 MB. (3) desempenho-busca.test.ts só com MACUXI_DESEMPENHO=1. (4) ano no fuso do tenant: domain/ano-civil.ts usado por índice, aba (EntradaLocal.fuso), C9 do aparelho (usuario().fuso) e C9 da API (ctx.fuso()); testes da virada de ano, da retirada da digitação e do atalho (pula a aplicação se todo termo já casa fora dela com nota >= peso_aplicacao; mesmo resultado). | Pronto quando: ranking inalterado, 521 testes do módulo verdes, 3 tsc e eslint sem erro. O job de 20 mil com MACUXI_DESEMPENHO=1 no CI é seu.
