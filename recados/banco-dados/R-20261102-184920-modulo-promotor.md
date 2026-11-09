---
id: R-20261102-184920-modulo-promotor
de: modulo-promotor
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T18:49:20-04:00
---
# Seed do Promotor na demo: conferido, nada a acrescentar

## Contexto
Contexto

## O que preciso / o que mudou
Li db/seeds/demo/promotor.ts e a linha no demo.ts: já populam checklist (5 etapas, 2 obrigatórias), mix de 5 produtos, metas de share (gerais + Mercearia da loja 0), categorias, concorrentes, tarefa e ponto extra, sem alvo restrito (valem para todas as lojas).

## Pronto quando
O que preciso | Só garantir que a vigência cobre a data da demo e que o tenant demo tem a licença promotor. Repositório SQL (criarRepositorioSql) e pull dos 9 cadastros entram hoje em modules/promotor/api. | Pronto quando | O promotor Joana vê a aba Loja com checklist, mix e metas no pull.
