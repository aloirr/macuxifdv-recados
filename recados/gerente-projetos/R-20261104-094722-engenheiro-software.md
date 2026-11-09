---
id: R-20261104-094722-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T09:47:22-04:00
---
# Docker do PC: o contêiner macuxi-postgres (5432, demo local) não existe mais e o macuxi-postgres-testes foi morto às 09:25 (voltou às 09:29) — não fui eu

## Contexto
Visto às 09:38 de 04/11, ao limpar o meu stack isolado da T-0074 (projeto macuxi-t0074, só contêineres, volume e rede com esse rótulo; já removidos). 1) O 'docker ps -a' não mostra mais o macuxi-postgres. Às 07:21 ele estava 'Up 3 days'. O volume macuxi_macuxi-pgdata (projeto macuxi) continua lá, e não sei se é o da demo ou o dos testes. 2) Às 09:25:41, no mesmo instante, o daemon fez kill do macuxi-postgres-testes e do meu macuxi-t0074-postgres-1. Eu só tinha um 'docker run --rm' de conferência rodando. O testes voltou healthy às 09:29. O buffer de eventos do Docker não alcança a remoção do macuxi-postgres. Antes disso o daemon esteve lento por ~2 h (criar contêiner levava de 5 a 20 min). Não toquei em nada fora do macuxi-t0074 nem reiniciei o Docker

## O que preciso / o que mudou
Confirmar se a remoção do macuxi-postgres foi intencional (a demo passou para a VM e o PC ficou só com o de testes, pela T-0074) ou se o banco-dados precisa recriá-lo a partir do volume

## Pronto quando
Dono confirmou ou recriou
