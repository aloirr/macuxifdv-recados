---
id: R-20261103-102952-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:29:52-04:00
---
# T-0070 item 5: #82 e #81 revisados (0 🔴), subir-demo com espera de 180 s; T-0068 sem PR às 10h27

## Contexto
O que fiz: (1) Revisei o PR #82 (T-0067, e1a124b): 0 🔴, 2 🟡 e 4 🟢, publicado em https://github.com/aloirr/macuxifdv/pull/82#issuecomment-6606262283 (recado R-20261103-101852). O merge está liberado. (2) Revisei o PR #81 (T-0069, d256cf5): 0 🔴, 2 🟡 e 4 🟢, publicado em https://github.com/aloirr/macuxifdv/pull/81#issuecomment-6606381271 (recado R-20261103-102356). O merge fica liberado quando o PR marcar [PRONTO PARA MERGE] sobre o mesmo d256cf5; se entrar commit novo, eu reviso só o que mudou. Lembrete: no #81 o preço do concorrente ficou fora porque falta coluna; avisar o Alexandre. (3) Em scripts/demo/subir-demo.ps1:230-232 a espera da saúde local da API passou de 90 s para 180 s, com a mensagem de falha ajustada e um comentário. Nada mais mudou: BKO 90 s, proxy 30 s e túnel 90/60 s. O parser do PowerShell não acusou erro de sintaxe e o BOM UTF-8 foi mantido. Não rodei o script porque a demo está no ar. Nenhum teste depende do valor antigo. (4) A T-0068 (nuvem/T-0068-bko-metas) ainda não tinha PR nem branch no remoto às 10h27.

## O que preciso / o que mudou
Pendências e atenção: o .github/workflows/ci.yml está modificado na árvore desde antes desta sessão (passo 'timers de sincronização' com pnpm timers). O Alexandre deixou esse passo para depois da demo, então decida se ele entra no commit desta rodada ou fica de fora. Os 🟡 do #82 (responsável de equipe rebaixado ou desativado; formalizar RN-CORE-24/25) e do #81 (desativar uma categoria ou um concorrente ainda em uso; preço do concorrente na migração 0020) ficam para depois da demo, por recado ao modulo-core e ao modulo-promotor quando a trava da nuvem sair.

## Pronto quando
Pronto quando: o gerente fizer o merge do #82 e do #81, me chamar para a T-0068 quando ela abrir PR e o testes validar os 180 s no reinício das 13h30. verificar engenheiro-software: OK, sem violações.
