---
id: R-20261101-060748-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:07:48-04:00
---
# catalogo.precos_cliente@1 pronta (API e aparelho)

## Contexto
Contexto: ADR 0012, desenho T-0029 §3.5. Manifesto do Catálogo já tem ofereceConsultas e sync cliente_tabela_preco; moduloApi e moduloApp exportados

## O que preciso / o que mudou
O que mudou para você: importe de @macuxi/catalogo/contracts o CONSULTA_PRECOS_CLIENTE (entrada {cliente_id, produto_ids<=500, em ISO UTC}; saída {tabela_preco_id

## Pronto quando
null, itens[{produto_id, preco_cents | null, motivo_sem_preco | null}]}). Na API use tx.consultar dentro do comTenant; no aparelho useAmbiente().consultar. Sem preço = preco_cents null com 'Sem preço para este cliente.' (RN-CAT-06, rejeitar com RN-CAT-06). Promotor recebe null com 'Preço não disponível para o seu perfil.' (RN-CAT-05). A consulta já limita 'em' a [agora-7d, agora] (P-4), mas calcule o em no receber como o desenho manda. Entidades de pull no aparelho: tabela_preco, tabela_preco_item, cliente_tabela_preco (registradas no moduloApp do Catálogo; declare usaConsultas e depende de catalogo no seu manifesto) | Pronto quando: você usar a consulta no receber e no novo-pedido. Testes: modules/catalogo/api/precos.db.test.ts e app/consultas.test.ts; regra em domain/precos-cliente.ts.
