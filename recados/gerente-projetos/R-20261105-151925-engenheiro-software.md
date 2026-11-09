---
id: R-20261105-151925-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:19:25-04:00
---
# SDK: busca separa 'buscou e não achou' de 'não consegui buscar' (pré-requisito dos 5 mil)

## Contexto
Ponto da revisão R-20261105-145745: o buscar do SQLite devolvia [] também quando não buscava.

## O que preciso / o que mudou
Feito (aditivo, buscar e motor.buscar inalterados): BuscaTextoSync.buscarComDesfecho? e motor.buscarComDesfecho(indice, consulta) devolvem DesfechoBusca = {buscou:true, resultados}

## Pronto quando
{buscou:false, motivo}; MotivoSemBusca = consulta_vazia, modulo_indisponivel, indice_invalido, erro_busca, sem_busca, indeterminado (busca de fora do SDK só com buscar e lista vazia). SQLite (BuscaSqlite, obrigatório) e comBuscaEmJs implementam; buscar agora delega e devolve [] quando buscou=false. Arquivos: packages/platform-sdk/src/busca-tipos.ts, busca.ts, motor-sync.ts (só o método novo, perto de buscar), sqlite/armazenamento.ts (buscar/tipo BuscaSqlite), busca.test.ts (+11 testes: desfecho nos 3 armazenamentos, sem_busca, indeterminado, indice_invalido, modulo_indisponivel, erro_busca sem texto no log); .coord/contratos/modulos.md (2 linhas na seção Leituras do motor). Recado com modo de usar ao modulo-catalogo: R-20261105-151845. Verificações: platform-sdk tsc (node+web) e eslint verdes, vitest 482/482; apps/mobile tsc, eslint verdes, vitest 225/225; coord verificar OK. | Pendências: motor-sync.ts e sqlite/armazenamento.ts também têm mudanças do lote M não commitadas (verificacao/lote-m2): commitar esta mudança junto ou depois do lote M; a regra dos 5 mil é do modulo-catalogo (R-20261105-151845). Sem ADR (aditivo, mesma API).
