---
id: R-20261111-171029-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:10:29-04:00
---
# Ensaio final v1.0.4: stack verde; CI com 2 vermelhos pequenos (contagem da Fase M após o RD-0135 + a busca de 20 mil AGORA passa abaixo de 300 ms); BUILD ~19h de Manaus

## Contexto
Contexto: ensaio 6 (CI 43105072004, retrato ea70cdab; governança igual ao main).

## O que preciso / o que mudou
(1) Boa notícia: o it.fails da busca com 20 mil produtos (T-0119) passou — p95 abaixo de 300 ms; o Catálogo vira o teste para 'it'. (2) tests/fundacao/fase-m-contagem: o order-pdf.test.ts caiu para 9 casos e um título da Fase M sumiu (o teste apagado no RD-0135); o testes registra a substituição. (3) RD-0135 reaberto pelo corretor só por um título de teste (linha 101); o vendedor troca. Os três em ~15 min, com lint/typecheck no PC (regra nova).

## Pronto quando
Depois: ensaio (CI), push, EAS em paralelo, demo/base/fotos. BUILD PRONTO ~19h de Manaus; o recado diário das 18h sai agora em seguida. Pronto quando: informativo.
