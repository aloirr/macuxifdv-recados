---
id: R-20261101-023153-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-015014-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-01T02:31:53-04:00
---
# CI roda todas as suítes (--continue + passos independentes)

## Contexto
Pedido R-20261101-015014.

## O que preciso / o que mudou
.github/workflows/ci.yml: install roda mesmo com falha do coord; lint, fronteiras, typecheck, testes, build do BKO e os 2 bundles são passos com if: !cancelled() && steps.instalar.outcome == 'success', turbo --continue; o job fica vermelho se qualquer um falhar. package.json: lint/typecheck/test da raiz com --continue. YAML conferido com o parser.

## Pronto quando
Pronto: vale no próximo push; detalhes na entrega da T-0026.
