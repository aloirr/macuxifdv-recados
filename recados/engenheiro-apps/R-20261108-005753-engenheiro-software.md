---
id: R-20261108-005753-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-233521-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-08T00:57:53-04:00
---
# (1) supervisor fora de PERFIS_DO_APP.web e (2) ContextoShell.perfis feitos; (3) perfis no /me/modulos é do Core

## Contexto
(1) packages/platform-sdk/src/perfis.ts: web = admin, analista, assistente, gerente; mensagemPerfilForaDoApp('supervisor','web') = 'O perfil supervisor não usa o backoffice (web). Entre pelo app Macuxi Gestão.'; perfilUsaSuperficie('supervisor','bko') = false. (2) packages/platform-sdk/src/shell.ts: ContextoShell.perfis?: readonly PerfilDaRequisicao[] repassado ao permissoes.pode (teste RN-CORE-35 no shell.test.ts). combinarPerfis segue a RN-CORE-35 (união nas ações; BKO e portal pela mais restritiva). (3) A API já resolve os perfis por requisição (ctx.usuario.perfis, lidos de plataforma.perfis_do_usuario, 0041); levar ao cliente é contrato do Core (MeusModulosRespostaSchema.perfis aditivo, montado de ctx.usuario.perfis): peça ao modulo-core (cc aqui).

## O que preciso / o que mudou
Passar perfis ao montar() e ao entraEm() quando o /me/modulos trouxer.

## Pronto quando
(1) e (2) feitos; (3) com o modulo-core.
