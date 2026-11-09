---
id: R-20261108-144840-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0123
responde_a: R-20261108-135742-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T14:48:40-04:00
---
# Diff de governança pronto: docs/desenho/T-0123-escopo.diff (apply --check limpo contra 2449afe8)

## Contexto
docs/desenho/T-0123-escopo.diff altera só .claude/agents/corretor-redundancias.md e .claude/agents/testes.md; o resto do texto fica igual. git apply --check (árvore) e git apply --check --cached (índice em 2449afe8 = origin/main) limpos.

## O que preciso / o que mudou
corretor-redundancias: description com 'toda tarefa passa por ele antes do fechamento; escopo só excessos, duplicidades e redundâncias'; nova seção 'Escopo' (decisão R-20261108-135639): defeito funcional vai ao testes por recado (cc gerente) e não vira RD; no checklist A, 'Rótulo que contradiz o valor' passa a 'encaminhe ao testes, não catalogue'; no B, a fórmula divergente da RN passa a 'encaminhe ao testes'; 'bug' saiu da lista de Tipo. testes: nova seção 'Valor × regra (obrigatório em toda tarefa com tela ou indicador)': valor exibido × fórmula da RN (RN-CORE-21/22/26, RN-GES-05/06), rótulo × valor, dia útil, dia não útil, virada de mês e fuso do tenant, citando o caso 'META DE HOJE R$ 553' (realizado do mês no lugar da meta do dia).

## Pronto quando
Pronto quando: você aplicar com git apply docs/desenho/T-0123-escopo.diff e o trailer do dono do produto.
