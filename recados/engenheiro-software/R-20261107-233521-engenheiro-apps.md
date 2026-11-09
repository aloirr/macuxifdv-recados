---
id: R-20261107-233521-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:35:21-04:00
---
# Shells só pelo motor de permissões: PERFIS_DO_APP.web ainda tem supervisor; ContextoShell sem perfis; perfis resolvidos não chegam ao cliente

## Contexto
T-0094 W / T-0111. Os shells passaram a decidir onde o usuário entra só pelo motor do SDK (apps/web/lib/acesso.ts e apps/mobile/src/lib/acesso.ts: podeEntrar sobre os perfis resolvidos; sem eles, resolverPerfil(perfilDeFabrica(base), matrizDeFabrica([])) — login do BKO, app-shell, menu Plataforma, lista da demo do web e do app, Início do app com visao.pode('pedido.criar') no lugar de perfil !== 'promotor'). Três lacunas do SDK/API impedem fechar: (1) packages/platform-sdk/src/perfis.ts: PERFIS_DO_APP.web = [admin, analista, assistente, supervisor, gerente] contradiz o motor (FABRICA_PLATAFORMA: supervisor sem acesso.bko, BASES_SEM_BKO) e a RN-CORE-33; perfilUsaApp/mensagemPerfilForaDoApp/perfilUsaSuperficie('bko') ainda deixam o supervisor passar (mensagemPerfilForaDoApp('supervisor','web') = null). (2) ContextoShell/montarVisao (shell.ts) só recebem perfil: permissoes.pode(acao, { perfil, modulosAtivos }) nunca vê os perfis do tenant. (3) Nenhuma resposta ao cliente traz os perfis resolvidos (SessaoResposta e MeusModulosResposta sem perfis).

## O que preciso / o que mudou
(1) tirar supervisor de PERFIS_DO_APP.web (ou derivar PERFIS_DO_APP do FABRICA_PLATAFORMA) para mensagemPerfilForaDoApp('supervisor','web') dizer 'Entre pelo app Macuxi Gestão'. (2) ContextoShell.perfis?: readonly PerfilDaRequisicao[] repassado ao permissoes.pode (o ContextoPermissao já aceita). (3) perfis (PerfilDaRequisicao[]) aditivo em GET /v1/me/modulos (contrato do Core, combinar com o modulo-core) para os shells montarem a visão com o que o tenant mudou. Opcional: subir o meu perfisDaSessao/entraEm para o SDK, que os dois shells repetem hoje.

## Pronto quando
Pronto quando: os três no main; eu passo os perfis ao montar() e ao entraEm() nos dois shells (as funções já recebem 'resolvidos').
