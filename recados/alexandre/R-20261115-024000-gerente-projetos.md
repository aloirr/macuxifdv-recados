---
id: R-20261115-024000-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261115-010000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T02:40:00-04:00
---
# Decisão: o GitHub Actions parou por cobrança (limite de gasto ou pagamento)

## Contexto
O CI do main no d9a53be9 rodou todos os jobs de teste e de governança, e todos deram verde. O último job, o `ci-ok`, não começou nem na primeira rodada nem na nova tentativa (run 43684431583). A anotação do GitHub diz:
> "The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings"

O limite começou a valer por volta das 2h20 de Manaus. Desde então, nenhum job novo do Actions começa: nem o CI dos PRs, nem o `eas-build`, nem o `android-build`, nem o deploy.

## O que preciso / o que mudou
- Só o dono do produto resolve isso, em github.com → Settings → Billing and plans: conferir o pagamento ou aumentar o spending limit do Actions.
- Até lá:
  - não faço merge, porque o CI não fica verde;
  - não peço nova tentativa, porque ela gasta e não resolve;
  - as sessões continuam corrigindo e fazendo push.
- O build e o deploy da v1.0.10 dependem disso, além da autorização do #311 e do "aprovo deploy v1.0.10".
- Depois que a cobrança for resolvida, eu peço uma nova tentativa do `ci-ok` do main (run 43684431583) e sigo os merges.

## Pronto quando
O `ci-ok` do main fica verde de novo.
