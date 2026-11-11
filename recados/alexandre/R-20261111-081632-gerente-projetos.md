---
id: R-20261111-081632-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-084833-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T08:16:32-04:00
---
# Plano da v1.0.4 às 12h de Manaus: corte 09h45 PC, ensaio 09h50, push ~10h10, EAS ~10h15; PDF horizontal com 2 vagas; preciso da sua escolha do APK legível

## Contexto
Resposta aos seus R-20261111-084833 (v1.0.4 às 12h de Manaus) e R-20261111-084832 (PDF horizontal). O relógio do PC está ~41 min atrás de Manaus: 12h de Manaus = **11h20 do PC**.

## Plano (horas do PC)
| Hora | O quê |
|---|---|
| 08h15 | **PDF horizontal começa:** designer-ux (spec e 4 imagens até 09h00) e uma 2ª instância do modulo-vendedor (código até 09h45) |
| **09h45** | **Corte da árvore.** Entra só o que estiver verde e liberado pelo corretor |
| 09h50 | **Ensaio** (CI + stack isolado), ~10 a 15 min |
| ~10h10 | Lote por dono e **push** no main |
| ~10h15 | **EAS** dos dois apps (~55 min); a demo publica sozinha, depois base e fotos |
| **~11h10 a 11h20** | **BUILD PRONTO** Campo-Demo-v1.0.4 / Gestao-Demo-v1.0.4 (12h de Manaus) |

Se o 1º ensaio der vermelho, o 2º sai às ~10h20. O BUILD PRONTO fica, então, entre 12h20 e 12h40 de Manaus, e eu aviso antes.

## Deve entrar
- **PDF horizontal**, com prioridade.
- **D-T0159-4 e D-T0159-5** (vírgula no complemento e nome puro da filial), já feitos.
- **Recusa da reserva por filial na API** (RN-VEN-20, com `catalogo.estoque_filial@1`) e a regra única dos depósitos (decisão do gerente R-20261111-070809). O Vendedor termina de trocar a cópia dele.
- **RD-0124** (tabela única dos motivos de saída do Android): SDK e API feitos, app e portal em curso.
- **Textos novos do diagnóstico.** O botão continua desligado.
- **T-0118** (pool da API), se fechar a tempo.

## Provavelmente fica para a v1.0.5
- **T-0119:** a busca com 20 mil produtos trava a API a cada minuto. A correção é delicada, porque o ranking não pode mudar, e só entra se ficar verde a tempo.
- **T-0095:** guarda de ordem do ERP.
- **T-0160:** branch própria, sem merge, aguardando o seu "aprovo".

O que ficar de fora vai listado no BUILD PRONTO.

## Vagas
Abri 2 vagas a mais para o PDF (designer-ux e uma 2ª do Vendedor). Por umas 2 horas ficam **10 agentes**, e depois volta a 8. Prefiro isso a parar o engenheiro-software ou o Catálogo no meio da T-0118 e da T-0119.

## APK com nome legível: preciso da sua escolha
Sem ela, o BUILD PRONTO das 12h sai de novo só com o link do expo.dev. O pedido está no R-20261111-064855, com 3 opções:
1. autorizar no chat o comando `node --env-file=../../.env scripts/eas/baixar-apk.mjs ambos demo --publicar`, que foi barrado pelo classificador;
2. rodar você mesmo;
3. aprovar o workflow `apk-publicar.yml` com o environment `APK_BUCKET`.

Com a 1 ou a 3 até ~10h30 do PC, o build das 12h sai com os dois links.

## Pronto quando
BUILD PRONTO às 12h de Manaus.
