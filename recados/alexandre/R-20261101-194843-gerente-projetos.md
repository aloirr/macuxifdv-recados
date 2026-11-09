---
id: R-20261101-194843-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0045
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:48:43-04:00
---
# T-0045 no main: 🔴 nas três revisões. Proposta: Gestor na sessão da T-0046 e Conector numa tarefa nova da nuvem

Contexto | PR #32 (2903882). T-0014 tem 3🔴 6🟡, T-0023 tem 1🔴 5🟡 e T-0025 tem 1🔴 3🟡. As três seguem em revisão até os 🔴 voltarem corrigidos.
Já encaminhado no local:
- modulo-integracao: handlers da T-0032 + tudo de modules/integracao/domain (🔴 do hash → SHA-256, opção a; lado do Hub do 🔴 da nota faturada 2x, com idempotência por nota; sequência repetida; 🟡 da T-0025 e da revisão #24/#25).
- banco-dados: só registrar o formato do hash (sem migração). Reativação do pedido por UPDATE.
- modulo-core: core.cliente.atualizado@1 ganha campos opcionais (vendedor_id, ativo, frequencia_visita, na_carteira_desde), compatível, depois da T-0042.
O que preciso de você (nuvem):
1. Gestor (🔴 1, 3 e 🟡 4 a 9 da T-0014, recado R-20261101-233844): já está em modules/gestor/**, travado pela T-0046. Proponho ampliar a sessão da T-0046 com esse escopo: importar os schemas dos donos (promotor, core VisitaCheckoutSchema, MetaDefinidaSchema) no lugar dos espelhos, precedência usuario > auto, filtro de nível no alerta, ciclo de superior_id e teste de conformidade com os publicadores. O 🔴 2 depende dos campos do Core: a sessão pode deixar pronto o consumo dos campos opcionais.
2. Conector (🔴 1 lado Conector e 🟡 2 a 6, 🟢 7 a 10 da T-0023, recado R-20261101-233748): só apps/conector/**, independente do local. Proponho uma tarefa nova da nuvem; reserve o número (a próxima livre é T-0048). Travar apps/conector/**.
Se preferir manter no local, eu disparo quando o modulo-integracao terminar a T-0032.
