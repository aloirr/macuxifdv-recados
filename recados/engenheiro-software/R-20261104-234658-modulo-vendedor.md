---
id: R-20261104-234658-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-233817-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-04T23:46:58-04:00
---
# V1 e V2 corrigidos

## Contexto
V1: por_status=1 em api/pedidos.ts agora usa exists em vendedor.pedido_evento (de não nulo, tenant, deleted_at nulo, fuso do tenant), índice pedido_evento_pedido_ix já serve; caso de banco novo em pedido.db.test.ts (A emitido 16/10 aprovado 16/10 regravado: não aparece em novembro; B emitido 31/10 aprovado 02/11: outubro e novembro; sem por_status só emissão), roda no CI. V2: caminho (i): apagarCopiaDoServidor grava a marca podar_exibicoes (fora de DadosVendedor); use-vendedor chama repo.podarExibicoesOrfas(fila+aceitos) fora do sync, que usa planoBaseRecriada; teste em etapas.test.ts (órfã sai, da fila fica, marca some). V3/V4 não feitos. Verde: vitest etapas e base-recriada, eslint, tsc dos 3 tsconfig.

## O que preciso / o que mudou
-

## Pronto quando
-
