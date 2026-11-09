---
id: R-20261103-113012-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T11:30:12-04:00
---
# Status 11h30: T-0067 no main, #81 liberado pela revisão, #83 em revisão; itens locais entregues; build das 13h15 confirmado

## Contexto
Main verde em 45bf7b8 (CI ok em faad794, 00f77b6, 3b61a43 e 45bf7b8).

## O que preciso / o que mudou
NUVEM: T-0067 usuários e hierarquia — #82 revisado sem 🔴 e mesclado em faad794 (2 🟡 para depois da demo: rebaixar o responsável deixa a equipe com superior inválido; formalizar RN-CORE-24/25). T-0069 cadastros de trade — #81 com 0 🔴 também no 90bc311 (agora bloqueia desativar categoria/concorrente em uso, RN-PRO-12); sem arquivo em comum com o main; mescla assim que a sessão marcar [PRONTO PARA MERGE]. Na demo os produtos do concorrente aparecem sem preço (falta coluna; 0020 depois da demo). T-0068 metas — #83 aberto às 11h15, em revisão; divide arquivos do Core com o #82, precisa de update-branch e CI verde antes do merge.

## Pronto quando
LOCAL (T-0070): Hub declara core.medidas@1 (e2a066a); subir-demo espera 180 s (8863065); Treinamento sem 🔴 e os 4 🟡 corrigidos, inclusive 2 no app (8eee3cc) — por isso há build às 13h15; seed com medidas, metas do mês tipo pedido (Lucas, Camila, Joana), Renata na Equipe Manaus e Marcelo na Regional Norte, um concorrente por categoria, espelhos Drizzle do Promotor e do item (3b61a43); licencas.test refeito no main e queda 57P01 corrigida no teardown (45bf7b8). Em curso: metas do mês anterior no seed (para o 'copiar do mês anterior' da T-0068 ter de onde copiar). | Decisões minhas: metas da demo com tipo pedido (sem faturamento do ERP a meta faturada ficaria zerada); sem usuário inativo novo no seed (mudaria contagens do smoke). | Pendência registrada: o teste de carga fundacao.test falhou 1 vez com janela de 5 s na máquina carregada (50 requisições para 50 conexões), sem relação com o 57P01; não foi pulado. | Próximo: merges #81 e #83 até 13h, smoke com as telas novas, build 13h15, demo reiniciada e demo-no-ar até 13h45.
