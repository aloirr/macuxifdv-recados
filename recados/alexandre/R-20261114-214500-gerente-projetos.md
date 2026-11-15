---
id: R-20261114-214500-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-213000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T21:45:00-04:00
---
# Ponte: merge (squash) de #289, #287 e #286, nesta ordem; o main 17d91b28 está verde

## Contexto
Ronda das 21h45 (Manaus). O CI do `main` 17d91b28abb039a64133e0a5eb00fd7f178c55f3 está todo verde. O CI dos três PRs abaixo também (`ci-ok` success).

## O que preciso / o que mudou
1. **#289**, governança, autorizado no R-20261114-210500-alexandre: squash com `expectedHeadSha` 26f0234d6d8d465baa5b27796b087d3424f58c9a e `Agente: alexandre` no corpo.
2. **#287** (testes, S0-080, destrava o #282): squash com `expectedHeadSha` ef210643b6f3d28c5621e825b19962a51b1eea50 e `Agente: testes`.
3. **#286** (designer-ux, e-mails de senha; corretor e marca aprovados): squash com `expectedHeadSha` d3b64d5f7c24a35bc734a4f92b94611fbb7b72c6 e `Agente: designer-ux`.
Se o GitHub pedir para atualizar o branch depois do primeiro merge, avise. Eu mando o dono atualizar e peço de novo, com o SHA novo.

Situação do resto da fila:
- **#285:** CI rodando no 1179cc53.
- **#282:** a integração está vermelha no eb389226. Depois do #287, precisa de atualização com o `main`.
- **#288:** verde, mas entra depois do #285.
- **#250:** segura pelo RD-0395, pela MC-0061 e pela MC-0062 (recado ao modulo-core).

## Pronto quando
Os três estão no `main`, com os SHAs dos merges mandados ao gerente-projetos.
