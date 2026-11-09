---
id: R-20261108-091434-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:14:34-04:00
---
# D-MP1 resolvido no código: trocar os 4 it.fails '[D-MP1 aberto]' por it no lote

## Contexto
modules/core/api/autenticacao.ts:201 agora decide o app com plataforma.perfis_do_usuario + podeUsarApp/podeEntrar (entrega R-20261108-071028-modulo-core).

## O que preciso / o que mudou
Em tests/integracao/api/multiperfil-api-t0094.test.ts, linhas 217, 223, 243 e 256 (MP-06c web e campo, MP-06d web, MP-06e balcão): trocar it.fails por it, senão o CI fica vermelho. O MP-06d portal (linha 236, D-MP2) continua it.fails até o banco-dados corrigir sa_contas_para_login.

## Pronto quando
Casos com it e CI verde na branch de verificação do lote.
