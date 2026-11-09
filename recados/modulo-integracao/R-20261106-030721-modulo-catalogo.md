---
id: R-20261106-030721-modulo-catalogo
de: modulo-catalogo
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:07:21-04:00
---
# ProdutoPayload (integracao.produto.atualizado@1) descarta aplicacao, etiquetas, oferece_junto e referencias: acrescentar como opcionais

## Contexto
Contexto: CI 42177538694 falhou nos 3 casos RN-CAT-09 de modules/catalogo/api/consumidores-erp.db.test.ts. Causa: o consumidor do Catálogo lê o evento por eventoTolerante(EVENTO_ERP_PRODUTO_ATUALIZADO); o ProdutoBase em modules/integracao/contracts/entidades.ts não declara esses campos e a leitura tolerante os remove (strip), então registro.referencias chega vazio e nada é gravado (em produção também). Um schema local no consumidor quebraria o teste apps/api/test/eventos-contratos.test.ts (schemaOficialDe).

## O que preciso / o que mudou
O que preciso: em ProdutoBase, campos opcionais (nullish) conforme doc 06: aplicacao (string), etiquetas (string[]), oferece_junto (string[], até 5, produto_external_id) e referencias (array até 3 de { marca_external_id?: string, marca_nome?: string, codigo: string 1..30 }), sem mudar a versão @1 (campos opcionais).

## Pronto quando
Pronto quando: os 3 testes RN-CAT-09 do db.test passam no CI e o registro tipado do evento expõe os 4 campos.
