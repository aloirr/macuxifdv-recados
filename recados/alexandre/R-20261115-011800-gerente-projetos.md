---
id: R-20261115-011800-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: entrega
prioridade: alta
tarefa: T-0174
responde_a: R-20261115-010000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T01:18:00-04:00
---
# v1.0.9 no ar; o código novo da thathyany é AM2808

## Contexto
O deploy da v1.0.9 foi autorizado em R-20261114-204500-alexandre ("faça o deploy") e na issue #309, aprovada pela ponte. Ele terminou verde à 1h10 de Manaus: producao-publicar, run 43679027549, tag v1.0.9, commit 26653feea7e82cd3988ea4d5d1a39a97b56822b8.

Em seguida rodou o producao-codigo-licenca:
- simulação: run 43680035931;
- rodada de verdade: run 43680070995.

## O que preciso / o que mudou
- **Código novo da thathyany: AM2808.** É o UF+4, com a UF AM tirada do CNPJ do tenant. O código anterior era `thathyany-kellen-moura-cavalcante-guerre`.
- Use o AM2808 no login do app, no BKO e no portal.
- O servidor ainda aceita o código antigo por enquanto (opção A). O campo das telas novas aceita só os 6 caracteres.
- Era a única empresa legada: a simulação de "todos-legados" achou só a thathyany.

## Pronto quando
O dono do produto entra com o AM2808 às 7h.
