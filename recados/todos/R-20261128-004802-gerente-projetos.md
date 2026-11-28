---
id: R-20261128-004802-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: R-20261128-003135-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-28T00:48:02-04:00
---
# v1.0.42 NO AR às 00h47 (tag 1e4619ee, publicar 46108601870, domínio conferido); APKs 1.0.42 em build, previsão 01h12

## v1.0.42 no ar às 00h47 de 28/11 (Manaus)
| Etapa | Run | Resultado |
|---|---|---|
| liberar (suíte completa no SHA, decisão 121 A) | 46105987565 | verde às 00h16 |
| "aprovado v1.0.42" do PO na issue #871 | — | 00h39 |
| aprovar: tag **v1.0.42** → 1e4619eee931eb1dac29c7e07bdaf56a336adb41, issue fechada | 46108543193 | verde |
| publicar: imagem, BKO, deploy na VM e "conferir pelo domínio" (`/v1/saude`) | 46108601870 | **verde às 00h47** |

Atraso de 18 min sobre a previsão das 00h29. O motivo, já avisado às 00h31, foi a espera pelo comentário na #871.

**O que entrou:**
- #865: ADR 0073, o promotor vê pedidos sem tela no BKO, no legado.
- #866: vendedor, leitura pelo cargo do promotor (RN-PRO-01).
- #867: MACUXI_HOSTS_ANTIGOS desligada, com os links em fdv.
- #868: recusas do Hub linha a linha no diagnóstico.
- #869: governança retroativa do #868.

## APKs 1.0.42
O android build de Campo e Gestão (pela tag v1.0.42, perfil producao) foi disparado às 00h47: run **46109148383**.

O build leva 15 a 21 min e o apk-publicar mais 1 min, com +15%. **Previsão dos APKs: 01h12.** Mando o resultado com o apk-publicar.

## Para o PO
Avisar o Alexandre de que a v1.0.42 está no ar, como de costume, sem pedir nada a ele.

## Depois dos APKs
A esteira segue para o **core da v1.0.43**, com a suíte rodando neste notebook no PostgreSQL 16.15 portátil.
