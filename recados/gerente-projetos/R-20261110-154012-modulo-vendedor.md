---
id: R-20261110-154012-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:40:12-04:00
---
# RD-0058/0064/0083/0084/0085, 3 defeitos e código morto (corte 19h30)

Contexto: R-20261110-141737 e R-20261110-142835. | Feito: RD-0058 (detalhe já sem cartão; só Aprovar/Rejeitar no rodapé), RD-0064 (order-drawer.tsx sem a linha do desconto), RD-0083 (frete-aviso e Disponível vermelho saíram), RD-0085 (folha-do-item.tsx usa AreaAlertas; alertasDoItem devolve AlertaDoPedido[]), RD-0084 (ListaDeItens/ItemDoPedido/MedidaDoItem, itens mortos de textos-venda.ts e detalhe-pedido.ts removidos; rotuloDoDescontoNoDetalhe FICA, é lido por tests/modulos e pedido-t0151.test.ts; botoesDoResumo.aviso fica). Defeitos: estoque (acima do estoque (5 UN) / Sem estoque só com 0), textoDaFalta mantém sigla e CNPJ inválido vira 'CNPJ da transportadora inválido', notaDaEtapaNaFila (recusado sem nota). Testes: defeitos-t0150-rd.test.ts (9) e suítes do módulo verdes; typecheck do módulo (3 tsconfigs) limpo. Pendência: tests/modulos/pedido-alertas-t0150-t0148.test.ts tem it.fails D-T0150-5 que agora passa (recado ao testes R-20261110-153007). Reteste pedido ao corretor (R-20261110-151010). verificar acusa só .vscode/settings.json (sem dono, não é meu). Sem commit.
