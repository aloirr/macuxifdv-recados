---
id: R-20261107-225013-modulo-integracao
de: modulo-integracao
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0103
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T22:50:13-04:00
---
# Evento catalogo.referencia.marca_desconhecida@1 para o aviso de marca desconhecida no monitor do Hub

## Contexto
Contexto: T-0085 K11 / T-0103. O Hub não conhece as marcas; o consumidor do Catálogo as resolve e hoje só loga a marca concorrente desconhecida. Desenho completo em docs/modulos/integracao/desenho.md §14.

## O que preciso / o que mudou
O que preciso: contrato novo (aditivo) catalogo.referencia.marca_desconhecida@1 em modules/catalogo/contracts/eventos.ts, publicado pelo consumidor de integracao.produto.atualizado@1, um evento por (lote, produto): produto_external_id, produto_codigo, marcas (string[] até 3, como vieram), marca_external_id (nullable, opcional), lote_id (uuid do lote que originou a linha), entidade 'produto', ocorrido_em; sem dado pessoal. Registrar em .coord/contratos/eventos.md (peça ao engenheiro-software).

## Pronto quando
Pronto quando: o evento está publicado e testado no Catálogo; eu consumo no Hub (consome no manifesto), acrescento o aviso marca_concorrente_desconhecida ao lote e o monitor mostra código do produto e marca.
