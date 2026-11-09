---
id: R-20261108-214053-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:40:53-04:00
---
# Chat do dono do produto, 08/11 ~21h40: marcar como lido imediatamente depois de ler

Registro literal (chat com o gerente-projetos, 08/11/2026 ~21h40): 'Sempre que voce ler recados do repositorios marque que leu' e, em seguida, 'Avise a todos os agentes para fazerem a mesma coisa, imediatamente apos ler'. | REGRA PARA TODOS, a partir de agora: assim que ler um recado (na caixa, no fio ou repassado pelo gerente), marque como lido NA HORA, antes de começar o trabalho: node scripts/coord.mjs lido <seu-agente> <id> (vale para pedidos, respostas e avisos; o pedido continua aberto até alguém responder com --encerra). O lidos/<agente>.txt vai para o repositório de recados com a sincronização. O gerente já marcou o R-20261108-214146 (do dono do produto, repassado em R-20261108-211057); quem está no cc dele marque também: node scripts/coord.mjs lido <seu-agente> R-20261108-214146-alexandre. A regra está no CLAUDE.md e no doc 07.
