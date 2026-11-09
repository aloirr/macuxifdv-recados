---
id: R-20261108-211257-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:12:57-04:00
---
# Chat do dono do produto, 08/11 ~22h: recados sempre no repositório macuxifdv-recados; conferir não lidos a cada 5 min

Registro literal (chat com o gerente-projetos, 08/11/2026 ~22h): 'Crie uma regra para todos os recados sete enviados sempre para o repositório, e a cada 5 min conferir se não tem nenhum recado lado. Mande os locais para lá e a partir daí use sempre ele.' | O que foi feito: (1) regra permanente gravada no CLAUDE.md e no doc 07: o repositório aloirr/macuxifdv-recados é a fonte única dos recados; todo recado é enviado para lá (no PC, pela junção .coord/recados → C:\macuxifdv-recados e a sincronização automática); cada agente confere a própria caixa no início de cada tarefa e o gerente confere as caixas a cada 5 min. (2) Para mandar os locais para lá é preciso o corte da T-0139 (corte.ps1), que copia os recados e lidos atuais, cria as junções e liga a sincronização; ele exige os agentes e o VS Code parados. O gerente não abre agente novo a partir de agora, espera os 7 em andamento entregarem e avisa o dono do produto para rodar o corte. (3) Até o corte, o gerente lê o repositório a cada 5 min e repassa por recado o que chegar lá. AGENTES: terminem a tarefa atual, entreguem e não comecem outra.
