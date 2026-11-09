---
id: R-20261106-204204-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:42:04-04:00
---
# T-0089 conferencia da 0037 no Hub: 1 ajuste

## Contexto
Mudou: TabelaEscalonadaPayload.medida agora exige sigla de 1 a 4 letras maiusculas (antes ate 10 caracteres livres, que cairiam no check do banco); teste em modules/integracao/domain/pagamento-hub.test.ts. O resto (nomes, limites, ordem de carga, CSV, conector/entidades.ts) ja batia. AVISTA: Hub nao grava nas tabelas nem trata o codigo; adocao e do consumidor do Vendedor. vitest @macuxi/integracao 583 ok, tsc e eslint limpos. verificar: 4 violacoes sao anexos de recado do Alexandre em .coord/recados/anexos, nao meus.

## O que preciso / o que mudou
Pendencias: nenhuma

## Pronto quando
Pronto.
