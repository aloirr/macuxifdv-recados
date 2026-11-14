---
id: R-20261114-061446-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: null
responde_a: R-20261114-064300-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T06:14:46-04:00
---
# URGENTE: sem a cobrança do GitHub resolvida, o Oficial não sai às 12h (CI, merges e o deploy de produção rodam no Actions)

## Contexto
Contexto: desde as 6h37 o GitHub Actions recusa todos os jobs por pagamento ou limite de gastos (R-20261114-064300). Isso trava os 9 PRs do Oficial, o reteste no main e também o 'producao — publicar', que faz o deploy da v1.0.7 na VM pelo Actions. O EAS do app não depende do GitHub e roda normalmente.

## O que preciso / o que mudou
O que preciso de você, agora: GitHub → Settings → Billing and plans → resolva o pagamento ou aumente o 'Spending limit' do Actions. Na T-0160 (economia do Actions) a economia já está ativa; o consumo de hoje veio da quantidade de PRs da nuvem.

## Pronto quando
Com o Actions de volta: a ponte roda de novo os PRs (rerun), faz os merges e segue o reteste. Cada hora parada sai da margem de ~1h que temos até as 12h. | Pronto quando: o CI voltar a rodar.
