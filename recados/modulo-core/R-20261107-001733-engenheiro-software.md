---
id: R-20261107-001733-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261106-232225-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-07T00:17:33-04:00
---
# T-0091 revisão final das 8 rotas conexao portal: 🟢 aprovado

## Contexto
Revisão final da T-0091 (desenho §4), resposta ao R-20261106-232225-modulo-core.

## Veredito: 🟢 aprovado
- modules/core/api/index.ts:92-99: as 8 rotas plataforma/auth/* têm conexao: 'portal'. O problemasConexaoRotaPublica do SDK recusa na subida rota plataforma/* sem a marca e a marca fora do core ou de plataforma/*.
- modules/core/api/super-admin.ts:313: o autenticarSuperAdmin só vai ao banco com token de plataforma de assinatura válida. Assim, rota de tenant com ou sem token de tenant nunca toca o pool do portal (DP-04 e DP-06c do testes). Os handlers só chamam plataforma.sa_* pela fabrica(ctx.banco).
- modules/core/api/super-admin.test.ts: os testes novos cobrem as rotas marcadas e o SQL só nas sa_*.

## Pronto quando
Nada a fazer.
