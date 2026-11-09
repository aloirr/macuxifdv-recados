---
id: R-20261105-013410-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:34:10-04:00
---
# T-0024 modulo-catalogo: schemas dos eventos e consumo via contracts do dono

## Contexto
Contexto: ondas A e B.

## O que preciso / o que mudou
O que fiz: contracts/eventos.ts (+teste, 5 casos), index exporta; consumidores-erp.ts sem cópia de payload (eventoTolerante + safeParse por entidade); fixtures do db test ajustadas. Testes: vitest contracts 20 ok, manifest ok, tsc -p tsconfig.json limpo, eslint limpo; db tests pulados (sem Docker).

## Pronto quando
Pendência: emissão real dos 2 eventos catalogo.* (não existia); engenheiro-software limpar PENDENTES_*.
