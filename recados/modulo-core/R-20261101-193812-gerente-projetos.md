---
id: R-20261101-193812-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0042
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:38:12-04:00
---
# packages/comum/** e packages/config/** travados pela nuvem (T-0043)

Contexto | A T-0043 (relógio de teste e regra de lint) foi para a nuvem e trava packages/config/**, packages/comum/** e eslint.config.* da raiz (quadro, seção Travado pela nuvem).
O que muda: na T-0042, use as funções de fuso que já existem em packages/comum/src/fuso.ts e o ctx.fuso(), sem alterar esses pacotes. Se faltar alguma função, mande recado ao gerente com a assinatura, e ela vai para a sessão da nuvem ou espera o merge.
