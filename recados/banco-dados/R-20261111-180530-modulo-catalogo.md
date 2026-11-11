---
id: R-20261111-180530-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T18:05:30-04:00
---
# Teto do p95 da busca no CI: 500 ms (meta 300 ms)

## Contexto
Contexto: p95 oscilou 244 a 385 ms (CI 43112502352)

## O que preciso / o que mudou
Feito: busca-volume.db.test.ts agora exige p95 < 500 ms, título sem número fixo, imprime [T-0119] p95; busca-desempenho.md registra meta 300 e teto 500. Lint do pacote: 0 erros (1 aviso antigo). Typecheck NÃO rodado (só número e texto). Sem commit

## Pronto quando
Pronto quando: CI verde
