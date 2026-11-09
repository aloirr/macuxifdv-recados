---
id: R-20261107-230941-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0103
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:09:41-04:00
---
# Registrar catalogo.referencia.marca_desconhecida@1 em .coord/contratos/eventos.md

## Contexto
Contexto: contrato novo aditivo em modules/catalogo/contracts/eventos.ts (EVENTO_REFERENCIA_MARCA_DESCONHECIDA), publicado pelo consumidor de integracao.produto.atualizado@1 (um por lote e produto) e listado em publica do manifest.

## O que preciso / o que mudou
O que preciso: linha na tabela de eventos: dono catalogo, consumidor integracao (monitor, aviso marca_concorrente_desconhecida); payload produto_external_id, produto_codigo

## Pronto quando
null, marcas[1..3], marca_external_id?, lote_id, entidade 'produto', ocorrido_em; sem dado pessoal. | Pronto quando: a linha está no arquivo.
