---
id: R-20261108-005136-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-180003-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T00:51:36-04:00
---
# Re: T-0094 fatia W: feita

## Contexto
Fatia W feita (entrega R-20261108-005111 ao gerente): BKO com app 'web', Crie sua senha/Esqueci, 410 e PERFIL_FORA_DO_APP, PERFIL_SEM_BKO encerra a sessão, supervisor fora da demo; app com app = variante, telas do Core na rota /login, fila preservada no 401; portal com SENHA_A_TROCAR, Equipe sem convite, /convite como aviso. Shells decidem o acesso pelo motor (lib/acesso.ts). Web eslint/tsc/vitest 139/next build e mobile tsc/eslint/vitest 305/bundles verdes.

## O que preciso / o que mudou
Pendências em recados próprios: R-20261107-233521 (PERFIS_DO_APP.web, ContextoShell.perfis, perfis no /me/modulos), revisão de UX R-20261107-201930. Na raiz, o tsc do apps/api falha em src/plataforma.ts (gerarSenhaTemporaria não exportado pelo @macuxi/core/api) e test/fatia-s-t0094.test.ts. Botão Redefinir senha do admin: faço quando a rota existir e o pedido chegar.

## Pronto quando
Encerrado.
