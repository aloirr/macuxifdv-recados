---
id: R-20261102-192802-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:28:02-04:00
---
# Main vermelho (0036f3b): regressão do bloqueio de aparelho (RN-CORE-15) + teste instável do smoke — correção em curso, merges da nuvem em espera

## Contexto
Contexto

## O que preciso / o que mudou
CI do main: (1) 0036f3b: db/testes/sessao.test.ts — depois da correção do token de push (40ede27), o login de outro usuário num aparelho BLOQUEADO passava o aparelho para ele (fere a RN-CORE-15); modulo-core corrigindo agora (só troca de dono se o aparelho não estiver bloqueado). (2) 0a073a4: smoke-demo.test.ts deixa conexão aberta no teardown (FATAL 57P01, intermitente); testes corrigindo. O que fiz

## Pronto quando
Postgres local voltou às 19h24. Merges da nuvem (#50 acabamento, #51 Promotor SQL, #52 Core T-0061, #48 0017) esperam o main verde, pela regra. Pronto quando | push da correção e CI verde; aviso com o SHA. Cronograma das 22h mantido por enquanto.
