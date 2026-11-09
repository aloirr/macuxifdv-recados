---
id: R-20261105-214759-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:47:59-04:00
---
# Entrega: pedido em nome do vendedor (backlog 05/11, R-20261105-164314)

## Contexto
Feito: PedidoPush.vendedor_id (dono) e autor = token; API revalida em api/receber.ts via domain/pedido-em-nome.ts (promotor RN-PRO-01, perfil supervisor/gerente, equipe/área por usuariosVisiveis, dono vendedor; orçamento/conversão não são em nome); alçada do gestor (RN-VEN-10: politicaDoAutor); vendedor_id/autor_id gravados, histórico e auditoria com o gestor, eventos criado/status_alterado/aprovacao_solicitada com vendedor_id = vendedor (meta e ranking, RN-CORE-21); idempotência por autor. App: slot pedido.criar_em_nome registrado (gestao), contrato AcaoPedidoEmNome em contracts/extensoes.ts, novo-pedido também na Gestão, rascunho/outbox com vendedor_id, alçada do gestor no aparelho. Docs: docs/modulos/vendedor/pedido-e-aprovacao.md. Arquivos principais: modules/vendedor/{domain/pedido-em-nome.ts,api/receber.ts,contracts/{index,extensoes}.ts,app/index.ts,app/screens/new-order-screen.tsx,app/lib/{pedidos,novo-pedido}.ts,app/state/use-vendedor.ts}. Testes: vitest do vendedor 762 verdes (17 domain, 13 rota com banco simulado, 6 lib do app, 4 slot), api/pedido-em-nome.db.test.ts escrito para o CI (não rodou: sem Docker); tsc json/web/app e eslint verdes; verificar modulo-vendedor sem violações. Sem coluna nova: vendedor.pedido.autor_id já existe (0007).

## O que preciso / o que mudou
Pendências: (a) modulo-core: notificação ao vendedor no criado@1 com autor diferente do vendedor (recado R-20261105-213027; citei T-0085 por engano, é a T-0055); (b) modulo-gestor: trocar a interface local pelo import e, se quiser, passar vendedor_nome no abrir() (R-20261105-212947); (c) conferências pedidas a designer-ux e engenheiro-apps; (d) limites: carteira conferida é a do gestor, não a do vendedor; aprovação via Gestão de pedido em nome já usa o fluxo existente; BKO sem mudança; item 3 do pedido do Gestor (credito/historico em aprovacao_solicitada@1) segue aberto.

## Pronto quando
Pronto quando: db.test verde no CI e conferências sem vermelho.
