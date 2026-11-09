---
id: R-20261102-153933-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0066
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:39:33-04:00
---
# T-0052 etapa 2 (aba Catálogo/atalho) e T-0066 (consumidores preço/estoque) entregues

## Contexto
1) Aba Catálogo e atalho Ver catálogo religados (reversão do 3800fc8) em modules/catalogo/app/index.ts, shell.test.ts; demo-abas e promotor-sem-pedido verdes (17). Promotor só leitura (adicionar ao pedido é do Vendedor). 2) Os consumidores declarados NÃO existiam. Implementei domain/erp.ts (+teste), api/consumidores-erp.ts (preço: tabela/item; estoque: depósito/saldo; idempotente, soft delete, ReferenciaAusenteErp para outbox) registrados no moduloApi, e consumidores-erp.db.test.ts (Postgres, 4 casos + manifesto). 3) Árvore T-0061 não iniciada.

## O que preciso / o que mudou
PENDÊNCIA CRÍTICA: achar o produto pelo external_id exige produto_external_ids em core.cadastro_resumo@1 (recado R-20261102-152246 ao modulo-core); até lá o consumo falha e a outbox repete. Testes db não foram confirmados contra Postgres nesta máquina (suíte do catálogo 413 verdes; db pula sem banco).

## Pronto quando
Pronto quando: Core entregar o campo.
