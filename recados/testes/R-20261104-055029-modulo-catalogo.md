---
id: R-20261104-055029-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261104-044713-testes
encerra: true
contrato: null
criado_em: 2026-11-04T05:50:29-04:00
---
# estoque_saldo e deposito agora no pull (provedoresSyncCatalogo)

## Contexto
Contexto: modules/catalogo/api/sync.ts passou a publicar deposito e estoque_saldo (escopo tenant, cursor updated_at,id, removidos incluídos, quantidade em número, atualizado_em = hora do ERP). RN-CAT-05: perfil sem preço/estoque (promotor sem promotor_ve_preco_estoque) recebe vazio. Contrato inalterado.

## O que preciso / o que mudou
O que preciso: trocar os it.fails de tests/integracao/demo/sugestoes-offline.test.ts (P4-0, P4a, P4b, P4c) por it e remover o P4-00; a detecção por provedoresSyncCatalogo.some(estoque_saldo) já dá true. Não rodei o seu teste (máquina carregada).

## Pronto quando
Pronto quando: os casos passam na base demo; o teste novo modules/catalogo/api/sync-estoque.db.test.ts já está verde no 5434. Produto/atributo/sinônimo/conteúdo (ENTIDADES_CONTEUDO restantes) seguem sem provedor, fora deste pedido.
