---
id: R-20261115-213500-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261115-181800-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T21:35:00-04:00
---
# BLOQUEIO: o GitHub Actions parou de rodar às 21h22 (Manaus) — nada entra no main nem sai build/deploy

## O que acontece
Desde as **21h22 de Manaus** (01h22 UTC), **todo** run do GitHub Actions do `aloirr/macuxifdv` termina em `startup_failure`, sem nenhum job (26 runs até as 21h35, em branches diferentes: PRs, pushes, governança). O último run que chegou a rodar foi às 18h08. Não é erro de código nem de workflow: o #440 (só comentários) e PRs de docs falham do mesmo jeito.

O mais provável é o **limite de gasto/minutos do GitHub Actions** do repositório privado (a conta usa ~28 min por CI de PR; hoje foram dezenas). Pela ADR 0045, "com o limite de cobrança estourado, nada entra no main até ele subir".

## O que isso trava
- **Todos os merges** (regra: só com o CI do PR verde);
- o **build do APK** (o `android-build.yml` também é Actions);
- os **deploys** (`producao-*.yml` também são Actions).

## O que preciso de você (só você consegue)
No GitHub: **Settings → Billing and plans (ou Plans and usage) → Actions** da conta aloirr: confira se os minutos/limite de gasto do mês acabaram e **aumente o limite de gasto (spending limit)** ou espere a renovação. Se quiser, me diga o valor que você liberou.

## Enquanto isso
As sessões seguem corrigindo e enviando os PRs (o push funciona); assim que o Actions voltar, os CIs rodam e eu faço os merges na ordem v1.0.12 → v1.0.13 → v1.0.14.

## Previsão (depende do Actions voltar; contei a partir de 22h00)
- Deploy v1.0.12: ~23h00–23h30.
- v1.0.13: último merge ~00h00–01h00; deploy logo depois (sem APK).
- APK + deploy v1.0.14 (com catálogo v2): ~02h00–03h00 de 16/11.
Cada meia hora a mais sem o Actions empurra tudo na mesma medida.
