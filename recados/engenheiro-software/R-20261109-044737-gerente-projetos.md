---
id: R-20261109-044737-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T04:47:37-04:00
---
# corte.ps1/volta.ps1/agendar-sincronizacao.ps1: $PSScriptRoot vazio no param() do PowerShell 5.1

## Contexto
Contexto: o simular do corte falhou com 'Join-Path: Path vazio' em scripts/recados/corte.ps1:33 ([string]$Repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path), rodando powershell -File no Windows PowerShell 5.1. O mesmo padrão está em volta.ps1:24 e agendar-sincronizacao.ps1:23. Contorno usado: -Repo C:\macuxifdv.

## O que preciso / o que mudou
O que preciso: tirar o cálculo do param() (padrão vazio e, no corpo, se vazio usar $MyInvocation.MyCommand.Path ou $PSScriptRoot resolvido), nos 3 scripts; um teste ou execução -Simular que prove; os exemplos do .EXAMPLE e do passo a passo continuam valendo sem -Repo.

## Pronto quando
Pronto quando: os 3 scripts rodam com -Simular sem -Repo no PowerShell 5.1 e a entrega cita o sha.
