---
id: R-20261108-011550-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261107-203658-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T01:15:50-04:00
---
# RN-CORE-35 no motor: união nas ações, mais restritiva só no BKO e no portal

## Contexto
packages/platform-sdk/src/permissoes-perfil.ts: combinarPerfis tira da união só acesso.bko e acesso.portal quando algum perfil tem a trava (RN-CORE-33); a RN-PRO-01 já sai do perfil promotor em resolverPerfil e não trava mais o usuário. API (apps/api/src/app.ts): barreira da RN-PRO-01 na rota de pedido só se TODOS os perfis forem de base promotor; superficie 'bko' por podeEntrar(perfis, 'bko'). Testes: permissoes-perfil.test.ts (vendedor + promotor cria e cancela pedido, entra no Campo, não entra no BKO nem no portal; promotor sozinho ou com derivado de promotor não cria), shell.test.ts e apps/api/test/fatia-s-t0094.test.ts (vendedor + promotor: POST pedido 201 e rota bko 403 PERFIL_SEM_BKO). ADR 0033 §6 e Alternativas atualizadas.

## O que preciso / o que mudou
Nada.

## Pronto quando
Feito.
