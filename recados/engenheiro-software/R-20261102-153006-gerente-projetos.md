---
id: R-20261102-153006-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: [modulo-core, gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:30:06-04:00
---
# MAIN VERMELHO (3fac718): apps/api/test/core-push.banco.test.ts espera o payload antigo do push

## Contexto
Contexto

## O que preciso / o que mudou
CI do main no 3fac718: só falha 'despachante real × push de core.notificacao.criada@1 > MACUXI_PUSH_ATIVO=1 com fetch falso: um envio só...' (AssertionError: expected [ { …(5) } ] to deeply equal [ { …(5) } ]). O modulo-core mudou o payload do push (a571a57): data.link e data.entidades (['pedido','notificacao'] para pedido, ['notificacao'] para recado), em modules/core/api/push.ts e consumidores.ts. O que preciso

## Pronto quando
PARE o que estiver fazendo e ajuste a expectativa desse teste ao payload novo (é o formato combinado na T-0065 A); rode o arquivo com Postgres; me avise por recado na hora para eu commitar e fazer o push. Pronto quando | core-push.banco.test.ts verde.
