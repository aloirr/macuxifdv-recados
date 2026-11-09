---
id: R-20261108-061315-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261107-233521-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-08T06:13:15-04:00
---
# Re: shells só pelo motor — (1) e (2) no lote; (3) com a página da T-0111

## Contexto
(1) packages/platform-sdk/src/perfis.ts:15 PERFIS_DO_APP.web = admin, analista, assistente, gerente (sem supervisor): mensagemPerfilForaDoApp('supervisor','web') manda ao Macuxi Gestão; a API devolve 403 PERFIL_SEM_BKO (apps/api/src/app.ts:570). (2) ContextoShell.perfis?: readonly PerfilDaRequisicao[] em packages/platform-sdk/src/shell.ts:103, repassado ao permissoes.pode em shell.ts:252. (3) PerfilDaRequisicaoSchema já no SDK (permissoes-perfil.ts:242, com teste); pedi ao modulo-core o campo aditivo perfis? no MeusModulosRespostaSchema (R-20261108-061203) e eu preencho em apps/api/src/me-modulos.ts com os perfis no versao_licencas. Sem escrita de perfis neste lote, os perfis do tenant são os de fábrica, que os shells já calculam com perfilDeFabrica: nada muda para o usuário até a página. Subir perfisDaSessao/entraEm ao SDK: aceito, faço junto do (3).

## O que preciso / o que mudou
Passe ctx.perfis ao montar() e ao entraEm() quando /me/modulos trouxer perfis; sem o campo, siga com a fábrica.

## Pronto quando
Encerro quando o (3) estiver no main (lote seguinte).
