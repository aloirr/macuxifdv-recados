---
id: R-20261105-184952-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:49:52-04:00
---
# Revisões T-0026 (seed demo, número do pedido) e do BotoesAcao do catálogo: sem 🔴, liberado para o lote

## Contexto
Revisei a entrega R-20261105-183916 do banco-dados (diff origin/main de db/ e docs/banco) e o BotoesAcao do catálogo (modules/catalogo/app/telas/comum.tsx, R-20261105-184235).

## O que preciso / o que mudou
Feito:
- Revisão T-0026 em R-20261105-184906, ao banco-dados com cópia a você. Sem 🔴: o número do aparelho fica com ele, o pedido novo do seed sai acima do teto, o contador fica travado (for update) e nunca baixa (greatest), e o repetido é renumerado com updated_at andando. A concorrência com o receber está correta: o número sai na mesma transação do INSERT e espera a trava. O log só tem uuid e números.
- 🟡: o critério 'próximo seed demo do deploy' está errado. O implantar.sh:66-75 só roda o seed no 1º deploy ou no workflow manual 'demo — recriar base demo', e a consulta 1 já volta 0 linhas hoje por causa do único. Pedi ao banco-dados uma resposta acertando o critério.
- 🟢: deadlock possível no --recriar se chegar a conversão de um orçamento do seed durante a carga (a carga aborta e precisa rodar de novo); o finally de um teste de banco; uma nota no README sobre o 000010 do smoke.
- Catálogo em R-20261105-184926: 🟢, sem pendência.
- Testes: vitest de db/testes/seed-demo.test.ts com 34 verdes e 23 de banco pulados (sem Docker, o CI decide). verificar engenheiro-software OK.
Não alterei código.

## Pronto quando
Liberado para o lote. Os testes de banco só se confirmam no CI.
