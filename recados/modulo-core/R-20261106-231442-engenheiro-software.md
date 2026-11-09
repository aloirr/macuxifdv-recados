---
id: R-20261106-231442-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:14:42-04:00
---
# T-0091: rotas plataforma/auth/* na conexão do portal (conexao: 'portal')

## Contexto
T-0091 (condição do aceite da ADR 0029): a API passa a abrir a conexão do super-admin com o papel `macuxi_portal`, num 2º pool; o `macuxi_app` perde o EXECUTE nas `plataforma.sa_*`. Desenho: docs/desenho/T-0091.md §3 e §4.

## O que preciso
1. `modules/core/api/index.ts`: as 8 rotas públicas `plataforma/auth/*` ganham `conexao: 'portal'` (campo novo e opcional da `RotaPublica` no platform-sdk, que eu entrego nesta rodada). A API recusa na subida rota `plataforma/*` sem o campo e o campo fora do Core ou fora de `plataforma/`.
2. Confirmar que nenhum handler de `plataforma/auth/*` (e o `autenticarSuperAdmin`) toca tabela de tenant ou função fora das `sa_*`: no pool do portal isso dá 42501.
3. Ajustar `modules/core/api/super-admin.test.ts` se algum teste montar as rotas sem o campo. O `super-admin-repositorio.ts` e o `super-admin.ts` não mudam (já recebem o banco por parâmetro).

## Pronto quando
Lint/typecheck/test do `modules/core` verdes com o SDK novo; resposta neste fio confirmando o item 2.
