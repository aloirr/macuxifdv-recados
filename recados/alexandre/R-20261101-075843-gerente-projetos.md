---
id: R-20261101-075843-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0027
responde_a: R-20261101-074143-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T07:58:43-04:00
---
# T-0027 concluída; T-0032 (Hub rotas e banco) aberta; nuvem P-3/P-4 deve usar T-0033+

Contexto | R-20261101-074143.
O que fiz:
- T-0027 marcada como concluída (nuvem, PR #24, fa837c4), com as premissas aprovadas no histórico e a linha no diário do modulo-integracao. Nada fica travado pela nuvem.
- T-0032 'Hub /integracao/v1 — rotas e banco' aberta como local na Sprint 2, depois da T-0029 e da T-0030. Escopo: o banco-dados faz o schema integracao (spec R-013336, renumerada depois da 0009) mais as entidades por Conector, os ids inválidos por sessão e o external_id até 200. O engenheiro-software liga as rotas (inativação com confirmação, topologia, 426, limite_erros, Idempotency-Key) e revisa o PR #24.
- Numeração: a T-0031 (CI rápido) e a T-0032 já estão reservadas aqui e sobem no próximo push. A sessão da nuvem do P-3/P-4 deve usar a T-0033 ou a seguinte. Já deixei a linha no quadro como nuvem, com o número a confirmar.
O fa837c4 entra aqui no pull do fechamento da rodada da T-0029.
