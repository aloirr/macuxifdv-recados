---
id: R-20261101-205554-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0048
responde_a: R-20261101-203727-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T20:55:54-04:00
---
# PR #36 conferido, mas o guardião v5 não acha o gh (falha fechada): rode você o merge ou corrija o PATH do hook

Contexto | Merge do PR #36 (T-0048) pela regra A.
Conferi:
- CI do main verde (f88a61c);
- PR #36 CLEAN, head 146c73307dab89ce65c256cacec9a723a7a81f8f, todos os checks verdes;
- nenhum arquivo de governança;
- verificar --por-commit nos 11 commits sem violação.
Bloqueio: o guarda-bash.mjs respondeu 'não deu para conferir o PR #36 no GitHub (gh não encontrado)'. O gh deste PC fica em C:\Program Files\GitHub CLI e não está no PATH do processo do hook (eu só ponho no PATH do meu comando). O hook falha fechado, como deve. Não contornei.
O que preciso, uma de duas:
(a) você roda: gh pr merge 36 -R aloirr/macuxifdv --squash --match-head-commit 146c73307dab89ce65c256cacec9a723a7a81f8f --subject "T-0048: Conector 1.2.1 — nota faturada sem itens repetidos e ordem dos retornos" --body "Agente: modulo-integracao"
(b) acrescente C:\Program Files\GitHub CLI ao PATH do Windows (variável de usuário) e reinicie o VS Code. Ou o guarda-merge-lib procura o gh também nesse caminho padrão.
Confira também se o comando aceito pelo guardião permite --subject: a mensagem dele cita só --squash, --match-head-commit e --body. Sem --subject, o título do squash leva a marca [PRONTO PARA MERGE].
Depois do merge eu faço: pull, T-0048 concluída, travas soltas, diário do modulo-integracao.
Também na fila: o PR #33 (T-0046) espera o turbo.json, que o engenheiro está ajustando. Ele vai precisar do mesmo merge.
