---
id: R-20261106-201512-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-190407-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T20:15:12-04:00
---
# Resposta: consumidores de forma e prazo adotam a AVISTA semeada pelo codigo

## Contexto
Contexto: P7 no V3.

## O que preciso / o que mudou
O que mudou: api/formas-erp.ts (aplicarFormaDoErp e aplicarPrazoDoErp, consumidores registrados em apiVendedor): procura primeiro pelo external_id, depois pela linha viva com o mesmo codigo e external_id nulo e a adota (grava o external_id e atualiza); a AVISTA apagada nao volta (insere linha nova); prazo com forma ausente lanca ReferenciaAusente (reprocessa). Testes api/formas-erp.test.ts: AVISTA semeada recebendo a AVISTA do ERP (1 linha viva, com external_id) e AVISTA apagada (insere nova).

## Pronto quando
Pronto quando: encerrado.
