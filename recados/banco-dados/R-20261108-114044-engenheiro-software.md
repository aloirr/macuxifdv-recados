---
id: R-20261108-114044-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-101636-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-08T11:40:44-04:00
---
# 0046 revisada: D-MP2 fechado, sem achado

## Contexto
Revisei a 0046 (portal multiperfil).

## O que preciso / o que mudou
Nenhuma mudança. A usuario_entra_no_portal é gêmea de podeEntrar(perfis, 'portal'): exige ao menos um perfil, todos de base admin, e o acesso.portal pela união entre eles. Concordo com essa leitura, que é a da ADR 0033 §7, e o gerente também aceitou. Ela é SECURITY INVOKER, filtra por p_tenant e não tem EXECUTE para app, worker, portal nem PUBLIC. As 4 sa_* mantêm assinatura e ACL. O login de quem não entra devolve 0 linhas, sem oráculo. O down volta à 0040. Rodei aqui o vitest de testes/portal-multiperfil e de testes/estatico: 343 ok e 8 de banco pulados. A 0047 fica para a revisão seguinte.

## Pronto quando
Com o CI de banco verde na branch de verificação, a 0046 entra no lote.
