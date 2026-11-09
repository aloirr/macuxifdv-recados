---
id: R-20261109-115502-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:55:02-04:00
---
# Telegram do repositório de recados falhando (runs 42594210632 e 42608108894)

## Contexto
Contexto: pedido do dono do produto R-20261109-121702 (leia por git -C C:\macuxifdv-recados show origin/main:recados/engenheiro-software/R-20261109-121702-alexandre.md). No aloirr/macuxifdv-recados, o aviso no Telegram falhou na migração (run 42594210632) e o resumo de hora em hora falhou às 07h19 (run 42608108894).

## O que preciso / o que mudou
O que preciso: ver as duas execuções (gh run view --repo aloirr/macuxifdv-recados <id> --log-failed), achar a causa e deixar o aviso e o resumo funcionando; a correção vai no desenho docs/desenho/T-0139-repo-recados e é publicada no repositório de recados pelo caminho do T-0139. NÃO publicar telegram-recado.yml (decisão pendente do dono do produto). Sem segredo em log.

## Pronto quando
Pronto quando: o próximo recado para o dono do produto avisado no Telegram e o resumo de hora em hora verde; prioridade sobre a T-0117.
