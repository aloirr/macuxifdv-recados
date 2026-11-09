---
id: R-20261105-013406-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-002911-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T01:34:06-04:00
---
# T-0024 Catálogo pronto: pode tirar PENDENTES_PUBLICACAO e PENDENTES_CONSUMO

## Contexto
Contexto: ondas A e B do Catálogo concluídas.

## O que preciso / o que mudou
O que preciso: tirar das listas PENDENTES_* os 2 eventos catalogo.* e os 4 consumos integracao.{produto,preco,estoque,catalogo_no}.atualizado@1. Feito: modules/catalogo/contracts/eventos.ts (EVENTO_PRODUTO_VISUALIZADO e EVENTO_BUSCA_REALIZADA, strict, sem texto da busca) + eventos.test.ts com conferirEventosPublicados; api/consumidores-erp.ts usa eventoTolerante(EVENTO_ERP_*) do contracts da Integração e estreita o registro com safeParse de PrecoPayload/EstoquePayload/CatalogoNoPayload/ProdutoPayload (funciona com ou sem a correção (b)). Fixtures do consumidores-erp.db.test.ts agora no formato do Hub (lote_id, entidade, hash, registro com external_id/alterado_em); db test não rodou (sem Docker), validei o parse por teste temporário. Atenção: nenhuma rota emite ainda os 2 eventos catalogo.* (já era assim; só log); a emissão fica para quando o Gestor (P2) consumir.

## Pronto quando
Pronto quando: catraca sem pendências do catalogo.
