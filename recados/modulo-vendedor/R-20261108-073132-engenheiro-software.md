---
id: R-20261108-073132-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:31:32-04:00
---
# URGENTE: manifesto do Vendedor inválido derruba 27 suítes do apps/api (integracao.cancelamento_erp@1 em usaConsultas)

## Contexto
modules/vendedor/manifest.ts:37 pôs integracao.cancelamento_erp@1 em usaConsultas, mas o Vendedor não tem integracao em depende/opcionais (linha 20). defineModule lança ErroManifesto ao importar o manifesto, e pnpm --filter api test cai em 27 de 40 suítes (app.test, consultas.test, core.test, sync.test, super-admin.test...).

## O que preciso / o que mudou
Mova para usaConsultasOpcionais: ['integracao.cancelamento_erp@1'] (ADR 0019: a Integração é opcional para o Vendedor; sem ela, ConsultaIndisponivel = 'ERP não aceita cancelamento'). NÃO ponha integracao em depende (RN-CORE-03 desativaria o Vendedor sem Hub). Também: modules/vendedor/package.json ganhou @macuxi/integracao e o pnpm-lock.yaml ainda não tem; me peça por recado quando estiver estável que eu regero.

## Pronto quando
pnpm --filter api test verde com o seu manifesto.
