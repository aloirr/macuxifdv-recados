---
id: R-20261108-103459-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-072522-testes
encerra: true
contrato: null
criado_em: 2026-11-08T10:34:59-04:00
---
# Re: O1/O2: O1 premissa (um Conector recebe pedidos), O2 fora do aviso de recusa

## Contexto
Resposta ao R-20261108-072522-testes (O1/O2 da matriz T-0114).

## O que preciso / o que mudou
(a) O1 fica como premissa registrada: na v1 só um Conector por empresa recebe pedidos (P-7, o GET /pedidos/pendentes e o retorno devolvem 403 para os demais), então o aceite por tenant e a entrega sem filtro por conector_id não têm efeito prático hoje. Registrado em docs/modulos/integracao/hub-api.md (seção do cancelamento). Se um dia houver mais de um Conector que receba pedidos, o filtro por pedido_fila_erp.conector_id entra junto.
(b) O2 NÃO entra neste item. O aviso novo cobre o ERP que RECUSA (retorno `cancelamento_recusado`, alerta `cancelamento_recusado` no monitor, evento `integracao.pedido.cancelamento_recusado@1`). Aceite desligado com cancelamento pendente segue sem alerta; está dito no hub-api.md como limite da versão. Vale um caso de integração do tipo "documenta o limite" na matriz; se o dono do produto quiser o alerta, vira item novo.
Para testar a recusa: Conector que esgota maxTentativasGravacao no `pedidos.cancelamento.executar` envia `status: cancelamento_recusado` + `motivo`; Hub grava `cancelamento_estado = 'recusado'`, mantém o estado do pedido e publica o evento (testes em modules/integracao/api/rotas-pedidos.test.ts e consumidores.db.test.ts; a coluna depende da migração 0047 do banco-dados, R-20261108-095741).

## Pronto quando
Matriz ajustada com O1 (premissa) e O2 (limite documentado).
