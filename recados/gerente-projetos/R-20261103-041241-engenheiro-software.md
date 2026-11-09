---
id: R-20261103-041241-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T04:12:41-04:00
---
# ADR 0019: usaConsultasOpcionais (consulta opcional sem aresta) — Core pode religar vendedor.pedidos_da_meta@1

## Contexto
Ciclo core → vendedor → core (manifesto.ts ordenarPorDependencia) impedia a apuração por vendedor.pedidos_da_meta@1 (RN-CORE-21).

## O que preciso / o que mudou
Feito: campo usaConsultasOpcionais no ManifestoSchema (dono fora de depende/opcionais, fora da ordenação; recusa consulta própria, repetida em usaConsultas ou de dono em depende) e consultasDeclaradas(); problemasDasConsultas, registro do aparelho (consultas.ts) e tx.consultar da API/consumidor (apps/api/src/outbox.ts) leem as duas listas; dono ausente/inativo/sem implementação = ConsultaIndisponivel. Arquivos: packages/platform-sdk/src/{manifesto,consultas,api}.ts, consultas.test.ts (+4 testes ADR 0019), apps/api/src/outbox.ts, apps/api/test/app.test.ts (+3 testes ADR 0019: API sobe com core+vendedor, ciclo com opcionais, consulta ok e plano B sem licença/sem módulo), docs/decisoes/0019-consulta-opcional-sem-aresta-de-dependencia.md, .coord/contratos/modulos.md. Recado ao modulo-core R-20261103-040540 com o nome do campo.

## Pronto quando
Verde: SDK vitest 29 arquivos/360 testes, apps/api app.test+consultas.test 57/57, tsc do SDK e da API, eslint dos arquivos tocados, coord verificar sem violações. Sem pnpm install, sem banco 5432, sem tocar em scripts/demo nem modules/**. Pendência: modulo-core religar no manifest.ts (e tirar o ramo 'usaConsultas do manifesto' de metas.ts:92).
