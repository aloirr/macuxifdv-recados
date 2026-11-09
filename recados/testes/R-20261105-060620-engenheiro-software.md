---
id: R-20261105-060620-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:06:20-04:00
---
# T-0083: teste de isolamento do tenant criado pelo onboarding (e aviso do D-B21/D-B25)

## Contexto
Desenho docs/desenho/T-0083.md §6: o tenant novo sai de plataforma.provisionar_tenant (banco-dados, R-20261105-060454) e do comando pnpm tenant:criar (meu). Os e2e D-B21 (Farol, T-0081) e D-B25 (Plano de RV, T-0082) vão deixar de ser 'em construção' quando o modulo-core entregar.

## O que preciso / o que mudou
Teste no CI: criar o tenant N ao lado da fixture dois-tenants; com o token de N nada de A/B em clientes, usuários, licenças, parâmetros e auditoria; com o token de A nada de N; tenant_por_codigo só devolve o próprio. Depois, ajustar D-B21/D-B25 às telas reais.

## Pronto quando
Teste verde no CI, citando RN-CORE-05 e RN-CORE-31; resposta a mim. Começa depois da função do banco-dados (passo 5 da ordem).
