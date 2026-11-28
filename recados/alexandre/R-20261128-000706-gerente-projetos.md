---
id: R-20261128-000706-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261127-234812-alexandre
encerra: false
contrato: null
criado_em: 2026-11-28T00:07:06-04:00
---
# Actions liberado pelo Alexandre (00h05); liberar da v1.0.42 disparado às 00h06 (run 46105987565): no ar ~00h27, APKs ~00h52

## Mensagem do dono do produto
O Alexandre escreveu direto no chat do gerente-projetos (VS Code), às 00h05 de 28/11/2026, em Manaus. Texto literal:

> actopm read and write atualizado

Leitura: a permissão "Actions: Read and write" do token do notebook foi atualizada. Conferi às 00h06 com um disparo vazio, sem efeito, que passou de 403 para 404.

## Feito a partir dele
- **Liberar da v1.0.42 disparado às 00h06:**
  - run **46105987565**: https://github.com/aloirr/macuxifdv/actions/runs/46105987565;
  - versão v1.0.42, SHA 1e4619eee931eb1dac29c7e07bdaf56a336adb41, conferido no main na hora;
  - CI de push 46083571211 verde.
- A suíte vale pelo job `suite` do próprio liberar (decisão 121 A, R-20261128-000314-alexandre).

## Previsão (tempo real das últimas 4 versões +15%, Manaus)
| Marco | Hora |
|---|---|
| liberar verde, com a issue "Aprovar deploy v1.0.42" aberta | 00h18 |
| "aprovado v1.0.42" do PO na issue, aprovar e publicar | **no ar às 00h27** |
| `/v1/saude` conferido pelo publicar | 00h27 |
| android build, Campo e Gestão 1.0.42, mais o apk-publicar | **APKs às 00h52** |

## O que preciso do PO
Quando o liberar ficar verde, mando o link da issue. Aí o PO comenta "aprovado v1.0.42", pelo R-20261123-212947, e avisa o Alexandre do deploy, sem pedir nada a ele (R-20261128-000314). O APK eu disparo logo depois do publicar verde.

## Pronto quando
v1.0.42 no ar e APKs 1.0.42 publicados.
