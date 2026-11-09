---
id: R-20261102-231326-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:13:26-04:00
---
# Main = 0572fee7d7df12f8c62a8c91b414d3f9e4bd3040: #68 já estava mesclado (0b80fe1) + 8 PRs independentes; #72 com 🔴 de governança

## Contexto
Contexto

## O que preciso / o que mudou
Exceção da regra A aplicada às 22h55 (PRs sem arquivo em comum, conferido com git diff --name-only, e sem arquivo mudado no main desde a base). O que entrou

## Pronto quando
#58 90201b6, #59 8eb0645, #60 8442a20, #61 562ad3a (acabamento das telas, T-0064), #68 0b80fe1 (S0-025 da 0018), #62 4f78c62 (Hub: medida desconhecida = referencia_ausente), #67 9f7b165 (e2e do ciclo com ERP, T-0032), #56 182b7d4 (espelho Drizzle da Pesquisa), #71 0572fee (recados). Main = 0572fee; o #69 (0018) pode mesclar o main. CI do main | rodando; se ficar vermelho, paro a fila. Revisão do engenheiro | #72: código sem 🔴, mas o CI reprova na governança ('agente ambíguo') porque o PR leva diários e recados do gerente-projetos e do engenheiro-software — esses arquivos precisam sair do #72 para um PR só de coordenação (como o #71); depois disso e do conflito do doc 03, mesclo. #69 entra depois do #68 (já entrou); #54 deve ser fechado (outra 0018); #70 depois do #69; o #62 só funciona de verdade com core.medidas@1 em usaConsultas, depois do #70. #63, #66: sem 🔴. Pronto quando | #72 limpo e verde.
