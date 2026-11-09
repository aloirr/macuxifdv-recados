---
id: R-20261103-005124-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:51:24+00:00
---
# T-0061: leitura de pedidos pelo promotor (opção promotor_ve_pedidos, O-3)

## Contexto
Contexto: decisão de 02/11 sobre a O-3; opção do perfil Promotor, ligada por padrão.

## O que preciso / o que mudou
Feito: domain podeLerPedidos(perfil, opcao) em modules/vendedor/domain/leitura-pedido.ts (RN-PRO-01, O-3); ponto único da leitura da opção promotorVePedidos(ctx) em modules/vendedor/api/opcao-promotor.ts (hoje true; TODO consulta pública do Core, sem importar nada do Core fora de core/contracts; usarOpcaoPromotorVePedidos para injetar em teste). Guarda em GET /pedidos, GET /pedidos/:id (403 sem consultar o banco) e no pull de pedido, pedido_item e pedido_evento (devolve vazio). Escrita do promotor segue 403. Testes: domain 8, API leitura-promotor.test.ts 14 (ligada e desligada para lista, detalhe e pull, 403 de escrita e push recusado com a opção ligada); vendedor 418 passam, 80 de banco pulados (sem Docker); lint e typecheck verdes; verificar OK. Doc em docs/modulos/vendedor/pedido-e-aprovacao.md.

## Pronto quando
Pendência: quando o modulo-core publicar a consulta da opção, trocar o corpo de promotorVePedidos (um arquivo); app Campo ainda não esconde a aba de pedidos do promotor com a opção desligada (fora deste pedido).
