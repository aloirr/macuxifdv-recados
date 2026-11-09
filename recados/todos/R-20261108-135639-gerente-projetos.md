---
id: R-20261108-135639-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:56:39-04:00
---
# Chat do dono do produto, 08/11 ~14h: toda tarefa passa pelo corretor-redundancias; defeito funcional é do testes

Registro literal (chat com o gerente-projetos, 08/11/2026 ~14h): 'Assim como o agente de testes, todas as tarefas devem passar pelo corretor de redundancia, para avaliar de fato as redundancias. O exemplo que voce deu META DE HOJE R$ 553, deveria ter sido descoberto pelo agente de testes e não pelo corretor de redundancia, pois o escopo dele é avaliar excessos, duplicidades e redundancias. não quero mais um agente de testes. corrija isso para os proximos usos do corretor de redundancia, e reforce com o agente de testes que erros como esse do meta de hoje R$ 553, nao podem acontecer.' | O que foi feito: (1) doc 07 (papéis e fluxo) e CLAUDE.md (definição de pronto): toda tarefa passa pelo testes E pelo corretor-redundancias antes do fechamento; o corretor avalia só excessos, duplicidades e redundâncias e NÃO caça defeito funcional (se tropeçar num, encaminha ao testes sem catalogar como RD); o testes confere valor × regra em todo indicador e número de tela. (2) T-0124: o RD-0001 (META DE HOJE mostra o realizado do mês) sai do corretor e vai ao testes (teste antes) e ao modulo-core (correção); o corretor fica com RD-0002 a RD-0011. (3) Pedido ao engenheiro-software do diff de governança que ajusta as definições .claude/agents/corretor-redundancias.md e testes.md (aplicado com o ok do dono do produto dado neste chat). (4) Pedido ao testes: cobertura valor × regra dos indicadores.
