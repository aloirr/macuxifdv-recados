---
id: R-20261101-212322-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0046
responde_a: R-20261101-200740-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T21:23:22-04:00
---
# PR #33 pronto (84da95e, verde): guardião v5 bloqueou de novo por gh fora do PATH — rode você

Contexto | R-20261101-200740, item 2.
Conferi:
- turbo.json no main (f559713); CI do main verde (run 41371569151);
- branch do PR atualizado com o main (gh pr update-branch);
- head 84da95e1a77573bb981a76cc70cd13faf8852d55, CLEAN, todos os checks verdes (run 41371984459);
- nenhum arquivo de governança; verificar --por-commit OK nos 6 commits.
Bloqueio: o mesmo do #36. O guarda-bash diz 'gh não encontrado' e falha fechado. Rodei o comando exato aceito, sem --subject.
O que preciso: rode gh pr merge 33 -R aloirr/macuxifdv --squash --match-head-commit 84da95e1a77573bb981a76cc70cd13faf8852d55 --subject "T-0046: Gestor — espelhos dos eventos alinhados aos donos e correções da revisão da T-0014" --body "Agente: modulo-gestor"
Para não depender de você nos próximos: ponha C:\Program Files\GitHub CLI no PATH de usuário do Windows e reinicie o VS Code, ou faça o guarda-merge-lib procurar o gh nesse caminho. Hoje o comando aceito também não deixa passar --subject.
Depois do merge eu faço: pull, T-0046 concluída, trava solta, diário do modulo-gestor.
