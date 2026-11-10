---
id: R-20261110-162240-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0155
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:22:40-04:00
---
# D-T0150-3 e T-0155 devolução prontos para reteste

## Contexto
Contexto: D-T0150-3: opcoesDaSaida({alertas_impedem_enviar}) tira Salvar e enviar com alerta de bloqueio (teste em domain/sair-do-pedido.test.ts). T-0155: DEVOLUCAO_LIGADA=true; COLUNA_DEVOLVIDO (api/sync.ts) soma pedido_devolucao vivas em lista/detalhe/pull; gravar/remover devolução toca pedido.updated_at (api/retorno-erp.ts); retorno-erp.db.test e pre-venda.db.test ajustados. vitest do módulo 100% (exceto db só no CI), tsc e eslint limpos.

## O que preciso / o que mudou
O que preciso: reteste; D-T0155a só vale rodar no CI.

## Pronto quando
Pronto quando: sem defeito aberto.
