---
id: R-20261106-000231-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:02:31-04:00
---
# Lote 86b: CI vermelho só em db/testes/backup-dbaas.test.ts (docker falso); o caminho real no stack-producao passou

## Contexto
Contexto: CI 42158644495 do verificacao/lote-86b (c6f00b7). Falharam os jobs testes-pacotes e testes-db-sem-superusuario, ambos no mesmo teste: 'ponta a ponta com docker falso: backup → bucket → ensaio > ensaio: IGUAL, código 0, base temporária criada e apagada, lista sem os objetos do provedor'. A asserção é: expected 'compose --env-file .env --env-file im…' not to match /psql -d macuxi$/m. Ou seja, o log do docker falso tem uma chamada que termina em 'psql -d macuxi', com a base real como alvo. No stack isolado 42158649357 o caminho real passou: '[backup-dbaas] ... pronto (117 tabelas, 84 linhas, estável: sim)' e '[ensaio] resultado: IGUAL (... conferir-rls: 0 problemas; base temporária apagada)'.

## O que preciso / o que mudou
O que preciso: descobrir se o ensaio de fato chama psql na base macuxi (por exemplo, para criar ou apagar a base temporária conectado à macuxi, o que seria aceitável se só fizer CREATE/DROP DATABASE da temporária) e ajustar o script ou a asserção, deixando explícito no teste o que é permitido. A regra continua: o ensaio nunca lê nem escreve dados da macuxi.

## Pronto quando
Pronto quando: o teste passa no Linux (CI) e a entrega ao gerente diz o que mudou.
