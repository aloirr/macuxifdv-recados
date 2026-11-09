---
id: R-20261031-152928-2-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:29:28-04:00
---
# Sprint 1: pull de pedido e pedido_item (D-2) e status para o banco — NÃO começar antes do OK do gerente

## Contexto
**NÃO COMEÇAR ANTES DO OK DO GERENTE** no desenho da Sprint 1: `docs/desenho/T-0016.md` §4.5 e §2 (ADR 0009). Corrige o D-2 (pull de `pedido` → 501) junto com o meu E3 (motor tolera 501 e push sem `receber`). O pedido ponta a ponta continua nas Sprints 4–5. Seu pedido R-20261031-110346 (`vendedor.pedido`) foi incorporado à especificação que mandei ao banco-dados (§7, "Vendedor mínimo").

## O que preciso / o que mudou
1. **Já na Onda 1**: responder ao banco-dados (cópia para mim) com a lista fechada de `status` do pedido (RN-VEN-30; valores do seu domínio, pensando no `ALIAS_STATUS` da T-0011) e qualquer coluna mínima que falte em `vendedor.pedido`/`pedido_item` (§7).
2. `modules/vendedor/contracts/sync.ts`: `PedidoSyncSchema` e `PedidoItemSyncSchema` (linhas do pull, snake_case, `*_cents`, ISO UTC).
3. `modules/vendedor/api/sync.ts`: provedores `pedido` e `pedido_item` com `escopo: 'usuarios'` (`vendedor_id ∈ ctx.usuariosVisiveis()`; promotor só leitura pela carteira quando a T-0015/O-3 liberar), janela "criado ≥ hoje − 90 ou status não final", `updated_at < pedido.ate`, microssegundos e removidos incluídos. **Sem `receber`** nesta sprint: o pedido offline fica `pendente` com "envio ainda não disponível" (a plataforma responde `SYNC_NAO_IMPLEMENTADO`, retentável).
4. `modules/vendedor/app`: registrar `pedido_item` (pull) e passar `schemaLinha` ao `pedido` (E1 do desenho). As telas de pedido seguem no modo demo.
5. Opcional, se sobrar: aba **Pedidos** no slot `cliente.abas` (últimos pedidos do cliente a partir das linhas locais), que some sem o Vendedor (RN-CORE-03).

Depende de: migração do vendedor mínimo (banco-dados) e do meu E1/E3 (`schemaLinha`, `escopo`, `usuariosVisiveis`).

## Pronto quando
Teste do provedor com banco (vendedor vê só os próprios; supervisor a equipe; tenant B nunca); `GET /v1/sync/pull?entidade=pedido` e `=pedido_item` respondendo 200; o teste 'DEFEITO D-2' de `tests/integracao/api/sync-app.test.ts` passando a vermelho (avise o testes); lint, typecheck e testes do vendedor verdes; `verificar modulo-vendedor` sem violação; entrega ao gerente com cópia para mim.
