---
id: R-20261104-233817-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:38:17-04:00
---
# Revisão da entrega R-20261104-232805: 🟡 por_status por pedido_evento (D1) e exibições órfãs na troca de geração

## Contexto
Revisão técnica da sua entrega R-20261104-232805 (T-0079 no aparelho, T-0077 item 6), leitura do `git diff` local. Sem 🔴. Há dois 🟡 para fechar antes do lote.

## O que preciso
🟡 V1 (é o mesmo D1 da T-0077): `por_status=1` em `modules/vendedor/api/pedidos.ts:181-186` usa `p.updated_at` como "mudou de status no período". O `updated_at` anda em qualquer UPDATE (edição, `numero_erp`/retorno do ERP sem troca de status, soft delete, toques de sync). Isso traz falsos positivos e contraria a premissa da T-0077 ("data da mudança de status"). A fonte certa já existe: `vendedor.pedido_evento` (0009), uma linha por transição com `ocorrido_em` e índice `pedido_evento_pedido_ix (tenant_id, pedido_id, ocorrido_em)`, gravada em todas as transições (pedidos.ts:275/327, orcamentos.ts:172, receber.ts:301, retorno-erp.ts:298). Troque o ramo `updated_at` por:
`or ($16::boolean and ($6::date is not null or $7::date is not null) and exists (select 1 from vendedor.pedido_evento ev where ev.tenant_id = p.tenant_id and ev.pedido_id = p.id and ev.deleted_at is null and ev.de is not null and ($6::date is null or ev.ocorrido_em >= ($6::date)::timestamp at time zone $10) and ($7::date is null or ev.ocorrido_em < (($7::date) + 1)::timestamp at time zone $10)))`
Com isso, o caso de banco que falta em `pedido.db.test.ts` cobre: (a) pedido emitido antes do período e editado no período, sem transição: não vem; (b) transição no período: vem; (c) sem `por_status`: só a data de emissão.

🟡 V2 (exibições na limpeza): `apagarCopiaDoServidor` (`app/etapas.ts`) preserva a chave `exibicoes` inteira (`CHAVES_DO_USUARIO`). Já o `planoBaseRecriada` do domain (`domain/base-recriada.ts`), que tem teste, poda para os itens da fila e não é usado em lugar nenhum. O teste de `etapas.test.ts` ("ficam ... a exibição dos itens da fila") só tem um item na fila, então não distingue os dois comportamentos. Não volta pedido fantasma, porque `pedidosNaFila` só desenha exibição de item presente na fila ou nos aceitos. Mas as exibições dos pedidos aceitos pela base antiga ficam órfãs para sempre: `use-vendedor.ts:103` só as limpa quando o servidor lista o id, e isso não acontece mais depois da recriação. Escolha um caminho e alinhe o teste: (i) depois da troca de geração, podar `exibicoes` contra a fila mais os aceitos do motor (o `ContextoEtapaSync` não traz a fila, então a poda fica no `use-vendedor`); ou (ii) apagar `planoBaseRecriada`/`conferir_aceitos` (código morto) e registrar no comentário que a exibição órfã é aceita.

🟢 V3: `orders-screen.tsx:101` tipa a resposta por cast. Use `PedidosPage.parse` (contracts) como nas outras leituras.
🟢 V4: o limite de 5 páginas de 200 (1.000 pedidos) corta sem avisar. Se sobrar `proximo_cursor`, mostre "Mostrando os 1.000 mais recentes".

## Pronto quando
V1 trocado por `pedido_evento`, com o caso de banco no `pedido.db.test.ts` (roda no CI), e V2 decidido com o teste que distingue os dois comportamentos. Responda com `--responde-a` e eu fecho a revisão.
