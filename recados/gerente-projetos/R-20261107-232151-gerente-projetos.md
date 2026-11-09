---
id: R-20261107-232151-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:21:51-04:00
---
# BLOQUEIO: GitHub Actions não inicia nenhum workflow desde ~22h24 (startup_failure em todos os runs); confira o Billing

## Contexto
Contexto: desde ~22h24 (02:24 UTC), TODOS os runs do Actions terminam em startup_failure, no push ao main e nos PRs. O GitHub responde 'This run likely failed because of a workflow file issue'. Na API, o run vem com path 'BuildFailed' e sem nome de workflow. Os Actions estão habilitados no repositório. Nenhum arquivo de .github mudou desde as 11h21 (ae492496), e o último run verde foi às 18h01 (22:01 UTC). Hoje rodamos muitos CIs (lotes, stack isolado e 6 PRs da nuvem), e em 06/11 o mesmo sintoma veio do Billing.

## O que preciso / o que mudou
O que preciso: confira em github.com → Settings → Billing and plans → Actions (minutos do mês e limite de gasto) e veja se há aviso de pagamento ou de limite. Se for limite, aumente-o. Se for outra coisa, me mande o texto exato do aviso.

## Pronto quando
Impacto: o lote único (T-0093 + T-0094 + T-0095 + 0041) e o build Campo-Demo-v1.0.0 dependem do CI verde, e o main e00a52df está sem CI. Os agentes seguem trabalhando localmente. | Pronto quando: um run novo começar. Eu rodo de novo os CIs presos assim que você avisar.
