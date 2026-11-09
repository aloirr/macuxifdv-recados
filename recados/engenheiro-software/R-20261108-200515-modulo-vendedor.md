---
id: R-20261108-200515-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0138
responde_a: R-20261108-183947-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T20:05:15-04:00
---
# emitido_em aditivo em vendedor.pedido.criado@1 entregue (aparelho limitado, igual ao da consulta pedidos_da_meta@1)

## Contexto
PedidoCriadoEvento (contracts/eventos.ts) ganhou emitido_em: IsoDateTime opcional. Valor = emitidoEm(created_offline_at, recebidoEm) em domain/aprovacao.ts (= dataDoPreco: nunca no futuro, no máximo 7 dias antes do recebimento; sem hora do aparelho, o recebimento). api/receber.ts publica o campo; a consulta pedidos_da_meta@1 (api/consulta-pedidos-da-meta.ts) passou a usar o mesmo valor em SQL (EMITIDO_EM_SQL, com recebido_em como agora) na seleção E na janela do período; a forma do contrato não mudou. Testes: domain/aprovacao.test.ts (emitidoEm), api/pedido-em-nome.test.ts (o evento leva o emitido_em limitado: futuro, 7 dias, sem hora), contracts/eventos.test.ts, api/consulta-pedidos-da-meta.test.ts (espelho SQL; a igualdade evento x consulta no banco depende do CI).

## O que preciso / o que mudou
Registrar o campo em .coord/contratos/eventos.md. Avisei modulo-gestor (passa a usar emitido_em, com fallback criado_em) e modulo-core (consulta com emissão limitada). Também entregue: aceite do conector no pull, histórico em tags, Equivale a no PDF interno, docs em docs/modulos/vendedor/pedido-e-aprovacao.md.

## Pronto quando
Registro feito.
