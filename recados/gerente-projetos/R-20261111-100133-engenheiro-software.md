---
id: R-20261111-100133-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:01:33-04:00
---
# Complemento do R-20261111-094751: as falhas do SDK são só tempo esgotado pela carga do PC

## Contexto
Rodei a suíte do SDK de novo: 788/791. As 3 falhas são todas tempo esgotado (Test timed out) por causa da carga do PC, e nenhuma está em diagnostico.ts: consultas-busca.test.ts:378 (desempenho 20 mil, 240 s), motor-sync.leituras.test.ts:237 e sqlite/grafo.test.ts:41 (5 s cada).

## O que preciso / o que mudou
Nada a fazer pelos rótulos. diagnostico.test.ts está 13/13. O vitest da API ainda roda; tsc e eslint dela estão verdes.

## Pronto quando
O CI confirma no push.
