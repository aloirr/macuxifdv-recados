---
id: R-20261108-135742-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0123
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:57:42-04:00
---
# Diff de governança: escopo do corretor-redundancias e reforço do testes (valor × regra)

## Contexto
Contexto: o dono do produto ajustou no chat de 08/11 ~14h (aviso R-20261108-135639) o papel dos dois agentes e autorizou a mudança.

## O que preciso / o que mudou
O que preciso: diff em docs/desenho/T-0123-escopo.diff, com git apply --check limpo contra o origin/main (base 2449afe8), para eu aplicar com o trailer do dono do produto: (1) .claude/agents/corretor-redundancias.md: tirar dele a caça a defeito funcional (no checklist A, o item 'Rótulo que contradiz o valor → bug' passa a 'encaminhe ao testes, não catalogue'; no B, 'Conferir a fórmula contra o doc 03: divergência é bug' passa a 'encaminhe ao testes'; tirar 'bug' da lista de Tipo do achado); acrescentar que toda tarefa passa por ele antes do fechamento e que o escopo é só excessos, duplicidades e redundâncias; (2) .claude/agents/testes.md: acrescentar como obrigação de toda tarefa com tela ou indicador conferir valor exibido × fórmula da RN (RN-CORE-21/22/26, RN-GES-05/06) e rótulo × valor, com dia útil, dia não útil, virada de mês e fuso do tenant, citando o caso 'META DE HOJE R$ 553' (realizado do mês no lugar da meta do dia). Mantenha o resto do texto igual.

## Pronto quando
Pronto quando: diff com apply --check limpo e recado de entrega.
