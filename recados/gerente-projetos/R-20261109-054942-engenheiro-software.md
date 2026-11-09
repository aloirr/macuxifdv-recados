---
id: R-20261109-054942-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T05:49:42-04:00
---
# T-0139: agendar-sincronizacao.ps1 corrigido ($acao encoberta por Fazer), $PSScriptRoot no param() e corte sem sobra do .github

## Contexto
Defeitos de scripts/recados no PS 5.1. (1) agendar-sincronizacao.ps1: a variável $acao era encoberta pelo parâmetro [scriptblock]$Acao de Fazer (comum.ps1:12), porque o PowerShell não diferencia maiúsculas. Virou $acaoTarefa. Parâmetro novo -Nome (padrão 'Sincronizar recados') só para o teste. O script agora mostra a ação mesmo com -Simular. Nenhum outro script usa $Descricao ou $Acao num bloco de Fazer. (2) corte, volta e agendar: -Repo com padrão vazio, resolvido no corpo por $MyInvocation.MyCommand.Path. (3) comum.ps1: Garantir-ArquivosDoClone só copia .gitattributes e README.md ($script:ArquivosDoClone), e o passo 4 do corte faz git add da mesma lista. Docs: docs/desenho/T-0139.md e T-0139-passo-a-passo.md (o corte nunca publica o .github). Arquivos: scripts/recados/{agendar-sincronizacao.ps1,comum.ps1,corte.ps1,volta.ps1,recados-ps.test.mjs}.

## O que preciso / o que mudou
Testes: node --test scripts/recados/recados-ps.test.mjs deu 12/12 verde. São 3 testes novos do agendar: -Simular sem -Repo; análise da AST que proíbe variável com nome de parâmetro de Fazer nos blocos, com controle negativo do defeito original; cadastro de verdade como '\Macuxi\Teste T-0139 <pid>' num repo de mentira (ação certa no Agendador e -Remover tira). Verifiquei que não sobrou tarefa de teste: \Macuxi\ ficou com 0 tarefas. O corte com modelo deixa o clone sem sobra e sem .github. A volta -Simular não muda nada. Os 3 scripts com -Simular e sem -Repo, contra C:\macuxifdv: agendar sai 0; corte só confere; volta só mostra a simulação. Não rodei corte nem volta de verdade, nem mexi no clone, nas junções ou no índice. eslint do teste limpo.

## Pronto quando
Pendências: (a) a tarefa real ainda não existe; o dono do produto cadastra com: powershell -NoProfile -ExecutionPolicy Bypass -File C:\macuxifdv\scripts\recados\agendar-sincronizacao.ps1 e confere em 3 min com Get-ScheduledTaskInfo -TaskPath '\Macuxi\' -TaskName 'Sincronizar recados' (LastTaskResult 0). (b) O verificar acusa .vscode/settings.json sem dono em donos.json. Esse arquivo não é meu: é um ?? que já estava no repo. (c) Sem sha: o commit é seu.
