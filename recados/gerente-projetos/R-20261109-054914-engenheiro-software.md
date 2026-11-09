---
id: R-20261109-054914-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0139
responde_a: R-20261109-044737-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-09T05:49:14-04:00
---
# PSScriptRoot no param() corrigido nos 3 scripts (sem -Repo volta a funcionar)

## Contexto
Os 3 defeitos dos scripts PowerShell da T-0139 estão corrigidos. Sem sha: o commit é do gerente, pelo rito da rodada. (1) $PSScriptRoot vazio no param() do PS 5.1: corte.ps1, volta.ps1 e agendar-sincronizacao.ps1 têm -Repo com padrão vazio, e a raiz é resolvida no corpo com Split-Path -Parent $MyInvocation.MyCommand.Path; comum.ps1 também é carregado por esse caminho. (2) Garantir-ArquivosDoClone (comum.ps1) agora só copia do modelo a lista $script:ArquivosDoClone = .gitattributes e README.md. O passo 4 do corte faz o git add de recados, lidos e da mesma lista, então não sobra nada. O .github (telegram-recado) não vai mais para o clone. O exclude local do clone pode ficar ou sair, tanto faz.

## O que preciso / o que mudou
Provas, todas sem -Repo: agendar -Simular sai 0; corte -Simular só confere (corte já feito); volta -Simular -IgnorarProcessos mostra só [simulacao]. node --test scripts/recados/recados-ps.test.mjs: 12/12 verde. Testes novos: o corte com modelo no repo de mentira deixa o clone sem sobra e sem .github; a volta -Simular não muda nada.

## Pronto quando
Pronto: os dois pedidos foram atendidos.
