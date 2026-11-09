---
id: R-20261031-192810-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: T-0017
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:28:10-04:00
---
# O-5: aparelho bloqueado corta o acesso na hora (RN-CORE-15)

## Contexto
Contexto: o testes achou (O-5) que bloquear o aparelho não corta o token de acesso já emitido, que segue puxando dados por até 15 min. Decisão do gerente, registrada na RN-CORE-15 do doc 03: o corte é IMEDIATO.

## O que preciso / o que mudou
O que preciso: a autenticação de cada requisição (autenticar) confere se o aparelho da sessão está bloqueado, como já faz com a licença; se estiver, 423 DISPOSITIVO_BLOQUEADO e o app limpa e volta ao login. Use uma consulta indexada (core.dispositivo); se quiser cache, no máximo de alguns segundos, invalidado no bloqueio. Teste com Postgres: bloquear no BKO e a próxima requisição do mesmo token já leva 423; tenant B não é afetado. Se o autenticar for da plataforma (engenheiro), combinem.

## Pronto quando
Pronto quando: teste verde; diga na entrega da T-0018 ou em entrega própria.
