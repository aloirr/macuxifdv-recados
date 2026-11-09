---
id: R-20261106-201525-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:15:25-04:00
---
# T1: testIDs novos da aba Itens/Detalhes e testes de banco que ficaram para voces

## Contexto
Contexto: telas V4 do Novo pedido mudaram.

## O que preciso / o que mudou
O que mudou: testIDs - forma, prazo (listas suspensas: forma, forma-menu, forma-<id>; prazo, prazo-menu, prazo-<id>), total-do-pedido e total-do-pedido-valor, card-pagamento, card-frete, credito (credito-total, credito-disponivel, credito-alerta, credito-atualizacao, credito-vazio), leve-mais, quantidade qty-<codigo>-menos

## Pronto quando
valor | mais (kit; antes dec-/qty-/inc-), ajuste-<codigo> (CampoAjuste: -tipo, -valor), medida-<codigo> (UN | CX), total-<codigo> (Valor total), avancar (botao inline, nao fixo); saiu o rodape-pedido. | Pendente com voces (T1): testes de banco no CI dos criterios 4, 5 e 6: 422 RN-VEN-24/25 no receber, retrato das 8 colunas, aprovado@1 com pagamento, titulo vencido indo para aprovacao (cliente da demo com titulo vencido), 403 do promotor nas rotas de formas-pagamento (acoes forma_pagamento.*), tenant isolado. Cobertura sem banco: api/pagamento.test.ts, api/formas-erp.test.ts, domain/pagamento.test.ts.
