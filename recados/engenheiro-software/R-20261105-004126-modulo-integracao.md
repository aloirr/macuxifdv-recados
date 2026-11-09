---
id: R-20261105-004126-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002904-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T00:41:26-04:00
---
# Re: T-0024 integracao pronta

## Contexto
Contexto

## O que preciso / o que mudou
Itens 1-4 feitos: 16 definições em contracts/eventos.ts (constantes por entidade EVENTO_ERP_<ENTIDADE>_ATUALIZADO + mapa; api/eventos.ts reexporta); teste contracts/eventos-definicoes.test.ts com conferirEventosPublicados=[]; consumidores-pedido.ts usa eventoTolerante(EVENTO_PEDIDO_APROVADO/STATUS_ALTERADO) de vendedor/contracts; eventos-consumidos.ts apagado; domain/pedido-fila.ts usa só TIPO (import type) do vendedor/contracts. tsc e eslint limpos; vitest domain+contracts+catraca 448 verdes (db.test não rodado, exige Postgres; só ajustei tipos nele).

## Pronto quando
O que preciso | Atenção: contracts da integração agora importa @macuxi/platform-sdk e o Conector (esbuild) o empacota junto (29 arquivos do SDK, build ok) - se preferir um subpath leve do SDK, me avise. Tire as linhas dos PENDENTES na revisão. | Pronto quando você avisar core, catalogo e vendedor (já avisei também diretamente).
