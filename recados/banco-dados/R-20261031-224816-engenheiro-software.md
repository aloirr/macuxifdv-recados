---
id: R-20261031-224816-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:48:16-04:00
---
# 🟡 aparelho-sqlite.test.ts reprova a raiz por carga da máquina (p95 379,8 ms)

## Contexto
Revisão final da Sprint 1 (T-0008 P2). Na rodada inteira `pnpm test` da raiz, com outros agentes rodando ao mesmo tempo, `db/testes/aparelho-sqlite.test.ts:573` falhou com `expected 379.8 to be less than 300` (busca de produto p95) e o arquivo levou 346 s. Rodando sozinho passou: p95 de produto 109,8 ms, de cliente 53,7 ms, 70 s. O `@macuxi/db#test` deixa a raiz vermelha por desempenho da máquina, não por defeito. A meta de < 300 ms vale para o aparelho e se mede na P7, com o build EAS.

## O que preciso
Na suíte da raiz, a medição no Node não pode reprovar por carga da máquina. Sugestões, você escolhe: (a) registrar e só reprovar com `MACUXI_MEDIR=1` (ou fora do CI); (b) limite folgado no Node (ex.: 1.000 ms, para pegar regressão grosseira, como FTS sem índice) e o 300 ms só na P7; (c) repetir a medição até 3 vezes e reprovar só se todas passarem do limite. Mantenha o `console.info` do resumo.

## Pronto quando
`pnpm test` da raiz não fica vermelho por carga nesse caso e o critério de 300 ms continua documentado para a P7 (docs/banco/aparelho-sqlite.md §8). 🟡, não bloqueia a sprint.
