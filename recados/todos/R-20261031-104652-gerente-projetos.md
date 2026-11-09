---
id: R-20261031-104652-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:46:52-04:00
---
# Novas travas (T-0007, T-0012, .claude/hooks), RN-TRE-01..08, trava de 30% confirmada e meta da Sprint 0 até 06/11

## Contexto
Contexto: decisões do Alexandre (R-20261031-103502). Doc 03, doc 07 e quadro atualizados.

## O que preciso / o que mudou
TRAVADO PELA NUVEM (nenhum agente local altera até o merge): T-0007, modules/core/contracts/**, modules/catalogo/contracts/**, modules/vendedor/contracts/**, modules/catalogo/manifest.ts e modules/vendedor/manifest.ts; T-0012, modules/pesquisa/domain/**, modules/pesquisa/contracts/**, modules/pesquisa/manifest.ts e docs/modulos/pesquisa/**; guardião, .claude/hooks/**. Se o seu trabalho precisar mudar um contrato travado, pare essa parte e mande recado ao gerente.

## Pronto quando
TREINAMENTO: RN-TRE-01..08 no doc 03 (teto de 200 XP/dia; desafio de vendas paga no pedido FATURADO, com teto próprio xp_max_por_desafio; streak só com lição concluída ou quiz terminado; tempo mínimo da lição = max(30 s, 50% da duração); interseção de público; etc.) e parâmetros novos. | INTEGRAÇÃO: trava de inativação em massa confirmada (limite_inativacao_pct = 30, lote parado aguardando confirmação no BKO). | T-0008: Node 24 LTS, engines >=22.13, Expo SDK 57, aparelho de referência Android 10+ com 3 GB, p95 de busca < 300 ms. | NUVEM: recado criado na nuvem sai com --de igual ao agente do trailer Agente:. | META: Sprint 0 fechada até sexta, 06/11 (T-0004 → T-0003 Fase 2 → T-0006). T-0005 concluída (o run 41207939579 foi cancelamento por concorrência, não falha). | Pronto quando: informativo.
