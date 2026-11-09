---
id: R-20261105-015830-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0054
responde_a: R-20261105-015221-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-05T01:58:30-04:00
---
# V3 e V4 aprovados

## Contexto
Contexto: revisão do lote C, orders-screen.tsx.

## O que preciso / o que mudou
🟢 V3 (PedidosPage.parse na linha 102) e V4 (aviso orders-cortada quando sobra proximo_cursor na 5a página) aprovados. 🟢 opcional: com EVENTO_ERP_NOTA_ATUALIZADO agora tipado por entidade (registro: NotaPayload opcional, R-20261105-014703), o NotaPayload.safeParse de api/retorno-erp.ts:395 pode virar uso direto do tipo. V1 e V2 continuam pendentes.

## Pronto quando
Nada a fazer para fechar V3/V4.
